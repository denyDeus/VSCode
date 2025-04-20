from kivymd.app import MDApp
from kivymd.uix.screen import Screen
from kivymd.uix.button import MDRectangleFlatButton,MDFloatingActionButton

class MIZIGOApp(MDApp):
    
    def build(self):
        self.theme_cls.primary_palette = 'Indigo'
        self.theme_cls.primary_hue = 'A700'
        self.theme_cls.theme_style = 'Dark'
        screen = Screen()
        btn_flat = MDRectangleFlatButton(text='Menu',
                                pos_hint={'center_x':0.5, 'center_y':0.5})
        Icon_btn = MDFloatingActionButton(icon='android',
                                pos_hint={'center_x':0.5, 'center_y':0.5})
        screen.add_widget(Icon_btn)
        return screen
    
MIZIGOApp().run()