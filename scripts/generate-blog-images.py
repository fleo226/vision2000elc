"""
Génère les illustrations vectorielles pour le blog de VISION 2000 ELC
Style: flat design moderne, palette exacte du site, sans texte bizarre
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, Circle, FancyArrowPatch, Rectangle, Polygon, Wedge
import matplotlib.font_manager as fm
import numpy as np

# Polices (Noto Sans SC a un nom variable)
plt.rcParams['font.sans-serif'] = ['Noto Sans SC', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

# Palette exacte du site
NAVY = "#0B1F3A"
NAVY_SOFT = "#1A3458"
CREAM = "#FAF7F2"
CREAM_WARM = "#F4EDE2"
ORANGE = "#F97316"
ORANGE_DEEP = "#EA580C"
CRIMSON = "#DC2626"
EMERALD = "#10B981"
GOLD = "#F59E0B"
WHITE = "#FFFFFF"

OUTPUT_DIR = "/home/z/my-project/public"

def new_fig(w=12, h=6.3):
    """Crée une figure aux dimensions d'une image de blog (1200x630)"""
    fig, ax = plt.subplots(figsize=(w, h), dpi=100, constrained_layout=False)
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 6.3)
    ax.set_aspect('equal')
    ax.axis('off')
    fig.patch.set_facecolor(CREAM)
    ax.set_facecolor(CREAM)
    return fig, ax

def save(fig, name):
    fig.savefig(f"{OUTPUT_DIR}/{name}", dpi=100, facecolor=CREAM, edgecolor='none', bbox_inches='tight', pad_inches=0)
    plt.close(fig)
    print(f"✓ {name} généré")

def add_bg_pattern(ax):
    """Ajoute un motif de points subtil en fond"""
    for x in np.arange(0, 12, 0.6):
        for y in np.arange(0, 6.3, 0.6):
            ax.add_patch(Circle((x, y), 0.025, color=NAVY, alpha=0.06, zorder=0))

# ============================================================
# BLOG 1 : "Pourquoi apprendre l'anglais en 2026 ?"
# Métaphore : porte ouverte sur le monde
# ============================================================
def blog_1():
    fig, ax = new_fig()
    add_bg_pattern(ax)

    # Fond dégradé gauche (zone "avant la porte")
    ax.add_patch(Rectangle((0, 0), 4, 6.3, color=CREAM_WARM, zorder=0))

    # Porte (rectangle ouvert)
    door_x, door_y = 4, 0.8
    door_w, door_h = 1.2, 4.7
    # Cadre porte
    ax.add_patch(FancyBboxPatch((door_x - 0.15, door_y - 0.15), door_w + 0.3, door_h + 0.3,
                                 boxstyle="round,pad=0.02", facecolor=NAVY, edgecolor='none', zorder=2))
    # Ouverture (ce qu'on voit à travers)
    ax.add_patch(Rectangle((door_x, door_y), door_w, door_h, color=EMERALD, alpha=0.15, zorder=2))

    # Derrière la porte : monde (buildings, drapeaux, avion)
    # Buildings stylisés
    for i, (bx, bw, bh) in enumerate([(5.6, 0.5, 2.5), (6.2, 0.6, 3.2), (6.9, 0.45, 2.0), (7.45, 0.55, 2.8), (8.1, 0.4, 1.8)]):
        ax.add_patch(Rectangle((bx, 1), bw, bh, color=NAVY_SOFT, alpha=0.5, zorder=1))
        # Fenêtres
        for wy in np.arange(1.3, 1 + bh - 0.3, 0.35):
            for wx in np.arange(bx + 0.1, bx + bw - 0.1, 0.18):
                ax.add_patch(Rectangle((wx, wy), 0.08, 0.12, color=GOLD, alpha=0.7, zorder=1))

    # Soleil/étoile
    ax.add_patch(Circle((9.5, 4.8), 0.4, color=GOLD, alpha=0.8, zorder=1))
    for angle in range(0, 360, 45):
        rad = np.radians(angle)
        ax.plot([9.5 + 0.5*np.cos(rad), 9.5 + 0.9*np.cos(rad)],
                [4.8 + 0.5*np.sin(rad), 4.8 + 0.9*np.sin(rad)], color=GOLD, alpha=0.6, lw=3, zorder=1)

    # Avion stylisé (flèche courbe)
    arrow = FancyArrowPatch((10.5, 2.5), (8, 1.5), arrowstyle='->', mutation_scale=25,
                             color=ORANGE, lw=3, connectionstyle="arc3,rad=0.3", zorder=3)
    ax.add_patch(arrow)

    # Devant la porte : livres d'anglais empilés
    book_colors = [ORANGE, EMERALD, NAVY, GOLD]
    for i, c in enumerate(book_colors):
        ax.add_patch(FancyBboxPatch((1, 0.5 + i*0.35), 2.2, 0.3,
                                     boxstyle="round,pad=0.02", facecolor=c, edgecolor='none', zorder=3))
        # Titre livre (ligne)
        ax.add_patch(Rectangle((1.3, 0.62 + i*0.35), 1.4, 0.06, color=WHITE, alpha=0.6, zorder=4))

    # Globe décoratif en haut à gauche
    ax.add_patch(Circle((1.8, 5), 0.55, color=NAVY, alpha=0.85, zorder=3))
    ax.add_patch(Wedge((1.8, 5), 0.55, 0, 180, color=NAVY_SOFT, zorder=3))
    # Méridiens
    for r in [0.2, 0.4]:
        ax.add_patch(plt.matplotlib.patches.Ellipse((1.8, 5), r*2, 1.1, fill=False, color=WHITE, alpha=0.4, lw=1, zorder=4))

    save(fig, "blog-1.jpg")

