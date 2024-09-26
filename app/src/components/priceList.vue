<template>
    <div class="container">

        <div class="row justify-content-center">
            <div class="col-12 col-md-6">

                <div class="mt-4 mb-2">
                    <div class="heading">1</div>
                    <h3 class="title color-white">เลือกรุ่นรถยนต์ของคุณ</h3>
                </div>

                <div class="card-rf mt-3">
                    <div class="row mt-3 mb-2">
                        <p>ราคาอัพเดท : 23 กันยายนต์ 2567</p>
                        <div class="col-12">
                            <div class="mb-3">
                                <select @change="getTitle($event)" class="form-select">
                                    <option value="0">= โปรดเลือกยี่ห้อรถยนต์ =</option>
                                    <option v-for="data in priceList" :key="data" :value="data">{{ data }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <select @change="getYear($event)" class="form-select hidden" id="title">
                                    <option value="0">= โปรดเลือกรุ่นรถยนต์ =</option>
                                    <option v-for="data in titleList" :key="data" :value="data">{{ data }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <select @change="getGen($event)" class="form-select hidden" id="year">
                                    <option value="0">= โปรดเลือกปีรถยนต์ =</option>
                                    <option v-for="data in yearList" :key="data" :value="data">{{ data }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <select @change="getPrice($event)" class="form-select hidden" id="gen">
                                    <option value="0">= โปรดเลือกรุ่นย่อยรถยนต์ =</option>
                                    <option v-for="data in genList" :key="data" :value="data">{{ data }}</option>
                                </select>
                            </div>
                            
                            <div class="hidden" id="price">
                                <p >ราคากลาง</p>
                                <div class="text-center">
                                    <h1 class="mb-3 mt-1">{{ new Intl.NumberFormat().format(showLimitPrice) }}</h1>
                                </div>
                                <p class="mb-2">ยอดจัด {{ limit }}%</p>
                                <div class="range">
                                    <input type="range" class="form-range" id="limit-loan" @input="limitLoan()" value="100" />
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-12">

                                    <div class="row mt-1 mb-3 hidden" id="govFee">
                                        <div class="col-12">
                                            <label>ประเภทรถยนต์เพื่อคำนวนค่า พ.ร.บ.</label>
                                            <select class="form-select mt-1" id="carType" @change="carTypeList()">
                                                <option value="0">= โปรดเลือกประเภทรถยนต์ =</option>
                                                <option value="646">รถยนต์เก๋ง</option>
                                                <option value="968">รถยนต์กระบะ</option>
                                                <option value="1183">รถตู้ / SUV</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="hidden" id="loanStatus">
                                        <p class="mb-2">สถานะไฟแนนซ์</p>
                                        <div class="loan-btn">
                                            <input type="radio" class="btn-check" name="options-base" id="option5" autocomplete="off" @click="noLoan()">
                                            <label class="btn btn-outline-secondary" for="option5">ปลอดภาระ</label>
                                        </div>
                                        <div>
                                            <input type="radio" class="btn-check" name="options-base" id="option6" autocomplete="off" @click="haveLoan()">
                                            <label class="btn btn-outline-secondary" for="option6">มียอดคงค้าง</label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="row mt-3 hidden" id="loan">
                                <div class="col-12">
                                    <label>จำนวนยอดคงค้างคงเหลือ</label>
                                    <input class="form-control mt-1" type="number" v-model="is_loan">
                                </div>
                            </div>
                            
                        </div>

                        
                    </div>
                </div>

                <div class="hidden" id="step2">
                    <div class="mt-4 mb-3">
                        <div class="heading">2</div>
                        <h3 class="title color-white">รายละเอียด</h3>
                    </div>

                    <div class="card-rf mt-3 mb-4">
                        <div class="row mt-3">
                            <table class="cost">
                                <tr>
                                    <td>
                                        <p class="tiny-space">เงินมัดจำค่าธรรมเนียมดำเนินการ</p>
                                        <small>ได้คืนโดยบวกคืนไปกับยอดเงินคงเหลือ</small>
                                    </td>
                                    <td width="100px" class="text-right">2,000</td>
                                </tr>
                                <tr>
                                    <td>ค่าธรรมเนียมดำเนินการจัดไฟแนนซ์</td>
                                    <td class="text-right">10,000</td>
                                </tr>
                                <tr>
                                    <td>ค่าเช็คต้น</td>
                                    <td class="text-right">150</td>
                                </tr>
                                <tr>
                                    <td>ค่าโอนอากรในส่วนจัดใหม่</td>
                                    <td class="text-right">{{ new Intl.NumberFormat().format(transfer) }}</td>
                                </tr>
                                <tr>
                                    <td>ค่าทำสัญญาจัดไฟแนนซ์</td>
                                    <td class="text-right">2,000</td>
                                </tr>
                                <tr>
                                    <td>ค่าภาษี</td>
                                    <td><input class="form-control tiny-input" v-model="tax"></td>
                                </tr>
                                <tr>
                                    <td>ค่า พ.ร.บ.</td>
                                    <td class="text-right">{{ Intl.NumberFormat().format(carType) }}</td>
                                </tr>
                                <tr>
                                    <td>ค่าประกันตัวรถ</td>
                                    <td><input class="form-control tiny-input" v-model="insureCar"></td>
                                </tr>

                                <tr>
                                    <td>ค่าประกันชีวิต</td>
                                    <td><input class="form-control tiny-input" v-model="insureLife"></td>
                                </tr>

                                <tr class="hidden" id="loan-fee">
                                    <td>ค่าธรรมเนียมปิดบัญชี 3%</td>
                                    <td class="text-right">{{ Intl.NumberFormat().format(calLoan) }}</td>
                                </tr>

                                <tr class="hidden" id="loan-process">
                                    <td>ค่าดำเนินการปิดบัญชี</td>
                                    <td class="text-right">1,000</td>
                                </tr>

                                <tr class="hidden" id="loan-transfer">
                                    <td>ค่าโอนตามสัญญาไฟแนนซ์เดิม</td>
                                    <td class="text-right">2,000</td>
                                </tr>

                                <tr>
                                    <td>ค่าใช้จ่ายอื่น</td>
                                    <td><input class="form-control tiny-input" v-model="otherFee"></td>
                                </tr>

                            </table>
                        </div>

                    </div>

                    <div class="mt-2 mb-3">
                        <div class="heading">3</div>
                        <h3 class="title color-white">สรุปการคำนวณ</h3>
                    </div>

                    <div class="card-rf mt-2 mb-5">
                        <div class="row mt-3">
                            <table class="summary">
                                <tr>
                                    <td>ยอดสินชื่อรถยนต์ (จัดใหม่ {{ limit }}%)</td>
                                    <td class="text-right">{{ new Intl.NumberFormat().format(showLimitPrice) }}</td>
                                </tr>
                                <tr>
                                    <td>ยอดหนี้คงค้าง</td>
                                    <td class="text-right">- {{ Intl.NumberFormat().format(is_loan) }}</td>
                                </tr>
                                <tr>
                                    <td>ค่าใช้จ่าย</td>
                                    <td class="text-right" width="100px" >- {{ Intl.NumberFormat().format(cost) }}</td>
                                </tr>

                                <tr>
                                    <td>คืนเงินมัดจำค่าธรรมเนียมดำเนินการ</td>
                                    <td class="text-right" width="100px">2,000</td>
                                </tr>
                            </table>
                            <div class="tatalCashBack mt-2">
                                <p class="mb-3 mt-0">เงินคงเหลือทั้งสื้น</p>
                                <h1 class="text-center mb-0">{{ Intl.NumberFormat().format(totalRefinance) }} บาท</h1>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-12 calNewFn">
                                <p class="mb-2">อัตราดอกเบี้ยรีไฟแนนซ์ (<a href="#" target="_blank">ข้อมูลอัตราดอกเบี้ย</a>)</p>
                                <table class="table table-striped">
                                    <tr>
                                        <td class="">
                                            จำนวนงวด
                                        </td>
                                        <td>ดอกเบี้ย</td>
                                        <td class="text-right">
                                            ผ่อนต่องวด
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td class="">
                                            ผ่อน 36 งวด
                                        </td>
                                        <td width="70px">
                                            <input class="form-control tiny-input" type="number" v-model="loanRate36">
                                        </td>
                                        <td class="text-right">
                                            {{ Intl.NumberFormat().format(Number(payMonh36.toFixed(2))) }} บาท
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="">
                                            ผ่อน 48 งวด
                                        </td>
                                        <td width="80px">
                                            <input class="form-control tiny-input" type="number" v-model="loanRate48">
                                        </td>
                                        <td class="text-right">
                                            {{ Intl.NumberFormat().format(Number(payMonth48.toFixed(2))) }} บาท
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="">
                                            ผ่อน 60 งวด
                                        </td>
                                        <td width="70px">
                                            <input class="form-control tiny-input" type="number" v-model="loanRate60">
                                        </td>
                                        <td class="text-right">
                                            {{ Intl.NumberFormat().format(Number(payMonth60.toFixed(2))) }} บาท
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="">
                                            ผ่อน 72 งวด
                                        </td>
                                        <td width="70px">
                                            <input class="form-control tiny-input" type="number" v-model="loanRate72">
                                        </td>
                                        <td class="text-right">
                                            {{ Intl.NumberFormat().format(Number(payMonth72.toFixed(2))) }} บาท
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="">
                                            ผ่อน 84 งวด
                                        </td>
                                        <td width="70px">
                                            <input class="form-control tiny-input" type="number" v-model="loanRate84">
                                        </td>
                                        <td class="text-right">
                                            {{ Intl.NumberFormat().format(Number(payMonth84.toFixed(2))) }} บาท
                                        </td>
                                    </tr>
                                </table>
                                <p>ยอดผ่อนรวมภาษีมูลค่าเพิ่ม 7% แล้ว</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style>
    @media (min-width: 768px) {
        .container {
            width: 980px;
        }
    }
    .calNewFn {
        padding: 0px;
    }
    .tatalCashBack {
        background-color: #e7e6e6;
        border-radius: 10px;
        padding: 10px 15px 15px 15px;
    }
    .loan-btn {
        float: left;
        margin-right: 10px;
    }
    .text-right {
        text-align: right;
        padding-right: 13px;
    }
    .cost tr {
        height: 35px;
    }
    .hidden {
        display: none;
    }
	.card-rf {
		background-color: hsl(0, 0%, 100%);
		padding: 5px 30px 20px;
		border-radius: 10px;
	}
    .color-white {
        color: white;
    }
    .heading {
        background-color: #ffffff;
        color: #d60707;
        padding: 10px;
        border-radius: 50%;
        text-align: center;
        width: 35px;
        height: 35px;
        line-height: 0.9rem;
        font-size: 1.35rem;
        font-weight: 700;
        font-family: 'Kanit', sans-serif;
        float: left;
        margin-right: 10px;

    }
    .title {
        font-size: 1.8rem;
        font-weight: 700;
    }
    small {
        font-size: 0.7rem;
        color: #8d8d8d;
    }
    .tiny-space {
        margin-bottom: 0rem;
        margin-top: 10px;
        line-height: 0.8rem;
    }
    .tiny-input {
        height: 25px;
        text-align:right;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import axios from 'axios';

    const priceList = ref([]);
    const titleList = ref([]);
    const yearList = ref([]);
    const genList = ref([]);

    const dataBrand = ref('');
    const dataTitle = ref('');
    const dataGen = ref('');
    const dataPrice = ref('');
    const limit = ref(100);

    const is_loan = ref(0);
    const am_loan = ref(false);

    //Cal New Loan
    //ยอดสินเชื่อใหม่ตาม %
    const showLimitPrice = ref(0);
    const bookingFee = ref(2000);
    const processFee = ref(10000);
    const checkFee = ref(150);
    const transfer = ref(0);
    const signContractFee = ref(2000);
    const tax = ref(0);
    // ตำนวน พ.ร.บ.
    const carType = ref(0);
    const insureCar = ref(0);
    const insureLife = ref(0);
    const calLoan = computed(() => is_loan.value * 0.03);
    const advanceOldAccoiunt = ref(0);
    const oldTransferFn = ref(2000);
    const otherFee = ref(0);

    const loanRate36 = ref(5.5);
    const loanRate48 = ref(5.5);
    const loanRate60 = ref(5.5);
    const loanRate72 = ref(5.5);
    const loanRate84 = ref(5.5);

    let payMonh36  = computed(() => ((((showLimitPrice.value * (loanRate36.value / 100) ) * 3) + showLimitPrice.value) / 36));
    let payMonth48 = computed(() => ((((showLimitPrice.value * (loanRate48.value / 100) ) * 4) + showLimitPrice.value) / 48));
    let payMonth60 = computed(() => ((((showLimitPrice.value * (loanRate60.value / 100) ) * 5) + showLimitPrice.value) / 60));
    let payMonth72 = computed(() => ((((showLimitPrice.value * (loanRate72.value / 100) ) * 6) + showLimitPrice.value) / 72));
    let payMonth84 = computed(() => ((((showLimitPrice.value * (loanRate84.value / 100) ) * 7) + showLimitPrice.value) / 84));

    //Cost Cal
    const cost = computed(() => {
        let totalCost = bookingFee.value + processFee.value + checkFee.value + transfer.value + signContractFee.value + Number(tax.value) + carType.value + Number(insureCar.value) + Number(insureLife.value) + Number(otherFee.value);

        if (am_loan.value === true) {
            totalCost += calLoan.value + oldTransferFn.value + advanceOldAccoiunt.value + oldTransferFn.value;
        }

        return totalCost;
    });

    const totalRefinance = computed(() => {
        const total = showLimitPrice.value - cost.value + Number(2000) - is_loan.value;
        return total <= 0 ? 0 : total;
    });

    onMounted(async () => {
        try {
            const response = await axios.get('http://host.docker.internal:2083/priceCarsBrand/1');
            priceList.value = response.data;
            titleList.value = [];
            yearList.value = [];
            genList.value = [];
            dataPrice.value = '0';
        } catch (error) {
            console.log(error);
        }
    });

    const getTitle = async (event) => {
        dataBrand.value = event.target.value;
        try {
            const response = await axios.get(`http://host.docker.internal:2083/priceCarsBrand/1/${dataBrand.value}`);
            titleList.value = response.data;
            yearList.value = [];
            genList.value = [];
            dataPrice.value = '0';
            document.getElementById('title').classList.remove('hidden');

            showLimitPrice.value = 0;
            (document.getElementById('limit-loan') as HTMLInputElement).value = '100';
        } catch (error) {
            console.log(error);
        }

    }

    const getYear = async (event) => {
        dataTitle.value = event.target.value;
        try {
            const response = await axios.get(`http://host.docker.internal:2083/priceCarsBrand/1/${dataBrand.value}/${dataTitle.value}`);
            yearList.value = response.data;
            genList.value = [];
            dataPrice.value = '0';
            document.getElementById('year').classList.remove('hidden');

            showLimitPrice.value = 0;
            (document.getElementById('limit-loan') as HTMLInputElement).value = '100';
        } catch (error) {
            console.log(error);
        }

    }

    const getGen = async (event) => {
        dataGen.value = event.target.value;
        try {
            if(dataGen.value === '0') {
                genList.value = [];
            } else {
                const response = await axios.get(`http://host.docker.internal:2083/priceCarsBrand/1/${dataBrand.value}/${dataTitle.value}/${dataGen.value}`);
                genList.value = response.data;
            }
            document.getElementById('gen').classList.remove('hidden');

            showLimitPrice.value = 0;
            (document.getElementById('limit-loan') as HTMLInputElement).value = '100';
            
        } catch (error) {
            console.log(error);
        }
        dataPrice.value = '0';
    }

    const getPrice = async (event) => {
        dataPrice.value = event.target.value;
        try {
            const response = await axios.get(`http://host.docker.internal:2083/priceCarsBrand/1/${dataBrand.value}/${dataTitle.value}/${dataGen.value}/${dataPrice.value}`);
            const totalPrice =  Number(response.data);
            dataPrice.value = totalPrice.toString();
            document.getElementById('price').classList.remove('hidden');
            showLimitPrice.value = totalPrice;

            transfer.value = (totalPrice / 100) + 3000;
            document.getElementById('govFee').classList.remove('hidden');

        } catch (error) {
            console.log(error);
        }
    }

    const haveLoan = () => {
        document.getElementById('loan').classList.remove('hidden');
        document.getElementById('loan-fee').classList.remove('hidden');
        document.getElementById('loan-process').classList.remove('hidden');
        document.getElementById('loan-transfer').classList.remove('hidden');
        am_loan.value = true;
        document.getElementById('step2').classList.remove('hidden');
    }

    const noLoan = () => {
        document.getElementById('loan').classList.add('hidden');
        document.getElementById('loan-fee').classList.add('hidden');
        document.getElementById('loan-process').classList.add('hidden');
        document.getElementById('loan-transfer').classList.add('hidden');
        am_loan.value = false;
        document.getElementById('step2').classList.remove('hidden');

    }

    const limitLoan = () => {
        const limitValue = (document.getElementById('limit-loan') as HTMLInputElement).value;
        limit.value = Number(limitValue);
        showLimitPrice.value = (Number(dataPrice.value) * Number(limit.value)) / 100;
    }
    
    const carTypeList = () => {
        carType.value = Number((document.getElementById('carType') as HTMLSelectElement).value);
        document.getElementById('loanStatus').classList.remove('hidden');
    }


</script>