/*
Milestone 1
- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2
- Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
- Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3
- Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
- Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4
- Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
BONUS:

Milestone 5
- Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
- Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti
*/

const {
  createApp
} = Vue;
const dt = luxon.DateTime;
createApp({
  data() {
      return {
          //activeUser: determinare la chat attiva 
          activeUser: 0,
          //newMessage: gestisco il testo che verra inserito
          newMessage: "",
          //searchContacts: lettere che inserisco per cercare una chat
          searchContacts: "",
          contacts: [{
                  name: 'Michele',
                  avatar: '_1',
                  visible: true,
                  messages: [{
                          date: '10/01/2020 15:30:55',
                          message: 'Hai portato a spasso il cane?',
                          status: 'sent'
                      },
                      {
                          date: '10/01/2020 15:50:00',
                          message: 'Ricordati di dargli da mangiare',
                          status: 'sent'
                      },
                      {
                          date: '10/01/2020 16:15:22',
                          message: 'Tutto fatto!',
                          status: 'received'
                      }
                  ],
              },
              {
                  name: 'Fabio',
                  avatar: '_2',
                  visible: true,
                  messages: [{
                          date: '20/03/2020 16:30:00',
                          message: 'Ciao come stai?',
                          status: 'sent'
                      },
                      {
                          date: '20/03/2020 16:30:55',
                          message: 'Bene grazie! Stasera ci vediamo?',
                          status: 'received'
                      },
                      {
                          date: '20/03/2020 16:35:00',
                          message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                          status: 'received'
                      }
                  ],
              },
              {
                  name: 'Samuele',
                  avatar: '_3',
                  visible: true,
                  messages: [{
                          date: '28/03/2020 10:10:40',
                          message: 'La Marianna va in campagna',
                          status: 'received'
                      },
                      {
                          date: '28/03/2020 10:20:10',
                          message: 'Sicuro di non aver sbagliato chat?',
                          status: 'sent'
                      },
                      {
                          date: '28/03/2020 16:15:22',
                          message: 'Ah scusa!',
                          status: 'received'
                      }
                  ],
              },
              {
                  name: 'Luisa',
                  avatar: '_4',
                  visible: true,
                  messages: [{
                          date: '10/01/2020 15:30:55',
                          message: 'Lo sai che ha aperto una nuova pizzeria?',
                          status: 'sent'
                      },
                      {
                          date: '10/01/2020 15:50:00',
                          message: 'Si, ma preferirei andare al cinema',
                          status: 'received'
                      }
                  ],
              },
          ],
      };
  },
  methods: {
      active(index) {
          this.activeUser = index;
          console.log(this.activeUser)
      },
      //funzione per pushare il messaggio inserito
      sendMessage() {
          const now = dt.now().setLocale('fr').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS)
          const myMessage = {
              date: now,
              message: this.newMessage,
              status: "sent"
          };
          this.contacts[this.activeUser].messages.push(myMessage);
          this.newMessage = "";
      },
      //funzione per generare il mex di risposta
      receivedMessage() {
          const now = dt.now().setLocale('fr').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS)
          const receivedMessage = {
              date: now,
              message: "Ok",
              status: "received"
          };
          this.contacts[this.activeUser].messages.push(receivedMessage);
      },
      //funzione per far apparire il mex di risposta dopo 1 sec 
      timeout(newMessage) {
          setTimeout(newMessage, 1000);
      },


      //funzione che controlla se le lettere digitate sono comprese nei nomi degli altri contatti
      filterContacts: function(array, textSend) {
          array.forEach(user => {
              if (!user.name.toLowerCase().includes(textSend.toLowerCase())) {
                  user.visible = false;
              } else {
                  user.visible = true;
              };
          });
      },
      //funzione che mi permette di cancellare un messaggio
      deleteMessage(index) {
          this.contacts[this.activeUser].messages.splice(index, 1);
      },
    
  }
}).mount('#app');
