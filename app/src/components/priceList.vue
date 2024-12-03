<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 mb-4">
        <div class="mt-4 mb-2">
          <div class="heading">1</div>
          <h3 class="title color-white">เลือกรุ่นรถยนต์ของคุณ</h3>
        </div>

        <div class="card-rf mt-3">
          <div class="row mt-3 mb-2">
            <p>ราคาอัพเดท : 20 พ.ย. 2567</p>
            <div class="col-12">
              <div class="mb-3">
                <select @change="getTitle($event)" class="form-select">
                  <option value="0">= โปรดเลือกยี่ห้อรถยนต์ =</option>
                  <option v-for="data in priceList" :key="data" :value="data">
                    {{ data }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <select
                  @change="getYear($event)"
                  class="form-select hidden"
                  id="title"
                >
                  <option value="0">= โปรดเลือกรุ่นรถยนต์ =</option>
                  <option v-for="data in titleList" :key="data" :value="data">
                    {{ data }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <select
                  @change="getGen($event)"
                  class="form-select hidden"
                  id="year"
                >
                  <option value="0">= โปรดเลือกปีรถยนต์ =</option>
                  <option v-for="data in yearList" :key="data" :value="data">
                    {{ data }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <select
                  @change="getPrice($event)"
                  class="form-select hidden"
                  id="gen"
                >
                  <option value="0">= โปรดเลือกรุ่นย่อยรถยนต์ =</option>
                  <option v-for="data in genList" :key="data" :value="data">
                    {{ data }}
                  </option>
                </select>
              </div>

              <div class="hidden" id="price">
                <p>ราคากลาง</p>
                <div class="text-center">
                  <h1 class="mb-3 mt-1">
                    {{ new Intl.NumberFormat().format(showLimitPrice) }}
                  </h1>
                </div>
                <p class="mb-2">ยอดจัด {{ limit }}%</p>
                <div class="range">
                  <input
                    type="range"
                    class="form-range"
                    id="limit-loan"
                    @input="limitLoan()"
                    value="100"
                  />
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-12">

                  <div class="hidden" id="loanStatus">
                    <p class="mb-2">สถานะไฟแนนซ์</p>
                    <div class="loan-btn">
                      <input
                        type="radio"
                        class="btn-check"
                        name="options-base"
                        id="option5"
                        autocomplete="off"
                        @click="noLoan()"
                      />
                      <label class="btn btn-outline-secondary" for="option5"
                        >ปลอดภาระ</label
                      >
                    </div>
                    <div>
                      <input
                        type="radio"
                        class="btn-check"
                        name="options-base"
                        id="option6"
                        autocomplete="off"
                        @click="haveLoan()"
                      />
                      <label class="btn btn-outline-secondary" for="option6"
                        >มียอดคงค้าง</label
                      >
                    </div>
                  </div>

                </div>
              </div>

              <div class="row mt-3 hidden" id="loan">
                <div class="col-12">
                  <p class="mb-2">จำนวนยอดคงค้างคงเหลือ</p>
                  <input
                    class="form-control mt-1"
                    type="number"
                    v-model="is_loan"
                  />
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
          <div class="hidden" id="haveLoan">
            <div class="title-des mb-3">
              <h5 class="color-white">ค่าใช้จ่ายในการปิดไฟแนนซ์</h5>
            </div>

            <div class="card-rf mt-3 mb-4">
              <div class="row mt-3">
                <table class="cost">
                  <tbody>

                    <tr>
                      <td>1.1 ยอดปิดบัญชี</td>
                      <td class="text-right" width="100px">
                        {{ Intl.NumberFormat().format(is_loan) }}
                      </td>
                    </tr>

                    <tr>
                      <td>1.2 ค่าโอนตามสัญญา</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="oldTransferFn"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>1.3 ภาษี</td>
                      <td>
                        <input class="form-control tiny-input" v-model="tax" />
                      </td>
                    </tr>

                    <tr>
                      <td>1.4 พ.ร.บ.</td>
                      <td>
                        <select class="form-select tiny-select" v-model="newRegisGov">
                          <option value="0">0</option>
                          <option value="646">646</option>
                          <option value="968">968</option>
                          <option value="1183">1,183</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td>1.5 ค่าตรวจรถ</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="checkFee"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>1.6 ค่าบริการปิดบัญชี</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="advanceOldAccount"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>1.7 ค่าเช็คต้น</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="checkLoanFee"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>1.8 ค่าใช้จ่ายอื่นๆ</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="otherFee"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>รวมค่าใช้จ่ายปิดบัญชี</td>
                      <td class="text-right">
                        {{ Intl.NumberFormat().format(Number(calLoanAll.toFixed(0))) }}
                      </td>
                    </tr>
                    
                    <tr class="">
                      <td>ค่าธรรมเนียมปิดบัญชี 3%</td>
                      <td class="text-right">
                        {{ Intl.NumberFormat().format(Number(calLoan.toFixed(0))) }}
                      </td>
                    </tr>

                    <tr class="total-line">
                      <td>1. สรุปค่าใช้จ่ายปิดบัญชีเดิม</td>
                      <td class="text-right">
                        {{ Intl.NumberFormat().format(Number(allCostOldFn.toFixed(0))) }}
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>


          <div class="hidden" id="noLoan">

            <div class="mt-4 mb-3">
              <h5 class="title-des color-white">ค่าใช้จ่ายการรีไฟแนนซ์</h5>
            </div>

            <div class="card-rf mt-3 mb-4">
              <div class="row mt-3">
                <table class="cost">
                  <tbody>
                    <tr>
                      <td>ยอดสินเชื่อ (จัดใหม่ {{ limit }}%)</td>
                      <td class="text-right" width="100px">
                        {{ new Intl.NumberFormat().format(showLimitPrice) }}
                      </td>
                    </tr>

                    <!-- <tr>
                      <td>เงินมัดจำทำสัญญา</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="bookingFee"
                        />
                      </td>
                    </tr> -->

                    <tr>
                      <td>2.1 ค่าทำสัญญาไฟแนนซ์</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="signContractFee"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>2.2 ค่าโอนอากร</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="transfer"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>2.3 ภาษี</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="newTax"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2.4 พ.ร.บ.</td>
                      <td>
                        <select class="form-select tiny-select" v-model="regisGov">
                          <option value="0">0</option>
                          <option value="646">646</option>
                          <option value="968">968</option>
                          <option value="1183">1,183</option>
                        </select>
                      </td>
                    </tr>


                    <tr>
                      <td>2.5 ค่าประกัน</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="insureCar"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>2.6 ค่าเช็คต้น</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="insureLife"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>2.7 ค่าใช้จ่ายอื่นๆ</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="newOtherFee"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>2.8 ค่าธรรมเนียมในการดำเนิน</td>
                      <td>
                        <input
                          class="form-control tiny-input"
                          v-model="processFee"
                        />
                      </td>
                    </tr>
                    
                    <tr class="total-line">
                      <td>2. ค่าใช้จ่ายในการจัดไฟแนนซ์</td>
                      <td class="text-right">
                        {{ Intl.NumberFormat().format(newTotalRef) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="mt-2 mb-3">
            <div class="heading">3</div>
            <h3 class="title color-white">สรุปการคำนวณ</h3>
          </div>

          <div class="card-rf mt-2 mb-4">
            <div class="row mt-3">

              <table class="summary">
                <tbody>
                  <tr>
                    <td>1. ยอดสินเชื่อ (จัดใหม่ {{ limit }}%)</td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat().format(showLimitPrice) }}
                    </td>
                  </tr>
                  <tr>
                    <td>2. ค่าปิดบัญชีเดิม (ส่วนที่ 1)</td>
                    <td class="text-right">
                        - {{ Intl.NumberFormat().format(Number(allCostOldFn.toFixed(0))) }}
                    </td>
                  </tr>
                  <tr>
                    <td>3. ค่าจัดไฟแนนซ์ (ส่วนที่ 2)</td>
                    <td class="text-right" width="150px">
                        - {{ Intl.NumberFormat().format(Number(newTotalRef.toFixed(0))) }}
                    </td>
                  </tr>
                  <tr>
                    <td>4. คืนเงินมัดจำทำสัญญา</td>
                    <td class="text-right" width="150px">
                      {{ Intl.NumberFormat().format(bookingFee) }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="tatalCashBack mt-2">
                <p class="mb-3 mt-0">เงินคงเหลือทั้งสื้น</p>
                <h1 class="text-center mb-0">
                  {{
                    Intl.NumberFormat().format(
                      Number(totalRefinance.toFixed(0))
                    )
                  }}
                  บาท
                </h1>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12 calNewFn">
                <p class="mb-2">
                  อัตราดอกเบี้ยรีไฟแนนซ์
                </p>

                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td class="">จำนวนงวด</td>
                      <td>ดอกเบี้ย</td>
                      <td class="text-right">ผ่อนต่องวด</td>
                    </tr>
                    <tr>
                      <td class="">ผ่อน 36 งวด</td>
                      <td width="70px">
                        <input
                          class="form-control tiny-input"
                          type="number"
                          v-model="loanRate36"
                        />
                      </td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat().format(
                            Number(payMonh36.toFixed(0))
                          )
                        }}
                        บาท
                      </td>
                    </tr>
                    <tr>
                      <td class="">ผ่อน 48 งวด</td>
                      <td width="90px">
                        <input
                          class="form-control tiny-input"
                          type="number"
                          v-model="loanRate48"
                        />
                      </td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat().format(
                            Number(payMonth48.toFixed(0))
                          )
                        }}
                        บาท
                      </td>
                    </tr>
                    <tr>
                      <td class="">ผ่อน 60 งวด</td>
                      <td width="70px">
                        <input
                          class="form-control tiny-input"
                          type="number"
                          v-model="loanRate60"
                        />
                      </td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat().format(
                            Number(payMonth60.toFixed(0))
                          )
                        }}
                        บาท
                      </td>
                    </tr>
                    <tr>
                      <td class="">ผ่อน 72 งวด</td>
                      <td width="70px">
                        <input
                          class="form-control tiny-input"
                          type="number"
                          v-model="loanRate72"
                        />
                      </td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat().format(
                            Number(payMonth72.toFixed(0))
                          )
                        }}
                        บาท
                      </td>
                    </tr>
                    <tr>
                      <td class="">ผ่อน 84 งวด</td>
                      <td width="70px">
                        <input
                          class="form-control tiny-input"
                          type="number"
                          v-model="loanRate84"
                        />
                      </td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat().format(
                            Number(payMonth84.toFixed(0))
                          )
                        }}
                        บาท
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>ยอดผ่อนรวมภาษีมูลค่าเพิ่ม 7% แล้ว</p>
              </div>
            </div>
          </div>

          <div class="mt-2 mb-3">
            <div class="heading">4</div>
            <h3 class="title color-white">สร้างใบเสนอราคา</h3>
          </div>

            <div class="card-rf mt-3 mb-4 pl-end">
              <div class="row mt-2">
                  <div class="col-12">
                    <p>ข้อมูลลูกค้าที่คุณจะเสนอราคา</p>
                    <input class="form-control" type="text" placeholder="ชื่อ-นามสกุล" v-model="customerName" />
                    <input class="form-control mt-3" type="text" id="telno" placeholder="เบอร์โทรศัพท์" :maxlength="10" v-model="customerPhone"/>
                    <input class="form-control mt-3" type="text" placeholder="เลขทะเบียนรถยนต์" v-model="carLicense" />
                  </div>

                  <div class="col-12 mt-2">
                    <p class="mt-4">
                      ระบบจะบันทึกข้อมูลใบเสนอ และสร้างใบเสนอราคาให้คุณ คุณสามารถเข้ามาแก้ใขได้ตลอดเวลา หรือใส่ข้อมูลเพิ่มเติมได้ตลอดเวลา
                    </p>
                    <div class="content-center">
                      <button class="btn btn-warning mt-2 mb-3" @click="logData">บันทึก และสร้างใบเสนอราคา</button>
                    </div>
                    
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
  .total-line {
    border-top: 1pt solid #c8c8c3;
  }
  .calNewFn {
    padding: 0px;
  }
  .tatalCashBack {
    background-color: #e7e6e6;
    border-radius: 10px;
    padding: 10px 15px 15px 15px;
  }
  .tiny-select {
    padding: 0px 30px 0px 0px;
    text-align: right;
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
  .pl-end {
    padding: 15px 20px;
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
    font-family: "Kanit", sans-serif;
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
    text-align: right;
  }
  .title-des {
    padding-left: 45px;
  }
  .total-hl {
    background-color: #e7e6e6;
    border-radius: 10px;
    padding: 15px 10px 15px 10px;
    margin-top: 10px;
  }
  .content-center {
    text-align: center;
  }
</style>



<script setup lang="ts">

import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const validatePhoneNumber = (event) => {
  const input = event.target;
  input.value = input.value.replace(/[^0-9]/g, '');
};

onMounted(() => {
  const phoneInput = document.getElementById('telno');
  if (phoneInput) {
    phoneInput.addEventListener('input', validatePhoneNumber);
  }
});

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

const app = createApp({});
  app.use(VueSweetalert2, options);


import Swal from 'sweetalert2';


const getDataToJson = () => {
  const data = {
    "zone_0": {
      dataBrand: dataBrand.value,
      dataTitle: dataTitle.value,
      dataYear: dataGen.value,
      dataGen: nameGen.value,
      datePrice: showLimitPrice.value,
      priceLimit: limit.value,
      is_loan: is_loan.value,
      am_loan: am_loan.value
    },
    "zone_1": {
      is_loan_two: is_loan.value,
      oldTransferFn: oldTransferFn.value,
      tax: tax.value,
      regisGov: newRegisGov.value,
      checkFee: checkFee.value,
      advanceOldAccount: advanceOldAccount.value,
      checkLoanFee: checkLoanFee.value,
      otherFee: otherFee.value,
      calLoanAll: calLoanAll.value,
      calLoan: calLoan.value,
      allCostOldFn: allCostOldFn.value,
    },
    "zone_2": {
      mainLoanPrice: showLimitPrice.value,
      bookingFee: bookingFee.value,
      signContractFee: signContractFee.value,
      transfer: transfer.value,
      newTax: newTax.value,
      regisGov: regisGov.value,
      inSure: insureCar.value,
      checkLoanFee: insureLife.value,
      otherFee: newOtherFee.value,
      processFee: processFee.value,
      newTotalRef: newTotalRef.value,
    },
    "zone_3": {
      showLimitPrice: showLimitPrice.value,
      allCostOldFn: allCostOldFn.value,
      newTotalRef: newTotalRef.value,
      bookingFee: bookingFee.value,
    },
    "installment": {
      loanRate36: loanRate36.value,
      loanRate48: loanRate48.value,
      loanRate60: loanRate60.value,
      loanRate72: loanRate72.value,
      loanRate84: loanRate84.value,
      payMonth36: payMonh36.value,
      payMonth48: payMonth48.value,
      payMonth60: payMonth60.value,
      payMonth72: payMonth72.value,
      payMonth84: payMonth84.value,
      totalRefinance: totalRefinance.value,
    },
    "customer": {
      name: customerName.value,
      phone: customerPhone.value,
      carLicense: carLicense.value
    }
  };
  return JSON.stringify(data, null, 2);
};

const logData = () => {
  const jsonData = getDataToJson();
  if (customerName.value === "" || customerPhone.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'กรุณากรอกข้อมูลลูกค้า',
      text: 'กรุณากรอกชื่อ-นามสกุล และเบอร์โทรศัพท์',
    });
    return;
  } else if(carLicense.value == null || carLicense.value == "") {
    Swal.fire({
      icon: 'error',
      title: 'กรุณากรอกข้อมูลเลขทะเบียนรถยนต์',
      text: 'กรุณากรอกข้อมูลเลขทะเบียนรถยนต์',
    });
    return;
  } else {

    Swal.fire({
      title: 'คุณต้องการบันทึก และสร้างใบเสนอราคาใช่หรือไม่',
      showCancelButton: true,
      confirmButtonText: 'ดำเนินการ',
      cancelButtonText: `ยกเลิก`,
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        
        interface ResponseData {
          id: string;
        }
        
        axios.post<ResponseData>(`${public_host}:2083/calFinData`, {
            "name": customerName.value,
            "phone": customerPhone.value,
            "car_id": carLicense.value,
            "firstCalData": getDataToJson(),
            "secondCalData": {},
            "salesOwner": "nattanon_kh"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {

          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: 'ข้อมูลของคุณได้ถูกบันทึกและสร้างใบเสนอราคาเรียบร้อยแล้ว',
          }).then(() => {
            window.location.href = `${public_host}/download/` + response.data.id;
          });

        }).catch((error) => {
          if (error.response) {

            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: `Error ${error.response.status}: ${error.response.data.message || 'Internal Server Error'}`,
            });

          } else if (error.request) {

            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'No response received from server.',
            });

          } else {

            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error.message,
            });

          }
        });

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
      return result;
    });
      
  }
};

