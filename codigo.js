
const valorAnterior=document.getElementById("valor-anterior");
const valorNuevo=document.getElementById("valor-actual");
const buttonNumber= document.querySelectorAll(".numero");
const buttonOperetor= document.querySelectorAll(".opareador");
const borrar=document.querySelector(".borrar");
const borrarTotal= document.querySelector(".borrarTotal");


class Calculadora{
    sumar(num1,num2){
        return num1 + num2;
    }
    restar(num1,num2){
        return num1 - num2;
    }
    dividir(num1,num2){
        return num1 / num2;
    }
    multiplicar(num1,num2){
        return num1 * num2;
    }
}

class Display{
    constructor(displayValorAnterior,displayValorActual){
        this.diplayValorAnterior=displayValorAnterior;
        this.displayValorActual=displayValorActual;
        this.calculadora=new Calculadora;
        this.tipoDeOperacion=undefined;
        this.valorActual="";
        this.valorAnterior="";
        this.signo={
            sumar:"+",
            dividir:"%",
            multiplicar:"X",
            restar:"-"
        }
    }
    agregarNumero(num){
        if(num=="."&& this.valorActual.includes("."))return
        this.valorActual= this.valorActual.toString()+num.toString();
        this.imprimirValor();
    }

    borrarValor(){
        this.valorActual=this.valorActual.slice(0,-1);
        this.imprimirValor();
    }
    computar(tipo){
        this.tipoDeOperacion !== "igual" && this.calcular();
        this.tipoDeOperacion=tipo;
        this.valorAnterior=this.valorActual||this.valorAnterior;
        this.valorActual="";
        this.imprimirValor();

    }
    borrarTotal(){
        this.valorActual="";
        this.valorAnterior="";
        this.tipoDeOperacion=undefined;
        this.imprimirValor();
    }
    imprimirValor(){
        this.displayValorActual.textContent = this.valorActual;
        this.diplayValorAnterior.textContent= `${this.valorAnterior} ${this.signo[this.tipoDeOperacion]||""}`;
    }
    calcular(){
        const valorAnterior= parseInt(this.valorAnterior);
        const valorActual= parseInt(this.valorActual);

        if(isNaN(valorAnterior || valorNuevo))console.log("los datos no son numero");
        else{
            this.valorActual=this.calculadora[this.tipoDeOperacion](valorAnterior,valorActual);
        }
    }
}

const display= new Display(valorAnterior,valorNuevo);


buttonNumber.forEach(buton=>{
    buton.addEventListener("click",e=>display.agregarNumero(buton.innerHTML))
})

buttonOperetor.forEach(boton=>{
    boton.addEventListener("click",e=>{
        display.computar(boton.value)
    })
})

borrar.addEventListener("click",e=>{
    display.borrarValor();
})

borrarTotal.addEventListener("click",e=>{
    display.borrarTotal();
})

