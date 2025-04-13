from kivymd.app import MDApp
from kivymd.uix.label import MDLabel

class MIZIGOApp(MDApp):
    def build(self):
        self.theme_cls.primary_palette = 'Indigo'
        self.theme_cls.primary_hue = 'A700'
        self.theme_cls.theme_style = 'Light'

        label = MDLabel(
            text='Welcome To MIZIGO',
            halign='center',
            theme_text_color='Custom',
            text_color=(75/255.0, 0, 130/255.0, 1),
            font_style='H6'
        )

        return label
    
MIZIGOApp().run()