// Removed duplicate declaration of logData
import { ref, onMounted, computed } from "vue";
import axios from "axios";
const priceList = ref<any>([]);
const titleList = ref<any>([]);
const yearList = ref<any>([]);
const genList = ref<any>([]);
const dataBrand = ref("");
const dataTitle = ref("");
const dataGen = ref("");
const dataPrice = ref("");
const nameGen = ref("");
const limit = ref(100);
const is_loan = ref(0);
const am_loan = ref(false);
const customerName = ref("");
const customerPhone = ref("");

//ยอดสินเชื่อใหม่ตาม %
const showLimitPrice = ref(0);
const bookingFee = ref(0);
const bookingFnFee = ref(2000);
const processFee = ref(10000);
const checkFee = ref(0);
const transfer = ref(0);
const signContractFee = ref(2000);
const tax = ref(0);

// ตำนวน พ.ร.บ.
const carType = ref(0);
const insureCar = ref(0);
const insureLife = ref(0);
const checkLoanFee = ref(0);
const calLoanAll = computed(() => {
  return (
    Number(is_loan.value) +
    Number(oldTransferFn.value) +
    Number(tax.value) +
    Number(carType.value) +
    Number(checkFee.value) +
    Number(otherFee.value) +
    Number(advanceOldAccount.value) +
    Number(newRegisGov.value) +
    Number(checkLoanFee.value)
  );
});

