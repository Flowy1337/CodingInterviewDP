

document.addEventListener('DOMContentLoaded', function() {
    var dropdownButtons = document.querySelectorAll('.dropdown-btn');
    var questionItems = document.querySelectorAll('.dropdown-container li');
    var questionImage = document.getElementById('question-image');
    var codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,
        mode: "javascript", // Specify JavaScript mode
        theme: "monokai"
    });
    var saveCodeBtn = document.getElementById('save-code-btn');
    var executeCodeBtn = document.getElementById('execute-code-btn');
    var solution = document.getElementById('solution');
    dropdownButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            var dropdownContainer = this.nextElementSibling;
            if (dropdownContainer.style.display === 'block') {
                dropdownContainer.style.display = 'none';
            } else {
                dropdownContainer.style.display = 'block';
            }
        });
    });

        solution.addEventListener('click', function() {

            if(questionImage.src==='http://localhost:3000/images/fib.png'){
                questionImage.src = ('http://localhost:3000/images/fibSol.png');

            }
            if(questionImage.src==='http://localhost:3000/images/SubstringMatrix.png'){
                questionImage.src = ('http://localhost:3000/images/LCS.png');

            }
            if(questionImage.src==='http://localhost:3000/images/Substring.png'){
                questionImage.src = ('http://localhost:3000/images/SubstringMatrix.png');

            }

            if(questionImage.src==='http://localhost:3000/images/knapsackMatrix.png'){
                questionImage.src='http://localhost:3000/images/KnapsackSol.png'
            }
            if(questionImage.src==='http://localhost:3000/images/knapsack.png'){
               questionImage.src='http://localhost:3000/images/knapsackMatrix.png'
            }


        });

    questionItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var imageUrl = this.getAttribute('data-image');
            questionImage.src = imageUrl;
            questionImage.style.display = 'block';
            if(questionImage.src==='http://localhost:3000/images/fib.png'){

                codeEditor.setValue('function fib(n){'+ '\n'+''+

                    '   return 0;'+ '\n'+ ' }' +
                    '\n' +
                        '\n' +
                        '\n' +
                        '\n' +
                    'fib(14)');



            }
            if(questionImage.src==='http://localhost:3000/images/Substring.png'){
                codeEditor.setValue('function LCSubStr( X,  Y , m , n) {\n' +
                    '   \n' +
                    '\n' +
                    '    var LCStuff =\n' +
                    '        Array(m + 1).fill().map(()=>Array(n + 1).fill(0));\n' +
                    '    var result = 0;\n' +
                    '\n' +
                    '    // To store length of the longest\n' +
                    '    // common substring\n' +
                    '    var result = 0;\n' +
                    '\n' +

                    '    return result;}\n' +

                    '\n' +
                    'var X = "TempleOS";\n' +
                    'var Y = "MacOS";\n' +
                    '\n' +
                    'var m = X.length;\n' +
                    'var n = Y.length;\n' +
                    'LCSubStr(X, Y, m, n);');



            }
            if(questionImage.src==='http://localhost:3000/images/knapsack.png'){
                codeEditor.setValue('');
                codeEditor.setValue('const values = [10, 20, 30, 40];\n' +
                    'const weights = [30, 10, 40, 20];\n' +
                    'const capacity = 40;\n' +
                    '\n' +
                    'function getKnapSack(capacity, values, weights) {\n' +
                    '    // Create array\n' +
                    '    const arr = new Array(values.length + 1);\n' +
                    '\n' +
                    '    for (let i = 0; i < arr.length; i++){\n' +
                    '        arr[i] = new Array(capacity + 1).fill(0);\n' +
                    '    }\n' +
                    '\n' +
                    '    return arr[values.length][capacity];\n' +
                    '}\n' +
                    '\n' +
                    'getKnapSack(capacity, values, weights);');



            }
        });
    });

    saveCodeBtn.addEventListener('click', function() {
        var codeContent = codeEditor.getValue();
        fetch('/save-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: codeContent })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Code saved successfully!');

                } else {
                    alert('Failed to save code.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error saving code.');
            });
    });

    executeCodeBtn.addEventListener('click', function() {
        fetch('/execute-code')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Execution successful! Result: ' + data.result);
                    console.log(questionImage.src)
                    if(data.result === 610 && questionImage.src==='http://localhost:3000/images/fib.png'){
                        document.getElementById('bar-part-1').style.backgroundColor = '#013220'

                    }
                    if(data.result === 2 && questionImage.src==='http://localhost:3000/images/Substring.png'){
                        document.getElementById('bar-part-2').style.backgroundColor = '#013220'

                    }
                    if(data.result === 60 && questionImage.src==='http://localhost:3000/images/knapsack.png'){
                        document.getElementById('bar-part-3').style.backgroundColor = '#013220'

                    }
                    console.log('Execution result:', data.result);
                } else {
                    alert('Execution failed: ' + data.message);
                    console.error('Execution failed:', data.message);
                }
            })
            .catch(error => {
                console.error('Error executing code:', error);
                alert('Error executing code.');
            });
    });


});
