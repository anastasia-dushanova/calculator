import React, { useState } from "react";
const Button = ({ content, onButtonClick, type }) => {
  return (
    <div
      className={`Button ${content === "0" ? "zero" : ""} ${type || ""}`}
      onClick={onButtonClick(content)}
    >
      {content}
    </div>
  );
};

const commafy = value => {
  if (value === "0") return value;
  let output = "";
  let decimal = "";
  let isNeg = false;
  if (value.includes(".")) {
    output = value.substring(0, value.indexOf("."));
    decimal = value.substring(value.indexOf("."));
  } else {
    output = value;
  }
  if (parseFloat(value) < 0) {
    isNeg = true;
    output = output.substring(1);
  }

  return isNeg
    ? "-" + parseFloat(output).toLocaleString() + decimal
    : parseFloat(output).toLocaleString() + decimal;
};

const App = () => {
  const [value, setValue] = useState("0");                    //дисплей (для вывода результата и отображение введенный чисел)
  const [memory, setMemory] = useState(null);                 //по сути это первый операнд
  const [operator, setOperator] = useState(null);             //оператор
  const [lastOperator, setLastOperator] = useState(null);     //последний оператор
  const [lastValue, setLastValue] = useState(null);           //последнее введенное число

  const handleButtonPress = content => () => {
    const num = parseFloat(value);

    //очистка
    if (content === "AC") {
      setValue("0");
      setMemory(null);
      setOperator(null);
      setLastValue(null);
      setLastOperator(null);
      return;
    }

    //смена знака
    if (content === "±") {
      setValue((num * -1).toString());
      return;
    }

    //вычисление процента
    if (content === "%") {
      setValue((num / 100).toString());
      setMemory(null);
      setOperator(null);
      // setLastOperator(null);
      return;
    }

    //точка для записи числа с плавающей точкой
    if (content === ".") {
      if (value.includes(".")) return;
      setValue(value + ".");
      return;
    }

    //сложение
    if (content === "+") {
      if (operator !== null) {
        if (operator === "+") {
          setMemory(memory + parseFloat(value));
        } 
      } else {
        setMemory(parseFloat(value));
      }

      setValue("0");
      setOperator("+");
      // setLastOperator("+");
      return;
    }

    //вычитание
    if (content === "−") {
      if (operator !== null) {
         if (operator === "−") {
          setMemory(memory - parseFloat(value));
        }
      } else {
        setMemory(parseFloat(value));
      }
      setValue("0");
      setOperator("−");
      // setLastOperator("−");
      return;
    }

    //умножение
    if (content === "×") {
      if (operator !== null) {
        if (operator === "×") {
          setMemory(memory * parseFloat(value));
        }
      } else {
        setMemory(parseFloat(value));
      }
      setValue("0");
      setOperator("×");
      // setLastOperator("×");
      return;
    }

    //деление
    if (content === "÷") {
      if (operator !== null) {
        if (operator === "÷") {
          setMemory(memory / parseFloat(value));
        }
      } else {
        setMemory(parseFloat(value));
      }
      setValue("0");
      setOperator("÷");
      // setLastOperator("÷");
      return;
    }

    //вычисление результата
    if (content === "=") {
      if (!operator) return;

      //для повторения последнего действия
      //если изменилась команда, то необходимо перезаписать lastValue и lastOperand
      //но после нажатия на равно, может показаться, что не работает
      //надо нажать на "=" еще раз
      if(operator !== lastOperator){
        setLastValue(value);
        setLastOperator(operator);
        console.log("");
        console.log("value " + value + " lastValue " + lastValue); 
        console.log("operator "+ operator + " lastOperator " + lastOperator);
      }else if(lastValue !== null && lastOperator !== null){  
        if (lastOperator === "+") {
          setValue((memory + parseFloat(lastValue)).toString());
          setMemory(memory + parseFloat(lastValue));
        } else if (lastOperator === "−") {
          setValue((memory - parseFloat(lastValue)).toString());
          setMemory(memory - parseFloat(lastValue));
        } else if (lastOperator === "×") {
          setValue((memory * parseFloat(lastValue)).toString());
          setMemory(memory * parseFloat(lastValue));
        } else if (lastOperator === "÷") {
          if(lastValue === "0"){
            alert("Деление на ноль!");
            return;
          }else{
            setValue((memory / parseFloat(lastValue)).toString());
            setMemory(memory / parseFloat(lastValue));
          }

        }
        console.log("");
        console.log("value " + value + " memory " + memory);
        console.log("lastValue " + lastValue + " lastOperator " + lastOperator);
        return;

      }else{
        setLastValue(parseFloat(value));
        setLastOperator(operator);
        if (operator === "+") {
          setValue((memory + parseFloat(value)).toString());
          setMemory(memory + parseFloat(value));
        } else if (operator === "−") {
          setValue((memory - parseFloat(value)).toString());
          setMemory(memory - parseFloat(value));
        } else if (operator === "×") {
          setValue((memory * parseFloat(value)).toString());
          setMemory(memory * parseFloat(value));
        } else if (operator === "÷") {
          setValue((memory / parseFloat(value)).toString());
          setMemory(memory / parseFloat(value));
        }
        console.log("");
        console.log("value " + value + " memory " + memory);
        console.log("lastValue " + lastValue + " lastOperator " + lastOperator);
        return;
      }
    }

    if (value[value.length - 1] === ".") {
      setValue(value + content);
    } else {
      setValue(parseFloat(num + content).toString());
    }
  };

  return (
    <div className="App">
      <div className="display">{commafy(value)}</div>
      <div className="buttons">
        <Button
          onButtonClick={handleButtonPress}
          content="AC"
          type="function"
        />
        <Button onButtonClick={handleButtonPress} content="±" type="function" />
        <Button onButtonClick={handleButtonPress} content="%" type="function" />
        <Button onButtonClick={handleButtonPress} content="÷" type="operator" />
        <Button onButtonClick={handleButtonPress} content="7" />
        <Button onButtonClick={handleButtonPress} content="8" />
        <Button onButtonClick={handleButtonPress} content="9" />
        <Button onButtonClick={handleButtonPress} content="×" type="operator" />
        <Button onButtonClick={handleButtonPress} content="4" />
        <Button onButtonClick={handleButtonPress} content="5" />
        <Button onButtonClick={handleButtonPress} content="6" />
        <Button onButtonClick={handleButtonPress} content="−" type="operator" />
        <Button onButtonClick={handleButtonPress} content="1" />
        <Button onButtonClick={handleButtonPress} content="2" />
        <Button onButtonClick={handleButtonPress} content="3" />
        <Button onButtonClick={handleButtonPress} content="+" type="operator" />
        <Button onButtonClick={handleButtonPress} content="0" />
        <Button onButtonClick={handleButtonPress} content="." />
        <Button onButtonClick={handleButtonPress} content="=" type="operator" />
      </div>
      <div className="bottom" />
    </div>
  );
};

export default App;