const calLoan = computed(() => {
  if (!am_loan.value) {
    return 0;
  }
  return Math.max(Number(calLoanAll.value) * 0.03, 5000);
});

const advanceOldAccount = ref(1000);
const oldTransferFn = ref(2000);
const otherFee = ref(0);

//เพื่มเติม
const newOtherFee = ref(0);

const newCarType = ref(0);
const carTypeCost = ref(0);
const newTax = ref(0);

const loanRate36 = ref(5.5);
const loanRate48 = ref(5.5);
const loanRate60 = ref(5.5);
const loanRate72 = ref(5.5);
const loanRate84 = ref(5.5);

const carLicense = ref();

const regisGov = ref(0);
const newRegisGov = ref(0);

let payMonh36 = computed(
  () =>
    ((showLimitPrice.value * (loanRate36.value / 100) * 3 +
      showLimitPrice.value) * 1.07) /
    36
);
let payMonth48 = computed(
  () =>
    ((showLimitPrice.value * (loanRate48.value / 100) * 4 +
      showLimitPrice.value) * 1.07) /
    48
);
let payMonth60 = computed(
  () =>
    ((showLimitPrice.value * (loanRate60.value / 100) * 5 +
      showLimitPrice.value) * 1.07) /
    60
);
let payMonth72 = computed(
  () =>
    ((showLimitPrice.value * (loanRate72.value / 100) * 6 +
      showLimitPrice.value) * 1.07) /
    72
);
let payMonth84 = computed(
  () =>
    ((showLimitPrice.value * (loanRate84.value / 100) * 7 +
      showLimitPrice.value) * 1.07) /
    84
);

