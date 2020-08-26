<template>
  <div class="modal fade" id="LoginOrRegister" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-center" id="exampleModalLabel">{{head}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <FormLogin v-if="event"/>
       <FormRegister v-if="!event"/>
      </div>      
    </div>
  </div>
</div>
</template>

<script>
import FormLogin from './FormLogin'
import FormRegister from './FormRegister'
export default {
name:'Modal',
props:['event'],
components:{
  FormLogin,
  FormRegister
},
computed:{
  head(){
    return this.event ?'Login':'Register'
  }
}
}
</script>

<style>

</style>