# ============================================================
# BLOG 2 : "Les avantages du TOEIC pour votre carrière"
# Certificat + courbe ascendante
# ============================================================
def blog_2():
    fig, ax = new_fig()
    add_bg_pattern(ax)

    # Certificat stylisé à gauche
    cert_x, cert_y, cert_w, cert_h = 1, 1.2, 4, 3.8
    ax.add_patch(FancyBboxPatch((cert_x, cert_y), cert_w, cert_h,
                                 boxstyle="round,pad=0.05", facecolor=WHITE, edgecolor=NAVY, linewidth=2.5, zorder=2))
    # Bordure intérieure
    ax.add_patch(FancyBboxPatch((cert_x + 0.2, cert_y + 0.2), cert_w - 0.4, cert_h - 0.4,
                                 boxstyle="round,pad=0.03", facecolor='none', edgecolor=ORANGE, linewidth=1.5, zorder=3))
    # Bandeau supérieur
    ax.add_patch(Rectangle((cert_x + 0.3, cert_y + cert_h - 0.8), cert_w - 0.6, 0.5, color=NAVY, zorder=3))
    # Lignes de texte simulées
    for i, y in enumerate([cert_y + 2.8, cert_y + 2.3, cert_y + 1.8, cert_y + 1.3]):
        ax.add_patch(Rectangle((cert_x + 0.5, y), cert_w - 1, 0.08, color=NAVY, alpha=0.3, zorder=3))
    # Sceau (cercle doré)
    ax.add_patch(Circle((cert_x + cert_w - 0.6, cert_y + 0.6), 0.35, color=GOLD, zorder=4))
    ax.add_patch(Circle((cert_x + cert_w - 0.6, cert_y + 0.6), 0.22, color=ORANGE, zorder=5))

    # Courbe de carrière ascendante à droite
    # Axes
    ax.annotate('', xy=(11, 1), xytext=(6.5, 1), arrowprops=dict(arrowstyle='->', color=NAVY, lw=2))
    ax.annotate('', xy=(6.5, 5.5), xytext=(6.5, 1), arrowprops=dict(arrowstyle='->', color=NAVY, lw=2))

    # Courbe ascendante (exponentielle)
    x = np.linspace(7, 10.7, 50)
    y = 1.2 + 3.8 * ((x - 7) / 3.7) ** 2.5
    ax.fill_between(x, 1, y, color=ORANGE, alpha=0.15, zorder=2)
    ax.plot(x, y, color=ORANGE, lw=4, zorder=3, solid_capstyle='round')

    # Points sur la courbe (étapes de carrière)
    points = [(7.3, 1.4), (8.2, 1.9), (9.2, 3.0), (10.3, 4.6)]
    for px, py in points:
        ax.add_patch(Circle((px, py), 0.15, color=NAVY, zorder=4))
        ax.add_patch(Circle((px, py), 0.08, color=WHITE, zorder=5))

    # Flèche finale vers le haut
    ax.annotate('', xy=(10.5, 5.2), xytext=(10.2, 4.7),
                arrowprops=dict(arrowstyle='->', color=EMERALD, lw=3))

    # Icône briefcase en bas à droite
    bx, by = 10.5, 0.5
    ax.add_patch(FancyBboxPatch((bx, by), 0.7, 0.5, boxstyle="round,pad=0.02", facecolor=NAVY, edgecolor='none', zorder=4))
    ax.add_patch(Rectangle((bx + 0.2, by + 0.5), 0.3, 0.15, color=NAVY, zorder=4))

    # Étoiles décoratives
    for sx, sy in [(5.5, 5), (11, 4.5), (6, 4.8)]:
        ax.add_patch(Circle((sx, sy), 0.1, color=GOLD, alpha=0.7, zorder=2))

    save(fig, "blog-2.jpg")