//costFn
const allCostOldFn = computed(() => {
  return Number(calLoanAll.value) + Number(calLoan.value);
});

//costFnTotal
const newTotalRef = computed(() => {
  return (
    Number(bookingFee.value) +
    Number(processFee.value) +
    Number(transfer.value) +
    Number(newTax.value) +
    Number(newCarType.value) +
    Number(insureCar.value) +
    Number(insureLife.value) +
    Number(newOtherFee.value) +
    Number(regisGov.value) +
    Number(signContractFee.value)
  );
});

//Cost Cal
const cost = computed(() => {
  let totalCost =
    processFee.value +
    checkFee.value +
    transfer.value +
    signContractFee.value +
    Number(tax.value) +
    carType.value +
    Number(insureCar.value) +
    Number(insureLife.value) +
    Number(otherFee.value);

  if (am_loan.value === true) {
    totalCost += calLoan.value + oldTransferFn.value + advanceOldAccount.value;
  }

  return totalCost;
});

const totalRefinance = computed(() => {
  const total =
  Number(showLimitPrice.value) -
    Number(newTotalRef.value) -
    Number(allCostOldFn.value) +
    Number(bookingFee.value);
  return total <= 0 ? 0 : total;
});

const public_host = process.env.PUBLIC_HOST;

onMounted(async () => {
  try {
    const response = await axios.get(`${public_host}:2083/priceCarsBrand/1`);
    priceList.value = Array.isArray(response.data) ? response.data : [];
    titleList.value = [];
    yearList.value = [];
    genList.value = [];
    dataPrice.value = "0";
  } catch (error) {
    console.log(error);
  }
});

