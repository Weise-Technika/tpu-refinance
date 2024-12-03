import express from 'express';
import { PrismaClient } from '@prisma/client';

const cors = require('cors');
import fs from 'fs';
import https from 'https';
//import e from 'express';
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/priceCarsBrand/:group', async (req,res) => {
    const { group } = req.params;
    const pricerate = await prisma.finance_price.findMany({
        where: {
            group
        }
    });
    const data = pricerate ? Array.from(new Set(pricerate.map(item => item.brand))) : [];

    res.json(data);
});

app.get('/priceCarsBrand/:group/:brand', async (req,res) => {
    const { brand, group } = req.params;
    const pricerate = await prisma.finance_price.findMany({
        where: {
            group,
            brand
        }
    });
    const data = pricerate ? Array.from(new Set(pricerate.map(item => item.title))) : [];
    res.json(data);
});

app.get('/priceCarsBrand/:group/:brand/:title', async (req,res) => {
    const { brand, title, group } = req.params;
    const pricerate = await prisma.finance_price.findMany({
        where: {
            group,
            brand,
            title
        }
    });
    const data = pricerate ? Array.from(new Set(pricerate.map(item => item.year))) : [];
    res.json(data);
});

app.get('/priceCarsBrand/:group/:brand/:title/:year', async (req,res) => {
    const { brand, title, group } = req.params;
    const year = parseInt(req.params.year, 10);
    const pricerate = await prisma.finance_price.findMany({
        where: {
            group,
            brand,
            title,
            year
        }
    });
    const data = pricerate.map(item => item.gen);
    res.json(data);
});

app.get('/priceCarsBrand/:group/:brand/:title/:year/:gen', async (req,res) => {
    const { brand, title, group } = req.params;
    const year = parseInt(req.params.year, 10);
    const gen = req.params.gen;
    const pricerate = await prisma.finance_price.findMany({
        where: {
            group,
            brand,
            title,
            year,
            gen
        }
    });
    const data = pricerate.length > 0 ? pricerate[0].price : null;
    res.json(data);
});

app.post('/importPriceList', async (req,res) => {
    const { body } = req;

    if (!req.is('application/json')) {
        return res.status(400).json({ error: 'Expected application/json' });
    } else if (!Array.isArray(body)) {
        return res.status(400).json({ error: 'Expected an array of price items' });
    } else {
        const priceListData = body.map((item: any) => ({ 
            item: item.item,
            brand: item.brand, 
            title: item.title, 
            year: Number(item.year), 
            gen: item.gen, 
            price: Number(item.price), 
            group: item.group 
        }));

        try {
            await prisma.finance_price.createMany({
            data: priceListData
            });
            return res.status(201).json({ message: 'Imported price list successfully' });
        } catch (error) {
            console.error('Error importing price list:', error);
            return res.status(500).json({ error: 'Failed to import price list' });
        }
    }

});

app.post('/calFinData', async (req, res) => {
    const { body } = req;

    if (!req.is('application/json')) {
        return res.status(400).json({ error: 'Expected application/json' });
    } else {
        const { name, phone, car_id, firstCalData, secondCalData, salesOwner } = body;
        const customerData = {
            name,
            phone,
            car_id,
            firstCalData,
            secondCalData,
            salesOwner
        };

        try {
            const newCustomer = await prisma.customer_data.create({
                data: customerData
            });
            return res.status(201).json({ message: 'Imported customer data successfully', id: newCustomer.id });
        } catch (error) {
            console.error('Error importing customer data:', error);
            return res.status(500).json({ error: 'Failed to import customer data' });
        }
    }
});

app.post('/printPdf', async (req,res) => {
    const { id } = req.body;
    const getUuid = await prisma.customer_data.findUnique({
        where: {
            id
        }
    });

    if (getUuid && getUuid.firstCalData) {
        const data = typeof getUuid.firstCalData === 'string' ? JSON.parse(getUuid.firstCalData) : null;
        res.status(200);
        res.json(data);
    } else {
        //res.status(200);
        res.json({ error: 404, message: 'Data not found'});
    }

});


// if (process.env.APP === 'production') {
    const sslOptions = {
        key: fs.readFileSync('cert/private-key.pem'),
        cert: fs.readFileSync('cert/certificate.pem')
    };

    https.createServer(sslOptions, app).listen(3000, () => {
        console.log('Server is running on https://localhost:3000');
    });
// } else if (process.env.APP === 'dev') {
//     app.listen(3000, () => {
//         console.log('Server is running on http://localhost:3000');
//     });
// } 