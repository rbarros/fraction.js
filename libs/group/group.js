/*
 * Group
 * https://github.com/ramon/group.js
 *
 * Copyright (c) 2013 Ramon Barros
 * Licensed under the MIT license.
 */

(function (window, undefined) {
    'use strict';
    var Group = function(string, divide) {
        this.version = '1.1';
        this.groups = [];
        this.divide = divide || false;


        if (string === undefined) {
            return this;
        }

        this.string = string.toString();
        this.setGroup(this.string);
        return this.groups;
    };

    /**
     * Cria os grupos de caracteres e armazena a posição de cada caractere
     * em um array
     * @param {string} string string a ser verificada
     */
    Group.prototype.setGroup = function(string) {
        var i, group, caracter;
        for (i = 0; string.length > i; i += 1) {
            caracter = string[i];
            if (caracter !== undefined) {
                group = this.arrHasDupes(caracter);
                if (group === false) {
                    this.groups.push({ caracter: caracter, position: this.checkIndex(caracter) });
                }
            }
        }
        this.checkGroups();
    };

    /**
     * Verifica se os proximos caracteres da string são iguais
     * @param  {string} caracter caractere a ser verificado
     * @return {boolean}         retorna se o caractere repete
     */
    Group.prototype.arrHasDupes = function (caracter) {
        var i;
        for (i = 0; this.groups.length > i; i += 1) {
            if (this.groups[i].caracter === caracter) {
                return true;
            }
        }
        return false;
    };

    /**
     * Retorna a posição do caractere no array
     * @param  {string} caracter caractere a ser verificado
     * @return {array}           retorna array contendo a posição do caractere
     */
    Group.prototype.checkIndex = function(caracter) {
        var array = [], x = 0;
        while (x <= this.string.length - 1) {
            if (caracter === this.string[x] && this.string[x].indexOf(caracter) !== -1) {
                array.push(x);
            }
            x += 1;
        }
        return array;
    };

    /**
     * Com a posição de cada caractere é possivel montar grupos
     * @return {array} retorna os grupos de caracteres
     */
    Group.prototype.checkGroups = function () {
        var i, j, y, n, n_position, k, x, key, position, caracter, aux = [], equal, grupo_menor = [], grupo_maior = [], ar = [], group, obj = this.groups;

        /**
         * Verifica se o array de posições é menor/igual a 1
         * @type {Number}
         */
        for (i = 0; i < obj.length; i += 1) {
            if ((obj[i].position).length <= 1) {
                grupo_menor.push(obj[i].position);
            } else if ((obj[i].position).length > 1) {
                grupo_maior.push(obj[i].position);
            }
        }

        grupo_menor = grupo_menor.join(",").split(",").sort();
        grupo_maior = grupo_maior.join(",").split(",").sort();

        if ((grupo_menor.length === 0 || grupo_menor[0] === "") && obj.length > 1) {
            //string = this.string.split('').reverse().join('');
            grupo_maior.reverse();
            group = "";
            x = 0;
            n_position = 0;
            n = 0;
            for (i = 0; i < grupo_maior.length; i += 1) {
                position = grupo_maior[i];
                caracter = this.string[position];
                for (j = 0; j < obj.length; j += 1) {
                    if (obj[j].caracter === caracter) {
                        n = (obj[j].position).length;
                    }
                }
                key = group.indexOf(caracter);
                if (key !== -1 || group === "") {
                    group += caracter;
                    if ((group.length % n) === 0) {
                        aux[x] = group;
                        group = "";
                        x += 1;
                    }
                    equal = true;
                } else {
                    group += caracter;
                    if (Math.floor(this.string.length / n) > n_position) {
                        n_position = Math.floor(this.string.length / n);
                    }
                    if ((group.length % n_position) === 0) {
                        if (aux[x]) {
                            aux[x] += group.split('').reverse().join('');
                        } else {
                            aux[x] = group.split('').reverse().join('');
                        }
                        group = "";
                        if (this.divide === true) {
                            x += 1;
                        }
                    }
                    equal = false;
                }
            }

            n = 0;
            group = "";
            for (i = 0; i < aux.length; i += 1) {
                n += aux[i].length;
                group += aux[i];
            }

            if (n < this.string.length) {
                aux.push(this.string.replace(group, ""));
            }

            if (equal) {
                ar = aux.reverse();
            } else {
                ar = aux.reverse();
            }
        }

        if (ar.length === 0) {
            j = 0;
            n = grupo_menor.length;
            if (n > 0 && grupo_menor[0] !== "") {
                for (i = 0; i < n; i += 1) {
                    if (parseInt(grupo_menor[i], 10) === parseInt(j, 10)) {
                        j += 1;
                    } else if (parseInt(grupo_menor[i], 10) !== parseInt(j, 10)) {
                        grupo_menor.push(String(i));
                        grupo_menor.sort();
                        for (y = 0; y < grupo_maior.length; y += 1) {
                            k = grupo_maior[y].indexOf(i);
                            if (k !== -1) {
                                delete grupo_maior[k];
                            }
                        }
                    }
                }

                grupo_maior.sort();

                group = "";
                for (x in grupo_menor) {
                    if (grupo_menor.hasOwnProperty(x)) {
                        group += this.string[grupo_menor[x]];
                    }
                }
                if (group !== "undefined") { ar.push(group); }
                group = "";
                for (x in grupo_maior) {
                    if (grupo_maior.hasOwnProperty(x)) {
                        group += this.string[grupo_maior[x]];
                    }
                }
                if (group !== "undefined") { ar.push(group); }
            } else {
                group = "";
                for (x in grupo_maior) {
                    if (grupo_maior.hasOwnProperty(x)) {
                        group += this.string[grupo_maior[x]];
                    }
                }
                ar.push(group);
            }
        }
        this.groups = ar;
    };

    window.Group = Group;

}(window));