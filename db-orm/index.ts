import express from 'express';
import { PrismaClient } from '@prisma/client';

const cors = require('cors');
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

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});