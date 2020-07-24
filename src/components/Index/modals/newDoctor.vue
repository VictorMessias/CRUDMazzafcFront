<template>
<div>
  <b-modal id="doctor-new" size="md" title="Criar médico">

    <b-row>

      <b-col cols="12">
          <b-form novalidate>

            <b-form-group label="Nome"
              label-for="name">
              <b-form-input id="name" name="name" placeholder="Exemplo de nome" v-model="name" type="text" v-validate="'required'"></b-form-input>
              <b-form-invalid-feedback :state="submit ? !errors.has('name') : null">
                  Por favor, insira o nome.
              </b-form-invalid-feedback>
            </b-form-group>


            <b-form-group label="E-mail" label-for="email">
                <b-form-input id="email" placeholder="exemplo@exemplo.com" name="email" v-validate="'required|email'" v-model="email" type="text"></b-form-input>
                <b-form-invalid-feedback :state="submit ? !errors.has('email') : null">
                  Por favor, insira o e-mail.
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="CRM" label-for="crm">
                <b-form-input id="crm" placeholder="000000" name="crm" v-validate="'required'" v-model="crm" v-mask="'##########'" type="text"></b-form-input>
                <b-form-invalid-feedback :state="submit ? !errors.has('crm') : null">
                    Por favor, insira o CRM.
                </b-form-invalid-feedback>
            </b-form-group>

            
          </b-form>
      </b-col>


    </b-row>


    <template v-slot:modal-footer="{ cancel }">
      <b-button :disabled="loading" class="btn-gray" @click="cancel()">
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
import DoctorService from "@/services/resources/DoctorService";

const service = DoctorService.build();

export default {
  data(){
    return{
      name: '',
      email: '',
      crm: '',
      loading: false,
      submit: false
    }
  },
  methods:{
    onSubmit(){ 
      this.submit = true;

      this.$validator.validateAll().then((result) => {
          
          if(result){
            this.loading = true;

            let data = {
                name: this.name,
                email: this.email,
                crm: this.crm
            };
            
            service
              .create(data)
              .then(response => {
                this.loading = false;
                this.submit = false;
                
                this.name = '';
                this.email = '';
                this.crm = '';
                this.$bvModal.hide('doctor-new');
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