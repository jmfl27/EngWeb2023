import json

def ordCidade(c):
    return c['nome']


with open('mapa.json', encoding='utf-8') as fh:
   mapa = json.load(fh)

cidades = mapa["cidades"]
ligacoes = mapa["ligações"]
cidades.sort(key=ordCidade)

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset = "UTF-8"/>
    </head>
    <body>
        <center>
            <h2>Distritos</h2>
            <h3>Índice</h3>
        </center>
"""

distritos = dict()  #nome do distrito : [ (id cidade, nomecidade) ]

for c in cidades:
    if c["distrito"] not in distritos.keys():
        distritos.update({c["distrito"] : []})
    aux = distritos[c["distrito"]]
    aux.append((c["id"], c["nome"]))
    distritos.update({c["distrito"] : aux})

# ordenar distritos
distritos = {key:distritos[key] for key in sorted(distritos.keys())}

for d in distritos:
    pagHTML += f"""
        <h4>{d}</h4><ul>"""
    for c in distritos[d]:
        pagHTML += f"""
        <li>
            <a href="{c[0]}">{c[1]}</a>
        </li>
        """
    pagHTML += """</ul>"""

pagHTML += """ </td>
            </tr>
        </table>
    </body>
</html>"""

print(pagHTML)