from kivymd.app import MDApp
from kivymd.uix.screen import Screen
from kivymd.uix.button import MDRectangleFlatButton
from kivy.lang import Builder

class MIZIGOApp(MDApp):
    
    def build(self):
        self.theme_cls.primary_palette = 'Indigo'
        self.theme_cls.primary_hue = 'A700'
        self.theme_cls.theme_style = 'Light'

        screen = Screen()

        button = MDRectangleFlatButton(text='show',
                                        pos_hint={'center_x':0.5, 'center_y':0.4},
                                        on_release=self.show_data)
        
        screen.add_widget(button)

        return screen

    def show_data(self, instance):
           print('Button clicked-show_data triggered')

MIZIGOApp().run()