const getTitle = async (event) => {
  dataBrand.value = event.target.value;
  try {
    const response = await axios.get(
      `${public_host}:2083/priceCarsBrand/1/${dataBrand.value}`
    );
    titleList.value = Array.isArray(response.data) ? response.data : [];
    yearList.value = [];
    genList.value = [];
    dataPrice.value = "0";
    const titleElement = document.getElementById("title");
    if (titleElement) {
      titleElement.classList.remove("hidden");
    }

    showLimitPrice.value = 0;
    (document.getElementById("limit-loan") as HTMLInputElement).value = "100";
  } catch (error) {
    console.log(error);
  }
};

const getYear = async (event) => {
  dataTitle.value = event.target.value;
  try {
    const response = await axios.get(
      `${public_host}:2083/priceCarsBrand/1/${dataBrand.value}/${dataTitle.value}`
    );
    yearList.value = Array.isArray(response.data) ? response.data : [];
    genList.value = [];
    dataPrice.value = "0";
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.classList.remove("hidden");
    }

    showLimitPrice.value = 0;
    (document.getElementById("limit-loan") as HTMLInputElement).value = "100";
  } catch (error) {
    console.log(error);
  }
};

const getGen = async (event) => {
  dataGen.value = event.target.value;
  try {
    if (dataGen.value === "0") {
      genList.value = [];
    } else {
      const response = await axios.get(
        `${public_host}:2083/priceCarsBrand/1/${dataBrand.value}/${dataTitle.value}/${dataGen.value}`
      );
      genList.value = Array.isArray(response.data) ? response.data : [];
    }
    const genElement = document.getElementById("gen");
    if (genElement) {
      genElement.classList.remove("hidden");
    }

    showLimitPrice.value = 0;
    (document.getElementById("limit-loan") as HTMLInputElement).value = "100";
  } catch (error) {
    console.log(error);
  }
  dataPrice.value = "0";
};

