<template>
<div>
  <b-modal id="agenda-new" size="md" title="Criar agenda">

    <b-row>

      <b-col cols="12">
          <b-form novalidate>

            <b-row>
              
              <b-col cols="12" md="6">
                 <b-form-group label="Médico"
                  label-for="doctor">
                  <b-form-select id="doctor" name="doctor" v-model="doctor" v-validate="'required'" :options="doctors"></b-form-select>
                  <b-form-invalid-feedback :state="!errors.has('doctor')">
                      Por favor, selecione o médico.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6">

                 <b-form-group label="Paciente"
                  label-for="patient">
                  <b-form-select id="patient" name="patient" v-model="patient" v-validate="'required'" :options="patients"></b-form-select>
                  <b-form-invalid-feedback :state="!errors.has('patient')">
                      Por favor, selecione o paciente.
                  </b-form-invalid-feedback>
                </b-form-group>

              </b-col>



            </b-row>

            <b-form-group label="Data"
              label-for="date">
              <b-form-input id="date" name="date" v-model="date" type="date" v-validate="'required'"></b-form-input>
              <b-form-invalid-feedback :state="submit ? !errors.has('date') : null">
                  Por favor, insira a data.
              </b-form-invalid-feedback>
            </b-form-group>

            
          </b-form>
      </b-col>


    </b-row>


    <template v-slot:modal-footer="">
      <b-button :disabled="loading" class="btn-gray" @click="close()">
        Cancelar
      </b-button>
        <b-overlay
          :show="loading"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block"
        >
          <button class="btn-green" @click="onSubmit">
            Criar
          </button>
        </b-overlay>
    </template>

  </b-modal>

  </div>
</template>
<script>
import PatientService from "@/services/resources/PatientService";
import DoctorService from "@/services/resources/DoctorService";
import AgendaService from "@/services/resources/AgendaService";

const servicePatient = PatientService.build();
const serviceDoctor = DoctorService.build();
const serviceAgenda = AgendaService.build();

export default {
  props:{
    state:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      doctor: '',
      patient: '',
      date: '',
      doctors: [],
      patients: [],
      loading: false,
      submit: false
    }
  },
  watch:{
    state(newValue){
      if(newValue){
        this.fetchPatients();
        this.fetchDoctors();
      }
    }
  },
  methods:{
    close(){
      this.$emit('close');
      this.$bvModal.hide('agenda-new');
    },
    fetchPatients(){ 
      this.patients = [
          { value: '', text: 'Selecione um paciente'}
      ];
      
      servicePatient
        .search()
        .then(response => {
          
          response.forEach(element => {
            this.patients.push({ value: element.id, text: element.name });
          });
          
        })
        .catch(err => {
        });
    },
    fetchDoctors(){ 
      this.doctors = [
          { value: '', text: 'Selecione um médico'}
      ];
      
      serviceDoctor
        .search()
        .then(response => {
          
          response.forEach(element => {
            this.doctors.push({ value: element.id, text: element.name });
          });
          
        })
        .catch(err => {
        });
    },
    onSubmit(){ 
      this.submit = true;

      this.$validator.validateAll().then((result) => {
          
          if(result){
            this.loading = true;

            let data = {
                doctor_id: this.doctor,
                patient_id: this.patient,
                date: this.date
            };
            
            serviceAgenda
              .create(data)
              .then(response => {
                this.loading = false;
                this.submit = false;
                
                this.doctor = '';
                this.patient = '';
                this.date = '';
                this.$bvModal.hide('agenda-new');
                this.$emit('close');
              })
              .catch(err => {
                this.loading = false;
                this.submit = false;
              });
          }

      });
    },
  }
    
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variables.scss';

.btn-green{
  display: inline-block;
  border-radius: 5px;
  padding: 7px 20px;
  border: 1px $base-color solid;
  width: auto;
  color: #fff;
  background: $base-color;
  cursor: pointer;

  &:hover{
    background: #fff;
    color: $base-color;
    border: 1px $base-color solid;
  }
}


</style>