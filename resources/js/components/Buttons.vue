<template>
    <v-app id="app">
        <v-row>
            <v-col cols="12" sm="3">
                <v-btn text icon color="primary">
                    <v-icon>important_devices</v-icon>
                </v-btn>
                <div class="my-2">
                    <v-btn text small color="primary">Primary</v-btn>
                </div>
                <div class="my-2">
                    <v-btn rounded color="primary">Primary</v-btn>
                </div>
                <div class="my-2">
                    <v-btn large color="warning">Normal</v-btn>
                </div>
                <div class="my-2">
                    <v-btn large :disabled="true">Disabled</v-btn>
                </div>
                    <div class="my-2">
                    <v-btn depressed color="error">Error</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text small color="primary">Primary<v-icon right>mdi-thumb-up</v-icon></v-btn>
                </div>
                <div class="my-2">
                    <v-btn text small color="primary"><v-icon left>mdi-thumb-up</v-icon>Primary</v-btn>
                </div>
                <v-btn class="ma-2" outlined large fab color="indigo">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn text icon color="deep-orange">
                    <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
                    <v-btn class="mx-2" fab small dark color="indigo">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
                <v-btn block color="secondary" dark>Block Button</v-btn>

            </v-col>
        </v-row>
    </v-app>
</template>

<script>
    export default {
        data (){
            return{

            };
        }
    }
</script>