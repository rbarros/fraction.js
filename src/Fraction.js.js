/*!
 * Fraction JavaScript Library v1.0
 * https://github.com/rbarros/fraction.js
 *
 * Copyright (c) 2013 Ramon Barros
 * Licensed under the MIT license.
 *
 *
 * Includes jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 *
 * Date: Tue Nov 20 2012 17:16:39 GMT-0200 (BRST)
 */

/* jslint devel: true, unparam: true, indent: 4, nomen: true */
/* global jQuery,$,document,window,event,url,Group */
(function ($, window) {
    'use strict';

    var Fraction = function (num) {
        this.fraction = null;
        this.numerator = null;
        this.denominator = null;
        this.str = null;
        this.c_virgula = null;
        // Verifica se o num é number e diferente de -1
        if (typeof num === "number" && num !== -1) {
            // Transforma em string para verificar as casas decimais
            this.str = num.toString();
            if (this.str.indexOf(".") > 0) { // Se contem ponto executa  
                // verifica quantas casa depois do ponto
                this.c_virgula = this.str.slice(this.str.indexOf(".") + 1).length;
                if (this.c_virgula > 1 && this.c_virgula < 9) { // Se contiver mais de 1 casa após o ponto executa
                    // Aplica potenciação Exp: 0.175
                    // 3 casas depois do ponto
                    // 0.175 x (10 x 10 x 10) = 175 
                    this.numerator = num * Math.pow(10, this.c_virgula);
                    // (10 x 10 x 10) = 1000
                    this.denominator = Math.pow(10, this.c_virgula);
                    // 175/1000

                } else if (this.c_virgula >= 9) {
                    this.checkDizima(num);
                } else {
                    // Exp: 0.5
                    // 0.5x10 = 5
                    this.numerator = num * 10;
                    // 10
                    this.denominator = 10;
                    // 5/10
                }
            } else {
                // Exp: 2
                // 2
                this.numerator = num;
                // 1
                this.denominator = 1;
                // 2/1
            }
        } else {
            this.fraction = new Fraction(parseFloat(num));
        }
        this.fraction = this.numtoString();
        return this.fraction;
    };

    /**
     * Converte o numeral em fração
     * @return {string}
     */
    Fraction.prototype.numtoString = function () {
        // Retorna resto da divisão do numerando pelo denominador
        var x, y, wholepart = Math.floor(this.numerator / this.denominator), numerator = this.numerator % this.denominator, denominator = this.denominator;
        // Verifica se o numerando é divisivel pelo denominador e se o resto é 0
        if (wholepart > 0 && numerator === 0) {
            // Exp:
            // 1/1, 2/1 e 3/1
            return (this.numerator + '/' + this.denominator).toString();
        }
        if (numerator > 0) {
            // Verifica se o resto da divisão é igual ao numerando  
            x = 1;
            while (x <= numerator) {
                if ((wholepart === 0) && (numerator % this.numerator === 0) && (this.denominator % numerator === 0)) {
                    y = numerator;
                    break;
                } else if ((numerator % x === 0) && (denominator % x === 0)) {
                    y = x;
                }
                x += 1;
            }
            // Y = menor divisor comum;
            // Exp: 8/100 => 2/25 , 75/100 => 3/4, 5/10 => 1/5 e 6/10 => 3/5
            return ((this.numerator / y) + '/' + (this.denominator / y)).toString();
        }
    };

    Fraction.prototype.checkDizima = function (num) {
        var s = num.toString(), group;
        s = s.slice(2, 11);
        group = new Group(s);
        if (group.length <= 1 && this.countGroup(group[0])==group[0].length) {
            this._dizimaSimples(group);
        } else {
            this._dizimaComposta(group);
        }
    };

    Fraction.prototype.countGroup = function (s) {
        var x, y, cnt = 0;
        for (x = 0; x <= s.length; x += 1) {
            for (y = 0; y <= s.length; y += 1) {
                if (s[x] === s[y]) { cnt += 1; }
            }
            break;
        }
        return cnt;
    };

    Fraction.prototype._dizimaSimples = function (array) {
        this.numerator = parseInt(array[0][0], 10);
        this.denominator = parseInt(array[0].length, 10);
    };

    Fraction.prototype._dizimaComposta = function (array) {
        var x, p, y, ant, cant = "",
            per, cper = "",
            g = "";
        if (array.length > 1) {
            ant = array[0];
            per = array[1];
            for (x = 0; x < ant.length; x += 1) {
                cant += "0";
            }
            for (x = 0; x < per.length; x += 1) {
                if(cper.length == 9) { break; }
                g += per[x];
                for (y = 1; y < per.length; y += 1) {
                    cper += "9";
                    if (per[x] === per[y]) { p = true; break; }
                    if (per[x] !== per[y]) { g += per[y]; }
                }
                if (p) { break; }
            }
            this.numerator = (parseFloat(ant) + g) - parseFloat(ant);
            this.denominator = parseInt(cper + cant, 10);
        } else {
            per = array[0];
            for (x = 0; x < per.length; x += 1) {
                if(cper.length == 9) { break; }
                g += per[x];
                for (y = 1; y < per.length; y += 1) {
                    cper += "9";
                    if (per[x] === per[y]) { p = true; break; }
                    if (per[x] !== per[y]) { g += per[y]; }
                }
                if (p) { break; }
            }
            this.numerator = array[0];
            this.denominator = parseInt(cper, 10);
        }
    };

    Fraction.prototype._convert = function () {
        var self = this, str, valor;
        $(document).ready(function () {
            $('.fracao').each(function () {
                if ($(this).is('input')) {
                    str = $(this).val().toString();
                    valor = parseFloat($(this).val());
                    if (valor !== -1 && str.indexOf("/") === -1 && (self.isInt(valor) === false) && valor < 1) {
                        $(this).val(new Fraction(valor).fraction);
                    }
                } else if ($(this).is('select')) {
                    $(this).find('option').each(function () {
                        str = this.value.toString();
                        valor = parseFloat(this.value);
                        if (valor !== -1 && str.indexOf("/") === -1 && (self.isInt(valor) === false) && valor < 1) {
                            this.text = new Fraction(valor).fraction;
                        }
                    });
                } else {
                    str = $(this).text().toString();
                    valor = parseFloat(str);
                    if (valor !== -1 && str.indexOf("/") === -1 && (self.isInt(valor) === false) && valor < 1) {
                        $(this).text(new Fraction(valor).fraction);
                    }
                }
            });
        });
    };

    Fraction.prototype.isInt = function (n) {
        return typeof n === 'number' && parseFloat(n) === parseInt(n, 10) && !isNaN(n);
    };

    window.Fraction = Fraction;
}(jQuery, window));