# ============================================================
# BLOG 3 : "Traduction ou interprétation : quelle différence ?"
# Split-screen vertical
# ============================================================
def blog_3():
    fig, ax = new_fig()
    add_bg_pattern(ax)

    # Ligne de séparation verticale
    ax.plot([6, 6], [0.5, 5.8], color=ORANGE, lw=2.5, linestyle='--', zorder=3)

    # CÔTÉ GAUCHE : TRADUCTION (écrit)
    # Fond légèrement coloré
    ax.add_patch(Rectangle((0, 0), 6, 6.3, color=CREAM_WARM, alpha=0.5, zorder=0))

    # Document avec lignes de texte
    doc_x, doc_y, doc_w, doc_h = 1.5, 1.5, 3, 3.2
    ax.add_patch(FancyBboxPatch((doc_x, doc_y), doc_w, doc_h,
                                 boxstyle="round,pad=0.05", facecolor=WHITE, edgecolor=NAVY, linewidth=2, zorder=2))
    # Lignes de texte
    for i, y in enumerate(np.arange(doc_y + doc_h - 0.5, doc_y + 0.4, 0.35)):
        w = doc_w - 0.6 if i % 3 != 2 else doc_w - 1.5
        ax.add_patch(Rectangle((doc_x + 0.3, y), w, 0.08, color=NAVY, alpha=0.4, zorder=3))

    # Loupe sur le document
    lx, ly = doc_x + 2.3, doc_y + 1.5
    ax.add_patch(Circle((lx, ly), 0.6, fill=False, edgecolor=ORANGE, linewidth=4, zorder=4))
    ax.plot([lx + 0.42, lx + 0.9], [ly - 0.42, ly - 0.9], color=ORANGE, lw=5, solid_capstyle='round', zorder=4)

    # Stylo
    px, py = 4.8, 1.8
    ax.add_patch(Polygon([(px, py), (px + 0.15, py + 1.2), (px + 0.3, py + 1.15), (px + 0.15, py)],
                          color=NAVY, zorder=4))
    ax.add_patch(Polygon([(px + 0.05, py), (px + 0.15, py + 0.2), (px + 0.25, py)], color=ORANGE, zorder=5))

    # CÔTÉ DROIT : INTERPRÉTATION (oral)
    # Microphone
    mx, my = 9, 3.5
    # Capsule du micro
    ax.add_patch(FancyBboxPatch((mx - 0.4, my), 0.8, 1.3,
                                 boxstyle="round,pad=0.15", facecolor=NAVY, edgecolor='none', zorder=3))
    # Grille du micro (lignes)
    for i in range(4):
        ax.plot([mx - 0.3, mx + 0.3], [my + 0.3 + i*0.25, my + 0.3 + i*0.25], color=WHITE, alpha=0.4, lw=1, zorder=4)
    # Tige du micro
    ax.add_patch(Rectangle((mx - 0.05, my - 0.8), 0.1, 0.8, color=NAVY, zorder=3))
    # Base
    ax.add_patch(FancyBboxPatch((mx - 0.5, my - 1), 1, 0.25,
                                 boxstyle="round,pad=0.02", facecolor=NAVY, edgecolor='none', zorder=3))

    # Casque audio
    hx, hy = 9, 1.5
    # Arceau
    theta = np.linspace(np.pi, 2*np.pi, 30)
    ax.plot(hx + 0.7*np.cos(theta), hy + 0.7*np.sin(theta) + 0.3, color=ORANGE, lw=4, zorder=3)
    # Ecouteurs
    ax.add_patch(FancyBboxPatch((hx - 0.85, hy - 0.1), 0.3, 0.5,
                                 boxstyle="round,pad=0.02", facecolor=ORANGE, edgecolor='none', zorder=4))
    ax.add_patch(FancyBboxPatch((hx + 0.55, hy - 0.1), 0.3, 0.5,
                                 boxstyle="round,pad=0.02", facecolor=ORANGE, edgecolor='none', zorder=4))

    # Ondes sonores (droite)
    for r in [0.3, 0.5, 0.7]:
        ax.add_patch(Wedge((10.5, 3.8), r, -45, 45, color=EMERALD, alpha=0.6, zorder=3))

    save(fig, "blog-3.jpg")

