import pygame  # imports library with tools need to run pygame program
import random  # random direction is required
import math  # random math just in case
 
pygame.init()  # initializes pygame to start program
gameDisplay = pygame.display.set_mode((800, 600))  # sets the size of the display window
pygame.display.set_caption("PONG GAME")  # creates title      # titles the game/display
 
# Define Colors
white = (255, 255, 255)  # parameters(red value, green value, blue value)
black = (0, 0, 0)
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
#### paddle control variables
pad_y = 270
pad2_y = 270
### Ball control variables/ tails
ball_X = 390
ball_Y = 290
b_changeX = 10
#b_changeY = -10
pathX = [400, 390, 380]
pathY = [300, 270, 280]
###Scoring variables
Score1 = "0"
Score2 = "0"
font = pygame.font.SysFont("Arial", 30)
 
clock = pygame.time.Clock()  # used to set frames per second
 
 
### custom blocks
# Random direction calculator
def random_picker(whatChange):
   random_number = random.randrange(1, 10)
   if random_number % 2 == 0:
       whatChange *= -1
def collision(ballX, ballY, leftpaddle, rightpaddle) :
   global b_changeX
   if ballX == 770 :
       b_changeX = -10
   if ballX == 30 :
       b_changeX = 10
   #if ballX > 30 and ballY + 20 > leftpaddle and ball_Y > leftpaddle + 60:
       #speed *= -1
 
   #if ballX < 770 and ballY + 20 < rightpaddle and ballY < rightpaddle + 60:
       #speed *= -1
 
game = True
 
########## Game Loop ##########
while game:  # starts game loop which contains the code that runs the game
   for event in pygame.event.get():  # for loop handles all events within the game
       if event.type == pygame.QUIT:  # ends game if user closes window
           game = False
   #random_picker(b_changeX)  # Should change the direction of the ball
 
   collision(ball_X, ball_Y, pad_y, pad2_y)
 
   if ball_X < 0 or ball_X > 800 :
       ball_X = 390
       ball_Y = 290
 
   #ball_key = pygame.key.get_pressed()
 
   #if ball_key[pygame.K_SPACE] :
   #b_changeX += 10
 
   ball_X += b_changeX  # I dunno what this does
   #ball_X -= b_changeX  # I dunno what this does
   #pathX += b_changeX
 
 
 
   pathX.append(ball_X)
   pathY.append(ball_Y)
 
   key = pygame.key.get_pressed()
   if key[pygame.K_w] and pad_y > 0:
       pad_y -= 10
   if key[pygame.K_s] and pad_y < 540:
       pad_y += 10
   if key[pygame.K_UP] and pad2_y > 0:
       pad2_y -= 10
   if key[pygame.K_DOWN] and pad2_y < 540:
       pad2_y += 10
 
   pygame.display.update()  # updates the display
   gameDisplay.fill(white)  # colors the display window white
 
   ###TEXT
 
   text = font.render(Score1, False, black)
   gameDisplay.blit(text, (200, 0))
   text2 = font.render(Score1, False, black)
   gameDisplay.blit(text2, (600, 0))
 
   ###BALL STUFF
   # pygame.draw.rect(gameDisplay, black, [pathX[len(pathX)-8],pathY[len(pathY) -8], 20, 20])#3rd tail
   # pygame.draw.rect(gameDisplay, black, [pathX[len(pathX)-4],pathY[len(pathY) -4], 20, 20]) #2nd tail
   # pygame.draw.rect(gameDisplay, black, [pathX[len(pathX)-1],pathY[len(pathY) -1], 20, 20]) #1st tail
   pygame.draw.rect(gameDisplay, black, [ball_X, ball_Y, 20, 20])  # BALL
 
   pathX.pop(0)
 
   pygame.draw.rect(gameDisplay, black, [10, pad_y, 20, 60])  # location, color, x position, y position, width, height, Left Paddle
   pygame.draw.rect(gameDisplay, black, [770, pad2_y, 20, 60]) # Right Paddle
   clock.tick(30)  # sets frames per second
pygame.quit()
quit()
 
 
 
 
 
