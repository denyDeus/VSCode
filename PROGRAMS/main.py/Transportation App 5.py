from kivymd.app import MDApp
from kivymd.uix.screen import Screen
from kivymd.uix.button import MDRectangleFlatButton
from kivy.lang import Builder

class MIZIGOApp(MDApp):
    
    def build(self):
        self.theme_cls.primary_palette = 'Indigo'
        self.theme_cls.primary_hue = 'A700'
        self.theme_cls.theme_style = 'Dark'

        screen = Screen()

        button = MDRectangleFlatButton(text='show',
                                        pos_hint={'center_x':0.5, 'center_y':0.4},
                                        on_release=self.show_data)

        self.password = Builder.load_string(self.password)
        password = Builder.load_string(button)

        def show_data(self, obj):
           print(self.password.text)

        return screen

MIZIGOApp().run()