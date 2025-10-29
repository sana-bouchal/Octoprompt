"""
Générateur d'icônes pour l'extension OctoPrompt
Crée des icônes PNG de différentes tailles avec un design moderne
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """Crée une icône OctoPrompt de la taille spécifiée"""
    
    # Créer une nouvelle image avec fond dégradé
    img = Image.new('RGB', (size, size), '#0c1445')
    draw = ImageDraw.Draw(img)
    
    # Dessiner un dégradé radial bleu
    for i in range(size):
        for j in range(size):
            # Distance du centre
            dx = i - size/2
            dy = j - size/2
            distance = (dx*dx + dy*dy) ** 0.5
            
            # Couleur basée sur la distance
            if distance < size/2:
                ratio = distance / (size/2)
                r = int(12 + (26-12) * ratio)
                g = int(20 + (31-20) * ratio)
                b = int(69 + (77-69) * ratio)
                img.putpixel((i, j), (r, g, b))
    
    draw = ImageDraw.Draw(img)
    
    # Dessiner un cercle de glow cyan
    glow_radius = int(size * 0.4)
    center = size // 2
    draw.ellipse(
        [(center - glow_radius, center - glow_radius),
         (center + glow_radius, center + glow_radius)],
        outline='#06b6d4',
        width=max(2, size // 64)
    )
    
    # Ajouter l'emoji octopus (approximation avec du texte)
    try:
        # Essayer d'utiliser une police système qui supporte les emojis
        emoji_size = int(size * 0.5)
        font = ImageFont.truetype("seguiemj.ttf", emoji_size)  # Windows emoji font
        
        # Mesurer et centrer le texte
        bbox = draw.textbbox((0, 0), "🐙", font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (size - text_width) // 2 - bbox[0]
        y = (size - text_height) // 2 - bbox[1]
        
        draw.text((x, y), "🐙", fill='#60a5fa', font=font)
    except Exception as e:
        print(f"Note: Impossible de charger la police emoji, utilisation d'un cercle simple ({e})")
        # Fallback: dessiner un cercle bleu simple
        circle_radius = int(size * 0.25)
        draw.ellipse(
            [(center - circle_radius, center - circle_radius),
             (center + circle_radius, center + circle_radius)],
            fill='#60a5fa'
        )
        
        # Ajouter des "tentacules" stylisés
        tentacle_length = int(size * 0.15)
        for angle in [0, 45, 90, 135, 180, 225, 270, 315]:
            import math
            rad = math.radians(angle)
            x1 = center + int(circle_radius * math.cos(rad))
            y1 = center + int(circle_radius * math.sin(rad))
            x2 = center + int((circle_radius + tentacle_length) * math.cos(rad))
            y2 = center + int((circle_radius + tentacle_length) * math.sin(rad))
            draw.line([(x1, y1), (x2, y2)], fill='#06b6d4', width=max(2, size // 32))
    
    # Ajouter un effet de bordure arrondie
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = size // 5
    mask_draw.rounded_rectangle([(0, 0), (size, size)], corner_radius, fill=255)
    
    # Appliquer le masque
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img, (0, 0))
    output.putalpha(mask)
    
    # Sauvegarder
    output.save(filename, 'PNG')
    print(f"✅ Icône créée: {filename} ({size}x{size})")

def main():
    """Génère toutes les icônes nécessaires"""
    
    # Créer le dossier icons s'il n'existe pas
    icons_dir = os.path.join(os.path.dirname(__file__), 'icons')
    os.makedirs(icons_dir, exist_ok=True)
    
    # Tailles d'icônes requises par Chrome/Firefox
    sizes = [16, 32, 48, 128]
    
    print("🐙 Génération des icônes OctoPrompt...\n")
    
    for size in sizes:
        filename = os.path.join(icons_dir, f'icon{size}.png')
        create_icon(size, filename)
    
    print("\n✨ Toutes les icônes ont été générées avec succès!")
    print(f"📁 Dossier: {icons_dir}")

if __name__ == '__main__':
    main()
