<template>
    <div id="app"></div>
</template>
  
<script>
    import { createApp, ref } from 'vue'
    import pdfMake from 'pdfmake'
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import VueSweetalert2 from 'vue-sweetalert2'
    import 'sweetalert2/dist/sweetalert2.min.css'

    const app = createApp({});
    app.use(VueSweetalert2);

    export default {
        name: 'App',
        data() {
            return {
                id: null,
                rate: null,
                exportData: []
            }
        },
        mounted() {
            const urlParams = new URLSearchParams(window.location.search);
            this.id = urlParams.get('id');
            this.rate = urlParams.get('rate');

            this.export(this.id)
        },
        methods: {
            export (id) {

                const pdfData = ref([]);

                axios.post('https://ref.paragonusedcars.com:2083/printPdf',{
                    headet: {
                        'Content-Type': 'application/json',
                    },
                    id: id,
                }).then((response) => {
                    if (response.data.error === 404) {
                        Swal.fire("ทำรายการผิดพลาด", response.data.message + ' (Code:404)' , "error",)
                    } else {
                        
                        pdfData.value = response.data
                        // console.log(JSON.parse(JSON.stringify(exportData.value)))

                        const docDefinition = {
                            defaultStyle: {
                                font: 'Sarabun'
                            },
        
                            content: [
                                { text: 'ใบสรุปค่าใช้จ่ายในการปิดบัญชีและจัดไฟแนนซ์ใหม่', style: 'header' },
                                { text: `ลูกค้า: ${pdfData.value.customer.name} เบอร์โทร: ${pdfData.value.customer.phone}`, style: 'description', margin: [0, 5, 0, 0] },
                                { text: `รถยนต์: ${pdfData.value.zone_0.dataBrand} ${pdfData.value.zone_0.dataTitle} ${pdfData.value.zone_0.dataYear} เลขทะเบียน: ${pdfData.value.customer.carLicense}`, style: 'description', margin: [0, 0, 0, 10] },
                                { text: 'ส่วนที่ 1 สัญญาซื้อรถยนต์ (ปิดบัญชีไฟแนนซ์เดิม)', style: 'tableHeader' },
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: [260, 110, 110],
                                        body: [
                                            [{ text: 'รายละเอียด', style: 'tableHeader' }, { text: 'คชจ.ตามสัญญาซื้อ', style: 'tableHeader', alignment: 'right' }, { text: 'คชจ.ตามจริง', style: 'tableHeader',alignment: 'right' }],
                                            [{ text: '1.1 ยอดปิดบัญชี', style: 'textData'}, { text: `${parseFloat(pdfData.value.zone_1.is_loan_two).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            [{ text: '1.2 ค่าโอนตามสัญญา', style: 'textData'}, { text: `${parseFloat(pdfData.value.zone_1.oldTransferFn).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            [{ text: '1.3 ภาษี', style: 'textData'}, { text: `${parseFloat(pdfData.value.zone_1.tax).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            [{ text: '1.4 พรบ.', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_1.regisGov).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: '1.5 ค่าตรวจรถ', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_1.checkFee).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: '1.6 ค่าบริการปิดบัญชี', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_1.advanceOldAccount).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: '1.7 ค่าเช็คต้น', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_1.checkLoanFee).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: '1.8 ค่าใช้จ่ายอื่นๆ', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_1.otherFee).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: 'รวมค่าใช้จ่ายปิดบัญชีทั้งหมด', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_1.calLoanAll).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: 'ค่าธรรมเนียมปิดบัญชี 3% ของ คชจ.ทั้งหมด', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_1.calLoan).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: 'สรุปค่าใช้จ่ายในการดำเนินการปิดบัญชี', style: 'textSummary', alignment: 'center'},{ text: `${parseFloat(pdfData.value.zone_1.allCostOldFn).toLocaleString()}`, style: 'textData', alignment: 'right' },'']
                                        ]
                                    },
                                    layout: 'lightHorizontalLines'
                                },
                                { text: 'ส่วนที่ 2 รายงานการขาย (จัดไฟแนนซ์ใหม่)', style: 'description', style: 'tableHeader', margin: [0, 10, 0, 0] },
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: [260, 110, 110],
                                        body: [
                                            [{ text: 'รายละเอียด', style: 'tableHeader' }, { text: 'คชจ.ตามสัญญาซื้อ', style: 'tableHeader', alignment: 'right' }, { text: 'คชจ.ตามจริง', style: 'tableHeader',alignment: 'right' }],
                                            [{ text: '2.1 ค่าทำสัญญาไฟแนนซ์', style: 'textData'}, { text: `${parseFloat(pdfData.value.zone_2.signContractFee).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            [{ text: '2.2 ค่าโอนอากร', style: 'textData'}, { text: `${parseFloat(pdfData.value.zone_2.transfer).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            [{ text: '2.3 ภาษี', style: 'textData'}, { text: `${parseFloat(pdfData.value.zone_2.newTax).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            [{ text: '2.4 พรบ.', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_2.regisGov).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: '2.5 ประกันภัย', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_2.inSure).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: '2.6 ค่าเช็คตัน', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_2.checkLoanFee).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: '2.7 ค่าใช้จ่ายอื่นๆ', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_2.otherFee).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: '2.8 ค่าธรรมเนียมในการดำเนินการ', style: 'textData'},{ text: `${parseFloat(pdfData.value.zone_2.processFee).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: 'สรุปค่าใช้จ่ายในการจัดไฟแนนซ์ใหม่', style: 'textSummary', alignment: 'center'},{ text: `${parseFloat(pdfData.value.zone_2.newTotalRef).toLocaleString()}`, style: 'textData', alignment: 'right' },'']
                                        ]
                                    },
                                    layout: 'lightHorizontalLines'
                                },
                                { text: 'ส่วนที่ 3 สรุปยอดคงเหลือที่ลูกค้าจะได้รับ', style: 'description', style: 'tableHeader', margin: [0, 10, 0, 0] },
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: [260, 110, 110],
                                        body: [
                                            [{ text: 'รายละเอียด', style: 'tableHeader' }, { text: 'คชจ.ตามสัญญาซื้อ', style: 'tableHeader', alignment: 'right' }, { text: 'คชจ.ตามจริง', style: 'tableHeader',alignment: 'right' }],
                                            [{ text: '3.1 ยอดจัดไฟแนนซ์', style: 'textData'}, { text: `${parseInt(pdfData.value.zone_3.showLimitPrice).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            [{ text: '3.2 หักค่าใช้จ่ายในส่วนปิดบัญชี (ส่วนที่1)', style: 'textData'}, { text: `${parseInt(pdfData.value.zone_3.allCostOldFn).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            [{ text: '3.3 หักค่าใช้จ่ายในการจัดไฟแนนซ์ (ส่วนที่2)', style: 'textData'}, { text: `${parseInt(pdfData.value.zone_3.newTotalRef).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            [{ text: '3.4 เงินมัดจำทำสัญญาคืนลูกค้า', style: 'textData'},{ text: `${parseInt(pdfData.value.zone_3.bookingFee).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            [{ text: 'สรุปยอดคงเหลือที่ลูกค้าจะได้รับ', style: 'textSummary', alignment: 'center'},{ text: `${parseInt(pdfData.value.installment.totalRefinance).toLocaleString()}`, style: 'textData', alignment: 'right' },'']
                                        ]
                                    },
                                    layout: 'lightHorizontalLines'
                                },
                                { text: 'ส่วนที่ 4 ค่างวดรวมภาษี', style: 'description', style: 'tableHeader', margin: [0, 10, 0, 0]},
                                {

                                    table: {
                                        headerRows: 1,
                                        widths: this.rate !== 'false' ? [190, 50, 110, 110] : [260, 110, 110],
                                        body: [
                                            this.rate !== 'false' ? [{ text: 'รายละเอียด', style: 'tableHeader' }, { text: 'ดอกเบี้ย', style: 'tableHeader' }, { text: 'ผ่อนตามสัญญาซื้อ', style: 'tableHeader', alignment: 'right' }, { text: 'ผ่อนตามจริง', style: 'tableHeader',alignment: 'right' }] : [{ text: 'รายละเอียด', style: 'tableHeader' }, { text: 'ผ่อนตามสัญญาซื้อ', style: 'tableHeader', alignment: 'right' }, { text: 'ผ่อนตามจริง', style: 'tableHeader',alignment: 'right' }],
                                            this.rate !== 'false' ? [{ text: 'ผ่อน 36 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${pdfData.value.installment.loanRate36}%`, style: 'textData'}, { text: `${parseInt(pdfData.value.installment.payMonth36).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''] : [{ text: 'ผ่อน 36 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${parseInt(pdfData.value.installment.payMonth36).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            this.rate !== 'false' ? [{ text: 'ผ่อน 48 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${pdfData.value.installment.loanRate48}%`, style: 'textData'}, { text: `${parseInt(pdfData.value.installment.payMonth48).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''] : [{ text: 'ผ่อน 48 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${parseInt(pdfData.value.installment.payMonth48).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            this.rate !== 'false' ? [{ text: 'ผ่อน 60 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${pdfData.value.installment.loanRate60}%`, style: 'textData'}, { text: `${parseInt(pdfData.value.installment.payMonth60).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''] : [{ text: 'ผ่อน 60 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${parseInt(pdfData.value.installment.payMonth60).toLocaleString()}`, style: 'textData', alignment: 'right' }, ''],
                                            this.rate !== 'false' ? [{ text: 'ผ่อน 72 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${pdfData.value.installment.loanRate72}%`, style: 'textData'}, { text: `${parseInt(pdfData.value.installment.payMonth72).toLocaleString()}`, style: 'textData', alignment: 'right' },''] : [{ text: 'ผ่อน 72 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${parseInt(pdfData.value.installment.payMonth72).toLocaleString()}`, style: 'textData', alignment: 'right' },''],
                                            this.rate !== 'false' ? [{ text: 'ผ่อน 84 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${pdfData.value.installment.loanRate84}%`, style: 'textData'}, { text: `${parseInt(pdfData.value.installment.payMonth84).toLocaleString()}`, style: 'textData', alignment: 'right' },''] : [{ text: 'ผ่อน 84 เดือน (โดยประมาณ)', style: 'textData'},{ text: `${parseInt(pdfData.value.installment.payMonth84).toLocaleString()}`, style: 'textData', alignment: 'right' },'']
                                        ]
                                    },
                                    layout: 'lightHorizontalLines'

                                },
                                { text: 'เอกสารสร้างวันที่ 14 พ.ย. 2567 เวลา 15:33 โดย N/A', style: 'description', style: 'textCreate',margin: [0, 10, 0, 0] , alignment: 'right'},
                                { text: `เลขที่เอกสาร: ${id}`, style: 'description', style: 'textCreate', alignment: 'right'},
                            ],
                            styles: {
                                header: {
                                    fontSize: 13,
                                    bold: true
                                },
                                description: {
                                    fontSize: 11,
                                },
                                tableHeader: {
                                    bold: true,
                                    color: 'black',
                                    fontSize: 11,
                                },
                                textData: {
                                    fontSize: 9,
                                },
                                textCreate: {
                                    fontSize: 8,
                                },
                                textSummary: {
                                    fontSize: 9,
                                    bold: true
                                }
                            }
                        }
                        pdfMake.fonts = {
                            Sarabun: {
                                normal: 'https://ref.paragonusedcars.com/fonts/Sarabun-Regular.ttf',
                                bold: 'https://ref.paragonusedcars.com/fonts/Sarabun-Bold.ttf',
                            }
                        }
                        pdfMake.createPdf(docDefinition).open({}, window)
                        
                    }
                })
                    
            }
            
        }
    }
</script>