# ============================================================
# BLOG 4 : "Réussir une présentation professionnelle en anglais"
# Écran de présentation + pointeur laser
# ============================================================
def blog_4():
    fig, ax = new_fig()
    add_bg_pattern(ax)

    # Écran de présentation (grand rectangle)
    screen_x, screen_y, screen_w, screen_h = 1.5, 0.8, 9, 4.7
    # Cadre écran
    ax.add_patch(FancyBboxPatch((screen_x - 0.2, screen_y - 0.2), screen_w + 0.4, screen_h + 0.4,
                                 boxstyle="round,pad=0.05", facecolor=NAVY, edgecolor='none', zorder=2))
    # Écran (fond)
    ax.add_patch(Rectangle((screen_x, screen_y), screen_w, screen_h, color=WHITE, zorder=3))

    # Barre de titre
    ax.add_patch(Rectangle((screen_x + 0.3, screen_y + screen_h - 0.7), screen_w - 0.6, 0.4, color=NAVY, zorder=4))

    # Graphique en barres
    chart_x = screen_x + 0.5
    chart_y = screen_y + 0.8
    bar_data = [1.2, 1.8, 2.4, 2.0, 2.8]
    bar_colors = [ORANGE, EMERALD, GOLD, ORANGE, EMERALD]
    for i, (val, c) in enumerate(zip(bar_data, bar_colors)):
        ax.add_patch(Rectangle((chart_x + i * 0.7, chart_y), 0.5, val, color=c, alpha=0.85, zorder=4))

    # Axe du graphique
    ax.plot([chart_x - 0.1, chart_x + 4], [chart_y, chart_y], color=NAVY, lw=1.5, zorder=4)
    ax.plot([chart_x - 0.1, chart_x - 0.1], [chart_y, chart_y + 3.2], color=NAVY, lw=1.5, zorder=4)

    # Bullet points à droite
    bp_x = screen_x + 5.8
    bp_y = screen_y + 3.5
    for i in range(4):
        # Puce
        ax.add_patch(Circle((bp_x, bp_y - i * 0.55), 0.08, color=ORANGE, zorder=4))
        # Ligne de texte
        ax.add_patch(Rectangle((bp_x + 0.25, bp_y - i * 0.55 - 0.04), 2.8, 0.08, color=NAVY, alpha=0.5, zorder=4))

    # Horloge en bas à droite (gestion du temps)
    cx, cy = 10.8, 1.3
    ax.add_patch(Circle((cx, cy), 0.5, fill=False, edgecolor=NAVY, linewidth=3, zorder=5))
    # Aiguilles
    ax.plot([cx, cx], [cy, cy + 0.35], color=NAVY, lw=2.5, zorder=6)
    ax.plot([cx, cx + 0.25], [cy, cy], color=CRIMSON, lw=2, zorder=6)
    # Marqueurs
    for angle in range(0, 360, 30):
        rad = np.radians(angle)
        ax.add_patch(Circle((cx + 0.42*np.cos(rad), cy + 0.42*np.sin(rad)), 0.03, color=NAVY, zorder=6))

    # Pointeur laser (trait orange qui pointe vers l'écran)
    ax.plot([1.0, 4.5], [0.4, 2.5], color=CRIMSON, lw=2.5, zorder=7, alpha=0.8)
    ax.add_patch(Circle((4.5, 2.5), 0.12, color=CRIMSON, alpha=0.5, zorder=8))
    ax.add_patch(Circle((4.5, 2.5), 0.05, color=CRIMSON, zorder=9))

    save(fig, "blog-4.jpg")

