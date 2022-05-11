<template>
  <div class="">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <div>
          <h2 class="text-3xl font-extrabold text-gray-900">Häufig gestellte Fragen</h2>
          <p class="mt-4 text-lg text-gray-500">
            Bitte informiere Dich zuerst hier, bevor du Deine Lehrer*in um Hilfe bittest. Kann Deine
            Frage noch immer nicht beantwortet werden, informiere Dich am besten bei Deinem
            <span class="text-htl_rot">Klassenvorstand</span> oder beim
            <span class="text-htl_rot">Abteilungsvorstand.</span>
          </p>
        </div>
        <div class="mt-12 lg:mt-0 lg:col-span-2 ml-3">
          <dl class="space-y-12">
            <div v-for="faq in faqs" :key="faq.question">
              <dt class="text-lg leading-6 font-bold text-gray-900">
                {{ faq.question }}
              </dt>
              <dd class="mt-2 text-base text-gray-600 font-medium">
                {{ faq.answer }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: 'Was geschieht, wenn es mehr Anmeldungen für das Freifach gibt, als Plätze?',
    answer:
      'Wenn es mehr Anmeldungen als Plätze gibt, entscheidet der Lehrer/ die Lehrerin welche Schüler*innen teilnehmen dürfen und welche nicht. Dies wird häufig nach dem Notendurchschnitt entschieden. ',
  },
  {
    question: 'Was ist, wenn ich draufkomme, dass mir das Freifach nicht gefällt?',
    answer: 'Ein frühzeitiges Beenden bzw. Abmelden von dem Freifach ist leider nicht möglich.',
  },
  {
    question: 'Wie ist, wenn ich eine Stunde fehle?',
    answer:
      'Wenn du bei deinem angemeldeteten Freifach fehlst, musst du ganz normal eine Entschuldigung bei deinem Klassenvorstand einreichen.',
  },
  {
    question: 'Welche Technologien verwenden für bei den Freifächern?',
    answer:
      'Für manche Freifächer werden bestimmte Technologien benötigt. Dies hängt aber immer davon ab, welches Freifach du besuchst. Prinzipell werden aber alle Technologien von der Schule bereitgestellt.',
  },
  {
    question: 'Sind Freifächer kostenlos?',
    answer:
      'Ja, Freifächer sind prinzipell kostenlos. Falls es aber doch vorkommt, dass Materialen benötigt werden, welche nicht in der Schule zu verfügen stehen und etwas kosten, wird dies vom Lehrer mitgeteilt.',
  },
  {
    question: 'Bekomme ich eine Note im Zeugnis oder in der Schulnachricht?',
    answer:
      'Ja, du bekommst nicht nur ein "Teilgenommen", sondern eine Note, deswegen herrscht auch eine Anwesenheitspflicht.',
  },
  {
    question: 'Darf ich auf meinem eigenen Notebook arbeiten? ',
    answer: 'Ja natürlich, ist sogar erwünscht :)',
  },
  {
    question: 'Wieso gibt es bei manchen Freifächern eine limitierung der Teilnehmer?',
    answer:
      'Aufgrund der PCs welche uns in der Computerräumen zu verfügung stehen bzw. wegen der Anzahl von Lizenzen welche benötigt werden.',
  },
];
</script>
