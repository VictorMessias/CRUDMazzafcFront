<template>
  <b-container class="gray p-2" >

<b-tabs nav-class="tab-header" active-nav-item-class="tab-header-item-active" :no-nav-style="true" @activate-tab="tabSelect">
  <b-tab title="Usuários" active >
    <b-container>
      <b-row class="text-right wrapper">
        <b-col>
          <b-button type="button" variant="info" v-b-modal.user-new>Criar</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <!-- HEADER -->
      <b-row class="table-header mt-1">
        <b-col cols="4">
          Nome 
        </b-col>

        <b-col cols="4" class="text-center">
          E-mail
        </b-col>

        <b-col cols="4" class="text-center">
          Ações
        </b-col>

      </b-row>
      <!-- END HEADER -->

      <!-- BODY -->
      <template  v-if="users.length > 0 && !loading">
        <b-row class="table-body" v-for="item in users" :key="item.id">
          <b-col cols="4">
            <div class="title"> {{ item.name }}</div>
          </b-col>

          <b-col cols="4" class="text-center">
            {{ item.email }}
          </b-col>

          <b-col cols="4" class="text-center btn">
            <div @click="removeUser(item.id)" class="text-danger">
              <font-awesome-icon icon="times" />
            </div>
          </b-col>

        </b-row>
      </template>

      <b-row v-if="users.length == 0 && loading" class="py-5 my-5 justify-content-center align-items-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
      </b-row>

      <b-row v-if="!loading && users.length == 0" class="table-body justify-content-center">
        <b-alert show>Nenhum usuário encontrado.</b-alert>
      </b-row>

      <!-- END BODY -->
    </b-container>
  </b-tab>

  <!-- Doctors -->
   <b-tab title="Médicos" >
    <b-container>
      <b-row class="text-right wrapper">
        <b-col>
          <b-button type="button" variant="info" v-b-modal.doctor-new>Criar</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <!-- HEADER -->
      <b-row class="table-header mt-1">
        <b-col cols="3">
          Nome 
        </b-col>

        <b-col cols="3" class="text-center">
          E-mail
        </b-col>

        <b-col cols="3" class="text-center">
          CRM
        </b-col>

        <b-col cols="3" class="text-center">
          Ações
        </b-col>

      </b-row>
      <!-- END HEADER -->

      <!-- BODY -->
      <template  v-if="doctors.length > 0 && !loading">
        <b-row class="table-body" v-for="item in doctors" :key="item.id">
          <b-col cols="3">
            <div class="title"> {{ item.name }}</div>
          </b-col>

          <b-col cols="3" class="text-center">
            {{ item.email }}
          </b-col>

          <b-col cols="3" class="text-center">
            {{ item.crm }}
          </b-col>

          <b-col cols="3" class="text-center btn">
            <div @click="removeDoctor(item.id)" class="text-danger">
              <font-awesome-icon icon="times" />
            </div>
          </b-col>

        </b-row>
      </template>

      <b-row v-if="doctors.length == 0 && loading" class="py-5 my-5 justify-content-center align-items-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
      </b-row>

      <b-row v-if="!loading && doctors.length == 0" class="table-body justify-content-center">
        <b-alert show>Nenhum médico encontrado.</b-alert>
      </b-row>

      <!-- END BODY -->
    </b-container>
  </b-tab>

  <!-- Patients -->
   <b-tab title="Pacientes" >
    <b-container>
      <b-row class="text-right wrapper">
        <b-col>
          <b-button type="button" variant="info" v-b-modal.patient-new>Criar</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <!-- HEADER -->
      <b-row class="table-header mt-1">
        <b-col cols="4">
          Nome 
        </b-col>

        <b-col cols="4" class="text-center">
          E-mail
        </b-col>

        <b-col cols="4" class="text-center">
          Ações
        </b-col>

      </b-row>
      <!-- END HEADER -->

      <!-- BODY -->
      <template  v-if="patients.length > 0 && !loading">
        <b-row class="table-body" v-for="item in patients" :key="item.id">
          <b-col cols="4">
            <div class="title"> {{ item.name }}</div>
          </b-col>

          <b-col cols="4" class="text-center">
            {{ item.email }}
          </b-col>

          <b-col cols="4" class="text-center btn">
            <div @click="removePatient(item.id)" class="text-danger">
              <font-awesome-icon icon="times" />
            </div>
          </b-col>

        </b-row>
      </template>

      <b-row v-if="patients.length == 0 && loading" class="py-5 my-5 justify-content-center align-items-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
      </b-row>

      <b-row v-if="!loading && patients.length == 0" class="table-body justify-content-center">
        <b-alert show>Nenhum paciente encontrado.</b-alert>
      </b-row>

      <!-- END BODY -->
    </b-container>
  </b-tab>

  <!-- Agenda -->
   <b-tab title="Agenda" >
    <b-container>
      <b-row class="text-right wrapper">
        <b-col>
          <b-button type="button" variant="info" v-b-modal.agenda-new @click="openAgenda">Criar</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <!-- HEADER -->
      <b-row class="table-header mt-1">
        <b-col cols="3">
          Médico 
        </b-col>

        <b-col cols="3" class="text-center">
          Paciente
        </b-col>

        <b-col cols="3" class="text-center">
          Data
        </b-col>

        <b-col cols="3" class="text-center">
          Ações
        </b-col>

      </b-row>
      <!-- END HEADER -->

      <!-- BODY -->
      <template  v-if="agenda.length > 0 && !loading">
        <b-row class="table-body" v-for="item in agenda" :key="item.id">
          <b-col cols="3">
            <div class="title"> {{ item.doctor.name }}</div>
          </b-col>

          <b-col cols="3" class="text-center">
            {{ item.patient.name }}
          </b-col>

          <b-col cols="3" class="text-center">
            {{ item.date }}
          </b-col>

          <b-col cols="3" class="text-center btn">
            <div @click="removeAgenda(item.id)" class="text-danger">
              <font-awesome-icon icon="times" />
            </div>
          </b-col>


        </b-row>
      </template>

      <b-row v-if="agenda.length == 0 && loading" class="py-5 my-5 justify-content-center align-items-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
      </b-row>

      <b-row v-if="!loading && agenda.length == 0" class="table-body justify-content-center">
        <b-alert show>Nenhuma agenda encontrada.</b-alert>
      </b-row>

      <!-- END BODY -->
    </b-container>
  </b-tab>

