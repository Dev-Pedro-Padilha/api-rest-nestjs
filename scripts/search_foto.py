import sys
from ldap3 import Server, Connection, ALL, NTLM
import os
from dotenv import load_dotenv

load_dotenv()

def buscar_usuario(username):
    # Configurações do servidor e da conexão LDAP
    server = Server('ldap://perto.com.br', get_info=ALL)
    conn = Connection(server, user='perto\\'+ os.getenv('LDAP_USERNAME'), password=os.getenv('LDAP_PASSWORD'), authentication=NTLM, auto_bind=True)

    search_filter = f'(&(objectClass=user)(userPrincipalName={username}))'
    search_base = 'dc=perto,dc=com,dc=br'  # Ajuste conforme necessário

    # Incluindo o atributo thumbnailPhoto
    atributos = ['description','thumbnailPhoto']
    conn.search(search_base, search_filter, attributes=atributos)

    if conn.entries:
        user_data = conn.entries[0]
        if user_data.thumbnailPhoto:
            return user_data
        else:
            return None
    else:
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python search_foto.py <username>")
        sys.exit(1)

    username = sys.argv[1]
    user = buscar_usuario(username+'@perto.com.br')
    photo_data = user.thumbnailPhoto.value
    description = user.description
    
    if photo_data:
        # Salvar a imagem em um arquivo
        with open(f'uploads/{description}.png', 'wb') as file:
            file.write(photo_data)
        print('Foto salva com sucesso.')
    else:
        print('Foto não encontrada ou usuário não encontrado.')
