# OST Project2 Chess
## Open Source Chess App, Join and play for free
> version 1.0

# What To Expect In Futre Updates:
- Bug Reporting
- Support For Chess Clubs
- More Website Color Schemes
- More Play Peice designs
- Improved Chess AI

# Information On Testing:
> [!IMPORTANT]
> Testing works with the movement.tests.ts file, a clone of the file the app uses to find legal moves. 
> Make all edits there.
-for general testing use the last test in movement.tests.spec.ts, you will have to fill out the board object manually ( annoying ).
-after, correctly fill out the following variables:
    -let testindex="11"; ( peice location as string )
    -let peicetotest:Peice=anytest.board[11]; ( index as Number)
    -let checkpeice:Location={peice:peicetotest,index:testindex}; ( no change )
    -startboard.moveManager(checkpeice,"player2","player1"); ( player2 is the owner of the peice to test, player1 is the opponent )
> [!IMPORTANT]
> the Peice.player you are testing needs to be set to Selected!

# How To Contribute:
 play some games! if you find any bugs email your username to Kuchtagary1@gmail.com, use "Chess Bug" as subject.