# ============================================================
# BLOG 5 : "Traduction & interprétation au XXIe siècle"
# Main humaine vs machine (contraste)
# ============================================================
def blog_5():
    fig, ax = new_fig()
    add_bg_pattern(ax)

    # Division visuelle gauche/droite avec dégradé
    # Côté gauche (humain) : tons chauds
    ax.add_patch(Rectangle((0, 0), 6, 6.3, color=CREAM_WARM, alpha=0.6, zorder=0))
    # Côté droit (machine) : tons froids
    ax.add_patch(Rectangle((6, 0), 6, 6.3, color=NAVY, alpha=0.05, zorder=0))

    # CÔTÉ GAUCHE : HUMAIN (stylo + document)
    # Document
    dx, dy, dw, dh = 1.2, 1.8, 3, 3
    ax.add_patch(FancyBboxPatch((dx, dy), dw, dh,
                                 boxstyle="round,pad=0.05", facecolor=WHITE, edgecolor=ORANGE, linewidth=2.5, zorder=2))
    # Lignes manuscrites
    for i, y in enumerate(np.arange(dy + dh - 0.5, dy + 0.4, 0.35)):
        w = dw - 0.6 if i % 3 != 1 else dw - 1.3
        ax.add_patch(Rectangle((dx + 0.3, y), w, 0.08, color=NAVY, alpha=0.5, zorder=3))

    # Stylo (main humaine qui écrit)
    px, py = 3.8, 1.5
    ax.add_patch(Polygon([(px, py), (px + 0.2, py + 1.8), (px + 0.4, py + 1.75), (px + 0.2, py)],
                          color=ORANGE, zorder=4))
    ax.add_patch(Polygon([(px + 0.05, py), (px + 0.2, py + 0.25), (px + 0.35, py)], color=NAVY, zorder=5))
    # "Encre" sortant du stylo
    ax.add_patch(Circle((px + 0.2, py - 0.05), 0.06, color=NAVY, zorder=5))

    # Cœur symbolique (humain)
    hx, hy = 1.8, 5.3
    ax.add_patch(Circle((hx - 0.15, hy), 0.18, color=CRIMSON, zorder=3))
    ax.add_patch(Circle((hx + 0.15, hy), 0.18, color=CRIMSON, zorder=3))
    ax.add_patch(Polygon([(hx - 0.32, hy - 0.05), (hx + 0.32, hy - 0.05), (hx, hy - 0.45)], color=CRIMSON, zorder=3))

    # CÔTÉ DROIT : MACHINE (écran + code binaire)
    # Écran
    ex, ey, ew, eh = 7, 1.5, 4, 3.2
    ax.add_patch(FancyBboxPatch((ex - 0.15, ey - 0.15), ew + 0.3, eh + 0.3,
                                 boxstyle="round,pad=0.05", facecolor=NAVY, edgecolor='none', zorder=2))
    ax.add_patch(Rectangle((ex, ey), ew, eh, color='#0F172A', zorder=3))
    # Stand
    ax.add_patch(Rectangle((ex + ew/2 - 0.4, ey - 0.5), 0.8, 0.4, color=NAVY, zorder=2))
    ax.add_patch(FancyBboxPatch((ex + ew/2 - 1, ey - 0.6), 2, 0.15,
                                 boxstyle="round,pad=0.02", facecolor=NAVY, edgecolor='none', zorder=2))

    # Code binaire 0/1 sur l'écran
    np.random.seed(42)
    for i in range(6):
        for j in range(10):
            bit = np.random.choice([0, 1])
            color = EMERALD if bit else NAVY_SOFT
            ax.text(ex + 0.3 + j * 0.38, ey + eh - 0.4 - i * 0.45, str(bit),
                    color=color, fontsize=11, fontfamily='monospace', fontweight='bold', zorder=4)

    # Cercles de circuit (IA)
    for cx, cy, r in [(10.5, 5.2, 0.25), (11.2, 4.6, 0.18), (10.2, 4.8, 0.15)]:
        ax.add_patch(Circle((cx, cy), r, fill=False, edgecolor=EMERALD, linewidth=2, zorder=4))
        ax.add_patch(Circle((cx, cy), r * 0.4, color=EMERALD, zorder=5))

    # Lignes de circuit
    ax.plot([10.5, 11.2], [5.2, 4.6], color=EMERALD, lw=1.5, alpha=0.6, zorder=4)
    ax.plot([10.5, 10.2], [5.2, 4.8], color=EMERALD, lw=1.5, alpha=0.6, zorder=4)

    # VS au centre
    ax.add_patch(Circle((6, 3.15), 0.55, color=ORANGE, zorder=10))
    ax.text(6, 3.15, "VS", color=WHITE, fontsize=18, fontweight='bold', ha='center', va='center', zorder=11)

    save(fig, "blog-5.jpg")

