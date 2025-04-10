from kivymd.app import MDApp
from kivymd.uix.screen import Screen
from kivymd.uix.button import MDRectangleFlatButton, MDFlatButton
from kivymd.uix.dialog import MDDialog
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
            if self.password.text is '':
                check_string = 'please enter password'
            else:
                check_string = self.password.text + 'doesnot exist'

        close_button = MDFlatButton(text='Close', on_release=self.close_dialog)
        more_button = MDFlatButton(text='More')

        self.dialog = MDDialog(tittle='Password Check',
                             text='self.password.text',
                             size_hint=(0.7, 1),
                             buttons=[close_button, more_button])
        self.dialog.open()

        def close_dialog(self, obj):
               self.dialog.dismiss()
               

        return screen