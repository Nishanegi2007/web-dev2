let form = document.querySelector('form')
            let EventDate = document.querySelector('#eventDate')
            let EventTitle = document.querySelector('#eventTitle')
            let EventCategory = document.querySelector('#eventCategory')
            let EventDescription = document.querySelector('#eventDescription')
            let alleventscontainer = document.querySelector('#all-events-container')
            let clearallevents = document.querySelector('#clear-event-btn')
            let keypressedcontainer = document.querySelector('#key-pressed-container .value')
            let keypressedinput = document.querySelector('#key-pressed-input')
            
            let addallevents = document.querySelector('#add-sample-event')


            function addEventFunction(event){
                event.preventDefault()
                
                // Clear the "No Events Yet" message only on first event
                if(alleventscontainer.innerHTML.includes('No Events Yet')){
                    alleventscontainer.innerHTML=''
                }
                
                let card = document.createElement('div')
                card.innerHTML = `<button class='delbtn'>✕</button>
                                    <h4>${EventTitle.value}</h4>
                                    <span><strong>📅 Date:</strong> ${EventDate.value}</span>
                                    <span><strong>🏷️ Category:</strong> ${EventCategory.value}</span>
                                    <p><strong>📝 Description:</strong><br>${EventDescription.value}</p>`
                card.classList.add('event-card')
                alleventscontainer.append(card);
                
                form.reset()
            }


            function clearalleventfunction(){
                alleventscontainer.innerHTML = `<div>No Events Yet</div>`

            }

            function keyDOwnFunction(event){
                keypressedinput.value = `You pressed: ${event.key}`
            }

            function cardDelelteFunction(event){
                if(!event.target.classList.contains('delbtn')) return;
                let cardEl = event.target.closest('.event-card');
                if(!cardEl) return;
                // hide card instead of removing it
                cardEl.style.display = 'none';
                // save reference to hidden card for restoration
                if(!deletedCards.includes(cardEl)) deletedCards.push(cardEl);
            }

            let originalHTML = alleventscontainer.innerHTML;
            // store deleted card nodes for restoration
            let deletedCards = [];
            function addEventAgainFunction(event){
                if(deletedCards.length === 0) return;
                deletedCards.forEach(card => card.style.display = '');
                deletedCards = [];
            }

            // attach restore listener to the restore button
            addallevents.addEventListener('click', addEventAgainFunction)
            alleventscontainer.addEventListener('click',cardDelelteFunction);
           
            document.addEventListener("keydown", keyDOwnFunction);

            form.addEventListener('submit', addEventFunction)

            clearallevents.addEventListener('click' , clearalleventfunction)