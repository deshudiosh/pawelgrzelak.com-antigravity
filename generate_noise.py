import random
from PIL import Image

def create_noise_texture(width=200, height=200, opacity=30):
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            if random.random() > 0.9: # 10% chance of a dot
                # Dark grey/brown dot
                alpha = random.randint(10, opacity)
                pixels[x, y] = (50, 40, 30, alpha)
                
    img.save('assets/noise.png')
    print("Noise texture created at assets/noise.png")

if __name__ == "__main__":
    create_noise_texture()
