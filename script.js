class Calculator {
    constructor(previousOpTextElem, currentOpTextElem) {
        this.previousOpTextElem = previousOpTextElem
        this.currentOpTextElem = currentOpTextElem
        this.clear()
    }

    // Limpiar la salida de las operaciones
    clear () {
        this.currentOp = ''
        this.previousOp = ''
        this.operation = undefined
    }

    // Función para eliminar el último caracter introducido
    delete () {
        // Convertir el operador actual en una cadena de texto
        // slice(0, -1): Eliminar el último caracter introducido en la cadena de texto (se toma la cadena de texto 
        // desde el primer caracter (0), hasta el último (-1) sin estar incluido)
        this.currentOp = this.currentOp.toString().slice(0, -1)
    }

    // Añadir el número introducido por el usuario a la salida de las operaciones de la calculadora
    appendNumber (num) {
        // Si el valor añadido es un punto o la operación existente contiene un punto, no hacer nada
        if (num === '.' && this.currentOp.includes('.')) return
        // Convertir el número que acaba de introducir el usuario a una cadena de texto 
        // y concatenarlos
        // El número se convierte a cadena de texto para que sin importar el valor que tenga, 
        // se concatene sin problemas
        this.currentOp = this.currentOp.toString() + num.toString()
    }

    // Función para saber la operación elegida por el usuario
    chooseOperation (operation) {
        // Si el operador actual está vacío, no hacer nada
        if (this.currentOp === '') return
        
        // Si el operador anterior no está vacío
        if (this.previousOp !== '') {
            // Realizar la operación correspondiente con los valores de la salida
            this.makeOperation()
        }

        // Guardar la operación pasada como argumento en la propiedad "operation" de la clase "Calculator"
        this.operation = operation
        // Actualizar la operación anterior para que sea ahora la operación actual
        this.previousOp = this.currentOp
        // Vaciar la operación actual ya que la que estaba ha pasado a ser la anterior después de realizar
        // la operación correspondiente
        this.currentOp = ''
    }            

    // FUnción para realizar la operación según los valores introducidos y la operación seleccionada
    makeOperation () {
        // Guardar la operación seleccionada
        let op
        // Obtener el operando anterior y convertirlo a decimal
        const prevOp = parseFloat(this.previousOp)
        // Obtener el operando actual y convertirlo a decimal
        const currOp = parseFloat(this.currentOp)
        // Si el operador anterior o el actual no son números, no hacer nada
        if (isNaN(prevOp) || isNaN(currOp)) return

        // Crear switch para realizar una acción dependiendo de la operación seleccionada
        switch (this.operation) {
            // En caso de que la operación sea una suma
            case '+':
                // Sumar el operando anterior con el actual
                op = prevOp + currOp                
                break
            // En caso de que la operación sea una resta
            case '-':
                // Restar el operando anterior con el actual
                op = prevOp - currOp
                break
            // En caso de que la operación sea una multiplicación
            case '×':
                // Multiplicar el operando anterior con el actual
                op = prevOp * currOp
                break
            // En caso de que la operación sea una división
            case '÷':
                // Dividir el operando anterior con el actual
                op = prevOp / currOp
                break
            // En caso de que no se seleccione ninguna de las operaciones anteriores
            default:
                // No hacer nada
                return
        }

        this.currentOp = op
        this.operation = undefined
        this.previousOp = ''
    }   
    
    // Función para mostrar los números introducidos por el usuario en la salida
    getDisplayNum (num) {
        // Convertir número a cadena de texto
        const stringNum = num.toString()
        // Obtener la parte entera si en la salida existe un punto y convertirla a decimal para leer los posibles
        // ceros que puedan ha
        const intDigits = parseFloat(stringNum.split('.')[0])
        // Obtener los números introducidos después del punto (la parte decimal)
        const decimalDigits = stringNum.split('.')[1]
        // Inicializar la variable que se va a encargar de guardar la parte entera en la salida
        let intDisplay

        // Si la parte entera no es un número (que sea solo un punto por ejemplo)
        if (isNaN(intDigits)) {
            // Establecer la parte entera de la salida como una cadena vacía
            intDisplay = ''
        // Por otro lado, si el número introducido es un número
        } else {
            // Formatear la parte entera con separadores de miles
            intDisplay = intDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
    }
    
    // Función para actualizar la salida dependiendo de los valores que se introduzcan
    updateDisplayOutput () {
        // Añadir el número actual introducido por el usuario a la salida
        this.currentOpTextElem.innerText = this.getDisplayNum(this.currentOp)
        // Si la operación actual no está vacía, es decir, el usuario ha seleccionado alguna de las operaciones
        if (this.operation != null) {
            // Mostrar en la salida el número actual seguido de la operación seleccionada
            this.previousOpTextElem.innerText = `${this.getDisplayNum(this.previousOp)} ${this.operation}`
        // Por el contrario, si no se ha introducido operación
        } else {
            // No mostrar nada en la parte superior de la salida (donde se ubica la operación anterior)
            this.previousOpTextElem.innerText = ''
        }
    }
}


// FUncionamiento de los botones de la calculadora
const btnsNum = document.querySelectorAll('[data-number]')
const btnsOp = document.querySelectorAll('[data-operation]')
const btnEqual = document.querySelector('[data-equal]')
const btnDeleteNum = document.querySelector('[data-delete]')
const btnAllClear = document.querySelector('[data-all-clear]')
const previousOpTextElem = document.querySelector('[data-previous-operand]')
const currentOpTextElem = document.querySelector('[data-current-operand]')

// Crear una nueva instancia de la calse "Calculator" creada anteriormente (esta clase 
// guarda las funcionalidades de la calculadora)
const calculator = new Calculator(previousOpTextElem, currentOpTextElem)

// Bucle forEach para recorrer cada uno de los botones 
// que contiene un número de la calculadora
btnsNum.forEach(btnNum => {
    // Al hacer click en alguno de estos botones
    btnNum.addEventListener('click', () => {
        // Llamar a la función "appendNumber" para añadir el contenido del 
        // botón a la salida de la calculadora
        calculator.appendNumber(btnNum.innerText)
        // Mostrar la salida de la calculadora actualizada
        calculator.updateDisplayOutput()
    })
})

btnsOp.forEach(btnOp => {
    btnOp.addEventListener('click', () => {
        // Llamar a la función "chooseOperation" para añadir la operación 
        // correspondiente a la salida de la calculadora
        calculator.chooseOperation(btnOp.innerText)
        // Mostrar la salida de la calculadora actualizada
        calculator.updateDisplayOutput()
    })
})

// Al hacer click en el botón de igual
btnEqual.addEventListener('click', () => {
    // Llamar a la función "makeOperation" para que realice la operación correspondiente
    calculator.makeOperation()
    // Mostrar la salida de la calculadora actualizada
    calculator.updateDisplayOutput()
})

// Al hacer click en el botón de AC
btnAllClear.addEventListener('click', () => {
    // Llamar a la función "clear" para que limpie la salida de la calculadora
    calculator.clear()
    // Mostrar la salida de la calculadora actualizada
    calculator.updateDisplayOutput()
})

// Cuando se haga click en el botón DEL
btnDeleteNum.addEventListener('click', () => {
    // LLamar a la función "delete" para eliminar el último número introducido por el usuario
    calculator.delete()
    // LLamar a la función "updateDisplayOutput" para mostrar la salida de la calculadora actualizada
    calculator.updateDisplayOutput()
})