# ============================================================
# BANNIÈRE OG (partage réseaux sociaux) 1200x630
# ============================================================
def og_banner():
    fig, ax = plt.subplots(figsize=(12, 6.3), dpi=100)
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 6.3)
    ax.axis('off')
    fig.patch.set_facecolor(NAVY)
    ax.set_facecolor(NAVY)

    # Motif de grille subtil
    for x in np.arange(0, 12, 0.6):
        ax.plot([x, x], [0, 6.3], color=WHITE, alpha=0.03, lw=0.5)
    for y in np.arange(0, 6.3, 0.6):
        ax.plot([0, 12], [y, y], color=WHITE, alpha=0.03, lw=0.5)

    # Cercle décoratif orange à gauche
    ax.add_patch(Circle((1.5, 3.15), 1.8, color=ORANGE, alpha=0.15, zorder=1))
    ax.add_patch(Circle((1.5, 3.15), 1.2, color=ORANGE, alpha=0.2, zorder=1))

    # Globe stylisé à droite
    gx, gy, gr = 9.5, 3.15, 1.5
    ax.add_patch(Circle((gx, gy), gr, color=EMERALD, alpha=0.85, zorder=3))
    # Méridiens
    for r in [0.5, 1.0, 1.5]:
        ax.add_patch(plt.matplotlib.patches.Ellipse((gx, gy), r*2, gr*2, fill=False, color=WHITE, alpha=0.4, lw=1.5, zorder=4))
    # Parallèles
    for y_off in [-0.7, 0, 0.7]:
        ax.plot([gx - np.sqrt(gr**2 - y_off**2), gx + np.sqrt(gr**2 - y_off**2)],
                [gy + y_off, gy + y_off], color=WHITE, alpha=0.4, lw=1.5, zorder=4)
    # Continents stylisés (formes abstraites)
    ax.add_patch(Polygon([(gx - 0.6, gy + 0.4), (gx - 0.2, gy + 0.7), (gx + 0.3, gy + 0.5), (gx + 0.1, gy + 0.2)], color=WHITE, alpha=0.9, zorder=5))
    ax.add_patch(Polygon([(gx - 0.4, gy - 0.3), (gx + 0.2, gy - 0.5), (gx + 0.5, gy - 0.2), (gx, gy)], color=WHITE, alpha=0.9, zorder=5))

    # Arcs orbitaux orange
    for offset in [0.2, -0.2]:
        ax.add_patch(plt.matplotlib.patches.Ellipse((gx, gy), gr*2.6 + offset, gr*0.8 + offset, fill=False, color=ORANGE, lw=2, alpha=0.7, zorder=2))

    # Étoiles
    for sx, sy, ss in [(3, 5.5, 0.12), (4, 4.8, 0.08), (5.5, 5.2, 0.1), (7, 1.2, 0.09), (3.5, 1.5, 0.11), (6.5, 0.7, 0.08)]:
        ax.add_patch(Circle((sx, sy), ss, color=GOLD, zorder=2))

    # Bande orange verticale (séparation)
    ax.add_patch(Rectangle((7.5, 0), 0.05, 6.3, color=ORANGE, alpha=0.5, zorder=1))

    fig.savefig(f"{OUTPUT_DIR}/og-banner.jpg", dpi=100, facecolor=NAVY, edgecolor='none', bbox_inches='tight', pad_inches=0)
    plt.close(fig)
    print("✓ og-banner.jpg généré")

