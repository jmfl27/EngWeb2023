import json

def ordCidade(c):
    return c['nome']


with open('mapa.json', encoding='utf-8') as fh:
   mapa = json.load(fh)

cidades = mapa["cidades"]
ligacoes = mapa["ligações"]
cidades.sort(key=ordCidade)

for c in cidades:
    pagHTML = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset = "UTF-8"/>
        </head>
        <body>
            <center>
                <h1>Cidade</h1>
            </center>
    """

    pagHTML += f"""
            <a name="{c['id']}"></a>
            <h3>{c['nome']}</h3>
            <p><b>População: </b>{c['população']}</p>
            <p><b>Descrição: </b>{c['descrição']}</p>
            <p><b>Distrito: </b>{c['distrito']}</p>
            <h3> Ligações:</h3>
    """

    for l in ligacoes:
        if l["origem"] == c["id"]:
            for d in cidades:
                if d["id"] == l["destino"]:
                    pagHTML += f"""<ul>
                            <li><a href ="{d['id']}">{d["nome"]}</a> - {l["distância"]} Km</li>
                        </ul>
                    """


    pagHTML += f"""
            <adress><a href="/"><b>VOLTAR AO INDICE</b></a>
                </body>
            </html>"""

    nameF = c["id"] + ".html"
    newF = open(nameF,"x")
    newF.write(pagHTML)
    newF.close()