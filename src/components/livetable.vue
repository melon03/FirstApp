<template>
    <div class="table">
        <table id="myTable" class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Company</th>
                    <th scope="col">Ticker</th>
                    <th scope="col">Last</th>
                    <th scope="col">Volume</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tableData" :key="index">
                   <td>{{item.title}}</td>
                   <td>{{item.company}}</td>
                   <td>{{item.ticker}}</td>
                   <td>{{item.last}}</td>
                   <td>{{item.volume}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import  {StreamDataIo} from 'streamdataio-js-sdk'
import * as jsonpatch from 'fast-json-patch'

export default {

   name: 'stockmarket',

   data() {

       return {

           streamData: null,

           tableData: []

       }

   },
   methods: {
       fun(){

       }
   },

   created: function () {

       this.streamData =

           StreamDataIo.createEventSource(

               'http://stockmarket.streamdata.io/v2/prices',

               'ZTIyZGQ5ZGEtYWY3NC00MzQwLThhZjgtYzVjZDYwODk4YjM0',

               []);



       this.streamData.onData(data => {

           // initialize your data with the initial snapshot

           console.log('Received data');

           this.tableData = data;

           console.table(this.tableData);

           

       }, this).onPatch(patch => {

           // update the data with the provided patch

           console.log('received patch %o', patch);

           jsonpatch.applyPatch(this.tableData, patch);

           console.table(this.tableData);

           

       }, this).onError(error => {

           // do whatever you need in case of error

           console.log('error: %o', error);

           

      },this).onOpen(() => {

         this.isConnected = true;

         // you can also add custom behavior when the stream is opened

         console.log('open');

       }, this);



       this.streamData.open();

   },

   destroyed: function () {

       this.streamData.close();

   }



}




</script>