# ============================================================
# PATTERN DÉCORATIF (mosaïque subtile)
# ============================================================
def pattern():
    fig, ax = plt.subplots(figsize=(4, 4), dpi=100)
    ax.set_xlim(0, 4)
    ax.set_ylim(0, 4)
    ax.axis('off')
    fig.patch.set_facecolor(CREAM)
    ax.set_facecolor(CREAM)

    # Motif : petits globes + étoiles dispersés
    # Globe
    ax.add_patch(Circle((1, 1), 0.25, fill=False, edgecolor=ORANGE, lw=1, alpha=0.15))
    ax.add_patch(plt.matplotlib.patches.Ellipse((1, 1), 0.3, 0.5, fill=False, edgecolor=ORANGE, lw=0.8, alpha=0.12))
    # Étoiles
    ax.add_patch(Circle((3, 1), 0.06, color=GOLD, alpha=0.15))
    ax.add_patch(Circle((1, 3), 0.08, color=GOLD, alpha=0.15))
    ax.add_patch(Circle((3, 3), 0.05, color=ORANGE, alpha=0.15))
    # Arcs
    ax.add_patch(plt.matplotlib.patches.Ellipse((2, 2), 1.5, 0.4, fill=False, edgecolor=NAVY, lw=0.8, alpha=0.08))

    fig.savefig(f"{OUTPUT_DIR}/pattern-decoratif.png", dpi=100, facecolor=CREAM, edgecolor='none', bbox_inches='tight', pad_inches=0)
    plt.close(fig)
    print("✓ pattern-decoratif.png généré")

# ============================================================
# Génération de toutes les images
# ============================================================
if __name__ == "__main__":
    print("🎨 Génération des illustrations blog VISION 2000 ELC...\n")
    blog_1()
    blog_2()
    blog_3()
    blog_4()
    blog_5()
    og_banner()
    pattern()
    print("\n✅ Toutes les images générées avec succès !")
