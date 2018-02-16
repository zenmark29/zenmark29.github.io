import pygame

pygame.init()
gameDisplay=pygame.display.set_mode((800,600))
pygame.display.set_caption("My Game")

white=(255,255,255)
black=(0,0,0)
red=(255,0,0)
green=(0,255,0)
blue=(0,0,255)

clock = pygame.time.Clock()

gameExit = False
############################ Mark's controls START #########################
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
############################ Mark's controls END #########################
################## Game Loop ####################
while not gameExit:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            gameExit=True
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                print("hello world")

    pygame.display.update()
    gameDisplay.fill(white)
    ######################################### Mark's Code START #####################
    ######################################### Mark's Code END #####################
    clock.tick(15)
pygame.quit()
quit()