const getPrice = async (event) => {
  dataPrice.value = event.target.value;
  try {
    const response = await axios.get(
      `${public_host}:2083/priceCarsBrand/1/${dataBrand.value}/${dataTitle.value}/${dataGen.value}/${dataPrice.value}`
    );
    const totalPrice = Number(response.data);
    dataPrice.value = totalPrice.toString();
    const priceElement = document.getElementById("price");
    if (priceElement) {
      priceElement.classList.remove("hidden");
    }

    const loanStatusElement = document.getElementById("loanStatus");
    if (loanStatusElement) {
      loanStatusElement.classList.remove("hidden");
    }
    showLimitPrice.value = totalPrice;

    const selectedOption = event.target.options[event.target.selectedIndex].text;
    nameGen.value = selectedOption;

    transfer.value = totalPrice / 100 + 3000;
    // const govFeeElement = document.getElementById("govFee");
    // if (govFeeElement) {
    //   govFeeElement.classList.remove("hidden");
    // }

  } catch (error) {
    console.log(error);
  }
};

const haveLoan = () => {
  const loanElement = document.getElementById("loan");
  if (loanElement) loanElement.classList.remove("hidden");

  const haveLoanElement = document.getElementById("haveLoan");
  if (haveLoanElement) haveLoanElement.classList.remove("hidden");

  const noLoanElement = document.getElementById("noLoan");
  if (noLoanElement) noLoanElement.classList.remove("hidden");
  am_loan.value = true;
  const step2Element = document.getElementById("step2");
  if (step2Element) {
    step2Element.classList.remove("hidden");
  }
  checkFee.value = 0;
  carType.value = carTypeCost.value;
  newCarType.value = 0;
};

const noLoan = () => {
  const loanElement = document.getElementById("loan");
  if (loanElement) loanElement.classList.add("hidden");

  const haveLoanElement = document.getElementById("haveLoan");
  if (haveLoanElement) haveLoanElement.classList.add("hidden");

  const noLoanElement = document.getElementById("noLoan");
  if (noLoanElement) noLoanElement.classList.remove("hidden");
  am_loan.value = false;
  const step2Element = document.getElementById("step2");
  if (step2Element) {
    step2Element.classList.remove("hidden");
  }
  checkFee.value = 0;
  is_loan.value = 0;
  carType.value = 0;
  newCarType.value = carTypeCost.value;
  // Reset allCostOldFn related values to 0
  oldTransferFn.value = 0;
  advanceOldAccount.value = 0;
  otherFee.value = 0;
  newRegisGov.value = 0;
  checkLoanFee.value = 0;
};

const limitLoan = () => {
  const limitValue = (document.getElementById("limit-loan") as HTMLInputElement)
    .value;
  limit.value = Number(limitValue);
  showLimitPrice.value = (Number(dataPrice.value) * Number(limit.value)) / 100;
};

</script>