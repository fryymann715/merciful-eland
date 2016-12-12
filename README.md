# BlackJack for the Web in ReactJS

## Specs

 - ### Stack / Tech
    - ReactJS 
    - Manage state without Redux/Flux
    - No Database
    - Do not use 3rd part CSS library/framework
    
 
 - ### Players can:
    - Start a new game
    - Hit / Stay 
    - Place bet ( can not place bet larger than player's funds )
    - Quit
    
    STRETCH: double down, split, buy insurance
    
 
 - ### Table Features
    - 4 players + 1 dealer
    - 2 decks
    - players start with $100
    - min bet starts at $10 ( STRETCH: Increase min bet based on player funds )
    - deck is persistent through the rounds
    - player bet refunded on push
    - dealer hits on 17
    
 
 - ### Win / Loss Conditions:
    - Win:
       - Get blackjack
       - Get 21
       - Dealer busts
       - Have a higher hand value than dealer while still under 21
      
    - Lose:
       - Hand value exceeds 21 ( Bust )
       - Dealer gets blackjack
       - Dealer's hand value is under 21 and higher than player hand value
      
 
