<template>
  <v-col>
    <v-sheet elevation="10" rounded="xl">
      <v-sheet class="pa-3 primary text-center" dark rounded="t-xl">
        <h2 class="ma-auto">Select a Scale</h2>
      </v-sheet>

      <div class="pa-5">
        <v-chip-group column v-model="selected" active-class="primary--text">
          <v-chip v-for="tag in tags" :key="tag">
            <p style="font-size: 125%">{{ tag }}</p>
          </v-chip>
        </v-chip-group>
      </div>

      <v-sheet
        class="pa-3 primary text-center"
        @click="Continue()"
        v-if="selected || selected == 0"
        dark
        rounded="b-xl"
      >
        <h3 class="ma-auto">Continue</h3>
      </v-sheet>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    selected: null,
    isSelect: false,
    temp: "",
    tags: [
      "HAMILTON RATING SCALE FOR ANXIETY",
      "BECK- Anxiety inventry",
      "Childhood Autism Rating Scale",
      "The Young Mania Rating Scale (YMRS)",
      "Hamilton Rating Scale for Depression(HAM-D)",
      "IDEAS (INDIAN DISABILITY AND ASSESSMENT SCALE)",
      "Montgomery-Asberg Depression Rating Scale(MADRS)",
      "DEMENTIA SEVERITY RATING SCALE",
      "PANSS",
      "BPRS",
      "Geriatric Depression Scale",
      "Fagerstrom Nicotine Dependence Scale",
      "CAGE Questionnaire",
      "CDS- CALGARY DEPRESSION SCALE FOR SCHIZOPHERENIA",
      "NaN",
      "VANDERABIL ADHD DIAGNOSTIC PARENT RATING SCALE",
      "THE YALE-BROWN OBSESSIVE COMPULSIVE SCALE(Y-BOCS)",
      "PSYCHOTIC SYMPTOM RATING SCALES (PSYRATS)",
      "Suicidal Intent Scale",
      "MINI-MENTAL STATE EXAMINATION - Athma Version",
      "AUDIT",
      "SAPS- Scale for the assessment of positive symptoms",
      "CATATONIA RATING SCALE",
      "STANDARDIZED MINI-MENTAL STATE EXAMINATION (SMMSE)",
      "The Generalized Anxiety Disorder 7-Item Scale",
      "Kutcher Adolescent Depression Scale (11-Item)",
      "SANS- Scale for the assessment of negative symptoms",
      "BECK`S SUICIDAL IDEATION INVENTRY",
      "Hospital Anxiety and Depression Scale (HADS)",
      "Major (ICD-10) Depression Inventory",
    ],
  }),
  methods: {
    Continue: function () {
      console.log(this.tags[this.selected]);
    },
  },
};
</script>

<style scoped></style>
