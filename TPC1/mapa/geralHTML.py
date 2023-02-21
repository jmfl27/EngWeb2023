import json


def ordCidade(c):
    return c['nome']


f = open("mapa.json")
mapa = json.load(f)
cidades = mapa["cidades"]
ligações = mapa["ligações"]
cidades.sort(key=ordCidade)

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset = "utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <!--indice-->
                <td valign="top">
                <a name="indice"<\a>
                                    <h3>Índice</h3>
                    <ul>
"""

for c in cidades:
    pagHTML += f"""
    <li>
        <a href="#{c['id']}">{c['nome']}</a>
    </li>
    """
pagHTML += """
            </ul>
                </td>
                <!--conteudo-->
                <td>
"""
for c in cidades:
    pagHTML += f"""
                      <a name="{c['id']}"></a>
                    <h3>{c['nome']}</h3>
                    <p><b>População</b> {c['população']}</p>
                    <p><b>Descrição:</b>{c['descrição']}</p>
                    <p><b>Distrito:</b>{c['distrito']}</p>
                    <h3> Ligações:</h3>
    """
    for l in ligações:
        if l['origem'] == c['id']:
            for s in cidades:
                if s['id'] == l['destino']:
                    pagHTML += f""" <ul>
                        <li>{s['nome']} - {l['distância']} Km</li>
                    </ul>

    """

    pagHTML += f"""
     <adress>[<a href="#indice"> voltar ao Indice] </a>                
                    <center>
                        <hr width="80%">
                    </center>
    """

pagHTML += """ </td>
            </tr>
        </table>
    </body>
</html>"""

print(pagHTML)