</b-tabs>

  <!-- Modals -->
  <new-user @close="fetchUsers" />
  <new-doctor @close="fetchDoctors" />
  <new-patient @close="fetchPatients" />
  <new-agenda @close="closeAgenda" :state="agenda_is_open" />

  </b-container>
</template>
<script>
import NewUser from './modals/newUser';
import NewDoctor from './modals/newDoctor';
import NewPatient from './modals/newPatient';
import NewAgenda from './modals/newAgenda';
import UserService from "@/services/resources/UserService";
import DoctorService from "@/services/resources/DoctorService";
import PatientService from "@/services/resources/PatientService";
import AgendaService from "@/services/resources/AgendaService";

const serviceUser = UserService.build();
const serviceDoctor = DoctorService.build();
const servicePatient = PatientService.build();
const serviceAgenda = AgendaService.build();

export default {
  components:{
    NewUser,
    NewDoctor,
    NewPatient,
    NewAgenda
  },
  data () {
    return {
      loading: true,
      users: [],
      doctors: [],
      patients: [],
      agenda: [],
      agenda_is_open: false
    }
  },
  methods: {
    tabSelect(indexTab){
      if(indexTab == 0){
        this.fetchUsers();
      }else if(indexTab == 1){
        this.fetchDoctors();
      }else if(indexTab == 2){
        this.fetchPatients();
      }else if(indexTab == 3){
        this.fetchAgenda();
      }
    },
    openAgenda(){
      this.agenda_is_open = true;
    },
    closeAgenda(){
      this.agenda_is_open = false;
      this.fetchAgenda();
    },
    removeUser(id){

      let data = {
        id: id
      };

      serviceUser
      .destroy(data)
      .then(response => {
        this.fetchUsers();
      })
      .catch(err => {
      });

    },
    removeDoctor(id){

      let data = {
        id: id
      };

      serviceDoctor
      .destroy(data)
      .then(response => {
        this.fetchDoctors();
      })
      .catch(err => {
        this.$bvToast.toast('Não é possível excluir este médico! Ele está vinculado a uma agenda', {
            title: 'Médico',
            variant: 'danger',
            autoHideDelay: 5000,
            appendToast: true
          });
      });

    },
    removePatient(id){

      let data = {
        id: id
      };

      servicePatient
      .destroy(data)
      .then(response => {
        this.fetchPatients();
      })
      .catch(err => {
        this.$bvToast.toast('Não é possível excluir este paciente! Ele está vinculado a uma agenda', {
            title: 'Paciente',
            variant: 'danger',
            autoHideDelay: 5000,
            appendToast: true
          });
      });
    },
    removeAgenda(id){

      let data = {
        id: id
      };

      serviceAgenda
      .destroy(data)
      .then(response => {
        this.fetchAgenda();
      })
      .catch(err => {
      });

    },
    fetchUsers(){
      this.loading = true;

      serviceUser
      .search()
      .then(response => {
        this.users = response;    
        this.loading = false;      
      })
      .catch(err => {
      });

    },
    fetchDoctors(){
      this.loading = true;

      serviceDoctor
      .search()
      .then(response => {
        this.doctors = response;    
        this.loading = false;      
      })
      .catch(err => {
      });

    },
    fetchPatients(){
      this.loading = true;

      servicePatient
      .search()
      .then(response => {
        this.patients = response;    
        this.loading = false;      
      })
      .catch(err => {
      });

    },
    fetchAgenda(){
      this.loading = true;

      serviceAgenda
      .search()
      .then(response => {
        this.agenda = response;    
        this.loading = false;      
      })
      .catch(err => {
      });

    },
  },
  mounted(){
    this.fetchUsers();
  }

}
</script>

<style lang="scss">
@import '../../assets/scss/variables.scss';

.wrapper{
  background: #fff;
  padding: 10px;
  border: 1px #ddd solid;
  border-radius: 5px;
}

.tab-header{
  background: #fff;
  padding: 10px;
  border: 1px #ddd solid;
  border-radius: 5px;

  .nav-item a{
    color: #78909C;
    font-weight: 500;
    font-size: 15px;
  }
}
.tab-header-item-active{
  color: $base-color !important;
  border-bottom: 3px $base-color solid;
}

.table-header{
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;
  color: #888;
  background: #fff; 
  border-bottom: 1px #ddd solid;
}

.table-body{
  padding: 10px 0;
  background: #fff;
  margin-bottom: 5px;
  border-radius: 5px;
  color: #455A64;

  .title{
    font-size: 1.1em;
    font-weight: bold;
  }


  .action{
    font-size: 22px;
    cursor: pointer;
  }
}


.wrapper-box{
  background: #fff;
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 10px; 

  input{
    border: none;
    outline: none;
  }

}


</style>