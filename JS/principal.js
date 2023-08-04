/* const
var
let */

/* CRIANDO FUNÇÃO PARA LIMPAR FORMULÁRIO */

const limparFormulario = (endereco) =>
{
/* USANDO FUNÇÕES DOM(DOCUMENT OBJET MODEL) */
document.getElementById('endereco').value = '';
document.getElementById('bairro').value = '';
document.getElementById('cidade').value = '';
document.getElementById('estado').value = '';
}

/* POPULAR O FORMULÁRIO */
const preencherFormulario = (endereco) =>
{
document.getElementById('endereco').value = endereco.logradouro;
document.getElementById('bairro').value = endereco.bairro;
document.getElementById('cidade').value = endereco.localidade;
document.getElementById('estado').value = endereco.uf;
}

/* VALIDANDO O CEP REGX */
const eNumero = (numero)=>/^[0-9]+$/;

/* VALIDANDO CEP SE TEM 8 CARACTERES */
const cepValido = (cep)=> 
      cep.length == 8 && eNumero(numero);

/* FAZENDO UMA REQUISIÇÃO PARA API VIACEP */
const pesquisaCEP = async() =>      
{
limparFormulario();

const cep = document.getElementById('cep').value.replace("-","");
const url = `https://viacep.com.br/ws/${cep}/json/`;

/* VERIFICANDO SSE O CEP É VÁLIDO */

if(cepValido(cep))
{
    const dados = await fetch(url);
    const endereco = await dados.json();

    if(endereco.hasOwnProperty('erro'))
    {
        document.getElementById('endereco').value = 'CEP não encontrado!!!'
    }else
    {
        preencherFormulario(endereco);
    }
}else{
    document.getElementById('endereco').value = 'CEP incorreto!';
}

}

document.getElementById('endereco')
.addEventListener('focusout',pesquisaCEP);