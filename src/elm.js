(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Types$Course1 = {$: 'Course1'};
var $author$project$Types$MapScreen = function (a) {
	return {$: 'MapScreen', a: a};
};
var $author$project$Types$TitleScreen = {$: 'TitleScreen'};
var $author$project$Types$Unit = function (a) {
	return {$: 'Unit', a: a};
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$init = function (flags) {
	var startUnit = {
		course: $author$project$Types$Course1,
		unit: $author$project$Types$Unit(1)
	};
	var parts = A2($elm$core$String$split, '\t', flags);
	var savedName = A2(
		$elm$core$Maybe$withDefault,
		'',
		$elm$core$List$head(parts));
	var seedInt = A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Maybe$andThen,
			$elm$core$String$toInt,
			$elm$core$List$head(
				A2($elm$core$List$drop, 1, parts))));
	return _Utils_Tuple2(
		{
			confirmingExit: false,
			highestUnlocked: startUnit,
			playerName: savedName,
			screen: $elm$core$String$isEmpty(savedName) ? $author$project$Types$TitleScreen : $author$project$Types$MapScreen(
				{course: $author$project$Types$Course1}),
			seed: $elm$random$Random$initialSeed(seedInt)
		},
		$elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Types$AnimTick = {$: 'AnimTick'};
var $author$project$Config$animIntervalMs = 600.0;
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $author$project$Types$BackToMap = {$: 'BackToMap'};
var $author$project$Types$BeginQuest = {$: 'BeginQuest'};
var $author$project$Types$NextQuest = {$: 'NextQuest'};
var $author$project$Types$RetryUnit = {$: 'RetryUnit'};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Main$enterDecoder = function (model) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (key) {
			if (key !== 'Enter') {
				return $elm$json$Json$Decode$fail('not enter');
			} else {
				var _v0 = model.screen;
				switch (_v0.$) {
					case 'BattleScreen':
						var state = _v0.a;
						var _v1 = state.phase;
						switch (_v1.$) {
							case 'QuestComplete':
								return $elm$json$Json$Decode$succeed($author$project$Types$NextQuest);
							case 'QuestIntro':
								return $elm$json$Json$Decode$succeed($author$project$Types$BeginQuest);
							case 'BattleWon':
								return $elm$json$Json$Decode$succeed($author$project$Types$BackToMap);
							case 'BattleLost':
								return $elm$json$Json$Decode$succeed($author$project$Types$RetryUnit);
							default:
								return $elm$json$Json$Decode$fail('input phase');
						}
					case 'VictoryScreen':
						return $elm$json$Json$Decode$succeed($author$project$Types$BackToMap);
					case 'GameOverScreen':
						return $elm$json$Json$Decode$succeed($author$project$Types$RetryUnit);
					default:
						return $elm$json$Json$Decode$fail('no enter action');
				}
			}
		},
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
};
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var event = _v0.event;
		var key = _v0.key;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				function () {
				var _v0 = model.screen;
				if (_v0.$ === 'BattleScreen') {
					return A2(
						$elm$time$Time$every,
						$author$project$Config$animIntervalMs,
						function (_v1) {
							return $author$project$Types$AnimTick;
						});
				} else {
					return $elm$core$Platform$Sub$none;
				}
			}(),
				$elm$browser$Browser$Events$onKeyDown(
				$author$project$Main$enterDecoder(model))
			]));
};
var $author$project$Types$BattleScreen = function (a) {
	return {$: 'BattleScreen', a: a};
};
var $author$project$Types$BattleWon = {$: 'BattleWon'};
var $author$project$Types$ChapterScreen = function (a) {
	return {$: 'ChapterScreen', a: a};
};
var $author$project$Types$FrameA = {$: 'FrameA'};
var $author$project$Types$FrameB = {$: 'FrameB'};
var $author$project$Types$HelpScreen = F2(
	function (a, b) {
		return {$: 'HelpScreen', a: a, b: b};
	});
var $author$project$Types$Idle = {$: 'Idle'};
var $author$project$Types$NameEntryScreen = function (a) {
	return {$: 'NameEntryScreen', a: a};
};
var $author$project$Types$PasscodeScreen = function (a) {
	return {$: 'PasscodeScreen', a: a};
};
var $author$project$Types$ShowTutorial = F2(
	function (a, b) {
		return {$: 'ShowTutorial', a: a, b: b};
	});
var $author$project$Types$VictoryScreen = function (a) {
	return {$: 'VictoryScreen', a: a};
};
var $author$project$Types$Algebra1 = {$: 'Algebra1'};
var $author$project$Types$Course2 = {$: 'Course2'};
var $author$project$Types$MegaBoss = {$: 'MegaBoss'};
var $author$project$Types$PreAlgebra = {$: 'PreAlgebra'};
var $author$project$Game$Passcode$unitIdKey = function (uid) {
	var u = function () {
		var _v1 = uid.unit;
		if (_v1.$ === 'Unit') {
			var n = _v1.a;
			return $elm$core$String$fromInt(n);
		} else {
			return 'mega';
		}
	}();
	var c = function () {
		var _v0 = uid.course;
		switch (_v0.$) {
			case 'Course1':
				return 'c1';
			case 'Course2':
				return 'c2';
			case 'PreAlgebra':
				return 'pa';
			default:
				return 'a1';
		}
	}();
	return c + ('-' + u);
};
var $author$project$Game$Passcode$nextUnitKey = function (uid) {
	var _v0 = _Utils_Tuple2(uid.course, uid.unit);
	if (_v0.b.$ === 'Unit') {
		switch (_v0.a.$) {
			case 'Course1':
				var _v1 = _v0.a;
				var n = _v0.b.a;
				return (n < 8) ? $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{
							course: $author$project$Types$Course1,
							unit: $author$project$Types$Unit(n + 1)
						})) : $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{course: $author$project$Types$Course1, unit: $author$project$Types$MegaBoss}));
			case 'Course2':
				var _v4 = _v0.a;
				var n = _v0.b.a;
				return (n < 8) ? $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{
							course: $author$project$Types$Course2,
							unit: $author$project$Types$Unit(n + 1)
						})) : $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{course: $author$project$Types$Course2, unit: $author$project$Types$MegaBoss}));
			case 'PreAlgebra':
				var _v7 = _v0.a;
				var n = _v0.b.a;
				return (n < 9) ? $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{
							course: $author$project$Types$PreAlgebra,
							unit: $author$project$Types$Unit(n + 1)
						})) : $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{course: $author$project$Types$PreAlgebra, unit: $author$project$Types$MegaBoss}));
			default:
				var _v10 = _v0.a;
				var n = _v0.b.a;
				return (n < 12) ? $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{
							course: $author$project$Types$Algebra1,
							unit: $author$project$Types$Unit(n + 1)
						})) : $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{course: $author$project$Types$Algebra1, unit: $author$project$Types$MegaBoss}));
		}
	} else {
		switch (_v0.a.$) {
			case 'Course1':
				var _v2 = _v0.a;
				var _v3 = _v0.b;
				return $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{
							course: $author$project$Types$Course2,
							unit: $author$project$Types$Unit(1)
						}));
			case 'Course2':
				var _v5 = _v0.a;
				var _v6 = _v0.b;
				return $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{
							course: $author$project$Types$PreAlgebra,
							unit: $author$project$Types$Unit(1)
						}));
			case 'PreAlgebra':
				var _v8 = _v0.a;
				var _v9 = _v0.b;
				return $elm$core$Maybe$Just(
					$author$project$Game$Passcode$unitIdKey(
						{
							course: $author$project$Types$Algebra1,
							unit: $author$project$Types$Unit(1)
						}));
			default:
				var _v11 = _v0.a;
				var _v12 = _v0.b;
				return $elm$core$Maybe$Nothing;
		}
	}
};
var $author$project$Game$Passcode$table = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			'stone wall paper crow',
			{
				course: $author$project$Types$Course1,
				unit: $author$project$Types$Unit(2)
			}),
			_Utils_Tuple2(
			'lamp silver torch pine',
			{
				course: $author$project$Types$Course1,
				unit: $author$project$Types$Unit(3)
			}),
			_Utils_Tuple2(
			'river moon apple salt',
			{
				course: $author$project$Types$Course1,
				unit: $author$project$Types$Unit(4)
			}),
			_Utils_Tuple2(
			'forge blade iron dust',
			{
				course: $author$project$Types$Course1,
				unit: $author$project$Types$Unit(5)
			}),
			_Utils_Tuple2(
			'brass kettle march wind',
			{
				course: $author$project$Types$Course1,
				unit: $author$project$Types$Unit(6)
			}),
			_Utils_Tuple2(
			'castle door seven noon',
			{
				course: $author$project$Types$Course1,
				unit: $author$project$Types$Unit(7)
			}),
			_Utils_Tuple2(
			'bridge quill amber frost',
			{
				course: $author$project$Types$Course1,
				unit: $author$project$Types$Unit(8)
			}),
			_Utils_Tuple2(
			'thunder helm deep pool',
			{course: $author$project$Types$Course1, unit: $author$project$Types$MegaBoss}),
			_Utils_Tuple2(
			'crystal peak ember song',
			{
				course: $author$project$Types$Course2,
				unit: $author$project$Types$Unit(1)
			}),
			_Utils_Tuple2(
			'shore lantern black twig',
			{
				course: $author$project$Types$Course2,
				unit: $author$project$Types$Unit(2)
			}),
			_Utils_Tuple2(
			'crown vale copper ring',
			{
				course: $author$project$Types$Course2,
				unit: $author$project$Types$Unit(3)
			}),
			_Utils_Tuple2(
			'hollow branch smoke bell',
			{
				course: $author$project$Types$Course2,
				unit: $author$project$Types$Unit(4)
			}),
			_Utils_Tuple2(
			'dusk arrow leather drum',
			{
				course: $author$project$Types$Course2,
				unit: $author$project$Types$Unit(5)
			}),
			_Utils_Tuple2(
			'glacier hound swift mast',
			{
				course: $author$project$Types$Course2,
				unit: $author$project$Types$Unit(6)
			}),
			_Utils_Tuple2(
			'oak shield bright lens',
			{
				course: $author$project$Types$Course2,
				unit: $author$project$Types$Unit(7)
			}),
			_Utils_Tuple2(
			'cliff powder veil chalk',
			{
				course: $author$project$Types$Course2,
				unit: $author$project$Types$Unit(8)
			}),
			_Utils_Tuple2(
			'harbor comet flint straw',
			{course: $author$project$Types$Course2, unit: $author$project$Types$MegaBoss}),
			_Utils_Tuple2(
			'silver bloom arch tide',
			{
				course: $author$project$Types$PreAlgebra,
				unit: $author$project$Types$Unit(1)
			}),
			_Utils_Tuple2(
			'wolf timber shade beam',
			{
				course: $author$project$Types$PreAlgebra,
				unit: $author$project$Types$Unit(2)
			}),
			_Utils_Tuple2(
			'raven cloak north gate',
			{
				course: $author$project$Types$PreAlgebra,
				unit: $author$project$Types$Unit(3)
			}),
			_Utils_Tuple2(
			'ember flask coin tower',
			{
				course: $author$project$Types$PreAlgebra,
				unit: $author$project$Types$Unit(4)
			}),
			_Utils_Tuple2(
			'marsh swift peak dawn',
			{
				course: $author$project$Types$PreAlgebra,
				unit: $author$project$Types$Unit(5)
			}),
			_Utils_Tuple2(
			'frost pine wheel sail',
			{
				course: $author$project$Types$PreAlgebra,
				unit: $author$project$Types$Unit(6)
			}),
			_Utils_Tuple2(
			'vale arrow smoke helm',
			{
				course: $author$project$Types$PreAlgebra,
				unit: $author$project$Types$Unit(7)
			}),
			_Utils_Tuple2(
			'ridge torch copper gale',
			{
				course: $author$project$Types$PreAlgebra,
				unit: $author$project$Types$Unit(8)
			}),
			_Utils_Tuple2(
			'dune mirror pale drift',
			{
				course: $author$project$Types$PreAlgebra,
				unit: $author$project$Types$Unit(9)
			}),
			_Utils_Tuple2(
			'iron bell moss quay',
			{course: $author$project$Types$PreAlgebra, unit: $author$project$Types$MegaBoss}),
			_Utils_Tuple2(
			'storm veil amber crest',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(1)
			}),
			_Utils_Tuple2(
			'blaze chalk quill tide',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(2)
			}),
			_Utils_Tuple2(
			'thorn gate river mist',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(3)
			}),
			_Utils_Tuple2(
			'crest flame loom salt',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(4)
			}),
			_Utils_Tuple2(
			'sand crown night oar',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(5)
			}),
			_Utils_Tuple2(
			'hinge dark well shore',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(6)
			}),
			_Utils_Tuple2(
			'plume brass swift knot',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(7)
			}),
			_Utils_Tuple2(
			'grove seal pale drum',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(8)
			}),
			_Utils_Tuple2(
			'wren coil deep flint',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(9)
			}),
			_Utils_Tuple2(
			'anvil ember moon pool',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(10)
			}),
			_Utils_Tuple2(
			'cleft bower shade ring',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(11)
			}),
			_Utils_Tuple2(
			'spark reed dawn lens',
			{
				course: $author$project$Types$Algebra1,
				unit: $author$project$Types$Unit(12)
			}),
			_Utils_Tuple2(
			'bone vault swift bloom',
			{course: $author$project$Types$Algebra1, unit: $author$project$Types$MegaBoss})
		]));
var $author$project$Game$Passcode$reverseTable = A3(
	$elm$core$Dict$foldl,
	F3(
		function (code, uid, acc) {
			return A3(
				$elm$core$Dict$insert,
				$author$project$Game$Passcode$unitIdKey(uid),
				code,
				acc);
		}),
	$elm$core$Dict$empty,
	$author$project$Game$Passcode$table);
var $author$project$Game$Passcode$codeForUnit = function (uid) {
	var _v0 = $author$project$Game$Passcode$nextUnitKey(uid);
	if (_v0.$ === 'Just') {
		var key = _v0.a;
		return A2($elm$core$Dict$get, key, $author$project$Game$Passcode$reverseTable);
	} else {
		return $elm$core$Maybe$Just('shard peak fire arch');
	}
};
var $author$project$Main$compareUnits = F2(
	function (a, b) {
		var slotRank = function (s) {
			if (s.$ === 'Unit') {
				var n = s.a;
				return n;
			} else {
				return 99;
			}
		};
		var courseRank = function (c) {
			switch (c.$) {
				case 'Course1':
					return 0;
				case 'Course2':
					return 1;
				case 'PreAlgebra':
					return 2;
				default:
					return 3;
			}
		};
		var _v0 = A2(
			$elm$core$Basics$compare,
			courseRank(a.course),
			courseRank(b.course));
		if (_v0.$ === 'EQ') {
			return A2(
				$elm$core$Basics$compare,
				slotRank(a.unit),
				slotRank(b.unit));
		} else {
			var other = _v0;
			return other;
		}
	});
var $author$project$Types$IChoice = function (a) {
	return {$: 'IChoice', a: a};
};
var $author$project$Types$IDecimal = function (a) {
	return {$: 'IDecimal', a: a};
};
var $author$project$Types$IFraction = function (a) {
	return {$: 'IFraction', a: a};
};
var $author$project$Types$IInequality = function (a) {
	return {$: 'IInequality', a: a};
};
var $author$project$Types$IInt = function (a) {
	return {$: 'IInt', a: a};
};
var $author$project$Types$IRoots = function (a) {
	return {$: 'IRoots', a: a};
};
var $author$project$Types$ISystem = function (a) {
	return {$: 'ISystem', a: a};
};
var $author$project$Game$Battle$defaultInput = function (it) {
	switch (it.$) {
		case 'TInteger':
			return $author$project$Types$IInt('');
		case 'TDecimal':
			return $author$project$Types$IDecimal('');
		case 'TFraction':
			return $author$project$Types$IFraction(
				{den: '', num: ''});
		case 'TChoice':
			return $author$project$Types$IChoice($elm$core$Maybe$Nothing);
		case 'TInequality':
			return $author$project$Types$IInequality(
				{dir: $elm$core$Maybe$Nothing, val: ''});
		case 'TSystem':
			return $author$project$Types$ISystem(
				{x: '', y: ''});
		default:
			return $author$project$Types$IRoots(
				{r1: '', r2: ''});
	}
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Main$focusFirstInput = _Platform_outgoingPort(
	'focusFirstInput',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$andThen = F2(
	function (callback, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed) {
				var _v1 = genA(seed);
				var result = _v1.a;
				var newSeed = _v1.b;
				var _v2 = callback(result);
				var genB = _v2.a;
				return genB(newSeed);
			});
	});
var $author$project$Types$AChoice = function (a) {
	return {$: 'AChoice', a: a};
};
var $author$project$Types$TChoice = function (a) {
	return {$: 'TChoice', a: a};
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $author$project$Game$Problem$Common$randInt = F2(
	function (lo, hi) {
		return A2($elm$random$Random$int, lo, hi);
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Game$Problem$Algebra1$shuffleChoices = F2(
	function (correct, wrong) {
		return A2(
			$elm$core$List$cons,
			correct,
			A2($elm$core$List$take, 3, wrong));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Game$Problem$Common$dedupe = F2(
	function (correct, candidates) {
		return A2(
			$elm$core$List$take,
			3,
			A3(
				$elm$core$List$foldl,
				F2(
					function (x, acc) {
						return A2($elm$core$List$member, x, acc) ? _Utils_ap(
							acc,
							_List_fromArray(
								[x + 1])) : _Utils_ap(
							acc,
							_List_fromArray(
								[x]));
					}),
				_List_Nil,
				A2(
					$elm$core$List$filter,
					function (x) {
						return !_Utils_eq(x, correct);
					},
					candidates)));
	});
var $elm$random$Random$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var genA = _v0.a;
		var genB = _v1.a;
		var genC = _v2.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v3 = genA(seed0);
				var a = _v3.a;
				var seed1 = _v3.b;
				var _v4 = genB(seed1);
				var b = _v4.a;
				var seed2 = _v4.b;
				var _v5 = genC(seed2);
				var c = _v5.a;
				var seed3 = _v5.b;
				return _Utils_Tuple2(
					A3(func, a, b, c),
					seed3);
			});
	});
var $author$project$Game$Problem$Common$wrongChoicesInt = function (correct) {
	return A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return A2(
					$elm$core$List$map,
					$elm$core$String$fromInt,
					A2(
						$author$project$Game$Problem$Common$dedupe,
						correct,
						_List_fromArray(
							[correct + a, correct + b, correct - c])));
			}),
		A2($elm$random$Random$int, 1, 5),
		A2($elm$random$Random$int, 6, 12),
		A2($elm$random$Random$int, 1, 4));
};
var $author$project$Game$Problem$Algebra1$genAbsoluteValue = A2(
	$elm$random$Random$andThen,
	function (n) {
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = $elm$core$Basics$abs(n);
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: '|' + ($elm$core$String$fromInt(n) + '| = ?'),
						steps: _List_fromArray(
							[
								'Absolute value is the distance from zero — always non-negative',
								'|' + ($elm$core$String$fromInt(n) + ('| = ' + $elm$core$String$fromInt(correct)))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: '|' + ($elm$core$String$fromInt(n) + '| = ?')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(
				$elm$core$Basics$abs(n)));
	},
	A2($author$project$Game$Problem$Common$randInt, -15, 15));
var $elm$random$Random$map2 = F3(
	function (func, _v0, _v1) {
		var genA = _v0.a;
		var genB = _v1.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v2 = genA(seed0);
				var a = _v2.a;
				var seed1 = _v2.b;
				var _v3 = genB(seed1);
				var b = _v3.a;
				var seed2 = _v3.b;
				return _Utils_Tuple2(
					A2(func, a, b),
					seed2);
			});
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Game$Problem$Algebra1$genCombineLike = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = a + b;
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct) + 'x',
						prompt: $elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + 'x = ?x')),
						steps: _List_fromArray(
							[
								'Add the coefficients: ' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(correct))))),
								'Keep the variable: ' + ($elm$core$String$fromInt(correct) + 'x')
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: $elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + 'x = ?x'))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(a + b));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $author$project$Types$AInt = function (a) {
	return {$: 'AInt', a: a};
};
var $author$project$Types$TInteger = {$: 'TInteger'};
var $author$project$Game$Problem$Algebra1$genEvalExpr = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		return {
			answer: $author$project$Types$AInt((a * x) + b),
			hint: {
				answer: $elm$core$String$fromInt((a * x) + b),
				prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' when x = ' + $elm$core$String$fromInt(x))))),
				steps: _List_fromArray(
					[
						'Substitute x = ' + ($elm$core$String$fromInt(x) + (': ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(x) + (') + ' + $elm$core$String$fromInt(b))))))),
						'Multiply: ' + ($elm$core$String$fromInt(a * x) + (' + ' + $elm$core$String$fromInt(b))),
						'Add: ' + $elm$core$String$fromInt((a * x) + b)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' when x = ' + $elm$core$String$fromInt(x)))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 0, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $elm$random$Random$map4 = F5(
	function (func, _v0, _v1, _v2, _v3) {
		var genA = _v0.a;
		var genB = _v1.a;
		var genC = _v2.a;
		var genD = _v3.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v4 = genA(seed0);
				var a = _v4.a;
				var seed1 = _v4.b;
				var _v5 = genB(seed1);
				var b = _v5.a;
				var seed2 = _v5.b;
				var _v6 = genC(seed2);
				var c = _v6.a;
				var seed3 = _v6.b;
				var _v7 = genD(seed3);
				var d = _v7.a;
				var seed4 = _v7.b;
				return _Utils_Tuple2(
					A4(func, a, b, c, d),
					seed4);
			});
	});
var $author$project$Game$Problem$Algebra1$genOrderOfOps = A2(
	$elm$random$Random$andThen,
	function (r) {
		var correct = (r.a + (r.b * r.c)) - r.d;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: $elm$core$String$fromInt(r.a) + (' + ' + ($elm$core$String$fromInt(r.b) + (' × ' + ($elm$core$String$fromInt(r.c) + (' − ' + ($elm$core$String$fromInt(r.d) + ' = ?')))))),
						steps: _List_fromArray(
							[
								'Multiply first (PEMDAS): ' + ($elm$core$String$fromInt(r.b) + (' × ' + ($elm$core$String$fromInt(r.c) + (' = ' + $elm$core$String$fromInt(r.b * r.c))))),
								'Then add: ' + ($elm$core$String$fromInt(r.a) + (' + ' + ($elm$core$String$fromInt(r.b * r.c) + (' = ' + $elm$core$String$fromInt(r.a + (r.b * r.c)))))),
								'Finally subtract: ' + ($elm$core$String$fromInt(r.a + (r.b * r.c)) + (' − ' + ($elm$core$String$fromInt(r.d) + (' = ' + $elm$core$String$fromInt(correct)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: $elm$core$String$fromInt(r.a) + (' + ' + ($elm$core$String$fromInt(r.b) + (' × ' + ($elm$core$String$fromInt(r.c) + (' − ' + ($elm$core$String$fromInt(r.d) + ' = ?'))))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return {a: a, b: b, c: c, d: d};
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$Algebra1$genTranslateExpr = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$map,
					function (_v1) {
						var k = _v1.a;
						var x = _v1.b;
						return {
							answer: $author$project$Types$AInt(x + k),
							hint: {
								answer: $elm$core$String$fromInt(x + k),
								prompt: '\"' + ($elm$core$String$fromInt(k) + (' more than a number\" — evaluate when the number is ' + $elm$core$String$fromInt(x))),
								steps: _List_fromArray(
									[
										'Translate: x + ' + $elm$core$String$fromInt(k),
										'Substitute x = ' + ($elm$core$String$fromInt(x) + (': ' + ($elm$core$String$fromInt(x) + (' + ' + ($elm$core$String$fromInt(k) + (' = ' + $elm$core$String$fromInt(x + k)))))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: '\"' + ($elm$core$String$fromInt(k) + (' more than a number\" — evaluate when the number is ' + $elm$core$String$fromInt(x)))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 2, 9),
						A2($author$project$Game$Problem$Common$randInt, 1, 9)));
			case 1:
				return A2(
					$elm$random$Random$map,
					function (_v2) {
						var k = _v2.a;
						var x = _v2.b;
						return {
							answer: $author$project$Types$AInt(k * x),
							hint: {
								answer: $elm$core$String$fromInt(k * x),
								prompt: '\"' + ($elm$core$String$fromInt(k) + (' times a number\" — evaluate when the number is ' + $elm$core$String$fromInt(x))),
								steps: _List_fromArray(
									[
										'Translate: ' + ($elm$core$String$fromInt(k) + 'x'),
										'Substitute x = ' + ($elm$core$String$fromInt(x) + (': ' + ($elm$core$String$fromInt(k) + ('(' + ($elm$core$String$fromInt(x) + (') = ' + $elm$core$String$fromInt(k * x)))))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: '\"' + ($elm$core$String$fromInt(k) + (' times a number\" — evaluate when the number is ' + $elm$core$String$fromInt(x)))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 2, 8),
						A2($author$project$Game$Problem$Common$randInt, 2, 9)));
			default:
				return A2(
					$elm$random$Random$map,
					function (_v3) {
						var k = _v3.a;
						var x = _v3.b;
						return {
							answer: $author$project$Types$AInt(x),
							hint: {
								answer: $elm$core$String$fromInt(x),
								prompt: '\"A number decreased by ' + ($elm$core$String$fromInt(k) + ('\" — evaluate when the number is ' + $elm$core$String$fromInt(x + k))),
								steps: _List_fromArray(
									[
										'Translate: n − ' + $elm$core$String$fromInt(k),
										'Substitute n = ' + ($elm$core$String$fromInt(x + k) + (': ' + ($elm$core$String$fromInt(x + k) + (' − ' + ($elm$core$String$fromInt(k) + (' = ' + $elm$core$String$fromInt(x)))))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: '\"A number decreased by ' + ($elm$core$String$fromInt(k) + ('\" — evaluate when the number is ' + $elm$core$String$fromInt(x + k)))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 1, 9),
						A2($author$project$Game$Problem$Common$randInt, 2, 9)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Common$randIntNonZero = F2(
	function (lo, hi) {
		return A2(
			$elm$random$Random$map,
			function (n) {
				return (!n) ? 1 : n;
			},
			A2($elm$random$Random$int, lo, hi));
	});
var $author$project$Game$Problem$Algebra1$genTwoStepEquation = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		var c = (a * x) + b;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: 'x = ' + $elm$core$String$fromInt(x),
				prompt: $elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(c)))),
				steps: _List_fromArray(
					[
						'Subtract ' + ($elm$core$String$fromInt(b) + (' from both sides: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(c - b))))),
						'Divide both sides by ' + ($elm$core$String$fromInt(a) + (': x = ' + $elm$core$String$fromInt(x)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(c))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $author$project$Game$Problem$Algebra1$unit1 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genOrderOfOps;
			case 1:
				return $author$project$Game$Problem$Algebra1$genEvalExpr;
			case 2:
				return $author$project$Game$Problem$Algebra1$genAbsoluteValue;
			case 3:
				return $author$project$Game$Problem$Algebra1$genCombineLike;
			case 4:
				return $author$project$Game$Problem$Algebra1$genTranslateExpr;
			default:
				return $author$project$Game$Problem$Algebra1$genTwoStepEquation;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $elm$random$Random$constant = function (value) {
	return $elm$random$Random$Generator(
		function (seed) {
			return _Utils_Tuple2(value, seed);
		});
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Game$Problem$Common$gcd = F2(
	function (a, b) {
		gcd:
		while (true) {
			if (!b) {
				return $elm$core$Basics$abs(a);
			} else {
				var $temp$a = b,
					$temp$b = A2($elm$core$Basics$modBy, b, a);
				a = $temp$a;
				b = $temp$b;
				continue gcd;
			}
		}
	});
var $author$project$Game$Problem$Common$reduceFraction = F2(
	function (n, d) {
		var sign = (d < 0) ? (-1) : 1;
		var g = A2(
			$author$project$Game$Problem$Common$gcd,
			$elm$core$Basics$abs(n),
			$elm$core$Basics$abs(d));
		return _Utils_Tuple2(((sign * n) / g) | 0, ((sign * d) / g) | 0);
	});
var $author$project$Game$Problem$Algebra1$genMultiplyRational = A2(
	$elm$random$Random$andThen,
	function (r) {
		var numProd = r.a * r.c;
		var denProd = r.b * r.d;
		var _v0 = A2($author$project$Game$Problem$Common$reduceFraction, numProd, denProd);
		var rn = _v0.a;
		var rd = _v0.b;
		var correct = (rd === 1) ? $elm$core$String$fromInt(rn) : ($elm$core$String$fromInt(rn) + ('/' + $elm$core$String$fromInt(rd)));
		var wrongs = _List_fromArray(
			[
				$elm$core$String$fromInt(r.a + r.c) + ('/' + $elm$core$String$fromInt(r.b + r.d)),
				$elm$core$String$fromInt(rn + 1) + ('/' + $elm$core$String$fromInt(rd)),
				$elm$core$String$fromInt(rn) + ('/' + $elm$core$String$fromInt(rd + 1))
			]);
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: '(' + ($elm$core$String$fromInt(r.a) + ('/' + ($elm$core$String$fromInt(r.b) + (') × (' + ($elm$core$String$fromInt(r.c) + ('/' + ($elm$core$String$fromInt(r.d) + ') = ?'))))))),
					steps: _List_fromArray(
						[
							'Multiply numerators: ' + ($elm$core$String$fromInt(r.a) + (' × ' + ($elm$core$String$fromInt(r.c) + (' = ' + $elm$core$String$fromInt(numProd))))),
							'Multiply denominators: ' + ($elm$core$String$fromInt(r.b) + (' × ' + ($elm$core$String$fromInt(r.d) + (' = ' + $elm$core$String$fromInt(denProd))))),
							'Simplify: ' + ($elm$core$String$fromInt(numProd) + ('/' + ($elm$core$String$fromInt(denProd) + (' = ' + correct))))
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: '(' + ($elm$core$String$fromInt(r.a) + ('/' + ($elm$core$String$fromInt(r.b) + (') × (' + ($elm$core$String$fromInt(r.c) + ('/' + ($elm$core$String$fromInt(r.d) + ') = ?')))))))
			});
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return {a: a, b: b, c: c, d: d};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 6),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 6),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6)));
function $author$project$Game$Problem$Algebra1$cyclic$genSimplifyRational() {
	return A2(
		$elm$random$Random$andThen,
		function (_v0) {
			var g = _v0.a;
			var a = _v0.b;
			var b = _v0.c;
			if (_Utils_eq(a, b)) {
				return $author$project$Game$Problem$Algebra1$cyclic$genSimplifyRational();
			} else {
				var num = g * a;
				var den = g * b;
				var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, num, den);
				var rn = _v1.a;
				var rd = _v1.b;
				var correct = $elm$core$String$fromInt(rn) + ('/' + $elm$core$String$fromInt(rd));
				var wrongs = _List_fromArray(
					[
						$elm$core$String$fromInt(num) + ('/' + $elm$core$String$fromInt(den)),
						$elm$core$String$fromInt(rn + 1) + ('/' + $elm$core$String$fromInt(rd)),
						$elm$core$String$fromInt(rn) + ('/' + $elm$core$String$fromInt(rd + 1))
					]);
				var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
				return $elm$random$Random$constant(
					{
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: correct,
							prompt: 'Simplify: ' + ($elm$core$String$fromInt(num) + ('x / (' + ($elm$core$String$fromInt(den) + 'x)'))),
							steps: _List_fromArray(
								[
									'Cancel the common factor x: ' + ($elm$core$String$fromInt(num) + ('/' + $elm$core$String$fromInt(den))),
									$elm$core$String$fromInt(num) + ('/' + ($elm$core$String$fromInt(den) + (' → GCF is ' + ($elm$core$String$fromInt(g) + (' → ' + correct)))))
								])
						},
						inputType: $author$project$Types$TChoice(choices),
						prompt: 'Simplify: ' + ($elm$core$String$fromInt(num) + ('x / (' + ($elm$core$String$fromInt(den) + 'x)')))
					});
			}
		},
		A4(
			$elm$random$Random$map3,
			F3(
				function (g, a, b) {
					return _Utils_Tuple3(g, a, b);
				}),
			A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6),
			A2($author$project$Game$Problem$Common$randInt, 1, 5),
			A2($author$project$Game$Problem$Common$randInt, 1, 5)));
}
try {
	var $author$project$Game$Problem$Algebra1$genSimplifyRational = $author$project$Game$Problem$Algebra1$cyclic$genSimplifyRational();
	$author$project$Game$Problem$Algebra1$cyclic$genSimplifyRational = function () {
		return $author$project$Game$Problem$Algebra1$genSimplifyRational;
	};
} catch ($) {
	throw 'Some top-level definitions from `Game.Problem.Algebra1` are causing infinite recursion:\n\n  ┌─────┐\n  │    genSimplifyRational\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$Game$Problem$Algebra1$unit10 = A2(
	$elm$random$Random$andThen,
	function (t) {
		if (!t) {
			return $author$project$Game$Problem$Algebra1$genSimplifyRational;
		} else {
			return $author$project$Game$Problem$Algebra1$genMultiplyRational;
		}
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Algebra1$genAddSubRadical = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var k = _v0.c;
		var coeff = a + b;
		var correct = (coeff === 1) ? ('√' + $elm$core$String$fromInt(k)) : ($elm$core$String$fromInt(coeff) + ('√' + $elm$core$String$fromInt(k)));
		var wrongs = _List_fromArray(
			[
				$elm$core$String$fromInt(coeff + 1) + ('√' + $elm$core$String$fromInt(k)),
				$elm$core$String$fromInt(coeff - 1) + ('√' + $elm$core$String$fromInt(k)),
				$elm$core$String$fromInt(coeff) + ('√' + $elm$core$String$fromInt(k + 1))
			]);
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: $elm$core$String$fromInt(a) + ('√' + ($elm$core$String$fromInt(k) + (' + ' + ($elm$core$String$fromInt(b) + ('√' + ($elm$core$String$fromInt(k) + ' = ?')))))),
					steps: _List_fromArray(
						[
							'Like radicals: add coefficients',
							$elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(coeff) + (' → ' + correct)))))
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: $elm$core$String$fromInt(a) + ('√' + ($elm$core$String$fromInt(k) + (' + ' + ($elm$core$String$fromInt(b) + ('√' + ($elm$core$String$fromInt(k) + ' = ?'))))))
			});
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, k) {
				return _Utils_Tuple3(a, b, k);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 2, 7)));
var $author$project$Game$Problem$Algebra1$genMultiplyRadical = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var product = a * b;
		var wrongs = _List_fromArray(
			[
				'√' + $elm$core$String$fromInt(product + 1),
				$elm$core$String$fromInt(a) + ('√' + $elm$core$String$fromInt(b)),
				'√' + $elm$core$String$fromInt(a + b)
			]);
		var correct = '√' + $elm$core$String$fromInt(product);
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: '√' + ($elm$core$String$fromInt(a) + (' × √' + ($elm$core$String$fromInt(b) + ' = ?'))),
					steps: _List_fromArray(
						[
							'√a × √b = √(a·b)',
							'√' + ($elm$core$String$fromInt(a) + (' × √' + ($elm$core$String$fromInt(b) + (' = √' + $elm$core$String$fromInt(product)))))
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: '√' + ($elm$core$String$fromInt(a) + (' × √' + ($elm$core$String$fromInt(b) + ' = ?')))
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8)));
var $author$project$Game$Problem$Algebra1$genSimplifyRadical = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var n = _v0.a;
		var k = _v0.b;
		var wrongs = _List_fromArray(
			[
				$elm$core$String$fromInt(n + 1) + ('√' + $elm$core$String$fromInt(k)),
				$elm$core$String$fromInt(n) + ('√' + $elm$core$String$fromInt(k + 1)),
				$elm$core$String$fromInt(n * k)
			]);
		var radicand = (n * n) * k;
		var correct = (k === 1) ? $elm$core$String$fromInt(n) : ($elm$core$String$fromInt(n) + ('√' + $elm$core$String$fromInt(k)));
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Simplify: √' + $elm$core$String$fromInt(radicand),
					steps: _List_fromArray(
						[
							'Factor: ' + ($elm$core$String$fromInt(radicand) + (' = ' + ($elm$core$String$fromInt(n * n) + (' × ' + ($elm$core$String$fromInt(k) + (' = ' + ($elm$core$String$fromInt(n) + ('² × ' + $elm$core$String$fromInt(k))))))))),
							'Pull out perfect square: √(' + ($elm$core$String$fromInt(n * n) + ('·' + ($elm$core$String$fromInt(k) + (') = ' + correct))))
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Simplify: √' + $elm$core$String$fromInt(radicand)
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$Algebra1$genSolveRadicalEq = A2(
	$elm$random$Random$map,
	function (n) {
		return {
			answer: $author$project$Types$AInt(n * n),
			hint: {
				answer: 'x = ' + $elm$core$String$fromInt(n * n),
				prompt: 'Solve: √x = ' + $elm$core$String$fromInt(n),
				steps: _List_fromArray(
					[
						'Square both sides: x = ' + ($elm$core$String$fromInt(n) + ('² = ' + $elm$core$String$fromInt(n * n))),
						'Check: √' + ($elm$core$String$fromInt(n * n) + (' = ' + ($elm$core$String$fromInt(n) + ' ✓')))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: √x = ' + $elm$core$String$fromInt(n)
		};
	},
	A2($author$project$Game$Problem$Common$randInt, 2, 12));
var $author$project$Game$Problem$Algebra1$unit11 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genSimplifyRadical;
			case 1:
				return $author$project$Game$Problem$Algebra1$genAddSubRadical;
			case 2:
				return $author$project$Game$Problem$Algebra1$genMultiplyRadical;
			default:
				return $author$project$Game$Problem$Algebra1$genSolveRadicalEq;
		}
	},
	A2($elm$random$Random$int, 0, 3));
function $author$project$Game$Problem$Algebra1$cyclic$genMeanSD() {
	return A2(
		$elm$random$Random$andThen,
		function (r) {
			var total = ((r.a + r.b) + r.c) + r.d;
			if (!(!A2($elm$core$Basics$modBy, 4, total))) {
				return $author$project$Game$Problem$Algebra1$cyclic$genMeanSD();
			} else {
				var mean = (total / 4) | 0;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Algebra1$shuffleChoices,
							$elm$core$String$fromInt(mean),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(mean),
								prompt: 'Find the mean of: ' + ($elm$core$String$fromInt(r.a) + (', ' + ($elm$core$String$fromInt(r.b) + (', ' + ($elm$core$String$fromInt(r.c) + (', ' + $elm$core$String$fromInt(r.d))))))),
								steps: _List_fromArray(
									[
										'Add all values: ' + ($elm$core$String$fromInt(r.a) + (' + ' + ($elm$core$String$fromInt(r.b) + (' + ' + ($elm$core$String$fromInt(r.c) + (' + ' + ($elm$core$String$fromInt(r.d) + (' = ' + $elm$core$String$fromInt(total))))))))),
										'Divide by count (4): ' + ($elm$core$String$fromInt(total) + ('/4 = ' + $elm$core$String$fromInt(mean)))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Find the mean of: ' + ($elm$core$String$fromInt(r.a) + (', ' + ($elm$core$String$fromInt(r.b) + (', ' + ($elm$core$String$fromInt(r.c) + (', ' + $elm$core$String$fromInt(r.d)))))))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(mean));
			}
		},
		A5(
			$elm$random$Random$map4,
			F4(
				function (a, b, c, d) {
					return {a: a, b: b, c: c, d: d};
				}),
			A2($author$project$Game$Problem$Common$randInt, 2, 10),
			A2($author$project$Game$Problem$Common$randInt, 2, 10),
			A2($author$project$Game$Problem$Common$randInt, 2, 10),
			A2($author$project$Game$Problem$Common$randInt, 2, 10)));
}
try {
	var $author$project$Game$Problem$Algebra1$genMeanSD = $author$project$Game$Problem$Algebra1$cyclic$genMeanSD();
	$author$project$Game$Problem$Algebra1$cyclic$genMeanSD = function () {
		return $author$project$Game$Problem$Algebra1$genMeanSD;
	};
} catch ($) {
	throw 'Some top-level definitions from `Game.Problem.Algebra1` are causing infinite recursion:\n\n  ┌─────┐\n  │    genMeanSD\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$Game$Problem$Algebra1$genVariance = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var d1 = _v0.a;
		var d2 = _v0.b;
		var variance = (((((d1 * d1) + (d2 * d2)) + (d1 * d1)) + (d2 * d2)) / 4) | 0;
		var m = 10;
		var v1 = m + d1;
		var v2 = m + d2;
		var v3 = m - d1;
		var v4 = m - d2;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(variance),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(variance),
						prompt: 'Find the variance of: ' + ($elm$core$String$fromInt(v1) + (', ' + ($elm$core$String$fromInt(v2) + (', ' + ($elm$core$String$fromInt(v3) + (', ' + ($elm$core$String$fromInt(v4) + (' (mean = ' + ($elm$core$String$fromInt(m) + ')'))))))))),
						steps: _List_fromArray(
							[
								'Deviations from mean: ' + ($elm$core$String$fromInt(d1) + (', ' + ($elm$core$String$fromInt(d2) + (', −' + ($elm$core$String$fromInt(d1) + (', −' + $elm$core$String$fromInt(d2))))))),
								'Squared: ' + ($elm$core$String$fromInt(d1 * d1) + (', ' + ($elm$core$String$fromInt(d2 * d2) + (', ' + ($elm$core$String$fromInt(d1 * d1) + (', ' + $elm$core$String$fromInt(d2 * d2))))))),
								'Variance = (' + ($elm$core$String$fromInt(d1 * d1) + ('+' + ($elm$core$String$fromInt(d2 * d2) + ('+' + ($elm$core$String$fromInt(d1 * d1) + ('+' + ($elm$core$String$fromInt(d2 * d2) + (')/4 = ' + ($elm$core$String$fromInt(2 * ((d1 * d1) + (d2 * d2))) + ('/4 = ' + $elm$core$String$fromInt(variance)))))))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Find the variance of: ' + ($elm$core$String$fromInt(v1) + (', ' + ($elm$core$String$fromInt(v2) + (', ' + ($elm$core$String$fromInt(v3) + (', ' + ($elm$core$String$fromInt(v4) + (' (mean = ' + ($elm$core$String$fromInt(m) + ')')))))))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(variance));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$Algebra1$genZScore = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var mu = _v0.a;
		var sigma = _v0.b;
		var k = _v0.c;
		var z = k;
		var x = mu + (sigma * k);
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(z),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(z),
						prompt: 'Mean μ = ' + ($elm$core$String$fromInt(mu) + (', σ = ' + ($elm$core$String$fromInt(sigma) + ('. Find the z-score for x = ' + ($elm$core$String$fromInt(x) + '.'))))),
						steps: _List_fromArray(
							[
								'z = (x − μ) / σ',
								'= (' + ($elm$core$String$fromInt(x) + (' − ' + ($elm$core$String$fromInt(mu) + (') / ' + ($elm$core$String$fromInt(sigma) + (' = ' + ($elm$core$String$fromInt(x - mu) + ('/' + ($elm$core$String$fromInt(sigma) + (' = ' + $elm$core$String$fromInt(z)))))))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Mean μ = ' + ($elm$core$String$fromInt(mu) + (', σ = ' + ($elm$core$String$fromInt(sigma) + ('. Find the z-score for x = ' + ($elm$core$String$fromInt(x) + '.')))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(z));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (mu, sigma, k) {
				return _Utils_Tuple3(mu, sigma, k);
			}),
		A2($author$project$Game$Problem$Common$randInt, 50, 80),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 10),
		A2($author$project$Game$Problem$Common$randInt, -3, 3)));
var $author$project$Game$Problem$Algebra1$unit12 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genMeanSD;
			case 1:
				return $author$project$Game$Problem$Algebra1$genZScore;
			default:
				return $author$project$Game$Problem$Algebra1$genVariance;
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Types$ARoots = F2(
	function (a, b) {
		return {$: 'ARoots', a: a, b: b};
	});
var $author$project$Types$TRoots = {$: 'TRoots'};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Game$Problem$Algebra1$genAbsValueEq = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var r2 = ((-c) - b) / a;
		var r1 = (c - b) / a;
		return {
			answer: A2($author$project$Types$ARoots, r1, r2),
			hint: {
				answer: 'x = ' + ($elm$core$String$fromFloat(r1) + (' or x = ' + $elm$core$String$fromFloat(r2))),
				prompt: '|' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('| = ' + $elm$core$String$fromInt(c))))),
				steps: _List_fromArray(
					[
						'Set up two cases: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(c) + (' and ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = −' + $elm$core$String$fromInt(c))))))))))),
						'Case 1: ' + ($elm$core$String$fromInt(a) + ('x = ' + ($elm$core$String$fromInt(c - b) + (', x = ' + $elm$core$String$fromFloat(r1))))),
						'Case 2: ' + ($elm$core$String$fromInt(a) + ('x = ' + ($elm$core$String$fromInt((-c) - b) + (', x = ' + $elm$core$String$fromFloat(r2)))))
					])
			},
			inputType: $author$project$Types$TRoots,
			prompt: '|' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('| = ' + $elm$core$String$fromInt(c)))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 4),
		A2($author$project$Game$Problem$Common$randInt, 0, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 12)));
function $author$project$Game$Problem$Algebra1$cyclic$genAlgebraicProportion() {
	return A2(
		$elm$random$Random$andThen,
		function (_v0) {
			var a = _v0.a;
			var b = _v0.b;
			var c = _v0.c;
			var x = ((b * c) / a) | 0;
			return ((!a) || ((!(!A2($elm$core$Basics$modBy, a, b * c))) || (x <= 0))) ? $author$project$Game$Problem$Algebra1$cyclic$genAlgebraicProportion() : A2(
				$elm$random$Random$map,
				function (wrong) {
					var choices = A2(
						$author$project$Game$Problem$Algebra1$shuffleChoices,
						$elm$core$String$fromInt(x),
						wrong);
					return {
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: 'x = ' + $elm$core$String$fromInt(x),
							prompt: $elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(c) + '/x')))),
							steps: _List_fromArray(
								[
									'Cross-multiply: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(b * c))),
									'Divide by ' + ($elm$core$String$fromInt(a) + (': x = ' + $elm$core$String$fromInt(x)))
								])
						},
						inputType: $author$project$Types$TChoice(choices),
						prompt: $elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(c) + '/x'))))
					};
				},
				$author$project$Game$Problem$Common$wrongChoicesInt(x));
		},
		A4(
			$elm$random$Random$map3,
			F3(
				function (a, b, c) {
					return _Utils_Tuple3(a, b, c);
				}),
			A2($author$project$Game$Problem$Common$randIntNonZero, 2, 8),
			A2($author$project$Game$Problem$Common$randInt, 1, 8),
			A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6)));
}
try {
	var $author$project$Game$Problem$Algebra1$genAlgebraicProportion = $author$project$Game$Problem$Algebra1$cyclic$genAlgebraicProportion();
	$author$project$Game$Problem$Algebra1$cyclic$genAlgebraicProportion = function () {
		return $author$project$Game$Problem$Algebra1$genAlgebraicProportion;
	};
} catch ($) {
	throw 'Some top-level definitions from `Game.Problem.Algebra1` are causing infinite recursion:\n\n  ┌─────┐\n  │    genAlgebraicProportion\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$Game$Problem$Algebra1$genLiteralEq = A2(
	$elm$random$Random$map,
	function (_v0) {
		var l = _v0.a;
		var w = _v0.b;
		var p = (2 * l) + (2 * w);
		return {
			answer: $author$project$Types$AInt(w),
			hint: {
				answer: 'w = ' + $elm$core$String$fromInt(w),
				prompt: 'Perimeter P = 2l + 2w. Find w when P = ' + ($elm$core$String$fromInt(p) + (' and l = ' + $elm$core$String$fromInt(l))),
				steps: _List_fromArray(
					[
						'Substitute: ' + ($elm$core$String$fromInt(p) + (' = 2(' + ($elm$core$String$fromInt(l) + ') + 2w'))),
						$elm$core$String$fromInt(p) + (' = ' + ($elm$core$String$fromInt(2 * l) + (' + 2w → 2w = ' + ($elm$core$String$fromInt(p - (2 * l)) + (' → w = ' + $elm$core$String$fromInt(w))))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Perimeter P = 2l + 2w. Find w when P = ' + ($elm$core$String$fromInt(p) + (' and l = ' + $elm$core$String$fromInt(l)))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 10),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Algebra1$genMultiStepEq = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		var c = a * (x + b);
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: 'x = ' + $elm$core$String$fromInt(x),
				prompt: $elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') = ' + $elm$core$String$fromInt(c)))),
				steps: _List_fromArray(
					[
						'Divide both sides by ' + ($elm$core$String$fromInt(a) + (': x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt((c / a) | 0))))),
						'Subtract ' + ($elm$core$String$fromInt(b) + (': x = ' + $elm$core$String$fromInt(x)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') = ' + $elm$core$String$fromInt(c))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Algebra1$genVarsBothSides = A2(
	$elm$random$Random$map,
	function (r) {
		var d = ((r.a - r.c) * r.x) + r.b;
		var cStr = $elm$core$String$fromInt(r.c) + 'x';
		var aStr = $elm$core$String$fromInt(r.a) + 'x';
		return {
			answer: $author$project$Types$AInt(r.x),
			hint: {
				answer: 'x = ' + $elm$core$String$fromInt(r.x),
				prompt: aStr + (' + ' + ($elm$core$String$fromInt(r.b) + (' = ' + (cStr + (' + ' + $elm$core$String$fromInt(d)))))),
				steps: _List_fromArray(
					[
						'Subtract ' + (cStr + (' from both sides: ' + ($elm$core$String$fromInt(r.a - r.c) + ('x + ' + ($elm$core$String$fromInt(r.b) + (' = ' + $elm$core$String$fromInt(d))))))),
						'Subtract ' + ($elm$core$String$fromInt(r.b) + (': ' + ($elm$core$String$fromInt(r.a - r.c) + ('x = ' + $elm$core$String$fromInt(d - r.b))))),
						'Divide by ' + ($elm$core$String$fromInt(r.a - r.c) + (': x = ' + $elm$core$String$fromInt(r.x)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: aStr + (' + ' + ($elm$core$String$fromInt(r.b) + (' = ' + (cStr + (' + ' + $elm$core$String$fromInt(d))))))
		};
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, x) {
				return {a: a, b: b, c: c, x: x};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 12),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 4),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Algebra1$unit2 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genMultiStepEq;
			case 1:
				return $author$project$Game$Problem$Algebra1$genVarsBothSides;
			case 2:
				return $author$project$Game$Problem$Algebra1$genAlgebraicProportion;
			case 3:
				return $author$project$Game$Problem$Algebra1$genAbsValueEq;
			default:
				return $author$project$Game$Problem$Algebra1$genLiteralEq;
		}
	},
	A2($elm$random$Random$int, 0, 4));
var $author$project$Game$Problem$Algebra1$genArithmeticSeq = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var first = _v0.a;
		var d = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var a5 = first + (4 * d);
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(a5),
					wrong);
				var a4 = first + (3 * d);
				var a3 = first + (2 * d);
				var a2 = first + d;
				var a1 = first;
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(a5),
						prompt: 'Find the next term: ' + ($elm$core$String$fromInt(a1) + (', ' + ($elm$core$String$fromInt(a2) + (', ' + ($elm$core$String$fromInt(a3) + (', ' + ($elm$core$String$fromInt(a4) + ', ?'))))))),
						steps: _List_fromArray(
							[
								'Common difference: ' + ($elm$core$String$fromInt(a2) + (' − ' + ($elm$core$String$fromInt(a1) + (' = ' + $elm$core$String$fromInt(d))))),
								'Next term: ' + ($elm$core$String$fromInt(a4) + (' + ' + ($elm$core$String$fromInt(d) + (' = ' + $elm$core$String$fromInt(a5)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Find the next term: ' + ($elm$core$String$fromInt(a1) + (', ' + ($elm$core$String$fromInt(a2) + (', ' + ($elm$core$String$fromInt(a3) + (', ' + ($elm$core$String$fromInt(a4) + ', ?')))))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(first + (4 * d)));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Algebra1$genDomainRange = A2(
	$elm$random$Random$andThen,
	function (r) {
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(r.a),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(r.a),
						prompt: 'The relation is {(' + ($elm$core$String$fromInt(r.a) + (', 2), (' + ($elm$core$String$fromInt(r.b) + (', 5), (' + ($elm$core$String$fromInt(r.c) + (', 3), (' + ($elm$core$String$fromInt(r.d) + ', 8)}. What is the smallest element of the domain?'))))))),
						steps: _List_fromArray(
							[
								'The domain is the set of all x-values (first coordinates)',
								'x-values: ' + ($elm$core$String$fromInt(r.a) + (', ' + ($elm$core$String$fromInt(r.b) + (', ' + ($elm$core$String$fromInt(r.c) + (', ' + $elm$core$String$fromInt(r.d))))))),
								'Smallest: ' + $elm$core$String$fromInt(r.a)
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'The relation is {(' + ($elm$core$String$fromInt(r.a) + (', 2), (' + ($elm$core$String$fromInt(r.b) + (', 5), (' + ($elm$core$String$fromInt(r.c) + (', 3), (' + ($elm$core$String$fromInt(r.d) + ', 8)}. What is the smallest element of the domain?')))))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(r.a));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return {a: a, b: b, c: c, d: d};
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 6, 10),
		A2($author$project$Game$Problem$Common$randInt, 11, 15),
		A2($author$project$Game$Problem$Common$randInt, 16, 20)));
var $author$project$Game$Problem$Algebra1$genEvalFunction = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		return {
			answer: $author$project$Types$AInt((a * x) + b),
			hint: {
				answer: $elm$core$String$fromInt((a * x) + b),
				prompt: 'f(x) = ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('. Find f(' + ($elm$core$String$fromInt(x) + ').'))))),
				steps: _List_fromArray(
					[
						'Substitute x = ' + ($elm$core$String$fromInt(x) + (': f(' + ($elm$core$String$fromInt(x) + (') = ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(x) + (') + ' + $elm$core$String$fromInt(b))))))))),
						'= ' + ($elm$core$String$fromInt(a * x) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt((a * x) + b)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'f(x) = ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('. Find f(' + ($elm$core$String$fromInt(x) + ').')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 7),
		A2($author$project$Game$Problem$Common$randInt, 0, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Algebra1$genIsFunction = A2(
	$elm$random$Random$map,
	function (t) {
		switch (t) {
			case 0:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Yes',
						prompt: 'Is this a function? {(1,2), (2,3), (3,4), (4,5)}',
						steps: _List_fromArray(
							['Each x-value maps to exactly one y-value', 'x-values 1, 2, 3, 4 are all different → it is a function'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Yes', 'No'])),
					prompt: 'Is this a function? {(1,2), (2,3), (3,4), (4,5)}'
				};
			case 1:
				return {
					answer: $author$project$Types$AChoice(1),
					hint: {
						answer: 'No',
						prompt: 'Is this a function? {(1,2), (1,3), (2,4)}',
						steps: _List_fromArray(
							['The x-value 1 maps to both 2 and 3', 'One input has two outputs → not a function'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Yes', 'No'])),
					prompt: 'Is this a function? {(1,2), (1,3), (2,4)}'
				};
			case 2:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Yes',
						prompt: 'Is this a function? {(2,5), (3,5), (4,5)}',
						steps: _List_fromArray(
							['Each x maps to exactly one y (even if y repeats)', 'x-values 2, 3, 4 are all different → it is a function'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Yes', 'No'])),
					prompt: 'Is this a function? {(2,5), (3,5), (4,5)}'
				};
			default:
				return {
					answer: $author$project$Types$AChoice(1),
					hint: {
						answer: 'No',
						prompt: 'Is this a function? {(0,1), (0,−1), (1,0)}',
						steps: _List_fromArray(
							['x = 0 maps to both 1 and −1', 'One input with two outputs → not a function'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Yes', 'No'])),
					prompt: 'Is this a function? {(0,1), (0,−1), (1,0)}'
				};
		}
	},
	A2($elm$random$Random$int, 0, 3));
var $author$project$Game$Problem$Algebra1$unit3 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genDomainRange;
			case 1:
				return $author$project$Game$Problem$Algebra1$genIsFunction;
			case 2:
				return $author$project$Game$Problem$Algebra1$genEvalFunction;
			default:
				return $author$project$Game$Problem$Algebra1$genArithmeticSeq;
		}
	},
	A2($elm$random$Random$int, 0, 3));
var $author$project$Game$Problem$Algebra1$showSigned = function (n) {
	return (n < 0) ? ('(' + ($elm$core$String$fromInt(n) + ')')) : $elm$core$String$fromInt(n);
};
var $author$project$Game$Problem$Algebra1$genParallelSlope = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var m = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(m),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(m),
						prompt: 'A line parallel to y = ' + ($author$project$Game$Problem$Algebra1$showSigned(m) + ('x + ' + ($elm$core$String$fromInt(b) + ' has what slope?'))),
						steps: _List_fromArray(
							[
								'Parallel lines have the same slope',
								'Slope of y = ' + ($author$project$Game$Problem$Algebra1$showSigned(m) + ('x + ' + ($elm$core$String$fromInt(b) + (' is ' + $elm$core$String$fromInt(m)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'A line parallel to y = ' + ($author$project$Game$Problem$Algebra1$showSigned(m) + ('x + ' + ($elm$core$String$fromInt(b) + ' has what slope?')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(m));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, -9, 9)));
var $author$project$Game$Problem$Algebra1$genPerpSlope = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var m = _v0.a;
		var b = _v0.b;
		var wrongs = _List_fromArray(
			[
				$elm$core$String$fromInt(m),
				$elm$core$String$fromInt(-m),
				'1/' + $elm$core$String$fromInt(m)
			]);
		var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, -1, m);
		var pn = _v1.a;
		var pd = _v1.b;
		var perpStr = (pd === 1) ? $elm$core$String$fromInt(pn) : ($elm$core$String$fromInt(pn) + ('/' + $elm$core$String$fromInt(pd)));
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, perpStr, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: perpStr,
					prompt: 'A line perpendicular to y = ' + ($elm$core$String$fromInt(m) + ('x + ' + ($elm$core$String$fromInt(b) + ' has what slope?'))),
					steps: _List_fromArray(
						[
							'Perpendicular slope = negative reciprocal of ' + $elm$core$String$fromInt(m),
							'Negate and flip: ' + perpStr
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'A line perpendicular to y = ' + ($elm$core$String$fromInt(m) + ('x + ' + ($elm$core$String$fromInt(b) + ' has what slope?')))
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, -9, 9)));
function $author$project$Game$Problem$Algebra1$cyclic$genSlopeFromPoints() {
	return A2(
		$elm$random$Random$andThen,
		function (r) {
			var y2 = r.y1 + r.dy;
			var x2 = r.x1 + r.dx;
			var slopeNum = r.dy;
			var slopeDen = r.dx;
			var _v0 = A2($author$project$Game$Problem$Common$reduceFraction, slopeNum, slopeDen);
			var rn = _v0.a;
			var rd = _v0.b;
			return (!rd) ? $author$project$Game$Problem$Algebra1$cyclic$genSlopeFromPoints() : A2(
				$elm$random$Random$map,
				function (wrong) {
					var slopeStr = (rd === 1) ? $elm$core$String$fromInt(rn) : ($elm$core$String$fromInt(rn) + ('/' + $elm$core$String$fromInt(rd)));
					var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, slopeStr, wrong);
					return {
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: slopeStr,
							prompt: 'Find the slope through (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(r.y1) + (') and (' + ($elm$core$String$fromInt(x2) + (', ' + ($elm$core$String$fromInt(y2) + ').'))))))),
							steps: _List_fromArray(
								[
									'm = (y₂ − y₁) / (x₂ − x₁)',
									'= (' + ($elm$core$String$fromInt(y2) + (' − ' + ($elm$core$String$fromInt(r.y1) + (') / (' + ($elm$core$String$fromInt(x2) + (' − ' + ($elm$core$String$fromInt(r.x1) + (') = ' + ($elm$core$String$fromInt(r.dy) + ('/' + ($elm$core$String$fromInt(r.dx) + (' = ' + slopeStr))))))))))))
								])
						},
						inputType: $author$project$Types$TChoice(choices),
						prompt: 'Find the slope through (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(r.y1) + (') and (' + ($elm$core$String$fromInt(x2) + (', ' + ($elm$core$String$fromInt(y2) + ').')))))))
					};
				},
				$author$project$Game$Problem$Common$wrongChoicesInt(rn));
		},
		A5(
			$elm$random$Random$map4,
			F4(
				function (x1, y1, dx, dy) {
					return {dx: dx, dy: dy, x1: x1, y1: y1};
				}),
			A2($author$project$Game$Problem$Common$randInt, -5, 4),
			A2($author$project$Game$Problem$Common$randInt, -5, 4),
			A2($author$project$Game$Problem$Common$randIntNonZero, 1, 5),
			A2($author$project$Game$Problem$Common$randInt, -5, 5)));
}
try {
	var $author$project$Game$Problem$Algebra1$genSlopeFromPoints = $author$project$Game$Problem$Algebra1$cyclic$genSlopeFromPoints();
	$author$project$Game$Problem$Algebra1$cyclic$genSlopeFromPoints = function () {
		return $author$project$Game$Problem$Algebra1$genSlopeFromPoints;
	};
} catch ($) {
	throw 'Some top-level definitions from `Game.Problem.Algebra1` are causing infinite recursion:\n\n  ┌─────┐\n  │    genSlopeFromPoints\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$Game$Problem$Algebra1$genSlopeIntercept = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var m = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(b),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(b),
						prompt: 'What is the y-intercept of y = ' + ($author$project$Game$Problem$Algebra1$showSigned(m) + ('x + ' + ($elm$core$String$fromInt(b) + '?'))),
						steps: _List_fromArray(
							[
								'The y-intercept is the value of b in y = mx + b',
								'When x = 0: y = ' + $elm$core$String$fromInt(b)
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'What is the y-intercept of y = ' + ($author$project$Game$Problem$Algebra1$showSigned(m) + ('x + ' + ($elm$core$String$fromInt(b) + '?')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(b));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, -9, 9)));
var $author$project$Game$Problem$Algebra1$genXIntercept = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var aAdj = (!A2($elm$core$Basics$modBy, a, c)) ? a : 1;
		var xInt = (c / aAdj) | 0;
		return {
			answer: $author$project$Types$AInt(xInt),
			hint: {
				answer: $elm$core$String$fromInt(xInt),
				prompt: $elm$core$String$fromInt(aAdj) + ('x + ' + ($elm$core$String$fromInt(b) + ('y = ' + ($elm$core$String$fromInt(c) + '. Find the x-intercept.')))),
				steps: _List_fromArray(
					[
						'Set y = 0: ' + ($elm$core$String$fromInt(aAdj) + ('x = ' + $elm$core$String$fromInt(c))),
						'Divide: x = ' + $elm$core$String$fromInt(xInt)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $elm$core$String$fromInt(aAdj) + ('x + ' + ($elm$core$String$fromInt(b) + ('y = ' + ($elm$core$String$fromInt(c) + '. Find the x-intercept.'))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 5),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 2, 20)));
var $author$project$Game$Problem$Algebra1$genYIntercept = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var bAdj = (!A2($elm$core$Basics$modBy, b, c)) ? b : 1;
		var yInt = (c / bAdj) | 0;
		return {
			answer: $author$project$Types$AInt(yInt),
			hint: {
				answer: $elm$core$String$fromInt(yInt),
				prompt: $elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(bAdj) + ('y = ' + ($elm$core$String$fromInt(c) + '. Find the y-intercept.')))),
				steps: _List_fromArray(
					[
						'Set x = 0: ' + ($elm$core$String$fromInt(bAdj) + ('y = ' + $elm$core$String$fromInt(c))),
						'Divide: y = ' + $elm$core$String$fromInt(yInt)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(bAdj) + ('y = ' + ($elm$core$String$fromInt(c) + '. Find the y-intercept.'))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 5),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 2, 20)));
var $author$project$Game$Problem$Algebra1$unit4 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genSlopeFromPoints;
			case 1:
				return $author$project$Game$Problem$Algebra1$genSlopeIntercept;
			case 2:
				return $author$project$Game$Problem$Algebra1$genYIntercept;
			case 3:
				return $author$project$Game$Problem$Algebra1$genXIntercept;
			case 4:
				return $author$project$Game$Problem$Algebra1$genParallelSlope;
			default:
				return $author$project$Game$Problem$Algebra1$genPerpSlope;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Types$ASystem = F2(
	function (a, b) {
		return {$: 'ASystem', a: a, b: b};
	});
var $author$project$Types$TSystem = {$: 'TSystem'};
var $author$project$Game$Problem$Algebra1$genSystemElimination = A2(
	$elm$random$Random$map,
	function (r) {
		var c2 = (r.a * r.x) - (r.b * r.y);
		var c = (r.a * r.x) + (r.b * r.y);
		return {
			answer: A2($author$project$Types$ASystem, r.x, r.y),
			hint: {
				answer: 'x = ' + ($elm$core$String$fromInt(r.x) + (', y = ' + $elm$core$String$fromInt(r.y))),
				prompt: 'Solve the system:\n' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + ('y = ' + ($elm$core$String$fromInt(c) + ('\n' + ($elm$core$String$fromInt(r.a) + ('x − ' + ($elm$core$String$fromInt(r.b) + ('y = ' + $elm$core$String$fromInt(c2))))))))))),
				steps: _List_fromArray(
					[
						'Add the equations: ' + ($elm$core$String$fromInt(2 * r.a) + ('x = ' + ($elm$core$String$fromInt(c + c2) + (' → x = ' + $elm$core$String$fromInt(r.x))))),
						'Substitute x = ' + ($elm$core$String$fromInt(r.x) + (' into first: ' + ($elm$core$String$fromInt(r.a) + ('(' + ($elm$core$String$fromInt(r.x) + (') + ' + ($elm$core$String$fromInt(r.b) + ('y = ' + ($elm$core$String$fromInt(c) + (' → y = ' + $elm$core$String$fromInt(r.y)))))))))))
					])
			},
			inputType: $author$project$Types$TSystem,
			prompt: 'Solve the system:\n' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + ('y = ' + ($elm$core$String$fromInt(c) + ('\n' + ($elm$core$String$fromInt(r.a) + ('x − ' + ($elm$core$String$fromInt(r.b) + ('y = ' + $elm$core$String$fromInt(c2)))))))))))
		};
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, x, y) {
				return {a: a, b: b, x: x, y: y};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 5),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$Algebra1$genSystemSubstitution = A2(
	$elm$random$Random$map,
	function (r) {
		var y = (r.a * r.x) + r.b;
		var e = (r.c * r.x) + y;
		return {
			answer: A2($author$project$Types$ASystem, r.x, y),
			hint: {
				answer: 'x = ' + ($elm$core$String$fromInt(r.x) + (', y = ' + $elm$core$String$fromInt(y))),
				prompt: 'Solve the system:\ny = ' + ($author$project$Game$Problem$Algebra1$showSigned(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + ('\n' + ($elm$core$String$fromInt(r.c) + ('x + y = ' + $elm$core$String$fromInt(e))))))),
				steps: _List_fromArray(
					[
						'Substitute y = ' + ($author$project$Game$Problem$Algebra1$showSigned(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (' into ' + ($elm$core$String$fromInt(r.c) + ('x + y = ' + $elm$core$String$fromInt(e))))))),
						$elm$core$String$fromInt(r.c) + ('x + (' + ($author$project$Game$Problem$Algebra1$showSigned(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (') = ' + ($elm$core$String$fromInt(e) + (' → ' + ($elm$core$String$fromInt(r.c + r.a) + ('x = ' + ($elm$core$String$fromInt(e - r.b) + (' → x = ' + $elm$core$String$fromInt(r.x)))))))))))),
						'y = ' + ($author$project$Game$Problem$Algebra1$showSigned(r.a) + ('(' + ($elm$core$String$fromInt(r.x) + (') + ' + ($elm$core$String$fromInt(r.b) + (' = ' + $elm$core$String$fromInt(y)))))))
					])
			},
			inputType: $author$project$Types$TSystem,
			prompt: 'Solve the system:\ny = ' + ($author$project$Game$Problem$Algebra1$showSigned(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + ('\n' + ($elm$core$String$fromInt(r.c) + ('x + y = ' + $elm$core$String$fromInt(e)))))))
		};
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, x) {
				return {a: a, b: b, c: c, x: x};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 4),
		A2($author$project$Game$Problem$Common$randInt, -5, 5),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$Algebra1$genSystemWordProblem = A2(
	$elm$random$Random$map,
	function (_v0) {
		var larger = _v0.a;
		var smaller = _v0.b;
		var sumAB = larger + smaller;
		var diffAB = larger - smaller;
		return {
			answer: $author$project$Types$AInt(larger),
			hint: {
				answer: $elm$core$String$fromInt(larger),
				prompt: 'Two numbers sum to ' + ($elm$core$String$fromInt(sumAB) + (' and their difference is ' + ($elm$core$String$fromInt(diffAB) + '. Find the larger number.'))),
				steps: _List_fromArray(
					[
						'x + y = ' + ($elm$core$String$fromInt(sumAB) + (' and x − y = ' + $elm$core$String$fromInt(diffAB))),
						'Add: 2x = ' + ($elm$core$String$fromInt(sumAB + diffAB) + (' → x = ' + $elm$core$String$fromInt(larger)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Two numbers sum to ' + ($elm$core$String$fromInt(sumAB) + (' and their difference is ' + ($elm$core$String$fromInt(diffAB) + '. Find the larger number.')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 10),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Algebra1$unit5 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genSystemSubstitution;
			case 1:
				return $author$project$Game$Problem$Algebra1$genSystemElimination;
			default:
				return $author$project$Game$Problem$Algebra1$genSystemWordProblem;
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $elm$core$Basics$pow = _Basics_pow;
var $author$project$Game$Problem$Algebra1$superscript = function (n) {
	switch (n) {
		case 2:
			return '²';
		case 3:
			return '³';
		case 4:
			return '⁴';
		case 5:
			return '⁵';
		case 6:
			return '⁶';
		case 7:
			return '⁷';
		default:
			return '^' + $elm$core$String$fromInt(n);
	}
};
var $author$project$Game$Problem$Algebra1$genNegativeExponent = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var base = _v0.a;
		var n = _v0.b;
		var denom = A2($elm$core$Basics$pow, base, n);
		var wrongs = _List_fromArray(
			[
				$elm$core$String$fromInt(-denom),
				'1/' + $elm$core$String$fromInt(denom + 1),
				$elm$core$String$fromInt(
				A2($elm$core$Basics$pow, base, n + 1))
			]);
		var correct = '1/' + $elm$core$String$fromInt(denom);
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: $elm$core$String$fromInt(base) + ('^(−' + ($elm$core$String$fromInt(n) + ') = ?')),
					steps: _List_fromArray(
						[
							'Negative exponent: flip to denominator',
							$elm$core$String$fromInt(base) + ('^(−' + ($elm$core$String$fromInt(n) + (') = 1/' + ($elm$core$String$fromInt(base) + ($author$project$Game$Problem$Algebra1$superscript(n) + (' = 1/' + $elm$core$String$fromInt(denom)))))))
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: $elm$core$String$fromInt(base) + ('^(−' + ($elm$core$String$fromInt(n) + ') = ?'))
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 4),
		A2($author$project$Game$Problem$Common$randInt, 1, 3)));
var $author$project$Game$Problem$Algebra1$genPowerRule = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = a * b;
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'x' + $author$project$Game$Problem$Algebra1$superscript(correct),
						prompt: '(x' + ($author$project$Game$Problem$Algebra1$superscript(a) + (')' + ($author$project$Game$Problem$Algebra1$superscript(b) + ' = x^?'))),
						steps: _List_fromArray(
							[
								'Power rule: multiply exponents',
								$elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(correct) + (' → x' + $author$project$Game$Problem$Algebra1$superscript(correct))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: '(x' + ($author$project$Game$Problem$Algebra1$superscript(a) + (')' + ($author$project$Game$Problem$Algebra1$superscript(b) + ' = x^?')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(a * b));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 5),
		A2($author$project$Game$Problem$Common$randInt, 2, 4)));
var $author$project$Game$Problem$Algebra1$genProductRule = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = a + b;
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'x' + $author$project$Game$Problem$Algebra1$superscript(correct),
						prompt: 'x' + ($author$project$Game$Problem$Algebra1$superscript(a) + (' · x' + ($author$project$Game$Problem$Algebra1$superscript(b) + ' = x^?'))),
						steps: _List_fromArray(
							[
								'Product rule: add exponents',
								$elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(correct) + (' → x' + $author$project$Game$Problem$Algebra1$superscript(correct))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'x' + ($author$project$Game$Problem$Algebra1$superscript(a) + (' · x' + ($author$project$Game$Problem$Algebra1$superscript(b) + ' = x^?')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(a + b));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 7),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$Algebra1$genQuotientRule = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = a - b;
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'x' + $author$project$Game$Problem$Algebra1$superscript(correct),
						prompt: 'x' + ($author$project$Game$Problem$Algebra1$superscript(a) + (' / x' + ($author$project$Game$Problem$Algebra1$superscript(b) + ' = x^?'))),
						steps: _List_fromArray(
							[
								'Quotient rule: subtract exponents',
								$elm$core$String$fromInt(a) + (' − ' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(correct) + (' → x' + $author$project$Game$Problem$Algebra1$superscript(correct))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'x' + ($author$project$Game$Problem$Algebra1$superscript(a) + (' / x' + ($author$project$Game$Problem$Algebra1$superscript(b) + ' = x^?')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(a - b));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 5, 10),
		A2($author$project$Game$Problem$Common$randInt, 2, 4)));
var $author$project$Game$Problem$Algebra1$genScientificNotation = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var n = _v0.b;
		var wrongs = _List_fromArray(
			[
				$elm$core$String$fromInt(a) + (' × 10^' + $elm$core$String$fromInt(n + 1)),
				$elm$core$String$fromInt(a) + (' × 10^' + $elm$core$String$fromInt(n - 1)),
				$elm$core$String$fromInt(a + 1) + (' × 10^' + $elm$core$String$fromInt(n))
			]);
		var value = a * A2($elm$core$Basics$pow, 10, n);
		var valueStr = $elm$core$String$fromFloat(value);
		var correct = $elm$core$String$fromInt(a) + (' × 10^' + $elm$core$String$fromInt(n));
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Write ' + (valueStr + ' in scientific notation.'),
					steps: _List_fromArray(
						[
							'Move decimal to get one non-zero digit before the decimal point',
							'Moved ' + ($elm$core$String$fromInt(n) + (' places left → 10^' + $elm$core$String$fromInt(n))),
							'Answer: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Write ' + (valueStr + ' in scientific notation.')
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$Algebra1$unit6 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genProductRule;
			case 1:
				return $author$project$Game$Problem$Algebra1$genQuotientRule;
			case 2:
				return $author$project$Game$Problem$Algebra1$genPowerRule;
			case 3:
				return $author$project$Game$Problem$Algebra1$genNegativeExponent;
			case 4:
				return $author$project$Game$Problem$Algebra1$genScientificNotation;
			default:
				return $author$project$Game$Problem$Algebra1$genSimplifyRadical;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Game$Problem$Algebra1$genAddSubPolynomial = A2(
	$elm$random$Random$andThen,
	function (r) {
		var xCoeff = r.a + r.c;
		var constTerm = r.b + r.d;
		var correct = $elm$core$String$fromInt(xCoeff) + ('x + ' + $elm$core$String$fromInt(constTerm));
		var wrongs = _List_fromArray(
			[
				$elm$core$String$fromInt(xCoeff + 1) + ('x + ' + $elm$core$String$fromInt(constTerm)),
				$elm$core$String$fromInt(xCoeff) + ('x + ' + $elm$core$String$fromInt(constTerm + 1)),
				$elm$core$String$fromInt(xCoeff - 1) + ('x + ' + $elm$core$String$fromInt(constTerm - 1))
			]);
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: '(' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (') + (' + ($elm$core$String$fromInt(r.c) + ('x + ' + ($elm$core$String$fromInt(r.d) + ') = ?'))))))),
					steps: _List_fromArray(
						[
							'Combine x terms: ' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.c) + ('x = ' + ($elm$core$String$fromInt(xCoeff) + 'x'))))),
							'Combine constants: ' + ($elm$core$String$fromInt(r.b) + (' + ' + ($elm$core$String$fromInt(r.d) + (' = ' + $elm$core$String$fromInt(constTerm))))),
							'Answer: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: '(' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (') + (' + ($elm$core$String$fromInt(r.c) + ('x + ' + ($elm$core$String$fromInt(r.d) + ') = ?')))))))
			});
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return {a: a, b: b, c: c, d: d};
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Algebra1$genFOIL = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var sumAB = a + b;
		var prodAB = a * b;
		var wrongs = _List_fromArray(
			[
				'x² + ' + ($elm$core$String$fromInt(sumAB + 1) + ('x + ' + $elm$core$String$fromInt(prodAB))),
				'x² + ' + ($elm$core$String$fromInt(sumAB) + ('x + ' + $elm$core$String$fromInt(prodAB + 1))),
				'x² + ' + ($elm$core$String$fromInt(a * b) + ('x + ' + $elm$core$String$fromInt(a + b)))
			]);
		var correct = 'x² + ' + ($elm$core$String$fromInt(sumAB) + ('x + ' + $elm$core$String$fromInt(prodAB)));
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: '(x + ' + ($elm$core$String$fromInt(a) + (')(x + ' + ($elm$core$String$fromInt(b) + ') = ?'))),
					steps: _List_fromArray(
						[
							'FOIL: First: x·x = x²',
							'Outer + Inner: ' + ($elm$core$String$fromInt(b) + ('x + ' + ($elm$core$String$fromInt(a) + ('x = ' + ($elm$core$String$fromInt(sumAB) + 'x'))))),
							'Last: ' + ($elm$core$String$fromInt(a) + ('·' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(prodAB))))),
							'Answer: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: '(x + ' + ($elm$core$String$fromInt(a) + (')(x + ' + ($elm$core$String$fromInt(b) + ') = ?')))
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Algebra1$genFactorGCF = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var g = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var wrongs = _List_fromArray(
			[
				$elm$core$String$fromInt(g + 1) + ('(x + ' + ($elm$core$String$fromInt(c) + ')')),
				$elm$core$String$fromInt(g) + ('(x + ' + ($elm$core$String$fromInt(c + 1) + ')')),
				$elm$core$String$fromInt(g * c) + ('(x + ' + ($elm$core$String$fromInt(b) + ')'))
			]);
		var term2 = g * c;
		var term1 = g * b;
		var correct = $elm$core$String$fromInt(g) + ('(x + ' + ($elm$core$String$fromInt(c) + ')'));
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Factor: ' + ($elm$core$String$fromInt(term1) + ('x + ' + $elm$core$String$fromInt(term2))),
					steps: _List_fromArray(
						[
							'GCF of ' + ($elm$core$String$fromInt(term1) + (' and ' + ($elm$core$String$fromInt(term2) + (' is ' + $elm$core$String$fromInt(g))))),
							$elm$core$String$fromInt(term1) + ('x / ' + ($elm$core$String$fromInt(g) + (' = ' + ($elm$core$String$fromInt(b) + ('x, ' + ($elm$core$String$fromInt(term2) + (' / ' + ($elm$core$String$fromInt(g) + (' = ' + $elm$core$String$fromInt(c)))))))))),
							'Answer: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Factor: ' + ($elm$core$String$fromInt(term1) + ('x + ' + $elm$core$String$fromInt(term2)))
			});
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (g, b, c) {
				return _Utils_Tuple3(g, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$Algebra1$genFactorTrinomial = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var r = _v0.a;
		var s = _v0.b;
		var correct = '(x + ' + ($elm$core$String$fromInt(r) + (')(x + ' + ($elm$core$String$fromInt(s) + ')')));
		var c = r * s;
		var b = r + s;
		var wrongs = _List_fromArray(
			[
				'(x + ' + ($elm$core$String$fromInt(r + 1) + (')(x + ' + ($elm$core$String$fromInt(s - 1) + ')'))),
				'(x + ' + ($elm$core$String$fromInt(b) + (')(x + ' + ($elm$core$String$fromInt(1) + ')'))),
				'(x − ' + ($elm$core$String$fromInt(r) + (')(x − ' + ($elm$core$String$fromInt(s) + ')')))
			]);
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Factor: x² + ' + ($elm$core$String$fromInt(b) + ('x + ' + $elm$core$String$fromInt(c))),
					steps: _List_fromArray(
						[
							'Find two numbers that multiply to ' + ($elm$core$String$fromInt(c) + (' and add to ' + $elm$core$String$fromInt(b))),
							$elm$core$String$fromInt(r) + (' × ' + ($elm$core$String$fromInt(s) + (' = ' + ($elm$core$String$fromInt(c) + (' and ' + ($elm$core$String$fromInt(r) + (' + ' + ($elm$core$String$fromInt(s) + (' = ' + $elm$core$String$fromInt(b)))))))))),
							'Answer: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Factor: x² + ' + ($elm$core$String$fromInt(b) + ('x + ' + $elm$core$String$fromInt(c)))
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 7),
		A2($author$project$Game$Problem$Common$randInt, 1, 7)));
var $author$project$Game$Problem$Algebra1$genMonomialTimesPolynomial = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var xCoeff = a * b;
		var constTerm = a * c;
		var correct = $elm$core$String$fromInt(xCoeff) + ('x + ' + $elm$core$String$fromInt(constTerm));
		var wrongs = _List_fromArray(
			[
				$elm$core$String$fromInt(xCoeff + a) + ('x + ' + $elm$core$String$fromInt(constTerm)),
				$elm$core$String$fromInt(xCoeff) + ('x + ' + $elm$core$String$fromInt(constTerm + a)),
				$elm$core$String$fromInt(b + c) + 'x'
			]);
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: $elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(b) + ('x + ' + ($elm$core$String$fromInt(c) + ') = ?')))),
					steps: _List_fromArray(
						[
							'Distribute: ' + ($elm$core$String$fromInt(a) + (' · ' + ($elm$core$String$fromInt(b) + ('x = ' + ($elm$core$String$fromInt(xCoeff) + 'x'))))),
							$elm$core$String$fromInt(a) + (' · ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt(constTerm)))),
							'Answer: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: $elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(b) + ('x + ' + ($elm$core$String$fromInt(c) + ') = ?'))))
			});
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Algebra1$unit7 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genAddSubPolynomial;
			case 1:
				return $author$project$Game$Problem$Algebra1$genMonomialTimesPolynomial;
			case 2:
				return $author$project$Game$Problem$Algebra1$genFOIL;
			case 3:
				return $author$project$Game$Problem$Algebra1$genFactorGCF;
			default:
				return $author$project$Game$Problem$Algebra1$genFactorTrinomial;
		}
	},
	A2($elm$random$Random$int, 0, 4));
function $author$project$Game$Problem$Algebra1$cyclic$genAxisOfSymmetry() {
	return A2(
		$elm$random$Random$andThen,
		function (_v0) {
			var a = _v0.a;
			var b = _v0.b;
			var c = _v0.c;
			var num = -b;
			var denom = 2 * a;
			if (!(!A2($elm$core$Basics$modBy, denom, num))) {
				return $author$project$Game$Problem$Algebra1$cyclic$genAxisOfSymmetry();
			} else {
				var axis = (num / denom) | 0;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Algebra1$shuffleChoices,
							$elm$core$String$fromInt(axis),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: 'x = ' + $elm$core$String$fromInt(axis),
								prompt: 'Axis of symmetry of y = ' + ($elm$core$String$fromInt(a) + ('x² + ' + ($author$project$Game$Problem$Algebra1$showSigned(b) + ('x + ' + ($elm$core$String$fromInt(c) + '?'))))),
								steps: _List_fromArray(
									[
										'x = −b/(2a) = −(' + ($elm$core$String$fromInt(b) + (')/(2·' + ($elm$core$String$fromInt(a) + (') = ' + ($elm$core$String$fromInt(num) + ('/' + ($elm$core$String$fromInt(denom) + (' = ' + $elm$core$String$fromInt(axis)))))))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Axis of symmetry of y = ' + ($elm$core$String$fromInt(a) + ('x² + ' + ($author$project$Game$Problem$Algebra1$showSigned(b) + ('x + ' + ($elm$core$String$fromInt(c) + '?')))))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(axis));
			}
		},
		A4(
			$elm$random$Random$map3,
			F3(
				function (a, b, c) {
					return _Utils_Tuple3(a, b, c);
				}),
			A2($author$project$Game$Problem$Common$randIntNonZero, 1, 4),
			A2($author$project$Game$Problem$Common$randInt, -8, 8),
			A2($author$project$Game$Problem$Common$randInt, -10, 10)));
}
try {
	var $author$project$Game$Problem$Algebra1$genAxisOfSymmetry = $author$project$Game$Problem$Algebra1$cyclic$genAxisOfSymmetry();
	$author$project$Game$Problem$Algebra1$cyclic$genAxisOfSymmetry = function () {
		return $author$project$Game$Problem$Algebra1$genAxisOfSymmetry;
	};
} catch ($) {
	throw 'Some top-level definitions from `Game.Problem.Algebra1` are causing infinite recursion:\n\n  ┌─────┐\n  │    genAxisOfSymmetry\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$Game$Problem$Algebra1$genDiscriminant = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var disc = (b * b) - ((4 * a) * c);
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Algebra1$shuffleChoices,
					$elm$core$String$fromInt(disc),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(disc),
						prompt: 'Find the discriminant of ' + ($elm$core$String$fromInt(a) + ('x² + ' + ($author$project$Game$Problem$Algebra1$showSigned(b) + ('x + ' + $elm$core$String$fromInt(c))))),
						steps: _List_fromArray(
							[
								'Discriminant = b² − 4ac',
								'= ' + ($elm$core$String$fromInt(b) + ('² − 4(' + ($elm$core$String$fromInt(a) + (')(' + ($elm$core$String$fromInt(c) + (') = ' + ($elm$core$String$fromInt(b * b) + (' − ' + ($elm$core$String$fromInt((4 * a) * c) + (' = ' + $elm$core$String$fromInt(disc)))))))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Find the discriminant of ' + ($elm$core$String$fromInt(a) + ('x² + ' + ($author$project$Game$Problem$Algebra1$showSigned(b) + ('x + ' + $elm$core$String$fromInt(c)))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(disc));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 4),
		A2($author$project$Game$Problem$Common$randInt, -6, 6),
		A2($author$project$Game$Problem$Common$randInt, -5, 5)));
var $author$project$Game$Problem$Algebra1$genQuadraticFormula = A2(
	$elm$random$Random$map,
	function (_v0) {
		var r = _v0.a;
		var s = _v0.b;
		var c = r * s;
		var b = -(r + s);
		return {
			answer: A2($author$project$Types$ARoots, r, s),
			hint: {
				answer: 'x = ' + ($elm$core$String$fromInt(r) + (' or x = ' + $elm$core$String$fromInt(s))),
				prompt: 'Use the quadratic formula. Solve: x² + ' + ($author$project$Game$Problem$Algebra1$showSigned(b) + ('x + ' + ($elm$core$String$fromInt(c) + ' = 0'))),
				steps: _List_fromArray(
					[
						'x = [−b ± √(b²−4ac)] / (2a), with a=1, b=' + ($elm$core$String$fromInt(b) + (', c=' + $elm$core$String$fromInt(c))),
						'= [' + ($elm$core$String$fromInt(-b) + (' ± √(' + ($elm$core$String$fromInt(b * b) + ('−' + ($elm$core$String$fromInt(4 * c) + (')] / 2 = [' + ($elm$core$String$fromInt(-b) + (' ± ' + ($elm$core$String$fromInt(r + s) + '] / 2'))))))))),
						'x = ' + ($elm$core$String$fromInt(r) + (' or x = ' + $elm$core$String$fromInt(s)))
					])
			},
			inputType: $author$project$Types$TRoots,
			prompt: 'Use the quadratic formula. Solve: x² + ' + ($author$project$Game$Problem$Algebra1$showSigned(b) + ('x + ' + ($elm$core$String$fromInt(c) + ' = 0')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$Algebra1$genSolveByFactoring = A2(
	$elm$random$Random$map,
	function (_v0) {
		var r = _v0.a;
		var s = _v0.b;
		var c = r * s;
		var b = r + s;
		return {
			answer: A2($author$project$Types$ARoots, -r, -s),
			hint: {
				answer: 'x = −' + ($elm$core$String$fromInt(r) + (' or x = −' + $elm$core$String$fromInt(s))),
				prompt: 'Solve: x² + ' + ($elm$core$String$fromInt(b) + ('x + ' + ($elm$core$String$fromInt(c) + ' = 0'))),
				steps: _List_fromArray(
					[
						'Factor: (x + ' + ($elm$core$String$fromInt(r) + (')(x + ' + ($elm$core$String$fromInt(s) + ') = 0'))),
						'Set each factor to zero',
						'x = −' + ($elm$core$String$fromInt(r) + (' or x = −' + $elm$core$String$fromInt(s)))
					])
			},
			inputType: $author$project$Types$TRoots,
			prompt: 'Solve: x² + ' + ($elm$core$String$fromInt(b) + ('x + ' + ($elm$core$String$fromInt(c) + ' = 0')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 7),
		A2($author$project$Game$Problem$Common$randInt, 1, 7)));
var $author$project$Game$Problem$Algebra1$genSolveBySquareRoot = A2(
	$elm$random$Random$map,
	function (n) {
		var nn = n * n;
		return {
			answer: A2($author$project$Types$ARoots, n, -n),
			hint: {
				answer: 'x = ' + ($elm$core$String$fromInt(n) + (' or x = −' + $elm$core$String$fromInt(n))),
				prompt: 'Solve: x² = ' + $elm$core$String$fromInt(nn),
				steps: _List_fromArray(
					[
						'Take square root of both sides',
						'x = ±√' + ($elm$core$String$fromInt(nn) + (' = ±' + $elm$core$String$fromInt(n)))
					])
			},
			inputType: $author$project$Types$TRoots,
			prompt: 'Solve: x² = ' + $elm$core$String$fromInt(nn)
		};
	},
	A2($author$project$Game$Problem$Common$randInt, 1, 9));
var $author$project$Game$Problem$Algebra1$unit8 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Algebra1$genAxisOfSymmetry;
			case 1:
				return $author$project$Game$Problem$Algebra1$genDiscriminant;
			case 2:
				return $author$project$Game$Problem$Algebra1$genSolveByFactoring;
			case 3:
				return $author$project$Game$Problem$Algebra1$genSolveBySquareRoot;
			default:
				return $author$project$Game$Problem$Algebra1$genQuadraticFormula;
		}
	},
	A2($elm$random$Random$int, 0, 4));
var $author$project$Game$Problem$Algebra1$genEvalPiecewise = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$andThen,
					function (x) {
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Algebra1$shuffleChoices,
									$elm$core$String$fromInt(2 * x),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(2 * x),
										prompt: 'f(x) = { 2x if x ≥ 0 | −x if x < 0 }. Find f(' + ($elm$core$String$fromInt(x) + ').'),
										steps: _List_fromArray(
											[
												'x = ' + ($elm$core$String$fromInt(x) + ' ≥ 0, so use f(x) = 2x'),
												'f(' + ($elm$core$String$fromInt(x) + (') = 2(' + ($elm$core$String$fromInt(x) + (') = ' + $elm$core$String$fromInt(2 * x)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'f(x) = { 2x if x ≥ 0 | −x if x < 0 }. Find f(' + ($elm$core$String$fromInt(x) + ').')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(2 * x));
					},
					A2($author$project$Game$Problem$Common$randInt, 1, 8));
			case 1:
				return A2(
					$elm$random$Random$andThen,
					function (x) {
						var nx = -x;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Algebra1$shuffleChoices,
									$elm$core$String$fromInt(-nx),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(-nx),
										prompt: 'f(x) = { 2x if x ≥ 0 | −x if x < 0 }. Find f(' + ($elm$core$String$fromInt(nx) + ').'),
										steps: _List_fromArray(
											[
												'x = ' + ($elm$core$String$fromInt(nx) + ' < 0, so use f(x) = −x'),
												'f(' + ($elm$core$String$fromInt(nx) + (') = −(' + ($elm$core$String$fromInt(nx) + (') = ' + $elm$core$String$fromInt(-nx)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'f(x) = { 2x if x ≥ 0 | −x if x < 0 }. Find f(' + ($elm$core$String$fromInt(nx) + ').')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(-nx));
					},
					A2($author$project$Game$Problem$Common$randInt, 1, 8));
			default:
				return A2(
					$elm$random$Random$andThen,
					function (x) {
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Algebra1$shuffleChoices,
									$elm$core$String$fromInt(x * x),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(x * x),
										prompt: 'f(x) = { x + 3 if x < 2 | x² if x ≥ 2 }. Find f(' + ($elm$core$String$fromInt(x) + ').'),
										steps: _List_fromArray(
											[
												'x = ' + ($elm$core$String$fromInt(x) + ' ≥ 2, so use f(x) = x²'),
												'f(' + ($elm$core$String$fromInt(x) + (') = ' + ($elm$core$String$fromInt(x) + ('² = ' + $elm$core$String$fromInt(x * x)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'f(x) = { x + 3 if x < 2 | x² if x ≥ 2 }. Find f(' + ($elm$core$String$fromInt(x) + ').')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(x * x));
					},
					A2($author$project$Game$Problem$Common$randInt, 2, 6));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Algebra1$genIdentifyFunctionType = A2(
	$elm$random$Random$map,
	function (t) {
		switch (t) {
			case 0:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Linear',
						prompt: 'Which type of function is f(x) = 3x + 2?',
						steps: _List_fromArray(
							['Highest power of x is 1', 'Linear functions have the form f(x) = mx + b'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Linear', 'Quadratic', 'Exponential'])),
					prompt: 'Which type of function is f(x) = 3x + 2?'
				};
			case 1:
				return {
					answer: $author$project$Types$AChoice(1),
					hint: {
						answer: 'Quadratic',
						prompt: 'Which type of function is f(x) = x² − 4x + 1?',
						steps: _List_fromArray(
							['Highest power of x is 2', 'Quadratic functions have an x² term'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Linear', 'Quadratic', 'Exponential'])),
					prompt: 'Which type of function is f(x) = x² − 4x + 1?'
				};
			default:
				return {
					answer: $author$project$Types$AChoice(2),
					hint: {
						answer: 'Exponential',
						prompt: 'Which type of function is f(x) = 3 · 2^x?',
						steps: _List_fromArray(
							['The variable x is in the exponent', 'Exponential functions have the form a · b^x'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Linear', 'Quadratic', 'Exponential'])),
					prompt: 'Which type of function is f(x) = 3 · 2^x?'
				};
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Algebra1$unit9 = A2(
	$elm$random$Random$andThen,
	function (t) {
		if (!t) {
			return $author$project$Game$Problem$Algebra1$genIdentifyFunctionType;
		} else {
			return $author$project$Game$Problem$Algebra1$genEvalPiecewise;
		}
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Algebra1$generatorFor = function (unitNum) {
	switch (unitNum) {
		case 1:
			return $author$project$Game$Problem$Algebra1$unit1;
		case 2:
			return $author$project$Game$Problem$Algebra1$unit2;
		case 3:
			return $author$project$Game$Problem$Algebra1$unit3;
		case 4:
			return $author$project$Game$Problem$Algebra1$unit4;
		case 5:
			return $author$project$Game$Problem$Algebra1$unit5;
		case 6:
			return $author$project$Game$Problem$Algebra1$unit6;
		case 7:
			return $author$project$Game$Problem$Algebra1$unit7;
		case 8:
			return $author$project$Game$Problem$Algebra1$unit8;
		case 9:
			return $author$project$Game$Problem$Algebra1$unit9;
		case 10:
			return $author$project$Game$Problem$Algebra1$unit10;
		case 11:
			return $author$project$Game$Problem$Algebra1$unit11;
		case 12:
			return $author$project$Game$Problem$Algebra1$unit12;
		default:
			return $author$project$Game$Problem$Algebra1$unit1;
	}
};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$Game$Problem$Course1$superscript = function (n) {
	switch (n) {
		case 2:
			return '²';
		case 3:
			return '³';
		default:
			return '^' + $elm$core$String$fromInt(n);
	}
};
var $author$project$Game$Problem$Course1$genExponent = A2(
	$elm$random$Random$map,
	function (_v0) {
		var base = _v0.a;
		var exp = _v0.b;
		var correct = A2($elm$core$Basics$pow, base, exp);
		return {
			answer: $author$project$Types$AInt(correct),
			hint: {
				answer: $elm$core$String$fromInt(correct),
				prompt: $elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course1$superscript(exp) + ' = ?'),
				steps: _List_fromArray(
					[
						$elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course1$superscript(exp) + (' means multiply ' + ($elm$core$String$fromInt(base) + (' by itself ' + ($elm$core$String$fromInt(exp) + ' times'))))),
						A2(
						$elm$core$String$join,
						' × ',
						A2(
							$elm$core$List$repeat,
							exp,
							$elm$core$String$fromInt(base))) + (' = ' + $elm$core$String$fromInt(correct))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course1$superscript(exp) + ' = ?')
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 9),
		A2($author$project$Game$Problem$Common$randInt, 2, 3)));
var $author$project$Game$Problem$Course1$factorsOf = function (n) {
	return A2(
		$elm$core$List$filter,
		function (d) {
			return !A2($elm$core$Basics$modBy, d, n);
		},
		A2($elm$core$List$range, 1, n));
};
var $author$project$Game$Problem$Course1$genGcf = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var g = _v0.a;
		var ka = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (kb) {
				var b = g * kb;
				var a = g * ka;
				var correct = A2($author$project$Game$Problem$Common$gcd, a, b);
				return {
					answer: $author$project$Types$AInt(correct),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'GCF of ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(b) + '?'))),
						steps: _List_fromArray(
							[
								'Factors of ' + ($elm$core$String$fromInt(a) + (': ' + A2(
								$elm$core$String$join,
								', ',
								A2(
									$elm$core$List$map,
									$elm$core$String$fromInt,
									$author$project$Game$Problem$Course1$factorsOf(a))))),
								'Factors of ' + ($elm$core$String$fromInt(b) + (': ' + A2(
								$elm$core$String$join,
								', ',
								A2(
									$elm$core$List$map,
									$elm$core$String$fromInt,
									$author$project$Game$Problem$Course1$factorsOf(b))))),
								'Greatest common factor: ' + $elm$core$String$fromInt(correct)
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'GCF of ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(b) + '?')))
				};
			},
			A2($author$project$Game$Problem$Common$randInt, 2, 6));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$Common$lcm = F2(
	function (a, b) {
		return ($elm$core$Basics$abs(a * b) / A2($author$project$Game$Problem$Common$gcd, a, b)) | 0;
	});
var $author$project$Game$Problem$Course1$multiplesUpTo = F2(
	function (n, limit) {
		return A2(
			$elm$core$List$map,
			function (k) {
				return k * n;
			},
			A2(
				$elm$core$List$range,
				1,
				(limit / A2($elm$core$Basics$max, 1, n)) | 0));
	});
var $author$project$Game$Problem$Common$randChoice = F2(
	function (list, _default) {
		if (!list.b) {
			return $elm$random$Random$constant(_default);
		} else {
			var first = list.a;
			var rest = list.b;
			return A2(
				$elm$random$Random$map,
				function (i) {
					return A2(
						$elm$core$Maybe$withDefault,
						first,
						$elm$core$List$head(
							A2($elm$core$List$drop, i, list)));
				},
				A2(
					$elm$random$Random$int,
					0,
					$elm$core$List$length(list) - 1));
		}
	});
var $author$project$Game$Problem$Course1$genGcfLcmApp = A2(
	$elm$random$Random$andThen,
	function (t) {
		if (!t) {
			return A2(
				$elm$random$Random$map,
				function (_v1) {
					var packA = _v1.a;
					var packB = _v1.b;
					var answer = A2($author$project$Game$Problem$Common$lcm, packA, packB);
					return {
						answer: $author$project$Types$AInt(answer),
						hint: {
							answer: $elm$core$String$fromInt(answer),
							prompt: 'Hot dogs: packs of ' + ($elm$core$String$fromInt(packA) + (', buns: packs of ' + ($elm$core$String$fromInt(packB) + '. Least equal amount?'))),
							steps: _List_fromArray(
								[
									'Find LCM of ' + ($elm$core$String$fromInt(packA) + (' and ' + $elm$core$String$fromInt(packB))),
									'Multiples of ' + ($elm$core$String$fromInt(packA) + (': ' + (A2(
									$elm$core$String$join,
									', ',
									A2(
										$elm$core$List$map,
										$elm$core$String$fromInt,
										A2($author$project$Game$Problem$Course1$multiplesUpTo, packA, answer * 2))) + '...'))),
									'Multiples of ' + ($elm$core$String$fromInt(packB) + (': ' + (A2(
									$elm$core$String$join,
									', ',
									A2(
										$elm$core$List$map,
										$elm$core$String$fromInt,
										A2($author$project$Game$Problem$Course1$multiplesUpTo, packB, answer * 2))) + '...'))),
									'LCM = ' + $elm$core$String$fromInt(answer)
								])
						},
						inputType: $author$project$Types$TInteger,
						prompt: 'Hot dogs come in packs of ' + ($elm$core$String$fromInt(packA) + (', buns in packs of ' + ($elm$core$String$fromInt(packB) + '. What is the least number of each you need to buy to have equal amounts?')))
					};
				},
				A3(
					$elm$random$Random$map2,
					$elm$core$Tuple$pair,
					A2(
						$author$project$Game$Problem$Common$randChoice,
						_List_fromArray(
							[6, 8, 10, 12]),
						8),
					A2(
						$author$project$Game$Problem$Common$randChoice,
						_List_fromArray(
							[4, 6, 9, 10]),
						6)));
		} else {
			return A2(
				$elm$random$Random$map,
				function (_v2) {
					var ga = _v2.a;
					var gb = _v2.b;
					var b = gb * 6;
					var a = ga * 4;
					var answer = A2($author$project$Game$Problem$Common$gcd, a, b);
					return {
						answer: $author$project$Types$AInt(answer),
						hint: {
							answer: $elm$core$String$fromInt(answer),
							prompt: $elm$core$String$fromInt(a) + (' pencils and ' + ($elm$core$String$fromInt(b) + ' erasers. Greatest equal groups?')),
							steps: _List_fromArray(
								[
									'Find GCF of ' + ($elm$core$String$fromInt(a) + (' and ' + $elm$core$String$fromInt(b))),
									'Factors of ' + ($elm$core$String$fromInt(a) + (': ' + A2(
									$elm$core$String$join,
									', ',
									A2(
										$elm$core$List$map,
										$elm$core$String$fromInt,
										$author$project$Game$Problem$Course1$factorsOf(a))))),
									'Factors of ' + ($elm$core$String$fromInt(b) + (': ' + A2(
									$elm$core$String$join,
									', ',
									A2(
										$elm$core$List$map,
										$elm$core$String$fromInt,
										$author$project$Game$Problem$Course1$factorsOf(b))))),
									'GCF = ' + $elm$core$String$fromInt(answer)
								])
						},
						inputType: $author$project$Types$TInteger,
						prompt: 'A teacher has ' + ($elm$core$String$fromInt(a) + (' pencils and ' + ($elm$core$String$fromInt(b) + ' erasers. What is the greatest number of equal groups she can make with no leftovers?')))
					};
				},
				A3(
					$elm$random$Random$map2,
					$elm$core$Tuple$pair,
					A2($author$project$Game$Problem$Common$randInt, 2, 6),
					A2($author$project$Game$Problem$Common$randInt, 2, 6)));
		}
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course1$genLcm = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var correct = A2($author$project$Game$Problem$Common$lcm, a, b);
		return {
			answer: $author$project$Types$AInt(correct),
			hint: {
				answer: $elm$core$String$fromInt(correct),
				prompt: 'LCM of ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(b) + '?'))),
				steps: _List_fromArray(
					[
						'Multiples of ' + ($elm$core$String$fromInt(a) + (': ' + (A2(
						$elm$core$String$join,
						', ',
						A2(
							$elm$core$List$map,
							$elm$core$String$fromInt,
							A2($author$project$Game$Problem$Course1$multiplesUpTo, a, correct * 2))) + '...'))),
						'Multiples of ' + ($elm$core$String$fromInt(b) + (': ' + (A2(
						$elm$core$String$join,
						', ',
						A2(
							$elm$core$List$map,
							$elm$core$String$fromInt,
							A2($author$project$Game$Problem$Course1$multiplesUpTo, b, correct * 2))) + '...'))),
						'Least common multiple: ' + $elm$core$String$fromInt(correct)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'LCM of ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(b) + '?')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 10),
		A2($author$project$Game$Problem$Common$randInt, 2, 10)));
var $author$project$Game$Problem$Course1$shuffleChoices = F2(
	function (correct, wrong) {
		return A2(
			$elm$core$List$cons,
			correct,
			A2($elm$core$List$take, 3, wrong));
	});
var $author$project$Game$Problem$Course1$genOrderOfOps = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = a + (b * c);
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + ' = ?')))),
						steps: _List_fromArray(
							[
								'Multiplication before addition (PEMDAS)',
								'First: ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt(b * c))))),
								'Then: ' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b * c) + (' = ' + $elm$core$String$fromInt(correct)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + ' = ?'))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(a + (b * c)));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$Course1$genPerfectCube = A2(
	$elm$random$Random$andThen,
	function (base) {
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = (base * base) * base;
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'What is ' + ($elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course1$superscript(3) + '? (perfect cube)')),
						steps: _List_fromArray(
							[
								'A perfect cube is a number times itself three times',
								$elm$core$String$fromInt(base) + ('³ = ' + ($elm$core$String$fromInt(base) + (' × ' + ($elm$core$String$fromInt(base) + (' × ' + ($elm$core$String$fromInt(base) + (' = ' + $elm$core$String$fromInt(correct))))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'What is ' + ($elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course1$superscript(3) + '? (perfect cube)'))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt((base * base) * base));
	},
	A2($author$project$Game$Problem$Common$randInt, 2, 5));
var $author$project$Game$Problem$Course1$genPerfectSquare = A2(
	$elm$random$Random$andThen,
	function (base) {
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = base * base;
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'What is ' + ($elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course1$superscript(2) + '? (perfect square)')),
						steps: _List_fromArray(
							[
								'A perfect square is a number times itself',
								$elm$core$String$fromInt(base) + ('² = ' + ($elm$core$String$fromInt(base) + (' × ' + ($elm$core$String$fromInt(base) + (' = ' + $elm$core$String$fromInt(correct))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'What is ' + ($elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course1$superscript(2) + '? (perfect square)'))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(base * base));
	},
	A2($author$project$Game$Problem$Common$randInt, 2, 12));
var $author$project$Game$Problem$Course1$genWholeNumApp = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$map,
					function (_v1) {
						var bags = _v1.a;
						var perBag = _v1.b;
						var total = bags * perBag;
						return {
							answer: $author$project$Types$AInt(perBag),
							hint: {
								answer: $elm$core$String$fromInt(perBag),
								prompt: $elm$core$String$fromInt(total) + (' apples split into ' + ($elm$core$String$fromInt(bags) + ' equal bags. How many per bag?')),
								steps: _List_fromArray(
									[
										'Divide total by number of bags',
										$elm$core$String$fromInt(total) + (' / ' + ($elm$core$String$fromInt(bags) + (' = ' + $elm$core$String$fromInt(perBag))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'A store has ' + ($elm$core$String$fromInt(total) + (' apples split into ' + ($elm$core$String$fromInt(bags) + ' equal bags. How many apples per bag?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 2, 8),
						A2($author$project$Game$Problem$Common$randInt, 2, 9)));
			case 1:
				return A2(
					$elm$random$Random$map,
					function (_v2) {
						var rows = _v2.a;
						var cols = _v2.b;
						var total = rows * cols;
						return {
							answer: $author$project$Types$AInt(total),
							hint: {
								answer: $elm$core$String$fromInt(total),
								prompt: $elm$core$String$fromInt(rows) + (' rows, ' + ($elm$core$String$fromInt(cols) + ' plants each. Total?')),
								steps: _List_fromArray(
									[
										'Multiply rows by plants per row',
										$elm$core$String$fromInt(rows) + (' × ' + ($elm$core$String$fromInt(cols) + (' = ' + $elm$core$String$fromInt(total))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'A garden has ' + ($elm$core$String$fromInt(rows) + (' rows of plants with ' + ($elm$core$String$fromInt(cols) + ' plants each. How many plants total?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 3, 9),
						A2($author$project$Game$Problem$Common$randInt, 4, 12)));
			default:
				return A2(
					$elm$random$Random$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return {
							answer: $author$project$Types$AInt(a + b),
							hint: {
								answer: $elm$core$String$fromInt(a + b),
								prompt: 'Earns ' + ($elm$core$String$fromInt(a) + (' on Monday and ' + ($elm$core$String$fromInt(b) + ' on Tuesday. Total?'))),
								steps: _List_fromArray(
									[
										'Add the two amounts',
										$elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(a + b))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'A knight earns ' + ($elm$core$String$fromInt(a) + (' gold coins on Monday and ' + ($elm$core$String$fromInt(b) + ' gold coins on Tuesday. How many total?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 10, 99),
						A2($author$project$Game$Problem$Common$randInt, 10, 99)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course1$unit1 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course1$genGcf;
			case 1:
				return $author$project$Game$Problem$Course1$genLcm;
			case 2:
				return $author$project$Game$Problem$Course1$genExponent;
			case 3:
				return $author$project$Game$Problem$Course1$genOrderOfOps;
			case 4:
				return $author$project$Game$Problem$Course1$genWholeNumApp;
			case 5:
				return $author$project$Game$Problem$Course1$genPerfectSquare;
			case 6:
				return $author$project$Game$Problem$Course1$genPerfectCube;
			default:
				return $author$project$Game$Problem$Course1$genGcfLcmApp;
		}
	},
	A2($elm$random$Random$int, 0, 7));
var $author$project$Game$Problem$Course1$genCoordinatePlane = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$map,
					function (_v1) {
						var x = _v1.a;
						var y = _v1.b;
						var q = ((x > 0) && (y > 0)) ? 0 : (((x < 0) && (y > 0)) ? 1 : (((x < 0) && (y < 0)) ? 2 : 3));
						var quadrantName = A2(
							$elm$core$Maybe$withDefault,
							'?',
							$elm$core$List$head(
								A2(
									$elm$core$List$drop,
									q,
									_List_fromArray(
										['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV']))));
						return {
							answer: $author$project$Types$AChoice(q),
							hint: {
								answer: quadrantName,
								prompt: 'The point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ') lies in which quadrant?'))),
								steps: _List_fromArray(
									[
										'x = ' + ($elm$core$String$fromInt(x) + ((x > 0) ? ' → right (+)' : ' → left (−)')),
										'y = ' + ($elm$core$String$fromInt(y) + ((y > 0) ? ' → up (+)' : ' → down (−)')),
										'Quadrants: I(+,+)  II(−,+)  III(−,−)  IV(+,−)',
										'Answer: ' + quadrantName
									])
							},
							inputType: $author$project$Types$TChoice(
								_List_fromArray(
									['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'])),
							prompt: 'The point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ') lies in which quadrant?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randIntNonZero, -8, 8),
						A2($author$project$Game$Problem$Common$randIntNonZero, -8, 8)));
			case 1:
				return A2(
					$elm$random$Random$map,
					function (_v2) {
						var x = _v2.a;
						var y = _v2.b;
						return {
							answer: $author$project$Types$AInt(x),
							hint: {
								answer: $elm$core$String$fromInt(x),
								prompt: 'What is the x-coordinate of the point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ')?'))),
								steps: _List_fromArray(
									[
										'A point is written as (x, y)',
										'The first number is the x-coordinate',
										'Answer: ' + $elm$core$String$fromInt(x)
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'What is the x-coordinate of the point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ')?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randIntNonZero, -9, 9),
						A2($author$project$Game$Problem$Common$randIntNonZero, -9, 9)));
			default:
				return A2(
					$elm$random$Random$map,
					function (_v3) {
						var x = _v3.a;
						var y = _v3.b;
						return {
							answer: $author$project$Types$AInt(y),
							hint: {
								answer: $elm$core$String$fromInt(y),
								prompt: 'What is the y-coordinate of the point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ')?'))),
								steps: _List_fromArray(
									[
										'A point is written as (x, y)',
										'The second number is the y-coordinate',
										'Answer: ' + $elm$core$String$fromInt(y)
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'What is the y-coordinate of the point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ')?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randIntNonZero, -9, 9),
						A2($author$project$Game$Problem$Common$randIntNonZero, -9, 9)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Game$Problem$Course1$showSigned = function (n) {
	return (n < 0) ? ('(' + ($elm$core$String$fromInt(n) + ')')) : $elm$core$String$fromInt(n);
};
var $author$project$Game$Problem$Course1$genIntAdd = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var sameSign = _Utils_eq(a >= 0, b >= 0);
		var result = a + b;
		return {
			answer: $author$project$Types$AInt(result),
			hint: {
				answer: $elm$core$String$fromInt(result),
				prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(b) + ' = ?')),
				steps: sameSign ? _List_fromArray(
					[
						'Same sign: add the values and keep the sign',
						$elm$core$String$fromInt(
						$elm$core$Basics$abs(a)) + (' + ' + ($elm$core$String$fromInt(
						$elm$core$Basics$abs(b)) + (' = ' + $elm$core$String$fromInt(
						$elm$core$Basics$abs(result))))),
						'Answer: ' + $elm$core$String$fromInt(result)
					]) : _List_fromArray(
					[
						'Different signs: subtract smaller from larger, keep sign of larger',
						'Larger: ' + ($elm$core$String$fromInt(
						A2(
							$elm$core$Basics$max,
							$elm$core$Basics$abs(a),
							$elm$core$Basics$abs(b))) + (' − ' + ($elm$core$String$fromInt(
						A2(
							$elm$core$Basics$min,
							$elm$core$Basics$abs(a),
							$elm$core$Basics$abs(b))) + (' = ' + $elm$core$String$fromInt(
						$elm$core$Basics$abs(result)))))),
						'Answer: ' + $elm$core$String$fromInt(result)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(b) + ' = ?'))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, -20, 20),
		A2($author$project$Game$Problem$Common$randInt, -20, 20)));
var $author$project$Game$Problem$Course1$genIntApp = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$map,
					function (_v1) {
						var start = _v1.a;
						var change = _v1.b;
						return {
							answer: $author$project$Types$AInt(start + change),
							hint: {
								answer: $elm$core$String$fromInt(start + change) + '°F',
								prompt: 'Temperature starts at ' + ($author$project$Game$Problem$Course1$showSigned(start) + ('°F and changes by ' + ($author$project$Game$Problem$Course1$showSigned(change) + '°F. New temperature?'))),
								steps: _List_fromArray(
									[
										'Add the change to the starting value',
										$author$project$Game$Problem$Course1$showSigned(start) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(change) + (' = ' + $elm$core$String$fromInt(start + change)))),
										'Answer: ' + ($elm$core$String$fromInt(start + change) + '°F')
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Temperature starts at ' + ($author$project$Game$Problem$Course1$showSigned(start) + ('°F and changes by ' + ($author$project$Game$Problem$Course1$showSigned(change) + '°F. New temperature?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, -20, 20),
						A2($author$project$Game$Problem$Common$randInt, -15, 15)));
			case 1:
				return A2(
					$elm$random$Random$map,
					function (_v2) {
						var depth = _v2.a;
						var rise = _v2.b;
						return {
							answer: $author$project$Types$AInt(depth + rise),
							hint: {
								answer: $elm$core$String$fromInt(depth + rise) + ' m',
								prompt: 'A diver is at ' + ($elm$core$String$fromInt(depth) + (' m. She rises ' + ($elm$core$String$fromInt(rise) + ' m. New depth?'))),
								steps: _List_fromArray(
									[
										'Rising means adding a positive number',
										'(' + ($elm$core$String$fromInt(depth) + (') + ' + ($elm$core$String$fromInt(rise) + (' = ' + $elm$core$String$fromInt(depth + rise))))),
										'Answer: ' + ($elm$core$String$fromInt(depth + rise) + ' m')
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'A diver is at ' + ($elm$core$String$fromInt(depth) + (' m. She rises ' + ($elm$core$String$fromInt(rise) + ' m. New depth?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, -200, -10),
						A2($author$project$Game$Problem$Common$randInt, 5, 100)));
			default:
				return A2(
					$elm$random$Random$map,
					function (_v3) {
						var balance = _v3.a;
						var transaction = _v3.b;
						var verb = (transaction >= 0) ? 'deposits' : 'withdraws';
						var amount = $elm$core$Basics$abs(transaction);
						return {
							answer: $author$project$Types$AInt(balance + transaction),
							hint: {
								answer: '$' + $elm$core$String$fromInt(balance + transaction),
								prompt: 'Account: $' + ($author$project$Game$Problem$Course1$showSigned(balance) + ('. Player ' + (verb + (' $' + ($elm$core$String$fromInt(amount) + '. New balance?'))))),
								steps: _List_fromArray(
									[
										'Add the transaction to the balance',
										$author$project$Game$Problem$Course1$showSigned(balance) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(transaction) + (' = ' + $elm$core$String$fromInt(balance + transaction)))),
										'Answer: $' + $elm$core$String$fromInt(balance + transaction)
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Account: $' + ($author$project$Game$Problem$Course1$showSigned(balance) + ('. Player ' + (verb + (' $' + ($elm$core$String$fromInt(amount) + '. New balance?')))))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, -50, 50),
						A2($author$project$Game$Problem$Common$randInt, -30, 30)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course1$genIntDiv = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var b = _v0.a;
		var q = _v0.b;
		var a = b * q;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(q),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(q),
						prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' / ' + ($author$project$Game$Problem$Course1$showSigned(b) + ' = ?')),
						steps: _List_fromArray(
							[
								'Divide absolute values: ' + ($elm$core$String$fromInt(
								$elm$core$Basics$abs(a)) + (' / ' + ($elm$core$String$fromInt(
								$elm$core$Basics$abs(b)) + (' = ' + $elm$core$String$fromInt(
								$elm$core$Basics$abs(q)))))),
								_Utils_eq(a >= 0, b >= 0) ? 'Same sign → positive' : 'Different signs → negative',
								'Answer: ' + $elm$core$String$fromInt(q)
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' / ' + ($author$project$Game$Problem$Course1$showSigned(b) + ' = ?'))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(q));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, -9, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$Course1$genIntMul = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = a * b;
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				var sameSign = _Utils_eq(a >= 0, b >= 0);
				var result = correct;
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(result),
						prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(b) + ' = ?')),
						steps: _List_fromArray(
							[
								'Multiply absolute values: ' + ($elm$core$String$fromInt(
								$elm$core$Basics$abs(a)) + (' × ' + ($elm$core$String$fromInt(
								$elm$core$Basics$abs(b)) + (' = ' + $elm$core$String$fromInt(
								$elm$core$Basics$abs(result)))))),
								sameSign ? 'Same sign → positive' : 'Different signs → negative',
								'Answer: ' + $elm$core$String$fromInt(result)
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(b) + ' = ?'))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(a * b));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, -9, 9),
		A2($author$project$Game$Problem$Common$randInt, -9, 9)));
var $author$project$Game$Problem$Course1$genIntOrderOfOps = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$map,
					function (_v1) {
						var a = _v1.a;
						var b = _v1.b;
						var c = _v1.c;
						return {
							answer: $author$project$Types$AInt(a + (b * c)),
							hint: {
								answer: $elm$core$String$fromInt(a + (b * c)),
								prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(b) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(c) + ' = ?')))),
								steps: _List_fromArray(
									[
										'Multiplication first: ' + ($author$project$Game$Problem$Course1$showSigned(b) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(c) + (' = ' + $elm$core$String$fromInt(b * c))))),
										'Then addition: ' + ($author$project$Game$Problem$Course1$showSigned(a) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(b * c) + (' = ' + $elm$core$String$fromInt(a + (b * c)))))),
										'Answer: ' + $elm$core$String$fromInt(a + (b * c))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(b) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(c) + ' = ?'))))
						};
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							}),
						A2($author$project$Game$Problem$Common$randInt, -5, 5),
						A2($author$project$Game$Problem$Common$randInt, -4, 4),
						A2($author$project$Game$Problem$Common$randInt, -4, 4)));
			case 1:
				return A2(
					$elm$random$Random$map,
					function (_v2) {
						var a = _v2.a;
						var b = _v2.b;
						var c = _v2.c;
						return {
							answer: $author$project$Types$AInt(a - (b * c)),
							hint: {
								answer: $elm$core$String$fromInt(a - (b * c)),
								prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' - ' + ($author$project$Game$Problem$Course1$showSigned(b) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(c) + ' = ?')))),
								steps: _List_fromArray(
									[
										'Multiplication first: ' + ($author$project$Game$Problem$Course1$showSigned(b) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(c) + (' = ' + $elm$core$String$fromInt(b * c))))),
										'Then subtraction: ' + ($author$project$Game$Problem$Course1$showSigned(a) + (' - ' + ($author$project$Game$Problem$Course1$showSigned(b * c) + (' = ' + $elm$core$String$fromInt(a - (b * c)))))),
										'Answer: ' + $elm$core$String$fromInt(a - (b * c))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' - ' + ($author$project$Game$Problem$Course1$showSigned(b) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(c) + ' = ?'))))
						};
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							}),
						A2($author$project$Game$Problem$Common$randInt, -5, 5),
						A2($author$project$Game$Problem$Common$randInt, -4, 4),
						A2($author$project$Game$Problem$Common$randInt, -4, 4)));
			default:
				return A2(
					$elm$random$Random$map,
					function (r) {
						return {
							answer: $author$project$Types$AInt((r.a * r.b) + (r.c * r.d)),
							hint: {
								answer: $elm$core$String$fromInt((r.a * r.b) + (r.c * r.d)),
								prompt: $author$project$Game$Problem$Course1$showSigned(r.a) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(r.b) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(r.c) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(r.d) + ' = ?')))))),
								steps: _List_fromArray(
									[
										'Multiply both pairs first',
										$author$project$Game$Problem$Course1$showSigned(r.a) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(r.b) + (' = ' + ($elm$core$String$fromInt(r.a * r.b) + ('  and  ' + ($author$project$Game$Problem$Course1$showSigned(r.c) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(r.d) + (' = ' + $elm$core$String$fromInt(r.c * r.d)))))))))),
										'Add results: ' + ($author$project$Game$Problem$Course1$showSigned(r.a * r.b) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(r.c * r.d) + (' = ' + $elm$core$String$fromInt((r.a * r.b) + (r.c * r.d))))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: $author$project$Game$Problem$Course1$showSigned(r.a) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(r.b) + (' + ' + ($author$project$Game$Problem$Course1$showSigned(r.c) + (' × ' + ($author$project$Game$Problem$Course1$showSigned(r.d) + ' = ?'))))))
						};
					},
					A5(
						$elm$random$Random$map4,
						F4(
							function (a, b, c, d) {
								return {a: a, b: b, c: c, d: d};
							}),
						A2($author$project$Game$Problem$Common$randInt, -3, 3),
						A2($author$project$Game$Problem$Common$randInt, -3, 3),
						A2($author$project$Game$Problem$Common$randInt, -3, 3),
						A2($author$project$Game$Problem$Common$randInt, -3, 3)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course1$genIntSub = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		return {
			answer: $author$project$Types$AInt(a - b),
			hint: {
				answer: $elm$core$String$fromInt(a - b),
				prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' - ' + ($author$project$Game$Problem$Course1$showSigned(b) + ' = ?')),
				steps: (b < 0) ? _List_fromArray(
					[
						'Subtracting a negative = adding a positive',
						$author$project$Game$Problem$Course1$showSigned(a) + (' - (' + ($elm$core$String$fromInt(b) + (') = ' + ($author$project$Game$Problem$Course1$showSigned(a) + (' + ' + ($elm$core$String$fromInt(
						$elm$core$Basics$abs(b)) + (' = ' + $elm$core$String$fromInt(a - b))))))))
					]) : _List_fromArray(
					[
						'Subtract: ' + ($author$project$Game$Problem$Course1$showSigned(a) + (' - ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(a - b)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $author$project$Game$Problem$Course1$showSigned(a) + (' - ' + ($author$project$Game$Problem$Course1$showSigned(b) + ' = ?'))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, -15, 15),
		A2($author$project$Game$Problem$Common$randInt, -15, 15)));
var $author$project$Game$Problem$Course1$unit2 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course1$genIntAdd;
			case 1:
				return $author$project$Game$Problem$Course1$genIntSub;
			case 2:
				return $author$project$Game$Problem$Course1$genIntMul;
			case 3:
				return $author$project$Game$Problem$Course1$genIntDiv;
			case 4:
				return $author$project$Game$Problem$Course1$genIntApp;
			case 5:
				return $author$project$Game$Problem$Course1$genIntOrderOfOps;
			default:
				return $author$project$Game$Problem$Course1$genCoordinatePlane;
		}
	},
	A2($elm$random$Random$int, 0, 6));
var $author$project$Types$AFloat = F2(
	function (a, b) {
		return {$: 'AFloat', a: a, b: b};
	});
var $author$project$Types$TDecimal = {$: 'TDecimal'};
var $author$project$Game$Problem$Course1$genDecAdd = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var fb = b / 10.0;
		var fa = a / 10.0;
		var correct = fa + fb;
		return {
			answer: A2($author$project$Types$AFloat, correct, 0.01),
			hint: {
				answer: $elm$core$String$fromFloat(correct),
				prompt: $elm$core$String$fromFloat(fa) + (' + ' + ($elm$core$String$fromFloat(fb) + ' = ?')),
				steps: _List_fromArray(
					[
						'Line up the decimal points',
						'Add as normal: ' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(a + b))))),
						'Place the decimal: ' + $elm$core$String$fromFloat(correct)
					])
			},
			inputType: $author$project$Types$TDecimal,
			prompt: $elm$core$String$fromFloat(fa) + (' + ' + ($elm$core$String$fromFloat(fb) + ' = ?'))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 10, 99),
		A2($author$project$Game$Problem$Common$randInt, 10, 99)));
var $author$project$Game$Problem$Course1$genDecMul = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var fb = b / 10.0;
		var fa = a / 10.0;
		var correct = fa * fb;
		return {
			answer: A2($author$project$Types$AFloat, correct, 0.01),
			hint: {
				answer: $elm$core$String$fromFloat(correct),
				prompt: $elm$core$String$fromFloat(fa) + (' × ' + ($elm$core$String$fromFloat(fb) + ' = ?')),
				steps: _List_fromArray(
					[
						'Multiply as whole numbers: ' + ($elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(a * b))))),
						'Count decimal places: 1 + 1 = 2',
						'Place decimal 2 from right: ' + $elm$core$String$fromFloat(correct)
					])
			},
			inputType: $author$project$Types$TDecimal,
			prompt: $elm$core$String$fromFloat(fa) + (' × ' + ($elm$core$String$fromFloat(fb) + ' = ?'))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $author$project$Types$AFraction = F2(
	function (a, b) {
		return {$: 'AFraction', a: a, b: b};
	});
var $author$project$Types$TFraction = {$: 'TFraction'};
var $author$project$Game$Problem$Course1$showFrac = F2(
	function (n, d) {
		return $elm$core$String$fromInt(n) + ('/' + $elm$core$String$fromInt(d));
	});
var $author$project$Game$Problem$Course1$genFracAdd = A2(
	$elm$random$Random$andThen,
	function (d) {
		return A2(
			$elm$random$Random$map,
			function (_v0) {
				var n1 = _v0.a;
				var n2 = _v0.b;
				var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, n1 + n2, d);
				var rn = _v1.a;
				var rd = _v1.b;
				return {
					answer: A2($author$project$Types$AFraction, rn, rd),
					hint: {
						answer: A2($author$project$Game$Problem$Course1$showFrac, rn, rd),
						prompt: A2($author$project$Game$Problem$Course1$showFrac, n1, d) + (' + ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d) + ' = ?')),
						steps: _List_fromArray(
							[
								'Same denominator: add numerators',
								$elm$core$String$fromInt(n1) + (' + ' + ($elm$core$String$fromInt(n2) + (' = ' + ($elm$core$String$fromInt(n1 + n2) + (', denominator stays ' + $elm$core$String$fromInt(d)))))),
								'Answer: ' + A2($author$project$Game$Problem$Course1$showFrac, rn, rd)
							])
					},
					inputType: $author$project$Types$TFraction,
					prompt: A2($author$project$Game$Problem$Course1$showFrac, n1, d) + (' + ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d) + ' = ?'))
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 1, d - 1),
				A2($author$project$Game$Problem$Common$randInt, 1, d - 1)));
	},
	A2($author$project$Game$Problem$Common$randInt, 2, 8));
var $author$project$Game$Problem$Course1$genFracAddUnlike = A2(
	$elm$random$Random$andThen,
	function (d1) {
		return A2(
			$elm$random$Random$andThen,
			function (d2raw) {
				var d2 = _Utils_eq(d2raw, d1) ? ((d1 === 6) ? 2 : (d1 + 1)) : d2raw;
				return A2(
					$elm$random$Random$map,
					function (_v0) {
						var n1 = _v0.a;
						var n2 = _v0.b;
						var commonD = A2($author$project$Game$Problem$Common$lcm, d1, d2);
						var sumN = (n1 * ((commonD / d1) | 0)) + (n2 * ((commonD / d2) | 0));
						var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, sumN, commonD);
						var rn = _v1.a;
						var rd = _v1.b;
						return {
							answer: A2($author$project$Types$AFraction, rn, rd),
							hint: {
								answer: A2($author$project$Game$Problem$Course1$showFrac, rn, rd),
								prompt: A2($author$project$Game$Problem$Course1$showFrac, n1, d1) + (' + ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d2) + ' = ?')),
								steps: _List_fromArray(
									[
										'LCD of ' + ($elm$core$String$fromInt(d1) + (' and ' + ($elm$core$String$fromInt(d2) + (' is ' + $elm$core$String$fromInt(commonD))))),
										A2($author$project$Game$Problem$Course1$showFrac, n1, d1) + (' = ' + (A2($author$project$Game$Problem$Course1$showFrac, n1 * ((commonD / d1) | 0), commonD) + ('  and  ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d2) + (' = ' + A2($author$project$Game$Problem$Course1$showFrac, n2 * ((commonD / d2) | 0), commonD)))))),
										A2($author$project$Game$Problem$Course1$showFrac, n1 * ((commonD / d1) | 0), commonD) + (' + ' + (A2($author$project$Game$Problem$Course1$showFrac, n2 * ((commonD / d2) | 0), commonD) + (' = ' + A2($author$project$Game$Problem$Course1$showFrac, rn, rd))))
									])
							},
							inputType: $author$project$Types$TFraction,
							prompt: A2($author$project$Game$Problem$Course1$showFrac, n1, d1) + (' + ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d2) + ' = ?'))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 1, d1 - 1),
						A2($author$project$Game$Problem$Common$randInt, 1, d2 - 1)));
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[2, 3, 4, 5, 6]),
				4));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[2, 3, 4, 5, 6]),
		3));
var $author$project$Game$Problem$Course1$genFracMul = A2(
	$elm$random$Random$map,
	function (_v0) {
		var _v1 = _v0.a;
		var n1 = _v1.a;
		var d1 = _v1.b;
		var _v2 = _v0.b;
		var n2 = _v2.a;
		var d2 = _v2.b;
		var _v3 = A2($author$project$Game$Problem$Common$reduceFraction, n1 * n2, d1 * d2);
		var rn = _v3.a;
		var rd = _v3.b;
		return {
			answer: A2($author$project$Types$AFraction, rn, rd),
			hint: {
				answer: A2($author$project$Game$Problem$Course1$showFrac, rn, rd),
				prompt: A2($author$project$Game$Problem$Course1$showFrac, n1, d1) + (' × ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d2) + ' = ?')),
				steps: _List_fromArray(
					[
						'Multiply numerators: ' + ($elm$core$String$fromInt(n1) + (' × ' + ($elm$core$String$fromInt(n2) + (' = ' + $elm$core$String$fromInt(n1 * n2))))),
						'Multiply denominators: ' + ($elm$core$String$fromInt(d1) + (' × ' + ($elm$core$String$fromInt(d2) + (' = ' + $elm$core$String$fromInt(d1 * d2))))),
						'Simplify ' + (A2($author$project$Game$Problem$Course1$showFrac, n1 * n2, d1 * d2) + (': ' + A2($author$project$Game$Problem$Course1$showFrac, rn, rd)))
					])
			},
			inputType: $author$project$Types$TFraction,
			prompt: A2($author$project$Game$Problem$Course1$showFrac, n1, d1) + (' × ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d2) + ' = ?'))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A3(
			$elm$random$Random$map2,
			$elm$core$Tuple$pair,
			A2($author$project$Game$Problem$Common$randInt, 1, 6),
			A2($author$project$Game$Problem$Common$randInt, 2, 8)),
		A3(
			$elm$random$Random$map2,
			$elm$core$Tuple$pair,
			A2($author$project$Game$Problem$Common$randInt, 1, 6),
			A2($author$project$Game$Problem$Common$randInt, 2, 8))));
var $author$project$Game$Problem$Course1$genFracSub = A2(
	$elm$random$Random$andThen,
	function (d) {
		return A2(
			$elm$random$Random$map,
			function (_v0) {
				var n1 = _v0.a;
				var n2 = _v0.b;
				var safe_n1 = A2($elm$core$Basics$max, n1, n2 + 1);
				var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, safe_n1 - n2, d);
				var rn = _v1.a;
				var rd = _v1.b;
				return {
					answer: A2($author$project$Types$AFraction, rn, rd),
					hint: {
						answer: A2($author$project$Game$Problem$Course1$showFrac, rn, rd),
						prompt: A2($author$project$Game$Problem$Course1$showFrac, safe_n1, d) + (' - ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d) + ' = ?')),
						steps: _List_fromArray(
							[
								'Same denominator: subtract numerators',
								$elm$core$String$fromInt(safe_n1) + (' - ' + ($elm$core$String$fromInt(n2) + (' = ' + ($elm$core$String$fromInt(safe_n1 - n2) + (', denominator stays ' + $elm$core$String$fromInt(d)))))),
								'Answer: ' + A2($author$project$Game$Problem$Course1$showFrac, rn, rd)
							])
					},
					inputType: $author$project$Types$TFraction,
					prompt: A2($author$project$Game$Problem$Course1$showFrac, safe_n1, d) + (' - ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d) + ' = ?'))
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, d),
				A2($author$project$Game$Problem$Common$randInt, 1, d - 1)));
	},
	A2($author$project$Game$Problem$Common$randInt, 2, 8));
var $author$project$Game$Problem$Course1$showSignedFloat = function (f) {
	return (f < 0) ? ('(' + ($elm$core$String$fromFloat(f) + ')')) : $elm$core$String$fromFloat(f);
};
var $author$project$Game$Problem$Course1$genNegRational = A2(
	$elm$random$Random$andThen,
	function (t) {
		if (!t) {
			return A2(
				$elm$random$Random$map,
				function (_v1) {
					var a = _v1.a;
					var b = _v1.b;
					var fb = -(b / 10.0);
					var fa = -(a / 10.0);
					var correct = fa + fb;
					return {
						answer: A2($author$project$Types$AFloat, correct, 0.01),
						hint: {
							answer: $elm$core$String$fromFloat(correct),
							prompt: $author$project$Game$Problem$Course1$showSignedFloat(fa) + (' + ' + ($author$project$Game$Problem$Course1$showSignedFloat(fb) + ' = ?')),
							steps: _List_fromArray(
								[
									'Both are negative, so add their absolute values',
									$elm$core$String$fromFloat(
									$elm$core$Basics$abs(fa)) + (' + ' + ($elm$core$String$fromFloat(
									$elm$core$Basics$abs(fb)) + (' = ' + $elm$core$String$fromFloat(
									$elm$core$Basics$abs(correct))))),
									'Keep negative sign: ' + $elm$core$String$fromFloat(correct)
								])
						},
						inputType: $author$project$Types$TDecimal,
						prompt: $author$project$Game$Problem$Course1$showSignedFloat(fa) + (' + ' + ($author$project$Game$Problem$Course1$showSignedFloat(fb) + ' = ?'))
					};
				},
				A3(
					$elm$random$Random$map2,
					$elm$core$Tuple$pair,
					A2($author$project$Game$Problem$Common$randInt, 1, 9),
					A2($author$project$Game$Problem$Common$randInt, 1, 9)));
		} else {
			return A2(
				$elm$random$Random$map,
				function (_v2) {
					var a = _v2.a;
					var b = _v2.b;
					var fb = -(b / 10.0);
					var fa = a / 10.0;
					var correct = fa + fb;
					return {
						answer: A2($author$project$Types$AFloat, correct, 0.01),
						hint: {
							answer: $elm$core$String$fromFloat(correct),
							prompt: $author$project$Game$Problem$Course1$showSignedFloat(fa) + (' + ' + ($author$project$Game$Problem$Course1$showSignedFloat(fb) + ' = ?')),
							steps: _List_fromArray(
								[
									'Adding a negative is like subtracting',
									$elm$core$String$fromFloat(fa) + (' - ' + ($elm$core$String$fromFloat(
									$elm$core$Basics$abs(fb)) + (' = ' + $elm$core$String$fromFloat(correct))))
								])
						},
						inputType: $author$project$Types$TDecimal,
						prompt: $author$project$Game$Problem$Course1$showSignedFloat(fa) + (' + ' + ($author$project$Game$Problem$Course1$showSignedFloat(fb) + ' = ?'))
					};
				},
				A3(
					$elm$random$Random$map2,
					$elm$core$Tuple$pair,
					A2($author$project$Game$Problem$Common$randInt, 5, 15),
					A2($author$project$Game$Problem$Common$randInt, 1, 9)));
		}
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course1$genSimplifyFrac = A2(
	$elm$random$Random$map,
	function (_v0) {
		var k = _v0.a;
		var n = _v0.b;
		var d = _v0.c;
		var safeD = (_Utils_cmp(d, n) < 1) ? (n + 1) : d;
		var g = A2($author$project$Game$Problem$Common$gcd, n, safeD);
		var rd = (safeD / g) | 0;
		var rn = (n / g) | 0;
		var bigN = k * rn;
		var bigD = k * rd;
		var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, bigN, bigD);
		var ansN = _v1.a;
		var ansD = _v1.b;
		return {
			answer: A2($author$project$Types$AFraction, ansN, ansD),
			hint: {
				answer: A2($author$project$Game$Problem$Course1$showFrac, ansN, ansD),
				prompt: 'Simplify: ' + A2($author$project$Game$Problem$Course1$showFrac, bigN, bigD),
				steps: _List_fromArray(
					[
						'Find GCF of ' + ($elm$core$String$fromInt(bigN) + (' and ' + ($elm$core$String$fromInt(bigD) + (': GCF = ' + $elm$core$String$fromInt(k))))),
						'Divide both by ' + ($elm$core$String$fromInt(k) + (': ' + ($elm$core$String$fromInt(bigN) + ('/' + ($elm$core$String$fromInt(k) + ('=' + ($elm$core$String$fromInt(ansN) + (', ' + ($elm$core$String$fromInt(bigD) + ('/' + ($elm$core$String$fromInt(k) + ('=' + $elm$core$String$fromInt(ansD))))))))))))),
						'Answer: ' + A2($author$project$Game$Problem$Course1$showFrac, ansN, ansD)
					])
			},
			inputType: $author$project$Types$TFraction,
			prompt: 'Simplify: ' + A2($author$project$Game$Problem$Course1$showFrac, bigN, bigD)
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (k, n, d) {
				return _Utils_Tuple3(k, n, d);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 4),
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$Course1$unit3 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course1$genFracAdd;
			case 1:
				return $author$project$Game$Problem$Course1$genFracSub;
			case 2:
				return $author$project$Game$Problem$Course1$genFracMul;
			case 3:
				return $author$project$Game$Problem$Course1$genDecAdd;
			case 4:
				return $author$project$Game$Problem$Course1$genDecMul;
			case 5:
				return $author$project$Game$Problem$Course1$genSimplifyFrac;
			case 6:
				return $author$project$Game$Problem$Course1$genFracAddUnlike;
			default:
				return $author$project$Game$Problem$Course1$genNegRational;
		}
	},
	A2($elm$random$Random$int, 0, 7));
var $author$project$Game$Problem$Course1$genCombineLike = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = (a + b) * x;
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'If x=' + ($elm$core$String$fromInt(x) + (', what is ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + 'x?'))))),
						steps: _List_fromArray(
							[
								'Combine like terms first: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('x = ' + ($elm$core$String$fromInt(a + b) + 'x'))))),
								'Then substitute: ' + ($elm$core$String$fromInt(a + b) + ('(' + ($elm$core$String$fromInt(x) + (') = ' + $elm$core$String$fromInt(correct)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'If x=' + ($elm$core$String$fromInt(x) + (', what is ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + 'x?')))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt((a + b) * x));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Course1$genEvalLinear = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		return {
			answer: $author$project$Types$AInt((a * x) + b),
			hint: {
				answer: $elm$core$String$fromInt((a * x) + b),
				prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' when x = ' + $elm$core$String$fromInt(x))))),
				steps: _List_fromArray(
					[
						'Substitute x = ' + ($elm$core$String$fromInt(x) + (': ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(x) + (') + ' + $elm$core$String$fromInt(b))))))),
						'Multiply: ' + ($elm$core$String$fromInt(a * x) + (' + ' + $elm$core$String$fromInt(b))),
						'Add: ' + $elm$core$String$fromInt((a * x) + b)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' when x = ' + $elm$core$String$fromInt(x)))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 0, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $author$project$Game$Problem$Course1$genEvalTwoVar = A2(
	$elm$random$Random$map,
	function (_v0) {
		var y = _v0.y;
		var x = _v0.x;
		var b = _v0.b;
		var a = _v0.a;
		return {
			answer: $author$project$Types$AInt((a * x) + (b * y)),
			hint: {
				answer: $elm$core$String$fromInt((a * x) + (b * y)),
				prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('y when x=' + ($elm$core$String$fromInt(x) + (', y=' + $elm$core$String$fromInt(y))))))),
				steps: _List_fromArray(
					[
						'Substitute: ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(x) + (') + ' + ($elm$core$String$fromInt(b) + ('(' + ($elm$core$String$fromInt(y) + ')'))))))),
						'Multiply: ' + ($elm$core$String$fromInt(a * x) + (' + ' + $elm$core$String$fromInt(b * y))),
						'Add: ' + $elm$core$String$fromInt((a * x) + (b * y))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('y' + (' when x=' + ($elm$core$String$fromInt(x) + (', y=' + $elm$core$String$fromInt(y))))))))
		};
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, x, y) {
				return {a: a, b: b, x: x, y: y};
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Course1$genFactorExpr = A2(
	$elm$random$Random$map,
	function (_v0) {
		var f = _v0.a;
		var a = _v0.b;
		var b = _v0.c;
		var wrong3 = $elm$core$String$fromInt(f + 1) + ('(' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ')'))));
		var wrong2 = $elm$core$String$fromInt(f) + ('(' + ($elm$core$String$fromInt(a + 1) + ('x + ' + ($elm$core$String$fromInt(b) + ')'))));
		var termB = f * b;
		var termA = f * a;
		var wrong1 = $elm$core$String$fromInt(termA) + ('(x + ' + ($elm$core$String$fromInt(termB) + ')'));
		var correct = $elm$core$String$fromInt(f) + ('(' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ')'))));
		var choices = A2(
			$author$project$Game$Problem$Course1$shuffleChoices,
			correct,
			_List_fromArray(
				[wrong1, wrong2, wrong3]));
		return {
			answer: $author$project$Types$AChoice(0),
			hint: {
				answer: correct,
				prompt: 'Factor: ' + ($elm$core$String$fromInt(termA) + ('x + ' + $elm$core$String$fromInt(termB))),
				steps: _List_fromArray(
					[
						'Find GCF of ' + ($elm$core$String$fromInt(termA) + (' and ' + ($elm$core$String$fromInt(termB) + (': GCF = ' + $elm$core$String$fromInt(f))))),
						'Divide each term by ' + ($elm$core$String$fromInt(f) + (': ' + ($elm$core$String$fromInt(termA) + ('x/' + ($elm$core$String$fromInt(f) + ('=' + ($elm$core$String$fromInt(a) + ('x, ' + ($elm$core$String$fromInt(termB) + ('/' + ($elm$core$String$fromInt(f) + ('=' + $elm$core$String$fromInt(b))))))))))))),
						'Answer: ' + correct
					])
			},
			inputType: $author$project$Types$TChoice(choices),
			prompt: 'Factor: ' + ($elm$core$String$fromInt(termA) + ('x + ' + $elm$core$String$fromInt(termB)))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (f, a, b) {
				return _Utils_Tuple3(f, a, b);
			}),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[2, 3, 4, 5]),
			2),
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$Course1$genSimplifyExpr = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var constant = a * b;
		var wrong3 = $elm$core$String$fromInt(a) + ('x + ' + $elm$core$String$fromInt(constant));
		var coeff = a + c;
		var correct = $elm$core$String$fromInt(coeff) + ('x + ' + $elm$core$String$fromInt(constant));
		var wrong1 = $elm$core$String$fromInt(coeff) + ('x + ' + $elm$core$String$fromInt(constant + 1));
		var wrong2 = $elm$core$String$fromInt(coeff + 1) + ('x + ' + $elm$core$String$fromInt(constant));
		var choices = A2(
			$author$project$Game$Problem$Course1$shuffleChoices,
			correct,
			_List_fromArray(
				[wrong1, wrong2, wrong3]));
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Simplify: ' + ($elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') + ' + ($elm$core$String$fromInt(c) + 'x'))))),
					steps: _List_fromArray(
						[
							'Distribute: ' + ($elm$core$String$fromInt(a) + ('(x+' + ($elm$core$String$fromInt(b) + (') = ' + ($elm$core$String$fromInt(a) + ('x + ' + $elm$core$String$fromInt(constant))))))),
							'Combine like terms: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(c) + ('x = ' + ($elm$core$String$fromInt(coeff) + 'x'))))),
							'Answer: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Simplify: ' + ($elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') + ' + ($elm$core$String$fromInt(c) + 'x')))))
			});
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$Course1$genTranslateExpr = A2(
	$elm$random$Random$map,
	function (t) {
		switch (t) {
			case 0:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'x + 5',
						prompt: 'Translate: \'5 more than x\'',
						steps: _List_fromArray(
							['\'More than\' means addition', 'x + 5'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['x + 3', 'x - 3', '3x', '3 - x'])),
					prompt: 'Translate: \'3 more than x\''
				};
			case 1:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: '3y',
						prompt: 'Translate: \'product of 3 and y\'',
						steps: _List_fromArray(
							['\'Product\' means multiplication', '3 × y = 3y'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['4y', '4 + y', 'y - 4', 'y / 4'])),
					prompt: 'Translate: \'the product of 4 and y\''
				};
			default:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'x/3',
						prompt: 'Translate: \'a number divided by 3\'',
						steps: _List_fromArray(
							['\'Divided by\' means division', 'x / 3 = x/3'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['x/5', '5x', 'x - 5', 'x + 5'])),
					prompt: 'Translate: \'a number divided by 5\''
				};
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course1$unit4 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course1$genEvalLinear;
			case 1:
				return $author$project$Game$Problem$Course1$genEvalTwoVar;
			case 2:
				return $author$project$Game$Problem$Course1$genCombineLike;
			case 3:
				return $author$project$Game$Problem$Course1$genTranslateExpr;
			case 4:
				return $author$project$Game$Problem$Course1$genSimplifyExpr;
			default:
				return $author$project$Game$Problem$Course1$genFactorExpr;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Types$AInequality = F2(
	function (a, b) {
		return {$: 'AInequality', a: a, b: b};
	});
var $author$project$Types$IGt = {$: 'IGt'};
var $author$project$Types$ILt = {$: 'ILt'};
var $author$project$Types$TInequality = {$: 'TInequality'};
var $author$project$Game$Problem$Course1$genInequality = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var x = _v0.b;
		var b = a * x;
		return A2(
			$elm$random$Random$map,
			function (dirN) {
				var dirStr = (!dirN) ? '>' : '<';
				var dir = (!dirN) ? $author$project$Types$IGt : $author$project$Types$ILt;
				return {
					answer: A2($author$project$Types$AInequality, dir, x),
					hint: {
						answer: 'x ' + (dirStr + (' ' + $elm$core$String$fromInt(x))),
						prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x ' + (dirStr + (' ' + $elm$core$String$fromInt(b))))),
						steps: _List_fromArray(
							[
								'Divide both sides by ' + $elm$core$String$fromInt(a),
								$elm$core$String$fromInt(a) + ('x / ' + ($elm$core$String$fromInt(a) + (' ' + (dirStr + (' ' + ($elm$core$String$fromInt(b) + (' / ' + $elm$core$String$fromInt(a)))))))),
								'x ' + (dirStr + (' ' + $elm$core$String$fromInt(x))),
								'Note: dividing by a positive keeps the inequality direction'
							])
					},
					inputType: $author$project$Types$TInequality,
					prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x ' + (dirStr + (' ' + $elm$core$String$fromInt(b)))))
				};
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 12)));
var $author$project$Game$Problem$Course1$genSolveAdd = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var x = _v0.b;
		var b = a + x;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: 'Solve: x + ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(b))),
				steps: _List_fromArray(
					[
						'Subtract ' + ($elm$core$String$fromInt(a) + ' from both sides'),
						'x + ' + ($elm$core$String$fromInt(a) + (' − ' + ($elm$core$String$fromInt(a) + (' = ' + ($elm$core$String$fromInt(b) + (' − ' + $elm$core$String$fromInt(a))))))),
						'x = ' + $elm$core$String$fromInt(x)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: x + ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(b)))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 20)));
var $author$project$Game$Problem$Course1$genSolveInequality = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var x = _v0.b;
		var b = a + x;
		return A2(
			$elm$random$Random$map,
			function (dirN) {
				var dirStr = (!dirN) ? '>' : '<';
				var dir = (!dirN) ? $author$project$Types$IGt : $author$project$Types$ILt;
				return {
					answer: A2($author$project$Types$AInequality, dir, x),
					hint: {
						answer: 'x ' + (dirStr + (' ' + $elm$core$String$fromInt(x))),
						prompt: 'Solve: x + ' + ($elm$core$String$fromInt(a) + (' ' + (dirStr + (' ' + $elm$core$String$fromInt(b))))),
						steps: _List_fromArray(
							[
								'Subtract ' + ($elm$core$String$fromInt(a) + ' from both sides'),
								'x ' + (dirStr + (' ' + ($elm$core$String$fromInt(b) + (' - ' + $elm$core$String$fromInt(a))))),
								'x ' + (dirStr + (' ' + $elm$core$String$fromInt(x)))
							])
					},
					inputType: $author$project$Types$TInequality,
					prompt: 'Solve: x + ' + ($elm$core$String$fromInt(a) + (' ' + (dirStr + (' ' + $elm$core$String$fromInt(b)))))
				};
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 12)));
var $author$project$Game$Problem$Course1$genSolveMul = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var x = _v0.b;
		var b = a * x;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(b))),
				steps: _List_fromArray(
					[
						'Divide both sides by ' + $elm$core$String$fromInt(a),
						$elm$core$String$fromInt(a) + ('x / ' + ($elm$core$String$fromInt(a) + (' = ' + ($elm$core$String$fromInt(b) + (' / ' + $elm$core$String$fromInt(a)))))),
						'x = ' + $elm$core$String$fromInt(x)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(b)))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 12)));
var $author$project$Game$Problem$Course1$genTwoStep = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		var c = (a * x) + b;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(c))))),
				steps: _List_fromArray(
					[
						'Step 1: Subtract ' + ($elm$core$String$fromInt(b) + (' from both sides: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(c - b))))),
						'Step 2: Divide both sides by ' + ($elm$core$String$fromInt(a) + (': x = ' + $elm$core$String$fromInt(x)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(c)))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $author$project$Game$Problem$Course1$genWriteEquation = A2(
	$elm$random$Random$map,
	function (_v0) {
		var total = _v0.a;
		var earned = _v0.b;
		var start = total - earned;
		return {
			answer: $author$project$Types$AInt(start),
			hint: {
				answer: $elm$core$String$fromInt(start),
				prompt: 'After earning ' + ($elm$core$String$fromInt(earned) + (', has ' + ($elm$core$String$fromInt(total) + '. Find starting amount.'))),
				steps: _List_fromArray(
					[
						'Write equation: x + ' + ($elm$core$String$fromInt(earned) + (' = ' + $elm$core$String$fromInt(total))),
						'Subtract ' + ($elm$core$String$fromInt(earned) + ' from both sides'),
						'x = ' + $elm$core$String$fromInt(start)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'A hero has x gold coins. After earning ' + ($elm$core$String$fromInt(earned) + (' more, she has ' + ($elm$core$String$fromInt(total) + ' gold. Find x.')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 10, 30),
		A2($author$project$Game$Problem$Common$randInt, 5, 15)));
var $author$project$Game$Problem$Course1$unit5 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course1$genSolveAdd;
			case 1:
				return $author$project$Game$Problem$Course1$genSolveMul;
			case 2:
				return $author$project$Game$Problem$Course1$genTwoStep;
			case 3:
				return $author$project$Game$Problem$Course1$genInequality;
			case 4:
				return $author$project$Game$Problem$Course1$genWriteEquation;
			default:
				return $author$project$Game$Problem$Course1$genSolveInequality;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Game$Problem$Course1$genConvertFDP = A2(
	$elm$random$Random$map,
	function (_v0) {
		var n = _v0.a;
		var d = _v0.b;
		var pct = _v0.c;
		var wrong3 = (pct === '75%') ? '80%' : '75%';
		var wrong2 = (pct === '50%') ? '45%' : '50%';
		var wrong1 = (pct === '25%') ? '20%' : '25%';
		var choices = A2(
			$author$project$Game$Problem$Course1$shuffleChoices,
			pct,
			_List_fromArray(
				[wrong1, wrong2, wrong3]));
		return {
			answer: $author$project$Types$AChoice(0),
			hint: {
				answer: pct,
				prompt: 'Convert ' + (A2($author$project$Game$Problem$Course1$showFrac, n, d) + ' to a percent.'),
				steps: _List_fromArray(
					[
						'Divide numerator by denominator: ' + ($elm$core$String$fromInt(n) + (' / ' + ($elm$core$String$fromInt(d) + (' = ' + $elm$core$String$fromFloat(n / d))))),
						'Multiply by 100: ' + ($elm$core$String$fromFloat(n / d) + (' × 100 = ' + pct))
					])
			},
			inputType: $author$project$Types$TChoice(choices),
			prompt: 'Convert ' + (A2($author$project$Game$Problem$Course1$showFrac, n, d) + ' to a percent.')
		};
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[
				_Utils_Tuple3(1, 4, '25%'),
				_Utils_Tuple3(1, 2, '50%'),
				_Utils_Tuple3(3, 4, '75%'),
				_Utils_Tuple3(1, 5, '20%'),
				_Utils_Tuple3(2, 5, '40%')
			]),
		_Utils_Tuple3(1, 4, '25%')));
var $author$project$Game$Problem$Course1$genEquivRatio = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$andThen,
			function (k) {
				var bigB = b * k;
				var correct = bigB;
				var bigA = a * k;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course1$shuffleChoices,
							$elm$core$String$fromInt(correct),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(correct),
								prompt: $elm$core$String$fromInt(a) + (':' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(bigA) + ':?')))),
								steps: _List_fromArray(
									[
										'Scale factor: ' + ($elm$core$String$fromInt(bigA) + (' / ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(k))))),
										'Multiply second term: ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(k) + (' = ' + $elm$core$String$fromInt(correct)))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Find the missing value: ' + ($elm$core$String$fromInt(a) + (':' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(bigA) + ':?')))))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(correct));
			},
			A2($author$project$Game$Problem$Common$randInt, 2, 4));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$Course1$genMissingProportion = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var k = _v0.b;
		var c = a + 1;
		var x = c * k;
		var b = a * k;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: $elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(c) + '/?')))),
				steps: _List_fromArray(
					[
						'Find the scale factor: ' + ($elm$core$String$fromInt(b) + (' / ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(k))))),
						'Apply to numerator ' + ($elm$core$String$fromInt(c) + (': ' + ($elm$core$String$fromInt(c) + (' × ' + ($elm$core$String$fromInt(k) + (' = ' + $elm$core$String$fromInt(x)))))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(c) + '/?'))))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$Course1$genPercent = A2(
	$elm$random$Random$map,
	function (_v0) {
		var pct = _v0.a;
		var whole = _v0.b;
		var correct = ((pct * whole) / 100) | 0;
		return {
			answer: $author$project$Types$AInt(correct),
			hint: {
				answer: $elm$core$String$fromInt(correct),
				prompt: 'What is ' + ($elm$core$String$fromInt(pct) + ('% of ' + ($elm$core$String$fromInt(whole) + '?'))),
				steps: _List_fromArray(
					[
						'Convert: ' + ($elm$core$String$fromInt(pct) + ('% = ' + $elm$core$String$fromFloat(pct / 100))),
						'Multiply: ' + ($elm$core$String$fromFloat(pct / 100) + (' × ' + ($elm$core$String$fromInt(whole) + (' = ' + $elm$core$String$fromInt(correct)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'What is ' + ($elm$core$String$fromInt(pct) + ('% of ' + ($elm$core$String$fromInt(whole) + '?')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[10, 20, 25, 50, 75]),
			25),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[20, 40, 60, 80, 100, 120, 200]),
			100)));
var $author$project$Game$Problem$Course1$genPercentOfNum = A2(
	$elm$random$Random$map,
	function (_v0) {
		var pct = _v0.a;
		var whole = _v0.b;
		var correct = ((pct * whole) / 100) | 0;
		return {
			answer: $author$project$Types$AInt(correct),
			hint: {
				answer: $elm$core$String$fromInt(correct),
				prompt: 'What is ' + ($elm$core$String$fromInt(pct) + ('% of ' + ($elm$core$String$fromInt(whole) + '?'))),
				steps: _List_fromArray(
					[
						'Convert: ' + ($elm$core$String$fromInt(pct) + ('% = ' + $elm$core$String$fromFloat(pct / 100))),
						'Multiply: ' + ($elm$core$String$fromFloat(pct / 100) + (' × ' + ($elm$core$String$fromInt(whole) + (' = ' + $elm$core$String$fromInt(correct)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'What is ' + ($elm$core$String$fromInt(pct) + ('% of ' + ($elm$core$String$fromInt(whole) + '?')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[10, 20, 25, 30, 50, 75]),
			25),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[20, 40, 60, 80, 100, 120, 200]),
			80)));
var $author$project$Game$Problem$Course1$genUnitRate = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var units = _v0.a;
		var rate = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var total = units * rate;
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(rate),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: '$' + $elm$core$String$fromInt(rate),
						prompt: $elm$core$String$fromInt(units) + (' items cost $' + ($elm$core$String$fromInt(total) + '. Cost per item?')),
						steps: _List_fromArray(
							[
								'Unit rate = total / quantity',
								'$' + ($elm$core$String$fromInt(total) + (' / ' + ($elm$core$String$fromInt(units) + (' = $' + ($elm$core$String$fromInt(rate) + ' per item')))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: $elm$core$String$fromInt(units) + (' items cost $' + ($elm$core$String$fromInt(total) + '. Cost per item?'))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(rate));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $author$project$Game$Problem$Course1$unit6 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course1$genPercent;
			case 1:
				return $author$project$Game$Problem$Course1$genUnitRate;
			case 2:
				return $author$project$Game$Problem$Course1$genMissingProportion;
			case 3:
				return $author$project$Game$Problem$Course1$genEquivRatio;
			case 4:
				return $author$project$Game$Problem$Course1$genConvertFDP;
			default:
				return $author$project$Game$Problem$Course1$genPercentOfNum;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Game$Problem$Course1$genAreaRect = A2(
	$elm$random$Random$map,
	function (_v0) {
		var w = _v0.a;
		var h = _v0.b;
		return {
			answer: $author$project$Types$AInt(w * h),
			hint: {
				answer: $elm$core$String$fromInt(w * h),
				prompt: 'Area of a rectangle: width=' + ($elm$core$String$fromInt(w) + (', height=' + ($elm$core$String$fromInt(h) + '?'))),
				steps: _List_fromArray(
					[
						'Area = width × height',
						$elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt(w * h))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Area of a rectangle: width=' + ($elm$core$String$fromInt(w) + (', height=' + ($elm$core$String$fromInt(h) + '?')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 15),
		A2($author$project$Game$Problem$Common$randInt, 2, 15)));
var $author$project$Game$Problem$Course1$genAreaTriangle = A2(
	$elm$random$Random$map,
	function (_v0) {
		var h = _v0.a;
		var bHalf = _v0.b;
		var b = bHalf * 2;
		return {
			answer: $author$project$Types$AInt(((b * h) / 2) | 0),
			hint: {
				answer: $elm$core$String$fromInt(((b * h) / 2) | 0),
				prompt: 'Area of triangle: base=' + ($elm$core$String$fromInt(b) + (', height=' + ($elm$core$String$fromInt(h) + '?'))),
				steps: _List_fromArray(
					[
						'Area = ½ × base × height',
						'½ × ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt(((b * h) / 2) | 0)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Area of triangle: base=' + ($elm$core$String$fromInt(b) + (', height=' + ($elm$core$String$fromInt(h) + '?')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 12)));
var $elm$core$Basics$pi = _Basics_pi;
var $author$project$Game$Problem$Course1$genCircumference = A2(
	$elm$random$Random$map,
	function (r) {
		var correct = (2.0 * $elm$core$Basics$pi) * r;
		return {
			answer: A2($author$project$Types$AFloat, (2.0 * 3.14) * r, 0.1),
			hint: function () {
				var c314 = (2.0 * 3.14) * r;
				return {
					answer: $elm$core$String$fromFloat(c314),
					prompt: 'Circumference of circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)'),
					steps: _List_fromArray(
						[
							'C = 2πr',
							'C = 2 × 3.14 × ' + $elm$core$String$fromInt(r),
							'C = ' + $elm$core$String$fromFloat(c314)
						])
				};
			}(),
			inputType: $author$project$Types$TDecimal,
			prompt: 'Circumference of circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)')
		};
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[3, 4, 5, 6, 7, 8, 10]),
		5));
var $author$project$Game$Problem$Course1$genPerimeter = A2(
	$elm$random$Random$andThen,
	function (t) {
		if (!t) {
			return A2(
				$elm$random$Random$map,
				function (_v1) {
					var l = _v1.a;
					var w = _v1.b;
					return {
						answer: $author$project$Types$AInt(2 * (l + w)),
						hint: {
							answer: $elm$core$String$fromInt(2 * (l + w)),
							prompt: 'Perimeter of a rectangle: length=' + ($elm$core$String$fromInt(l) + (', width=' + ($elm$core$String$fromInt(w) + '?'))),
							steps: _List_fromArray(
								[
									'P = 2(length + width)',
									'P = 2(' + ($elm$core$String$fromInt(l) + (' + ' + ($elm$core$String$fromInt(w) + (') = 2 × ' + ($elm$core$String$fromInt(l + w) + (' = ' + $elm$core$String$fromInt(2 * (l + w))))))))
								])
						},
						inputType: $author$project$Types$TInteger,
						prompt: 'Perimeter of a rectangle: length=' + ($elm$core$String$fromInt(l) + (', width=' + ($elm$core$String$fromInt(w) + '?')))
					};
				},
				A3(
					$elm$random$Random$map2,
					$elm$core$Tuple$pair,
					A2($author$project$Game$Problem$Common$randInt, 2, 15),
					A2($author$project$Game$Problem$Common$randInt, 2, 15)));
		} else {
			return A2(
				$elm$random$Random$map,
				function (_v2) {
					var a = _v2.a;
					var b = _v2.b;
					var c = _v2.c;
					return {
						answer: $author$project$Types$AInt((a + b) + c),
						hint: {
							answer: $elm$core$String$fromInt((a + b) + c),
							prompt: 'Perimeter of a triangle with sides ' + ($elm$core$String$fromInt(a) + (', ' + ($elm$core$String$fromInt(b) + (', ' + ($elm$core$String$fromInt(c) + '?'))))),
							steps: _List_fromArray(
								[
									'P = a + b + c',
									'P = ' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' + ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt((a + b) + c)))))))
								])
						},
						inputType: $author$project$Types$TInteger,
						prompt: 'Perimeter of a triangle with sides ' + ($elm$core$String$fromInt(a) + (', ' + ($elm$core$String$fromInt(b) + (', ' + ($elm$core$String$fromInt(c) + '?')))))
					};
				},
				A4(
					$elm$random$Random$map3,
					F3(
						function (a, b, c) {
							return _Utils_Tuple3(a, b, c);
						}),
					A2($author$project$Game$Problem$Common$randInt, 3, 10),
					A2($author$project$Game$Problem$Common$randInt, 3, 10),
					A2($author$project$Game$Problem$Common$randInt, 3, 10)));
		}
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course1$genSurfaceArea = A2(
	$elm$random$Random$map,
	function (_v0) {
		var l = _v0.a;
		var w = _v0.b;
		var h = _v0.c;
		var sa = 2 * (((l * w) + (l * h)) + (w * h));
		return {
			answer: $author$project$Types$AInt(sa),
			hint: {
				answer: $elm$core$String$fromInt(sa),
				prompt: 'Surface area of rectangular prism: ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + '?'))))),
				steps: _List_fromArray(
					[
						'SA = 2(lw + lh + wh)',
						'= 2(' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + (' + ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(h) + (' + ' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + ')'))))))))))),
						'= 2(' + ($elm$core$String$fromInt(l * w) + (' + ' + ($elm$core$String$fromInt(l * h) + (' + ' + ($elm$core$String$fromInt(w * h) + (') = ' + $elm$core$String$fromInt(sa)))))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Surface area of rectangular prism: ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + '?')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (l, w, h) {
				return _Utils_Tuple3(l, w, h);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8)));
var $author$project$Game$Problem$Course1$genVolumeBox = A2(
	$elm$random$Random$map,
	function (_v0) {
		var l = _v0.a;
		var w = _v0.b;
		var h = _v0.c;
		return {
			answer: $author$project$Types$AInt((l * w) * h),
			hint: {
				answer: $elm$core$String$fromInt((l * w) * h),
				prompt: 'Volume of box: ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + '?'))))),
				steps: _List_fromArray(
					[
						'V = length × width × height',
						$elm$core$String$fromInt(l) + (' × ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt((l * w) * h))))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Volume of box: ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + '?')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (l, w, h) {
				return _Utils_Tuple3(l, w, h);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8)));
var $author$project$Game$Problem$Course1$unit7 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course1$genAreaRect;
			case 1:
				return $author$project$Game$Problem$Course1$genAreaTriangle;
			case 2:
				return $author$project$Game$Problem$Course1$genCircumference;
			case 3:
				return $author$project$Game$Problem$Course1$genVolumeBox;
			case 4:
				return $author$project$Game$Problem$Course1$genPerimeter;
			default:
				return $author$project$Game$Problem$Course1$genSurfaceArea;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $author$project$Game$Problem$Course1$genIQR = A2(
	$elm$random$Random$andThen,
	function (r) {
		return A2(
			$elm$random$Random$map,
			function (s) {
				var sorted = $elm$core$List$sort(
					_List_fromArray(
						[r.a, r.b, r.c, r.d, s.e, s.f, s.g, s.h]));
				var numStr = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$map, $elm$core$String$fromInt, sorted));
				var getAt = function (i) {
					return A2(
						$elm$core$Maybe$withDefault,
						0,
						$elm$core$List$head(
							A2($elm$core$List$drop, i, sorted)));
				};
				var q1 = ((getAt(1) + getAt(2)) / 2) | 0;
				var q3 = ((getAt(5) + getAt(6)) / 2) | 0;
				var iqr = q3 - q1;
				return {
					answer: $author$project$Types$AInt(iqr),
					hint: {
						answer: $elm$core$String$fromInt(iqr),
						prompt: 'Find the IQR of: {' + (numStr + '}'),
						steps: _List_fromArray(
							[
								'Q1 = average of 2nd and 3rd values: (' + ($elm$core$String$fromInt(
								getAt(1)) + ('+' + ($elm$core$String$fromInt(
								getAt(2)) + (')/2 = ' + $elm$core$String$fromInt(q1))))),
								'Q3 = average of 6th and 7th values: (' + ($elm$core$String$fromInt(
								getAt(5)) + ('+' + ($elm$core$String$fromInt(
								getAt(6)) + (')/2 = ' + $elm$core$String$fromInt(q3))))),
								'IQR = Q3 - Q1 = ' + ($elm$core$String$fromInt(q3) + (' - ' + ($elm$core$String$fromInt(q1) + (' = ' + $elm$core$String$fromInt(iqr)))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Find the IQR of: {' + (numStr + '}')
				};
			},
			A5(
				$elm$random$Random$map4,
				F4(
					function (e, f, g, h) {
						return {e: e, f: f, g: g, h: h};
					}),
				A2($author$project$Game$Problem$Common$randInt, 1, 5),
				A2($author$project$Game$Problem$Common$randInt, 6, 10),
				A2($author$project$Game$Problem$Common$randInt, 11, 15),
				A2($author$project$Game$Problem$Common$randInt, 16, 20)));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return {a: a, b: b, c: c, d: d};
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 6, 10),
		A2($author$project$Game$Problem$Common$randInt, 11, 15),
		A2($author$project$Game$Problem$Common$randInt, 16, 20)));
var $author$project$Game$Problem$Course1$genMAD = A2(
	$elm$random$Random$andThen,
	function (m) {
		return A2(
			$elm$random$Random$map,
			function (_v0) {
				var d1 = _v0.a;
				var d2 = _v0.b;
				var d2safe = (!(!A2($elm$core$Basics$modBy, 2, d1 + d2))) ? (d2 + 1) : d2;
				var mad = ((d1 + d2safe) / 2) | 0;
				var vals = $elm$core$List$sort(
					_List_fromArray(
						[m + d1, m + d2safe, m - d1, m - d2safe]));
				var numStr = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$map, $elm$core$String$fromInt, vals));
				return {
					answer: $author$project$Types$AInt(mad),
					hint: {
						answer: $elm$core$String$fromInt(mad),
						prompt: 'Find the mean absolute deviation (MAD) of: {' + (numStr + '}'),
						steps: _List_fromArray(
							[
								'Mean = ' + $elm$core$String$fromInt(m),
								'Deviations: ' + A2(
								$elm$core$String$join,
								', ',
								A2(
									$elm$core$List$map,
									function (v) {
										return '|' + ($elm$core$String$fromInt(v) + ('-' + ($elm$core$String$fromInt(m) + ('|=' + $elm$core$String$fromInt(
											$elm$core$Basics$abs(v - m))))));
									},
									vals)),
								'MAD = ' + $elm$core$String$fromInt(mad)
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Find the mean absolute deviation (MAD) of: {' + (numStr + '}')
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 1, 4),
				A2($author$project$Game$Problem$Common$randInt, 1, 4)));
	},
	A2($author$project$Game$Problem$Common$randInt, 5, 15));
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Game$Problem$Course1$genMean = A2(
	$elm$random$Random$andThen,
	function (nums) {
		var s = $elm$core$List$sum(nums);
		var n = $elm$core$List$length(nums);
		var correct = (s / n) | 0;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var numStr = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$map, $elm$core$String$fromInt, nums));
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'Mean of {' + (numStr + '}?'),
						steps: _List_fromArray(
							[
								'Add all: ' + (A2(
								$elm$core$String$join,
								' + ',
								A2($elm$core$List$map, $elm$core$String$fromInt, nums)) + (' = ' + $elm$core$String$fromInt(s))),
								'Divide by ' + ($elm$core$String$fromInt(n) + (': ' + ($elm$core$String$fromInt(s) + (' / ' + ($elm$core$String$fromInt(n) + (' = ' + $elm$core$String$fromInt(correct)))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Mean of {' + (numStr + '}?')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return _List_fromArray(
					[a, b, c, d]);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 20)));
var $author$project$Game$Problem$Course1$genMedian = A2(
	$elm$random$Random$andThen,
	function (sorted) {
		var mid2 = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$head(
				A2($elm$core$List$drop, 2, sorted)));
		var mid1 = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$head(
				A2($elm$core$List$drop, 1, sorted)));
		var correct = ((mid1 + mid2) / 2) | 0;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var numStr = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$map, $elm$core$String$fromInt, sorted));
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'Median of {' + (numStr + '}?'),
						steps: _List_fromArray(
							[
								'Sorted: ' + A2(
								$elm$core$String$join,
								', ',
								A2($elm$core$List$map, $elm$core$String$fromInt, sorted)),
								'Even count — average the two middle values',
								'(' + ($elm$core$String$fromInt(mid1) + (' + ' + ($elm$core$String$fromInt(mid2) + (') / 2 = ' + $elm$core$String$fromInt(correct)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Median of {' + (numStr + '}?')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return $elm$core$List$sort(
					_List_fromArray(
						[a, b, c, d]));
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 20)));
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Game$Problem$Course1$genRange = A2(
	$elm$random$Random$andThen,
	function (nums) {
		var mx = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$maximum(nums));
		var mn = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(nums));
		var correct = mx - mn;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var numStr = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$map, $elm$core$String$fromInt, nums));
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'Range of {' + (numStr + '}?'),
						steps: _List_fromArray(
							[
								'Maximum: ' + $elm$core$String$fromInt(mx),
								'Minimum: ' + $elm$core$String$fromInt(mn),
								'Range = ' + ($elm$core$String$fromInt(mx) + (' − ' + ($elm$core$String$fromInt(mn) + (' = ' + $elm$core$String$fromInt(correct)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Range of {' + (numStr + '}?')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return _List_fromArray(
					[a, b, c, d]);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 20),
		A2($author$project$Game$Problem$Common$randInt, 1, 20)));
var $author$project$Game$Problem$Course1$unit8 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course1$genMean;
			case 1:
				return $author$project$Game$Problem$Course1$genMedian;
			case 2:
				return $author$project$Game$Problem$Course1$genRange;
			case 3:
				return $author$project$Game$Problem$Course1$genIQR;
			default:
				return $author$project$Game$Problem$Course1$genMAD;
		}
	},
	A2($elm$random$Random$int, 0, 4));
var $author$project$Game$Problem$Course1$generatorFor = function (unitNum) {
	switch (unitNum) {
		case 1:
			return $author$project$Game$Problem$Course1$unit1;
		case 2:
			return $author$project$Game$Problem$Course1$unit2;
		case 3:
			return $author$project$Game$Problem$Course1$unit3;
		case 4:
			return $author$project$Game$Problem$Course1$unit4;
		case 5:
			return $author$project$Game$Problem$Course1$unit5;
		case 6:
			return $author$project$Game$Problem$Course1$unit6;
		case 7:
			return $author$project$Game$Problem$Course1$unit7;
		case 8:
			return $author$project$Game$Problem$Course1$unit8;
		default:
			return $author$project$Game$Problem$Course1$unit1;
	}
};
var $elm$core$Basics$round = _Basics_round;
var $author$project$Game$Problem$Course2$showFrac = F2(
	function (n, d) {
		return $elm$core$String$fromInt(n) + ('/' + $elm$core$String$fromInt(d));
	});
var $author$project$Game$Problem$Course2$shuffleChoices = F2(
	function (correct, wrong) {
		return A2(
			$elm$core$List$cons,
			correct,
			A2($elm$core$List$take, 3, wrong));
	});
var $author$project$Game$Problem$Course2$genConvertFDP = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$andThen,
					function (_v1) {
						var n = _v1.a;
						var d = _v1.b;
						var pct = _v1.c;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Course2$shuffleChoices,
									$elm$core$String$fromInt(pct) + '%',
									A2(
										$elm$core$List$map,
										function (w) {
											return w + '%';
										},
										wrong));
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(pct) + '%',
										prompt: 'Convert ' + (A2($author$project$Game$Problem$Course2$showFrac, n, d) + ' to a percent.'),
										steps: _List_fromArray(
											[
												'Divide numerator by denominator: ' + ($elm$core$String$fromInt(n) + (' / ' + ($elm$core$String$fromInt(d) + (' = ' + $elm$core$String$fromFloat(n / d))))),
												'Multiply by 100: ' + ($elm$core$String$fromFloat(n / d) + (' × 100 = ' + ($elm$core$String$fromInt(pct) + '%')))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'Convert ' + (A2($author$project$Game$Problem$Course2$showFrac, n, d) + ' to a percent.')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(pct));
					},
					A2(
						$author$project$Game$Problem$Common$randChoice,
						_List_fromArray(
							[
								_Utils_Tuple3(1, 2, 50),
								_Utils_Tuple3(1, 4, 25),
								_Utils_Tuple3(3, 4, 75),
								_Utils_Tuple3(1, 5, 20),
								_Utils_Tuple3(2, 5, 40)
							]),
						_Utils_Tuple3(1, 2, 50)));
			case 1:
				return A2(
					$elm$random$Random$andThen,
					function (dec) {
						var pct = $elm$core$Basics$round(dec * 100);
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Course2$shuffleChoices,
									$elm$core$String$fromInt(pct) + '%',
									A2(
										$elm$core$List$map,
										function (w) {
											return w + '%';
										},
										wrong));
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(pct) + '%',
										prompt: 'Convert ' + ($elm$core$String$fromFloat(dec) + ' to a percent.'),
										steps: _List_fromArray(
											[
												'Multiply by 100 (move decimal 2 places right)',
												$elm$core$String$fromFloat(dec) + (' × 100 = ' + ($elm$core$String$fromInt(pct) + '%'))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'Convert ' + ($elm$core$String$fromFloat(dec) + ' to a percent.')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(pct));
					},
					A2(
						$author$project$Game$Problem$Common$randChoice,
						_List_fromArray(
							[0.25, 0.5, 0.75, 0.1, 0.2, 0.4, 0.6, 0.8]),
						0.5));
			default:
				return A2(
					$elm$random$Random$map,
					function (pct) {
						var dec = pct / 100.0;
						return {
							answer: A2($author$project$Types$AFloat, dec, 0.001),
							hint: {
								answer: $elm$core$String$fromFloat(dec),
								prompt: 'Convert ' + ($elm$core$String$fromInt(pct) + '% to a decimal.'),
								steps: _List_fromArray(
									[
										'Divide by 100 (move decimal 2 places left)',
										$elm$core$String$fromInt(pct) + (' / 100 = ' + $elm$core$String$fromFloat(dec))
									])
							},
							inputType: $author$project$Types$TDecimal,
							prompt: 'Convert ' + ($elm$core$String$fromInt(pct) + '% to a decimal.')
						};
					},
					A2(
						$author$project$Game$Problem$Common$randChoice,
						_List_fromArray(
							[25, 50, 75, 10, 20, 30, 60, 80]),
						50));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $author$project$Game$Problem$Course2$superscript = function (n) {
	switch (n) {
		case 2:
			return '²';
		case 3:
			return '³';
		case 4:
			return '⁴';
		case 5:
			return '⁵';
		case 6:
			return '⁶';
		default:
			return '^' + $elm$core$String$fromInt(n);
	}
};
var $author$project$Game$Problem$Course2$genExpSquareRoot = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var base = _v0.a;
				var exp = _v0.b;
				var correct = A2($elm$core$Basics$pow, base, exp);
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(correct),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(correct),
								prompt: $elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course2$superscript(exp) + ' = ?'),
								steps: _List_fromArray(
									[
										$elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course2$superscript(exp) + (' = ' + A2(
										$elm$core$String$join,
										' × ',
										A2(
											$elm$core$List$repeat,
											exp,
											$elm$core$String$fromInt(base))))),
										'= ' + $elm$core$String$fromInt(correct)
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: $elm$core$String$fromInt(base) + ($author$project$Game$Problem$Course2$superscript(exp) + ' = ?')
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(correct));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 8),
				A2($author$project$Game$Problem$Common$randInt, 2, 3))) : A2(
			$elm$random$Random$andThen,
			function (sq) {
				var root = $elm$core$Basics$round(
					$elm$core$Basics$sqrt(sq));
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(root),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(root),
								prompt: '√' + ($elm$core$String$fromInt(sq) + ' = ?'),
								steps: _List_fromArray(
									[
										'Ask: what number times itself equals ' + ($elm$core$String$fromInt(sq) + '?'),
										$elm$core$String$fromInt(root) + (' × ' + ($elm$core$String$fromInt(root) + (' = ' + ($elm$core$String$fromInt(sq) + (', so √' + ($elm$core$String$fromInt(sq) + (' = ' + $elm$core$String$fromInt(root))))))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: '√' + ($elm$core$String$fromInt(sq) + ' = ?')
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(root));
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[4, 9, 16, 25, 36, 49, 64, 81, 100]),
				25));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genFracAddSub = A2(
	$elm$random$Random$andThen,
	function (op) {
		return A2(
			$elm$random$Random$andThen,
			function (d1) {
				return A2(
					$elm$random$Random$andThen,
					function (d2raw) {
						var d2 = _Utils_eq(d2raw, d1) ? ((d1 === 6) ? 2 : (d1 + 1)) : d2raw;
						return A2(
							$elm$random$Random$map,
							function (_v0) {
								var n1 = _v0.a;
								var n2 = _v0.b;
								var opStr = (!op) ? ' + ' : ' - ';
								var commonD = A2($author$project$Game$Problem$Common$lcm, d1, d2);
								var e1 = n1 * ((commonD / d1) | 0);
								var e2 = n2 * ((commonD / d2) | 0);
								var pd1 = (!op) ? d1 : ((_Utils_cmp(e1, e2) > -1) ? d1 : d2);
								var pd2 = (!op) ? d2 : ((_Utils_cmp(e1, e2) > -1) ? d2 : d1);
								var pn1 = (!op) ? n1 : ((_Utils_cmp(e1, e2) > -1) ? n1 : n2);
								var pn2 = (!op) ? n2 : ((_Utils_cmp(e1, e2) > -1) ? n2 : n1);
								var _v1 = function () {
									if (!op) {
										return A2($author$project$Game$Problem$Common$reduceFraction, e1 + e2, commonD);
									} else {
										var small = A2($elm$core$Basics$min, e1, e2);
										var big = A2($elm$core$Basics$max, e1, e2);
										var _v2 = (_Utils_cmp(e1, e2) > -1) ? _Utils_Tuple2(n2, d2) : _Utils_Tuple2(n1, d1);
										var bn2 = _v2.a;
										var bd2 = _v2.b;
										var _v3 = (_Utils_cmp(e1, e2) > -1) ? _Utils_Tuple2(n1, d1) : _Utils_Tuple2(n2, d2);
										var bn1 = _v3.a;
										var bd1 = _v3.b;
										return A2($author$project$Game$Problem$Common$reduceFraction, big - small, commonD);
									}
								}();
								var rn = _v1.a;
								var rd = _v1.b;
								return {
									answer: A2($author$project$Types$AFraction, rn, rd),
									hint: {
										answer: A2($author$project$Game$Problem$Course2$showFrac, rn, rd),
										prompt: A2($author$project$Game$Problem$Course2$showFrac, pn1, pd1) + (opStr + (A2($author$project$Game$Problem$Course2$showFrac, pn2, pd2) + ' = ?')),
										steps: _List_fromArray(
											[
												'Find LCD: LCD(' + ($elm$core$String$fromInt(pd1) + (', ' + ($elm$core$String$fromInt(pd2) + (') = ' + $elm$core$String$fromInt(commonD))))),
												A2($author$project$Game$Problem$Course2$showFrac, pn1, pd1) + (' = ' + (A2($author$project$Game$Problem$Course2$showFrac, pn1 * ((commonD / pd1) | 0), commonD) + (' and ' + (A2($author$project$Game$Problem$Course2$showFrac, pn2, pd2) + (' = ' + A2($author$project$Game$Problem$Course2$showFrac, pn2 * ((commonD / pd2) | 0), commonD)))))),
												A2($author$project$Game$Problem$Course2$showFrac, pn1 * ((commonD / pd1) | 0), commonD) + (opStr + (A2($author$project$Game$Problem$Course2$showFrac, pn2 * ((commonD / pd2) | 0), commonD) + (' = ' + A2($author$project$Game$Problem$Course2$showFrac, rn, rd))))
											])
									},
									inputType: $author$project$Types$TFraction,
									prompt: A2($author$project$Game$Problem$Course2$showFrac, pn1, pd1) + (opStr + (A2($author$project$Game$Problem$Course2$showFrac, pn2, pd2) + ' = ?'))
								};
							},
							A3(
								$elm$random$Random$map2,
								$elm$core$Tuple$pair,
								A2($author$project$Game$Problem$Common$randInt, 1, d1 - 1),
								A2($author$project$Game$Problem$Common$randInt, 1, d2 - 1)));
					},
					A2(
						$author$project$Game$Problem$Common$randChoice,
						_List_fromArray(
							[2, 3, 4, 5, 6]),
						3));
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[2, 3, 4, 5, 6]),
				4));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genFracMulDiv = A2(
	$elm$random$Random$andThen,
	function (op) {
		return A2(
			$elm$random$Random$map,
			function (_v0) {
				var _v1 = _v0.a;
				var n1 = _v1.a;
				var d1 = _v1.b;
				var _v2 = _v0.b;
				var n2 = _v2.a;
				var d2 = _v2.b;
				if (!op) {
					var _v3 = A2($author$project$Game$Problem$Common$reduceFraction, n1 * n2, d1 * d2);
					var rn = _v3.a;
					var rd = _v3.b;
					return {
						answer: A2($author$project$Types$AFraction, rn, rd),
						hint: {
							answer: A2($author$project$Game$Problem$Course2$showFrac, rn, rd),
							prompt: A2($author$project$Game$Problem$Course2$showFrac, n1, d1) + (' × ' + (A2($author$project$Game$Problem$Course2$showFrac, n2, d2) + ' = ?')),
							steps: _List_fromArray(
								[
									'Multiply numerators: ' + ($elm$core$String$fromInt(n1) + (' × ' + ($elm$core$String$fromInt(n2) + (' = ' + $elm$core$String$fromInt(n1 * n2))))),
									'Multiply denominators: ' + ($elm$core$String$fromInt(d1) + (' × ' + ($elm$core$String$fromInt(d2) + (' = ' + $elm$core$String$fromInt(d1 * d2))))),
									'Simplify ' + (A2($author$project$Game$Problem$Course2$showFrac, n1 * n2, d1 * d2) + (': GCF is ' + ($elm$core$String$fromInt(
									A2($author$project$Game$Problem$Common$gcd, n1 * n2, d1 * d2)) + (', so ' + A2($author$project$Game$Problem$Course2$showFrac, rn, rd)))))
								])
						},
						inputType: $author$project$Types$TFraction,
						prompt: A2($author$project$Game$Problem$Course2$showFrac, n1, d1) + (' × ' + (A2($author$project$Game$Problem$Course2$showFrac, n2, d2) + ' = ?'))
					};
				} else {
					var _v4 = A2($author$project$Game$Problem$Common$reduceFraction, n1 * d2, d1 * n2);
					var rn = _v4.a;
					var rd = _v4.b;
					return {
						answer: A2($author$project$Types$AFraction, rn, rd),
						hint: {
							answer: A2($author$project$Game$Problem$Course2$showFrac, rn, rd),
							prompt: A2($author$project$Game$Problem$Course2$showFrac, n1, d1) + (' / ' + (A2($author$project$Game$Problem$Course2$showFrac, n2, d2) + ' = ?')),
							steps: _List_fromArray(
								[
									'Keep, Change, Flip: ' + (A2($author$project$Game$Problem$Course2$showFrac, n1, d1) + (' × ' + A2($author$project$Game$Problem$Course2$showFrac, d2, n2))),
									'Multiply: ' + A2($author$project$Game$Problem$Course2$showFrac, n1 * d2, d1 * n2),
									'Simplify: ' + A2($author$project$Game$Problem$Course2$showFrac, rn, rd)
								])
						},
						inputType: $author$project$Types$TFraction,
						prompt: A2($author$project$Game$Problem$Course2$showFrac, n1, d1) + (' / ' + (A2($author$project$Game$Problem$Course2$showFrac, n2, d2) + ' = ?'))
					};
				}
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A3(
					$elm$random$Random$map2,
					$elm$core$Tuple$pair,
					A2($author$project$Game$Problem$Common$randInt, 1, 5),
					A2($author$project$Game$Problem$Common$randInt, 2, 7)),
				A3(
					$elm$random$Random$map2,
					$elm$core$Tuple$pair,
					A2($author$project$Game$Problem$Common$randInt, 1, 5),
					A2($author$project$Game$Problem$Common$randInt, 2, 7))));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$showSigned = function (n) {
	return (n < 0) ? ('(' + ($elm$core$String$fromInt(n) + ')')) : $elm$core$String$fromInt(n);
};
var $author$project$Game$Problem$Course2$genIntAddSubNeg = A2(
	$elm$random$Random$andThen,
	function (op) {
		return A2(
			$elm$random$Random$map,
			function (_v0) {
				var a = _v0.a;
				var b = _v0.b;
				return (!op) ? {
					answer: $author$project$Types$AInt(a + b),
					hint: {
						answer: $elm$core$String$fromInt(a + b),
						prompt: $author$project$Game$Problem$Course2$showSigned(a) + (' + ' + ($author$project$Game$Problem$Course2$showSigned(b) + ' = ?')),
						steps: (((a >= 0) && (b >= 0)) || ((a < 0) && (b < 0))) ? _List_fromArray(
							[
								'Same signs: add absolute values',
								$elm$core$String$fromInt(
								$elm$core$Basics$abs(a)) + (' + ' + ($elm$core$String$fromInt(
								$elm$core$Basics$abs(b)) + (' = ' + $elm$core$String$fromInt(
								$elm$core$Basics$abs(a) + $elm$core$Basics$abs(b))))),
								'Keep the sign: ' + $elm$core$String$fromInt(a + b)
							]) : _List_fromArray(
							[
								'Different signs: subtract smaller absolute value from larger',
								'abs values: ' + ($elm$core$String$fromInt(
								$elm$core$Basics$abs(a)) + (' and ' + $elm$core$String$fromInt(
								$elm$core$Basics$abs(b)))),
								'Answer: ' + $elm$core$String$fromInt(a + b)
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: $author$project$Game$Problem$Course2$showSigned(a) + (' + ' + ($author$project$Game$Problem$Course2$showSigned(b) + ' = ?'))
				} : {
					answer: $author$project$Types$AInt(a - b),
					hint: {
						answer: $elm$core$String$fromInt(a - b),
						prompt: $author$project$Game$Problem$Course2$showSigned(a) + (' - ' + ($author$project$Game$Problem$Course2$showSigned(b) + ' = ?')),
						steps: _List_fromArray(
							[
								'Subtracting ' + ($author$project$Game$Problem$Course2$showSigned(b) + (' is the same as adding ' + $author$project$Game$Problem$Course2$showSigned(-b))),
								$author$project$Game$Problem$Course2$showSigned(a) + (' + ' + ($author$project$Game$Problem$Course2$showSigned(-b) + (' = ' + $elm$core$String$fromInt(a - b))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: $author$project$Game$Problem$Course2$showSigned(a) + (' - ' + ($author$project$Game$Problem$Course2$showSigned(b) + ' = ?'))
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, -50, 50),
				A2($author$project$Game$Problem$Common$randInt, -50, 50)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genIntAddSubPos = A2(
	$elm$random$Random$andThen,
	function (op) {
		return A2(
			$elm$random$Random$map,
			function (_v0) {
				var a = _v0.a;
				var b = _v0.b;
				if (!op) {
					return {
						answer: $author$project$Types$AInt(a + b),
						hint: {
							answer: $elm$core$String$fromInt(a + b),
							prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + ' = ?')),
							steps: _List_fromArray(
								[
									'Add ones: ' + ($elm$core$String$fromInt(
									A2($elm$core$Basics$modBy, 10, a)) + (' + ' + ($elm$core$String$fromInt(
									A2($elm$core$Basics$modBy, 10, b)) + (' = ' + $elm$core$String$fromInt(
									A2($elm$core$Basics$modBy, 10, a) + A2($elm$core$Basics$modBy, 10, b)))))),
									'Add tens: ' + ($elm$core$String$fromInt(
									A2($elm$core$Basics$modBy, 10, (a / 10) | 0)) + (' + ' + $elm$core$String$fromInt(
									A2($elm$core$Basics$modBy, 10, (b / 10) | 0)))),
									'Add hundreds: ' + ($elm$core$String$fromInt((a / 100) | 0) + (' + ' + $elm$core$String$fromInt((b / 100) | 0))),
									'Answer: ' + $elm$core$String$fromInt(a + b)
								])
						},
						inputType: $author$project$Types$TInteger,
						prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + ' = ?'))
					};
				} else {
					var str = $elm$core$String$fromInt;
					var small = A2($elm$core$Basics$min, a, b);
					var tensS = A2($elm$core$Basics$modBy, 10, (small / 10) | 0);
					var onesS = A2($elm$core$Basics$modBy, 10, small);
					var hundredsS = (small / 100) | 0;
					var big = A2($elm$core$Basics$max, a, b);
					var onesB = A2($elm$core$Basics$modBy, 10, big);
					var borrow1 = (_Utils_cmp(onesB, onesS) < 0) ? 1 : 0;
					var onesResult = (onesB + (borrow1 * 10)) - onesS;
					var onesStep = (borrow1 === 1) ? ('Ones: ' + (str(onesB) + (' < ' + (str(onesS) + (', borrow 10 → ' + (str(onesB + 10) + (' − ' + (str(onesS) + (' = ' + str(onesResult)))))))))) : ('Ones: ' + (str(onesB) + (' − ' + (str(onesS) + (' = ' + str(onesResult))))));
					var origTens = A2($elm$core$Basics$modBy, 10, (big / 10) | 0);
					var tensB = origTens - borrow1;
					var borrow2 = (_Utils_cmp(tensB, tensS) < 0) ? 1 : 0;
					var hundredsB = ((big / 100) | 0) - borrow2;
					var tensResult = (tensB + (borrow2 * 10)) - tensS;
					var tensStep = ((borrow1 === 1) && (borrow2 === 1)) ? ('Tens: ' + (str(origTens) + (' − 1 (lent) then borrow 10 → ' + (str(origTens + 9) + (' − ' + (str(tensS) + (' = ' + str(tensResult)))))))) : ((borrow1 === 1) ? ('Tens: ' + (str(origTens) + (' − 1 (lent to ones) − ' + (str(tensS) + (' = ' + str(tensResult)))))) : ((borrow2 === 1) ? ('Tens: ' + (str(origTens) + (' < ' + (str(tensS) + (', borrow 10 → ' + (str(origTens + 10) + (' − ' + (str(tensS) + (' = ' + str(tensResult)))))))))) : ('Tens: ' + (str(origTens) + (' − ' + (str(tensS) + (' = ' + str(tensResult))))))));
					return {
						answer: $author$project$Types$AInt(big - small),
						hint: {
							answer: str(big - small),
							prompt: str(big) + (' - ' + (str(small) + ' = ?')),
							steps: _Utils_ap(
								_List_fromArray(
									[onesStep, tensStep]),
								_Utils_ap(
									((big >= 100) || (hundredsS > 0)) ? _List_fromArray(
										[
											'Hundreds: ' + (str(hundredsB) + (' − ' + (str(hundredsS) + (' = ' + str(hundredsB - hundredsS)))))
										]) : _List_Nil,
									_List_fromArray(
										[
											'Answer: ' + str(big - small)
										])))
						},
						inputType: $author$project$Types$TInteger,
						prompt: str(big) + (' - ' + (str(small) + ' = ?'))
					};
				}
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 10, 999),
				A2($author$project$Game$Problem$Common$randInt, 10, 999)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genIntMulDiv = A2(
	$elm$random$Random$andThen,
	function (op) {
		return (!op) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var a = _v0.a;
				var b = _v0.b;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var correct = a * b;
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(correct),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(correct),
								prompt: $author$project$Game$Problem$Course2$showSigned(a) + (' × ' + ($author$project$Game$Problem$Course2$showSigned(b) + ' = ?')),
								steps: _List_fromArray(
									[
										'Multiply absolute values: ' + ($elm$core$String$fromInt(
										$elm$core$Basics$abs(a)) + (' × ' + ($elm$core$String$fromInt(
										$elm$core$Basics$abs(b)) + (' = ' + $elm$core$String$fromInt(
										$elm$core$Basics$abs(a) * $elm$core$Basics$abs(b)))))),
										(((a >= 0) && (b >= 0)) || ((a < 0) && (b < 0))) ? 'Same signs → positive' : 'Different signs → negative',
										'Answer: ' + $elm$core$String$fromInt(correct)
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: $author$project$Game$Problem$Course2$showSigned(a) + (' × ' + ($author$project$Game$Problem$Course2$showSigned(b) + ' = ?'))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(a * b));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, -9, 9),
				A2($author$project$Game$Problem$Common$randInt, -9, 9))) : A2(
			$elm$random$Random$andThen,
			function (_v1) {
				var b = _v1.a;
				var q = _v1.b;
				var a = b * q;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(q),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(q),
								prompt: $author$project$Game$Problem$Course2$showSigned(a) + (' / ' + ($author$project$Game$Problem$Course2$showSigned(b) + ' = ?')),
								steps: _List_fromArray(
									[
										'Divide absolute values: ' + ($elm$core$String$fromInt(
										$elm$core$Basics$abs(a)) + (' / ' + ($elm$core$String$fromInt(
										$elm$core$Basics$abs(b)) + (' = ' + $elm$core$String$fromInt(
										$elm$core$Basics$abs(q)))))),
										(((a >= 0) && (b > 0)) || ((a < 0) && (b < 0))) ? 'Same signs → positive' : 'Different signs → negative',
										'Answer: ' + $elm$core$String$fromInt(q)
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: $author$project$Game$Problem$Course2$showSigned(a) + (' / ' + ($author$project$Game$Problem$Course2$showSigned(b) + ' = ?'))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(q));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randIntNonZero, -8, 8),
				A2($author$project$Game$Problem$Common$randInt, 1, 6)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genSimplifyFrac = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var k = _v0.a;
		var n = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (d) {
				var safeD = (_Utils_cmp(d, n) < 1) ? (n + 1) : d;
				var g = A2($author$project$Game$Problem$Common$gcd, n, safeD);
				var rd = (safeD / g) | 0;
				var rn = (n / g) | 0;
				var bigN = k * rn;
				var bigD = k * rd;
				var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, bigN, bigD);
				var ansN = _v1.a;
				var ansD = _v1.b;
				return {
					answer: A2($author$project$Types$AFraction, ansN, ansD),
					hint: {
						answer: A2($author$project$Game$Problem$Course2$showFrac, ansN, ansD),
						prompt: 'Simplify: ' + A2($author$project$Game$Problem$Course2$showFrac, bigN, bigD),
						steps: _List_fromArray(
							[
								'GCF of ' + ($elm$core$String$fromInt(bigN) + (' and ' + ($elm$core$String$fromInt(bigD) + (' is ' + $elm$core$String$fromInt(
								A2($author$project$Game$Problem$Common$gcd, bigN, bigD)))))),
								$elm$core$String$fromInt(bigN) + (' / ' + ($elm$core$String$fromInt(
								A2($author$project$Game$Problem$Common$gcd, bigN, bigD)) + (' = ' + ($elm$core$String$fromInt(ansN) + (', ' + ($elm$core$String$fromInt(bigD) + (' / ' + ($elm$core$String$fromInt(
								A2($author$project$Game$Problem$Common$gcd, bigN, bigD)) + (' = ' + $elm$core$String$fromInt(ansD)))))))))),
								'Answer: ' + A2($author$project$Game$Problem$Course2$showFrac, ansN, ansD)
							])
					},
					inputType: $author$project$Types$TFraction,
					prompt: 'Simplify: ' + A2($author$project$Game$Problem$Course2$showFrac, bigN, bigD)
				};
			},
			A2($author$project$Game$Problem$Common$randInt, 2, 6));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 4),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$Course2$unit1 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course2$genIntAddSubPos;
			case 1:
				return $author$project$Game$Problem$Course2$genIntAddSubNeg;
			case 2:
				return $author$project$Game$Problem$Course2$genIntMulDiv;
			case 3:
				return $author$project$Game$Problem$Course2$genSimplifyFrac;
			case 4:
				return $author$project$Game$Problem$Course2$genFracAddSub;
			case 5:
				return $author$project$Game$Problem$Course2$genFracMulDiv;
			case 6:
				return $author$project$Game$Problem$Course2$genConvertFDP;
			default:
				return $author$project$Game$Problem$Course2$genExpSquareRoot;
		}
	},
	A2($elm$random$Random$int, 0, 7));
var $author$project$Game$Problem$Course2$genCombineLike = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var a = _v0.a;
				var b = _v0.b;
				var correct = $elm$core$String$fromInt(a + b) + 'x';
				var wrong = _List_fromArray(
					[
						$elm$core$String$fromInt((a - b) + 1) + 'x',
						$elm$core$String$fromInt(a * b) + 'x',
						$elm$core$String$fromInt((a + b) + 1) + 'x'
					]);
				var choices = A2($author$project$Game$Problem$Course2$shuffleChoices, correct, wrong);
				return $elm$random$Random$constant(
					{
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: correct,
							prompt: 'Combine: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + 'x'))),
							steps: _List_fromArray(
								[
									'Like terms have the same variable part',
									'Add coefficients: ' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(a + b))))),
									'Answer: ' + correct
								])
						},
						inputType: $author$project$Types$TChoice(choices),
						prompt: 'Combine: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + 'x')))
					});
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 8),
				A2($author$project$Game$Problem$Common$randInt, 1, 7))) : A2(
			$elm$random$Random$map,
			function (r) {
				var xCoeff = r.a + r.c;
				var constant = r.b + r.d;
				var correct = $elm$core$String$fromInt(xCoeff) + ('x + ' + $elm$core$String$fromInt(constant));
				var wrong1 = $elm$core$String$fromInt(xCoeff + 1) + ('x + ' + $elm$core$String$fromInt(constant));
				var wrong2 = $elm$core$String$fromInt(xCoeff) + ('x + ' + $elm$core$String$fromInt(constant + 1));
				var wrong3 = $elm$core$String$fromInt(xCoeff - 1) + ('x + ' + $elm$core$String$fromInt(constant + 2));
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					correct,
					_List_fromArray(
						[wrong1, wrong2, wrong3]));
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: correct,
						prompt: 'Simplify: ' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (' + ' + ($elm$core$String$fromInt(r.c) + ('x + ' + $elm$core$String$fromInt(r.d))))))),
						steps: _List_fromArray(
							[
								'Group x terms: ' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.c) + ('x = ' + ($elm$core$String$fromInt(xCoeff) + 'x'))))),
								'Group constants: ' + ($elm$core$String$fromInt(r.b) + (' + ' + ($elm$core$String$fromInt(r.d) + (' = ' + $elm$core$String$fromInt(constant))))),
								'Answer: ' + correct
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Simplify: ' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (' + ' + ($elm$core$String$fromInt(r.c) + ('x + ' + $elm$core$String$fromInt(r.d)))))))
				};
			},
			A5(
				$elm$random$Random$map4,
				F4(
					function (a, b, c, d) {
						return {a: a, b: b, c: c, d: d};
					}),
				A2($author$project$Game$Problem$Common$randInt, 1, 6),
				A2($author$project$Game$Problem$Common$randInt, 1, 9),
				A2($author$project$Game$Problem$Common$randInt, 1, 6),
				A2($author$project$Game$Problem$Common$randInt, 1, 9)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genDistributive = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var a = _v0.a;
				var b = _v0.b;
				var c = _v0.c;
				var wrong3 = $elm$core$String$fromInt(a * b) + ('x + ' + $elm$core$String$fromInt((a * c) + 1));
				var wrong2 = $elm$core$String$fromInt(a + b) + ('x + ' + $elm$core$String$fromInt(a * c));
				var wrong1 = $elm$core$String$fromInt(a * b) + ('x + ' + $elm$core$String$fromInt(c));
				var correct = $elm$core$String$fromInt(a * b) + ('x + ' + $elm$core$String$fromInt(a * c));
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					correct,
					_List_fromArray(
						[wrong1, wrong2, wrong3]));
				return $elm$random$Random$constant(
					{
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: correct,
							prompt: 'Expand: ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(b) + ('x + ' + ($elm$core$String$fromInt(c) + ')'))))),
							steps: _List_fromArray(
								[
									'Multiply ' + ($elm$core$String$fromInt(a) + ' by each term inside'),
									$elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(b) + ('x = ' + ($elm$core$String$fromInt(a * b) + 'x')))),
									$elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt(a * c)))),
									'Answer: ' + correct
								])
						},
						inputType: $author$project$Types$TChoice(choices),
						prompt: 'Expand: ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(b) + ('x + ' + ($elm$core$String$fromInt(c) + ')')))))
					});
			},
			A4(
				$elm$random$Random$map3,
				F3(
					function (a, b, c) {
						return _Utils_Tuple3(a, b, c);
					}),
				A2($author$project$Game$Problem$Common$randInt, 2, 7),
				A2($author$project$Game$Problem$Common$randInt, 1, 5),
				A2($author$project$Game$Problem$Common$randInt, 1, 8))) : A2(
			$elm$random$Random$andThen,
			function (_v1) {
				var a = _v1.a;
				var b = _v1.b;
				var c = _v1.c;
				var correct = a * (b + c);
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(correct),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(correct),
								prompt: 'Compute: ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(b) + (' + ' + ($elm$core$String$fromInt(c) + ')'))))),
								steps: _List_fromArray(
									[
										'Distribute: ' + ($elm$core$String$fromInt(a) + ('×' + ($elm$core$String$fromInt(b) + (' + ' + ($elm$core$String$fromInt(a) + ('×' + $elm$core$String$fromInt(c))))))),
										'= ' + ($elm$core$String$fromInt(a * b) + (' + ' + ($elm$core$String$fromInt(a * c) + (' = ' + $elm$core$String$fromInt(correct)))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Compute: ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(b) + (' + ' + ($elm$core$String$fromInt(c) + ')')))))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(correct));
			},
			A4(
				$elm$random$Random$map3,
				F3(
					function (a, b, c) {
						return _Utils_Tuple3(a, b, c);
					}),
				A2($author$project$Game$Problem$Common$randInt, 2, 9),
				A2($author$project$Game$Problem$Common$randInt, 1, 9),
				A2($author$project$Game$Problem$Common$randInt, 1, 9)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genFactorExpr = A2(
	$elm$random$Random$map,
	function (_v0) {
		var f = _v0.a;
		var a = _v0.b;
		var b = _v0.c;
		var wrong3 = $elm$core$String$fromInt(f + 1) + ('(' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ')'))));
		var wrong2 = $elm$core$String$fromInt(f) + ('(' + ($elm$core$String$fromInt(a + 1) + ('x + ' + ($elm$core$String$fromInt(b) + ')'))));
		var termB = f * b;
		var termA = f * a;
		var wrong1 = $elm$core$String$fromInt(termA) + ('(x + ' + ($elm$core$String$fromInt(termB) + ')'));
		var correct = $elm$core$String$fromInt(f) + ('(' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ')'))));
		var choices = A2(
			$author$project$Game$Problem$Course2$shuffleChoices,
			correct,
			_List_fromArray(
				[wrong1, wrong2, wrong3]));
		return {
			answer: $author$project$Types$AChoice(0),
			hint: {
				answer: correct,
				prompt: 'Factor: ' + ($elm$core$String$fromInt(termA) + ('x + ' + $elm$core$String$fromInt(termB))),
				steps: _List_fromArray(
					[
						'GCF of ' + ($elm$core$String$fromInt(termA) + (' and ' + ($elm$core$String$fromInt(termB) + (' is ' + $elm$core$String$fromInt(f))))),
						$elm$core$String$fromInt(termA) + ('x / ' + ($elm$core$String$fromInt(f) + (' = ' + ($elm$core$String$fromInt(a) + ('x, ' + ($elm$core$String$fromInt(termB) + (' / ' + ($elm$core$String$fromInt(f) + (' = ' + $elm$core$String$fromInt(b)))))))))),
						'Answer: ' + correct
					])
			},
			inputType: $author$project$Types$TChoice(choices),
			prompt: 'Factor: ' + ($elm$core$String$fromInt(termA) + ('x + ' + $elm$core$String$fromInt(termB)))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (f, a, b) {
				return _Utils_Tuple3(f, a, b);
			}),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[2, 3, 4, 5, 6]),
			3),
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$Course2$genMonomialOps = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$map,
					function (r) {
						var exp_ = r.m + r.n;
						var coeff = r.a * r.b;
						var correct = $elm$core$String$fromInt(coeff) + ('x' + $author$project$Game$Problem$Course2$superscript(exp_));
						var wrong1 = $elm$core$String$fromInt(coeff + 1) + ('x' + $author$project$Game$Problem$Course2$superscript(exp_));
						var wrong2 = $elm$core$String$fromInt(coeff) + ('x' + $author$project$Game$Problem$Course2$superscript(exp_ + 1));
						var wrong3 = $elm$core$String$fromInt(coeff - 1) + ('x' + $author$project$Game$Problem$Course2$superscript(exp_));
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							correct,
							_List_fromArray(
								[wrong1, wrong2, wrong3]));
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: correct,
								prompt: 'Simplify: ' + ($elm$core$String$fromInt(r.a) + ('x' + ($author$project$Game$Problem$Course2$superscript(r.m) + (' × ' + ($elm$core$String$fromInt(r.b) + ('x' + $author$project$Game$Problem$Course2$superscript(r.n))))))),
								steps: _List_fromArray(
									[
										'Multiply coefficients: ' + ($elm$core$String$fromInt(r.a) + (' × ' + ($elm$core$String$fromInt(r.b) + (' = ' + $elm$core$String$fromInt(coeff))))),
										'Add exponents: ' + ($elm$core$String$fromInt(r.m) + (' + ' + ($elm$core$String$fromInt(r.n) + (' = ' + $elm$core$String$fromInt(exp_))))),
										'Answer: ' + correct
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Simplify: ' + ($elm$core$String$fromInt(r.a) + ('x' + ($author$project$Game$Problem$Course2$superscript(r.m) + (' × ' + ($elm$core$String$fromInt(r.b) + ('x' + $author$project$Game$Problem$Course2$superscript(r.n)))))))
						};
					},
					A5(
						$elm$random$Random$map4,
						F4(
							function (a, b, m, n) {
								return {a: a, b: b, m: m, n: n};
							}),
						A2($author$project$Game$Problem$Common$randInt, 2, 6),
						A2($author$project$Game$Problem$Common$randInt, 2, 6),
						A2($author$project$Game$Problem$Common$randInt, 1, 4),
						A2($author$project$Game$Problem$Common$randInt, 1, 4)));
			case 1:
				return A2(
					$elm$random$Random$map,
					function (r) {
						var m = r.m;
						var n_ = A2($elm$core$Basics$min, r.n, m - 1);
						var expResult = m - n_;
						var wrong1 = $elm$core$String$fromInt(r.q) + ('x' + $author$project$Game$Problem$Course2$superscript(expResult + 1));
						var wrong2 = $elm$core$String$fromInt(r.q + 1) + ('x' + $author$project$Game$Problem$Course2$superscript(expResult));
						var wrong3 = $elm$core$String$fromInt(r.q) + ('x' + $author$project$Game$Problem$Course2$superscript(expResult - 1));
						var correct = $elm$core$String$fromInt(r.q) + ('x' + $author$project$Game$Problem$Course2$superscript(expResult));
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							correct,
							_List_fromArray(
								[wrong1, wrong2, wrong3]));
						var a = r.b * r.q;
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: correct,
								prompt: 'Simplify: ' + ($elm$core$String$fromInt(a) + ('x' + ($author$project$Game$Problem$Course2$superscript(m) + (' / ' + ($elm$core$String$fromInt(r.b) + ('x' + $author$project$Game$Problem$Course2$superscript(n_))))))),
								steps: _List_fromArray(
									[
										'Divide coefficients: ' + ($elm$core$String$fromInt(a) + (' / ' + ($elm$core$String$fromInt(r.b) + (' = ' + $elm$core$String$fromInt(r.q))))),
										'Subtract exponents: ' + ($elm$core$String$fromInt(m) + (' - ' + ($elm$core$String$fromInt(n_) + (' = ' + $elm$core$String$fromInt(expResult))))),
										'Answer: ' + correct
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Simplify: ' + ($elm$core$String$fromInt(a) + ('x' + ($author$project$Game$Problem$Course2$superscript(m) + (' / ' + ($elm$core$String$fromInt(r.b) + ('x' + $author$project$Game$Problem$Course2$superscript(n_)))))))
						};
					},
					A5(
						$elm$random$Random$map4,
						F4(
							function (b, q, m, n) {
								return {b: b, m: m, n: n, q: q};
							}),
						A2($author$project$Game$Problem$Common$randInt, 2, 5),
						A2($author$project$Game$Problem$Common$randInt, 2, 5),
						A2($author$project$Game$Problem$Common$randInt, 3, 6),
						A2($author$project$Game$Problem$Common$randInt, 1, 2)));
			default:
				return A2(
					$elm$random$Random$map,
					function (_v1) {
						var a = _v1.a;
						var m = _v1.b;
						var n = _v1.c;
						var expResult = m * n;
						var wrong1 = $elm$core$String$fromInt(a * n) + ('x' + $author$project$Game$Problem$Course2$superscript(expResult));
						var coeffResult = A2($elm$core$Basics$pow, a, n);
						var correct = $elm$core$String$fromInt(coeffResult) + ('x' + $author$project$Game$Problem$Course2$superscript(expResult));
						var wrong2 = $elm$core$String$fromInt(coeffResult) + ('x' + $author$project$Game$Problem$Course2$superscript(m + n));
						var wrong3 = $elm$core$String$fromInt(coeffResult) + ('x' + $author$project$Game$Problem$Course2$superscript(expResult + 1));
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							correct,
							_List_fromArray(
								[wrong1, wrong2, wrong3]));
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: correct,
								prompt: 'Simplify: (' + ($elm$core$String$fromInt(a) + ('x' + ($author$project$Game$Problem$Course2$superscript(m) + (')' + $author$project$Game$Problem$Course2$superscript(n))))),
								steps: _List_fromArray(
									[
										'Raise coefficient to power: ' + ($elm$core$String$fromInt(a) + ($author$project$Game$Problem$Course2$superscript(n) + (' = ' + $elm$core$String$fromInt(coeffResult)))),
										'Multiply exponents: ' + ($elm$core$String$fromInt(m) + (' × ' + ($elm$core$String$fromInt(n) + (' = ' + $elm$core$String$fromInt(expResult))))),
										'Answer: ' + correct
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Simplify: (' + ($elm$core$String$fromInt(a) + ('x' + ($author$project$Game$Problem$Course2$superscript(m) + (')' + $author$project$Game$Problem$Course2$superscript(n)))))
						};
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (a, m, n) {
								return _Utils_Tuple3(a, m, n);
							}),
						A2($author$project$Game$Problem$Common$randInt, 2, 4),
						A2($author$project$Game$Problem$Common$randInt, 1, 3),
						A2($author$project$Game$Problem$Common$randInt, 2, 3)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course2$genOrderOfOps = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$andThen,
					function (_v1) {
						var a = _v1.a;
						var b = _v1.b;
						var c = _v1.c;
						var correct = a + (b * c);
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Course2$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + ' = ?')))),
										steps: _List_fromArray(
											[
												'Multiply first (PEMDAS): ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt(b * c))))),
												'Then add: ' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b * c) + (' = ' + $elm$core$String$fromInt(correct)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + ' = ?'))))
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 9),
						A2($author$project$Game$Problem$Common$randInt, 2, 8),
						A2($author$project$Game$Problem$Common$randInt, 2, 6)));
			case 1:
				return A2(
					$elm$random$Random$andThen,
					function (_v2) {
						var a = _v2.a;
						var b = _v2.b;
						var c = _v2.c;
						var correct = (a + b) * c;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Course2$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: '(' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (') × ' + ($elm$core$String$fromInt(c) + ' = ?'))))),
										steps: _List_fromArray(
											[
												'Parentheses first: ' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(a + b))))),
												'Then multiply: ' + ($elm$core$String$fromInt(a + b) + (' × ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt(correct)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: '(' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (') × ' + ($elm$core$String$fromInt(c) + ' = ?')))))
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 9),
						A2($author$project$Game$Problem$Common$randInt, 1, 9),
						A2($author$project$Game$Problem$Common$randInt, 2, 6)));
			default:
				return A2(
					$elm$random$Random$andThen,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						var c = _v3.c;
						var correct = (a * a) + (b * c);
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Course2$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: $elm$core$String$fromInt(a) + ('² + ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + ' = ?')))),
										steps: _List_fromArray(
											[
												'Exponent first: ' + ($elm$core$String$fromInt(a) + ('² = ' + $elm$core$String$fromInt(a * a))),
												'Multiply: ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt(b * c))))),
												'Add: ' + ($elm$core$String$fromInt(a * a) + (' + ' + ($elm$core$String$fromInt(b * c) + (' = ' + $elm$core$String$fromInt(correct)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: $elm$core$String$fromInt(a) + ('² + ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + ' = ?'))))
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							}),
						A2($author$project$Game$Problem$Common$randInt, 2, 5),
						A2($author$project$Game$Problem$Common$randInt, 1, 5),
						A2($author$project$Game$Problem$Common$randInt, 1, 5)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course2$genSimplifyExpr = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var constant = a * b;
		var wrong3 = $elm$core$String$fromInt(a) + ('x + ' + $elm$core$String$fromInt(constant));
		var coeff = a + c;
		var correct = $elm$core$String$fromInt(coeff) + ('x + ' + $elm$core$String$fromInt(constant));
		var wrong1 = $elm$core$String$fromInt(coeff) + ('x + ' + $elm$core$String$fromInt(constant + 1));
		var wrong2 = $elm$core$String$fromInt(coeff + 1) + ('x + ' + $elm$core$String$fromInt(constant));
		var choices = A2(
			$author$project$Game$Problem$Course2$shuffleChoices,
			correct,
			_List_fromArray(
				[wrong1, wrong2, wrong3]));
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Simplify: ' + ($elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') + ' + ($elm$core$String$fromInt(c) + 'x'))))),
					steps: _List_fromArray(
						[
							'Distribute: ' + ($elm$core$String$fromInt(a) + ('(x+' + ($elm$core$String$fromInt(b) + (') = ' + ($elm$core$String$fromInt(a) + ('x + ' + $elm$core$String$fromInt(constant))))))),
							'Combine x terms: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(c) + ('x = ' + ($elm$core$String$fromInt(coeff) + 'x'))))),
							'Answer: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Simplify: ' + ($elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') + ' + ($elm$core$String$fromInt(c) + 'x')))))
			});
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$Course2$genTranslateEval = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$map,
			function (n) {
				switch (n) {
					case 0:
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: '2n - 5',
								prompt: 'Translate: \'twice n minus 5\'',
								steps: _List_fromArray(
									['\'Twice n\' = 2n', '\'Decreased by 5\' = subtract 5', 'Answer: 2n - 5'])
							},
							inputType: $author$project$Types$TChoice(
								_List_fromArray(
									['2n - 5', '2n + 5', '5 - 2n', '2(n - 5)'])),
							prompt: 'Translate: \'twice a number n decreased by 5\''
						};
					case 1:
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: '(x + 8)/2',
								prompt: 'Translate: \'(x + 8) divided by 2\'',
								steps: _List_fromArray(
									['\'Sum of x and 8\' = x + 8 (in parentheses)', '\'Divided by 2\' = divide the whole sum', 'Answer: (x + 8)/2'])
							},
							inputType: $author$project$Types$TChoice(
								_List_fromArray(
									['(x + 8)/2', 'x + 8/2', 'x/2 + 8', '2(x + 8)'])),
							prompt: 'Translate: \'the sum of x and 8, divided by 2\''
						};
					default:
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: '4y - 3',
								prompt: 'Translate: \'3 less than 4y\'',
								steps: _List_fromArray(
									['\'Four times y\' = 4y', '\'Three less than\' = subtract 3 after', 'Answer: 4y - 3'])
							},
							inputType: $author$project$Types$TChoice(
								_List_fromArray(
									['4y - 3', '3 - 4y', '4y + 3', '4(y - 3)'])),
							prompt: 'Translate: \'three less than four times y\''
						};
				}
			},
			A2($elm$random$Random$int, 0, 2)) : A2(
			$elm$random$Random$map,
			function (_v1) {
				var a = _v1.a;
				var b = _v1.b;
				var x = _v1.c;
				return {
					answer: $author$project$Types$AInt((a * x) - b),
					hint: {
						answer: $elm$core$String$fromInt((a * x) - b),
						prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x - ' + ($elm$core$String$fromInt(b) + (' when x = ' + $elm$core$String$fromInt(x))))),
						steps: _List_fromArray(
							[
								'Replace x with ' + ($elm$core$String$fromInt(x) + (': ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(x) + (') - ' + $elm$core$String$fromInt(b))))))),
								'Multiply: ' + ($elm$core$String$fromInt(a * x) + (' - ' + $elm$core$String$fromInt(b))),
								'Subtract: ' + $elm$core$String$fromInt((a * x) - b)
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x - ' + ($elm$core$String$fromInt(b) + (' when x = ' + $elm$core$String$fromInt(x)))))
				};
			},
			A4(
				$elm$random$Random$map3,
				F3(
					function (a, b, x) {
						return _Utils_Tuple3(a, b, x);
					}),
				A2($author$project$Game$Problem$Common$randInt, 1, 8),
				A2($author$project$Game$Problem$Common$randInt, 1, 8),
				A2($author$project$Game$Problem$Common$randInt, 1, 8)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$unit2 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course2$genOrderOfOps;
			case 1:
				return $author$project$Game$Problem$Course2$genTranslateEval;
			case 2:
				return $author$project$Game$Problem$Course2$genCombineLike;
			case 3:
				return $author$project$Game$Problem$Course2$genDistributive;
			case 4:
				return $author$project$Game$Problem$Course2$genSimplifyExpr;
			case 5:
				return $author$project$Game$Problem$Course2$genFactorExpr;
			default:
				return $author$project$Game$Problem$Course2$genMonomialOps;
		}
	},
	A2($elm$random$Random$int, 0, 6));
var $author$project$Game$Problem$Course2$genMultiStepEq = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		var c = a * (x + b);
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') = ' + $elm$core$String$fromInt(c))))),
				steps: _List_fromArray(
					[
						'Step 1: Divide both sides by ' + ($elm$core$String$fromInt(a) + (': x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt((c / a) | 0))))),
						'Step 2: Subtract ' + ($elm$core$String$fromInt(b) + (' from both sides: x = ' + $elm$core$String$fromInt(x)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') = ' + $elm$core$String$fromInt(c)))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Course2$genOneStepEq = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$map,
					function (_v1) {
						var a = _v1.a;
						var x = _v1.b;
						return {
							answer: $author$project$Types$AInt(x),
							hint: {
								answer: $elm$core$String$fromInt(x),
								prompt: 'Solve: x + ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(a + x))),
								steps: _List_fromArray(
									[
										'Subtract ' + ($elm$core$String$fromInt(a) + ' from both sides'),
										'x = ' + ($elm$core$String$fromInt(a + x) + (' - ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Solve: x + ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(a + x)))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 1, 20),
						A2($author$project$Game$Problem$Common$randInt, 1, 30)));
			case 1:
				return A2(
					$elm$random$Random$map,
					function (_v2) {
						var a = _v2.a;
						var x = _v2.b;
						return {
							answer: $author$project$Types$AInt(x),
							hint: {
								answer: $elm$core$String$fromInt(x),
								prompt: 'Solve: x - ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x - a))),
								steps: _List_fromArray(
									[
										'Add ' + ($elm$core$String$fromInt(a) + ' to both sides'),
										'x = ' + ($elm$core$String$fromInt(x - a) + (' + ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Solve: x - ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x - a)))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 1, 15),
						A2($author$project$Game$Problem$Common$randInt, 5, 25)));
			case 2:
				return A2(
					$elm$random$Random$map,
					function (_v3) {
						var a = _v3.a;
						var x = _v3.b;
						return {
							answer: $author$project$Types$AInt(x),
							hint: {
								answer: $elm$core$String$fromInt(x),
								prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(a * x))),
								steps: _List_fromArray(
									[
										'Divide both sides by ' + $elm$core$String$fromInt(a),
										'x = ' + ($elm$core$String$fromInt(a * x) + (' / ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(a * x)))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randIntNonZero, 2, 9),
						A2($author$project$Game$Problem$Common$randInt, 1, 12)));
			default:
				return A2(
					$elm$random$Random$map,
					function (_v4) {
						var a = _v4.a;
						var x = _v4.b;
						return {
							answer: $author$project$Types$AInt(x * a),
							hint: {
								answer: $elm$core$String$fromInt(x * a),
								prompt: 'Solve: x/' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x))),
								steps: _List_fromArray(
									[
										'Multiply both sides by ' + $elm$core$String$fromInt(a),
										'x = ' + ($elm$core$String$fromInt(x) + (' × ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x * a)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Solve: x/' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x)))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 2, 6),
						A2($author$project$Game$Problem$Common$randInt, 1, 8)));
		}
	},
	A2($elm$random$Random$int, 0, 3));
var $author$project$Game$Problem$Course2$genOneStepIneq = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var x = _v0.b;
		var b = a * x;
		return A2(
			$elm$random$Random$map,
			function (dirN) {
				var dirStr = (!dirN) ? '>' : '<';
				var dir = (!dirN) ? $author$project$Types$IGt : $author$project$Types$ILt;
				return {
					answer: A2($author$project$Types$AInequality, dir, x),
					hint: {
						answer: 'x ' + (dirStr + (' ' + $elm$core$String$fromInt(x))),
						prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x ' + (dirStr + (' ' + $elm$core$String$fromInt(b))))),
						steps: _List_fromArray(
							[
								'Divide both sides by ' + $elm$core$String$fromInt(a),
								'x ' + (dirStr + (' ' + ($elm$core$String$fromInt(b) + (' / ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x))))))),
								'Answer: x ' + (dirStr + (' ' + $elm$core$String$fromInt(x)))
							])
					},
					inputType: $author$project$Types$TInequality,
					prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x ' + (dirStr + (' ' + $elm$core$String$fromInt(b)))))
				};
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 12)));
var $author$project$Game$Problem$Course2$genTwoStepEq = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		var c = (a * x) + b;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(c))))),
				steps: _List_fromArray(
					[
						'Step 1: Subtract ' + ($elm$core$String$fromInt(b) + (' from both sides: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(c - b))))),
						'Step 2: Divide both sides by ' + ($elm$core$String$fromInt(a) + (': x = ' + $elm$core$String$fromInt(x)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(c)))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 7),
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 10)));
var $author$project$Game$Problem$Course2$genTwoStepIneq = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		var c = (a * x) + b;
		return A2(
			$elm$random$Random$map,
			function (dirN) {
				var dirStr = (!dirN) ? '>' : '<';
				var dir = (!dirN) ? $author$project$Types$IGt : $author$project$Types$ILt;
				return {
					answer: A2($author$project$Types$AInequality, dir, x),
					hint: {
						answer: 'x ' + (dirStr + (' ' + $elm$core$String$fromInt(x))),
						prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' ' + (dirStr + (' ' + $elm$core$String$fromInt(c))))))),
						steps: _List_fromArray(
							[
								'Step 1: Subtract ' + ($elm$core$String$fromInt(b) + (' from both sides: ' + ($elm$core$String$fromInt(a) + ('x ' + (dirStr + (' ' + $elm$core$String$fromInt(c - b))))))),
								'Step 2: Divide both sides by ' + ($elm$core$String$fromInt(a) + (': x ' + (dirStr + (' ' + $elm$core$String$fromInt(x)))))
							])
					},
					inputType: $author$project$Types$TInequality,
					prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' ' + (dirStr + (' ' + $elm$core$String$fromInt(c)))))))
				};
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 10)));
var $author$project$Game$Problem$Course2$unit3 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course2$genOneStepEq;
			case 1:
				return $author$project$Game$Problem$Course2$genTwoStepEq;
			case 2:
				return $author$project$Game$Problem$Course2$genMultiStepEq;
			case 3:
				return $author$project$Game$Problem$Course2$genOneStepIneq;
			default:
				return $author$project$Game$Problem$Course2$genTwoStepIneq;
		}
	},
	A2($elm$random$Random$int, 0, 4));
var $author$project$Game$Problem$Course2$genDiscountMarkup = A2(
	$elm$random$Random$andThen,
	function (t) {
		return A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var pct = _v0.a;
				var price = _v0.b;
				var amount = ((pct * price) / 100) | 0;
				var salePrice = (!t) ? (price - amount) : (price + amount);
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var verb = (!t) ? 'discount' : 'markup';
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							'$' + $elm$core$String$fromInt(salePrice),
							A2(
								$elm$core$List$map,
								function (w) {
									return '$' + w;
								},
								wrong));
						var action = (!t) ? 'sale price' : 'new price';
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: '$' + $elm$core$String$fromInt(salePrice),
								prompt: 'An item costs $' + ($elm$core$String$fromInt(price) + ('. There is a ' + ($elm$core$String$fromInt(pct) + ('% ' + (verb + ('. What is the ' + (action + '?'))))))),
								steps: (!t) ? _List_fromArray(
									[
										verb + (' amount: ' + ($elm$core$String$fromInt(pct) + ('% × $' + ($elm$core$String$fromInt(price) + (' = $' + $elm$core$String$fromInt(amount)))))),
										action + (': $' + ($elm$core$String$fromInt(price) + (' - $' + ($elm$core$String$fromInt(amount) + (' = $' + $elm$core$String$fromInt(salePrice))))))
									]) : _List_fromArray(
									[
										verb + (' amount: ' + ($elm$core$String$fromInt(pct) + ('% × $' + ($elm$core$String$fromInt(price) + (' = $' + $elm$core$String$fromInt(amount)))))),
										action + (': $' + ($elm$core$String$fromInt(price) + (' + $' + ($elm$core$String$fromInt(amount) + (' = $' + $elm$core$String$fromInt(salePrice))))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'An item costs $' + ($elm$core$String$fromInt(price) + ('. There is a ' + ($elm$core$String$fromInt(pct) + ('% ' + (verb + ('. What is the ' + (action + '?')))))))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(salePrice));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2(
					$author$project$Game$Problem$Common$randChoice,
					_List_fromArray(
						[10, 15, 20, 25, 30, 40, 50]),
					20),
				A2(
					$author$project$Game$Problem$Common$randChoice,
					_List_fromArray(
						[20, 40, 50, 60, 80, 100]),
					50)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genPercentProportion = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var pct = _v0.a;
				var whole = _v0.b;
				var correct = ((pct * whole) / 100) | 0;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(correct),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(correct),
								prompt: 'What is ' + ($elm$core$String$fromInt(pct) + ('% of ' + ($elm$core$String$fromInt(whole) + '?'))),
								steps: _List_fromArray(
									[
										'Set up: ' + ($elm$core$String$fromInt(pct) + ('/100 = x/' + $elm$core$String$fromInt(whole))),
										'Cross multiply: 100x = ' + ($elm$core$String$fromInt(pct) + (' × ' + ($elm$core$String$fromInt(whole) + (' = ' + $elm$core$String$fromInt(pct * whole))))),
										'x = ' + ($elm$core$String$fromInt(pct * whole) + (' / 100 = ' + $elm$core$String$fromInt(correct)))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'What is ' + ($elm$core$String$fromInt(pct) + ('% of ' + ($elm$core$String$fromInt(whole) + '?')))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(correct));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2(
					$author$project$Game$Problem$Common$randChoice,
					_List_fromArray(
						[10, 20, 25, 50, 75]),
					25),
				A2(
					$author$project$Game$Problem$Common$randChoice,
					_List_fromArray(
						[40, 60, 80, 100, 120, 200]),
					100))) : A2(
			$elm$random$Random$andThen,
			function (_v1) {
				var pct = _v1.a;
				var whole = _v1.b;
				var part = ((pct * whole) / 100) | 0;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(pct) + '%',
							A2(
								$elm$core$List$map,
								function (w) {
									return w + '%';
								},
								wrong));
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(pct) + '%',
								prompt: $elm$core$String$fromInt(part) + (' is what percent of ' + ($elm$core$String$fromInt(whole) + '?')),
								steps: _List_fromArray(
									[
										'Set up: x/100 = ' + ($elm$core$String$fromInt(part) + ('/' + $elm$core$String$fromInt(whole))),
										'Cross multiply: ' + ($elm$core$String$fromInt(whole) + ('x = ' + $elm$core$String$fromInt(part * 100))),
										'x = ' + ($elm$core$String$fromInt(pct) + '%')
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: $elm$core$String$fromInt(part) + (' is what percent of ' + ($elm$core$String$fromInt(whole) + '?'))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(pct));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2(
					$author$project$Game$Problem$Common$randChoice,
					_List_fromArray(
						[10, 20, 25, 50]),
					25),
				A2(
					$author$project$Game$Problem$Common$randChoice,
					_List_fromArray(
						[40, 80, 100, 200]),
					100)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genRatioSimplify = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var k = _v0.a;
		var a = _v0.b;
		return A2(
			$elm$random$Random$andThen,
			function (b) {
				var n = k * a;
				var d = k * b;
				var g = A2($author$project$Game$Problem$Common$gcd, n, d);
				var rn = (n / g) | 0;
				var rd = (d / g) | 0;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(rn) + (':' + $elm$core$String$fromInt(rd)),
							A2(
								$elm$core$List$map,
								function (w) {
									return w + (':' + $elm$core$String$fromInt(rd));
								},
								wrong));
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(rn) + (':' + $elm$core$String$fromInt(rd)),
								prompt: 'Simplify the ratio ' + ($elm$core$String$fromInt(n) + (':' + $elm$core$String$fromInt(d))),
								steps: _List_fromArray(
									[
										'GCF of ' + ($elm$core$String$fromInt(n) + (' and ' + ($elm$core$String$fromInt(d) + (' is ' + $elm$core$String$fromInt(g))))),
										$elm$core$String$fromInt(n) + (' / ' + ($elm$core$String$fromInt(g) + (' = ' + ($elm$core$String$fromInt(rn) + (', ' + ($elm$core$String$fromInt(d) + (' / ' + ($elm$core$String$fromInt(g) + (' = ' + $elm$core$String$fromInt(rd)))))))))),
										'Simplified: ' + ($elm$core$String$fromInt(rn) + (':' + $elm$core$String$fromInt(rd)))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Simplify the ratio ' + ($elm$core$String$fromInt(n) + (':' + $elm$core$String$fromInt(d)))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(rn));
			},
			A2($author$project$Game$Problem$Common$randInt, 2, 5));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 2, 5)));
var $author$project$Game$Problem$Course2$genScaleDrawing = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var scale = _v0.a;
		var drawing = _v0.b;
		var actual = scale * drawing;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					$elm$core$String$fromInt(actual) + ' m',
					A2(
						$elm$core$List$map,
						function (w) {
							return w + ' m';
						},
						wrong));
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(actual) + ' m',
						prompt: 'A map scale is 1 cm = ' + ($elm$core$String$fromInt(scale) + (' m. A road is ' + ($elm$core$String$fromInt(drawing) + ' cm on the map. How long is the actual road?'))),
						steps: _List_fromArray(
							[
								'Set up proportion: 1/' + ($elm$core$String$fromInt(scale) + (' = ' + ($elm$core$String$fromInt(drawing) + '/x'))),
								'x = ' + ($elm$core$String$fromInt(drawing) + (' × ' + ($elm$core$String$fromInt(scale) + (' = ' + ($elm$core$String$fromInt(actual) + ' m')))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'A map scale is 1 cm = ' + ($elm$core$String$fromInt(scale) + (' m. A road is ' + ($elm$core$String$fromInt(drawing) + ' cm on the map. How long is the actual road?')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(actual));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[5, 10, 20, 50]),
			10),
		A2($author$project$Game$Problem$Common$randInt, 2, 8)));
var $author$project$Game$Problem$Course2$genSimilarFigures = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var k = _v0.b;
		return A2(
			$elm$random$Random$andThen,
			function (b) {
				var x = b * k;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(x),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(x),
								prompt: 'Two similar rectangles. First has sides ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(a * k) + ('. Second has short side ' + ($elm$core$String$fromInt(b) + '. Find the long side.'))))),
								steps: _List_fromArray(
									[
										'Find scale factor: ' + ($elm$core$String$fromInt(a * k) + (' / ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(k))))),
										'Apply to other side: ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(k) + (' = ' + $elm$core$String$fromInt(x)))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Two similar rectangles. First has sides ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(a * k) + ('. Second has short side ' + ($elm$core$String$fromInt(b) + '. Find the long side.')))))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(x));
			},
			A2($author$project$Game$Problem$Common$randInt, 3, 8));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 2, 5)));
var $author$project$Game$Problem$Course2$genSimpleInterest = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var p = _v0.a;
		var r = _v0.b;
		var t = _v0.c;
		var interest = (((p * r) * t) / 100) | 0;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					'$' + $elm$core$String$fromInt(interest),
					A2(
						$elm$core$List$map,
						function (w) {
							return '$' + w;
						},
						wrong));
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: '$' + $elm$core$String$fromInt(interest),
						prompt: 'Principal: $' + ($elm$core$String$fromInt(p) + (', Rate: ' + ($elm$core$String$fromInt(r) + ('% per year, Time: ' + ($elm$core$String$fromInt(t) + ' years. Find the simple interest.'))))),
						steps: _List_fromArray(
							[
								'Formula: I = P × r × t',
								'I = ' + ($elm$core$String$fromInt(p) + (' × ' + ($elm$core$String$fromFloat(r / 100.0) + (' × ' + $elm$core$String$fromInt(t))))),
								'I = $' + $elm$core$String$fromInt(interest)
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Principal: $' + ($elm$core$String$fromInt(p) + (', Rate: ' + ($elm$core$String$fromInt(r) + ('% per year, Time: ' + ($elm$core$String$fromInt(t) + ' years. Find the simple interest.')))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(interest));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (p, r, t) {
				return _Utils_Tuple3(p, r, t);
			}),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[100, 200, 500, 1000]),
			500),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[2, 3, 4, 5, 6, 8, 10]),
			5),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$Course2$genSolveProportion = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var k = _v0.b;
		var c = a + 1;
		var x = c * k;
		var b = a * k;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: $elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(c) + '/x. Solve for x.')))),
				steps: _List_fromArray(
					[
						'Cross multiply: ' + ($elm$core$String$fromInt(a) + (' × x = ' + ($elm$core$String$fromInt(b) + (' × ' + $elm$core$String$fromInt(c))))),
						$elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(b * c)),
						'x = ' + ($elm$core$String$fromInt(b * c) + (' / ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(c) + '/x. Solve for x.'))))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$Course2$genUnitRate = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var units = _v0.a;
				var rate = _v0.b;
				var total = units * rate;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(rate),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: '$' + $elm$core$String$fromInt(rate),
								prompt: $elm$core$String$fromInt(units) + (' books cost $' + ($elm$core$String$fromInt(total) + '. Cost per book?')),
								steps: _List_fromArray(
									[
										'Unit rate = total / quantity',
										'$' + ($elm$core$String$fromInt(total) + (' / ' + ($elm$core$String$fromInt(units) + (' = $' + $elm$core$String$fromInt(rate)))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: $elm$core$String$fromInt(units) + (' books cost $' + ($elm$core$String$fromInt(total) + '. Cost per book?'))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(rate));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 8),
				A2($author$project$Game$Problem$Common$randInt, 1, 9))) : A2(
			$elm$random$Random$andThen,
			function (_v1) {
				var hours = _v1.a;
				var miles = _v1.b;
				var rate = (miles / hours) | 0;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(rate) + ' mph',
							A2(
								$elm$core$List$map,
								function (w) {
									return w + ' mph';
								},
								wrong));
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(rate) + ' mph',
								prompt: 'A car travels ' + ($elm$core$String$fromInt(miles) + (' miles in ' + ($elm$core$String$fromInt(hours) + ' hours. What is the unit rate?'))),
								steps: _List_fromArray(
									[
										'Divide miles by hours: ' + ($elm$core$String$fromInt(miles) + (' / ' + ($elm$core$String$fromInt(hours) + (' = ' + ($elm$core$String$fromInt(rate) + ' mph')))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'A car travels ' + ($elm$core$String$fromInt(miles) + (' miles in ' + ($elm$core$String$fromInt(hours) + ' hours. What is the unit rate?')))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(rate));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 6),
				A2($author$project$Game$Problem$Common$randInt, 30, 90)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$unit4 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course2$genRatioSimplify;
			case 1:
				return $author$project$Game$Problem$Course2$genUnitRate;
			case 2:
				return $author$project$Game$Problem$Course2$genSolveProportion;
			case 3:
				return $author$project$Game$Problem$Course2$genScaleDrawing;
			case 4:
				return $author$project$Game$Problem$Course2$genSimilarFigures;
			case 5:
				return $author$project$Game$Problem$Course2$genPercentProportion;
			case 6:
				return $author$project$Game$Problem$Course2$genDiscountMarkup;
			default:
				return $author$project$Game$Problem$Course2$genSimpleInterest;
		}
	},
	A2($elm$random$Random$int, 0, 7));
var $author$project$Game$Problem$Course2$genIsFunction = A2(
	$elm$random$Random$map,
	function (t) {
		return (!t) ? {
			answer: $author$project$Types$AChoice(0),
			hint: {
				answer: 'Yes',
				prompt: 'Is {(1,2),(2,3),(3,4)} a function?',
				steps: _List_fromArray(
					['A function: each x-value maps to exactly ONE y-value', 'Check: no x repeats with different y values', 'Answer: Yes, it is a function'])
			},
			inputType: $author$project$Types$TChoice(
				_List_fromArray(
					['Yes', 'No'])),
			prompt: 'Is {(1,2), (2,4), (3,6), (4,8)} a function?'
		} : {
			answer: $author$project$Types$AChoice(0),
			hint: {
				answer: 'No',
				prompt: 'Is {(1,2),(1,3),(2,4)} a function?',
				steps: _List_fromArray(
					['A function: each x-value maps to exactly ONE y-value', 'Here x=1 appears twice with y=2 and y=3', 'That violates the definition — NOT a function'])
			},
			inputType: $author$project$Types$TChoice(
				_List_fromArray(
					['No', 'Yes'])),
			prompt: 'Is {(1,2), (2,5), (1,4), (3,7)} a function?'
		};
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genLinearFuncValue = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var m = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		var correct = (m * x) + b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'If f(x) = ' + ($elm$core$String$fromInt(m) + ('x + ' + ($elm$core$String$fromInt(b) + (', find f(' + ($elm$core$String$fromInt(x) + ').'))))),
						steps: _List_fromArray(
							[
								'Replace x with ' + ($elm$core$String$fromInt(x) + (': f(' + ($elm$core$String$fromInt(x) + (') = ' + ($elm$core$String$fromInt(m) + ('(' + ($elm$core$String$fromInt(x) + (') + ' + $elm$core$String$fromInt(b))))))))),
								'= ' + ($elm$core$String$fromInt(m * x) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(correct)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'If f(x) = ' + ($elm$core$String$fromInt(m) + ('x + ' + ($elm$core$String$fromInt(b) + (', find f(' + ($elm$core$String$fromInt(x) + ').')))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (m, b, x) {
				return _Utils_Tuple3(m, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 0, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Course2$genProportionalRelation = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: 'Yes',
					prompt: 'Is (1,2),(2,4),(3,6) proportional?',
					steps: _List_fromArray(
						['Check y/x for each pair: 2/1=2, 4/2=2, 6/3=2', 'y/x is constant, so it is proportional'])
				},
				inputType: $author$project$Types$TChoice(
					_List_fromArray(
						['Yes — y = 3x', 'No', 'Yes — y = x + 2', 'Cannot tell'])),
				prompt: 'Does the table {(1,3),(2,6),(3,9),(4,12)} show a proportional relationship?'
			}) : A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var k = _v0.a;
				var x = _v0.b;
				var y = k * x;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(y),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(y),
								prompt: 'y varies directly with x. When x=1, y=' + ($elm$core$String$fromInt(k) + ('. Find y when x=' + ($elm$core$String$fromInt(x) + '.'))),
								steps: _List_fromArray(
									[
										'Direct variation: y = kx where k = y/x',
										'k = ' + ($elm$core$String$fromInt(k) + (' (when x=1, y=' + ($elm$core$String$fromInt(k) + ')'))),
										'y = ' + ($elm$core$String$fromInt(k) + (' × ' + ($elm$core$String$fromInt(x) + (' = ' + $elm$core$String$fromInt(y)))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'y varies directly with x. When x=1, y=' + ($elm$core$String$fromInt(k) + ('. Find y when x=' + ($elm$core$String$fromInt(x) + '.')))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(y));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 6),
				A2($author$project$Game$Problem$Common$randInt, 2, 8)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genQuadrant = A2(
	$elm$random$Random$map,
	function (_v0) {
		var x = _v0.a;
		var y = _v0.b;
		var q = ((x > 0) && (y > 0)) ? 0 : (((x < 0) && (y > 0)) ? 1 : (((x < 0) && (y < 0)) ? 2 : 3));
		return {
			answer: $author$project$Types$AChoice(q),
			hint: {
				answer: 'Quadrant ' + function () {
					switch (q) {
						case 0:
							return 'I';
						case 1:
							return 'II';
						case 2:
							return 'III';
						default:
							return 'IV';
					}
				}(),
				prompt: 'The point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ') lies in which quadrant?'))),
				steps: _List_fromArray(
					[
						'Quadrant I: (+, +), Quadrant II: (-, +)',
						'Quadrant III: (-, -), Quadrant IV: (+, -)',
						'(' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ('): x ' + (((x > 0) ? 'positive' : 'negative') + (', y ' + (((y > 0) ? 'positive' : 'negative') + (' → Quadrant ' + function () {
						switch (q) {
							case 0:
								return 'I';
							case 1:
								return 'II';
							case 2:
								return 'III';
							default:
								return 'IV';
						}
					}()))))))))
					])
			},
			inputType: $author$project$Types$TChoice(
				_List_fromArray(
					['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'])),
			prompt: 'The point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ') lies in which quadrant?')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, -8, 8),
		A2($author$project$Game$Problem$Common$randIntNonZero, -8, 8)));
var $author$project$Game$Problem$Course2$genSlopeFromPoints = A2(
	$elm$random$Random$andThen,
	function (r) {
		var y1 = A2($author$project$Game$Problem$Common$randInt, -5, 5);
		var x1 = r.x1;
		return A2(
			$elm$random$Random$map,
			function (y1val) {
				var y2 = y1val + r.rise;
				var x2 = x1 + r.run;
				var slope = r.rise;
				var denom = r.run;
				var _v0 = A2($author$project$Game$Problem$Common$reduceFraction, slope, denom);
				var sn = _v0.a;
				var sd = _v0.b;
				var slopeStr = (sd === 1) ? $elm$core$String$fromInt(sn) : A2($author$project$Game$Problem$Course2$showFrac, sn, sd);
				var wrong1 = (sd === 1) ? $elm$core$String$fromInt(sn + 1) : A2($author$project$Game$Problem$Course2$showFrac, sn + 1, sd);
				var wrong2 = (sd === 1) ? $elm$core$String$fromInt(sn - 1) : A2($author$project$Game$Problem$Course2$showFrac, sn - 1, sd);
				var wrong3 = (sd === 1) ? $elm$core$String$fromInt(-sn) : A2($author$project$Game$Problem$Course2$showFrac, -sn, sd);
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					slopeStr,
					_List_fromArray(
						[wrong1, wrong2, wrong3]));
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: slopeStr,
						prompt: 'Find the slope of the line through (' + ($elm$core$String$fromInt(x1) + (', ' + ($elm$core$String$fromInt(y1val) + (') and (' + ($elm$core$String$fromInt(x2) + (', ' + ($elm$core$String$fromInt(y2) + ').'))))))),
						steps: _List_fromArray(
							[
								'Slope = (y₂ - y₁) / (x₂ - x₁)',
								'= (' + ($elm$core$String$fromInt(y2) + (' - ' + ($elm$core$String$fromInt(y1val) + (') / (' + ($elm$core$String$fromInt(x2) + (' - ' + ($elm$core$String$fromInt(x1) + ')'))))))),
								'= ' + ($elm$core$String$fromInt(slope) + (' / ' + ($elm$core$String$fromInt(denom) + (' = ' + slopeStr))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Find the slope of the line through (' + ($elm$core$String$fromInt(x1) + (', ' + ($elm$core$String$fromInt(y1val) + (') and (' + ($elm$core$String$fromInt(x2) + (', ' + ($elm$core$String$fromInt(y2) + ').')))))))
				};
			},
			y1);
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (x1, run, rise, x2start) {
				return {rise: rise, run: run, x1: x1, x2start: x2start};
			}),
		A2($author$project$Game$Problem$Common$randInt, -5, 3),
		A2($author$project$Game$Problem$Common$randInt, 1, 4),
		A2($author$project$Game$Problem$Common$randInt, -4, 4),
		A2($author$project$Game$Problem$Common$randInt, 0, 1)));
var $author$project$Game$Problem$Course2$genSlopeIntercept = A2(
	$elm$random$Random$map,
	function (_v0) {
		var m = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		var y = (m * x) + b;
		return {
			answer: $author$project$Types$AInt(y),
			hint: {
				answer: $elm$core$String$fromInt(y),
				prompt: 'For y = ' + ($author$project$Game$Problem$Course2$showSigned(m) + ('x + ' + ($author$project$Game$Problem$Course2$showSigned(b) + (', find y when x = ' + $elm$core$String$fromInt(x))))),
				steps: _List_fromArray(
					[
						'Substitute x = ' + ($elm$core$String$fromInt(x) + (': y = ' + ($author$project$Game$Problem$Course2$showSigned(m) + ('(' + ($elm$core$String$fromInt(x) + (') + ' + $author$project$Game$Problem$Course2$showSigned(b))))))),
						'y = ' + ($elm$core$String$fromInt(m * x) + (' + ' + ($author$project$Game$Problem$Course2$showSigned(b) + (' = ' + $elm$core$String$fromInt(y)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'For y = ' + ($author$project$Game$Problem$Course2$showSigned(m) + ('x + ' + ($author$project$Game$Problem$Course2$showSigned(b) + (', find y when x = ' + $elm$core$String$fromInt(x)))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (m, b, x) {
				return _Utils_Tuple3(m, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, -4, 4),
		A2($author$project$Game$Problem$Common$randInt, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$Course2$unit5 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course2$genQuadrant;
			case 1:
				return $author$project$Game$Problem$Course2$genIsFunction;
			case 2:
				return $author$project$Game$Problem$Course2$genSlopeFromPoints;
			case 3:
				return $author$project$Game$Problem$Course2$genSlopeIntercept;
			case 4:
				return $author$project$Game$Problem$Course2$genLinearFuncValue;
			default:
				return $author$project$Game$Problem$Course2$genProportionalRelation;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Game$Problem$Course2$genAngleClassify = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $elm$random$Random$constant(
					{
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: 'Right',
							prompt: 'A 90° angle is called?',
							steps: _List_fromArray(
								['Acute: < 90°, Right: = 90°, Obtuse: > 90°, Straight: 180°'])
						},
						inputType: $author$project$Types$TChoice(
							_List_fromArray(
								['Right', 'Acute', 'Obtuse', 'Straight'])),
						prompt: 'An angle measuring 90° is called:'
					});
			case 1:
				return A2(
					$elm$random$Random$map,
					function (deg) {
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: 'Acute',
								prompt: 'An angle measuring ' + ($elm$core$String$fromInt(deg) + '° is:'),
								steps: _List_fromArray(
									[
										'Acute angles are between 0° and 90°',
										$elm$core$String$fromInt(deg) + '° < 90°, so it is acute'
									])
							},
							inputType: $author$project$Types$TChoice(
								_List_fromArray(
									['Acute', 'Right', 'Obtuse', 'Straight'])),
							prompt: 'An angle measuring ' + ($elm$core$String$fromInt(deg) + '° is:')
						};
					},
					A2(
						$author$project$Game$Problem$Common$randChoice,
						_List_fromArray(
							[15, 30, 45, 60, 75]),
						45));
			case 2:
				return A2(
					$elm$random$Random$map,
					function (deg) {
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: 'Obtuse',
								prompt: 'An angle measuring ' + ($elm$core$String$fromInt(deg) + '° is:'),
								steps: _List_fromArray(
									[
										'Obtuse angles are between 90° and 180°',
										'90° < ' + ($elm$core$String$fromInt(deg) + '° < 180°, so it is obtuse')
									])
							},
							inputType: $author$project$Types$TChoice(
								_List_fromArray(
									['Obtuse', 'Acute', 'Right', 'Straight'])),
							prompt: 'An angle measuring ' + ($elm$core$String$fromInt(deg) + '° is:')
						};
					},
					A2(
						$author$project$Game$Problem$Common$randChoice,
						_List_fromArray(
							[100, 110, 120, 135, 150, 165]),
						120));
			default:
				return $elm$random$Random$constant(
					{
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: 'Straight',
							prompt: 'A 180° angle is called?',
							steps: _List_fromArray(
								['A straight angle forms a straight line and measures exactly 180°'])
						},
						inputType: $author$project$Types$TChoice(
							_List_fromArray(
								['Straight', 'Right', 'Obtuse', 'Reflex'])),
						prompt: 'An angle measuring 180° is called:'
					});
		}
	},
	A2($elm$random$Random$int, 0, 3));
var $author$project$Game$Problem$Course2$genCompSuppl = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$andThen,
			function (a) {
				var x = 90 - a;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(x) + '°',
							A2(
								$elm$core$List$map,
								function (w) {
									return w + '°';
								},
								wrong));
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(x) + '°',
								prompt: 'Two angles are complementary. One measures ' + ($elm$core$String$fromInt(a) + '°. Find the other.'),
								steps: _List_fromArray(
									[
										'Complementary angles sum to 90°',
										'90° - ' + ($elm$core$String$fromInt(a) + ('° = ' + ($elm$core$String$fromInt(x) + '°')))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Two angles are complementary. One measures ' + ($elm$core$String$fromInt(a) + '°. Find the other.')
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(x));
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]),
				40)) : A2(
			$elm$random$Random$andThen,
			function (a) {
				var x = 180 - a;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(x) + '°',
							A2(
								$elm$core$List$map,
								function (w) {
									return w + '°';
								},
								wrong));
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(x) + '°',
								prompt: 'Two angles are supplementary. One measures ' + ($elm$core$String$fromInt(a) + '°. Find the other.'),
								steps: _List_fromArray(
									[
										'Supplementary angles sum to 180°',
										'180° - ' + ($elm$core$String$fromInt(a) + ('° = ' + ($elm$core$String$fromInt(x) + '°')))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Two angles are supplementary. One measures ' + ($elm$core$String$fromInt(a) + '°. Find the other.')
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(x));
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[30, 45, 60, 75, 90, 100, 110, 120, 135, 150]),
				60));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genTranslation = A2(
	$elm$random$Random$andThen,
	function (r) {
		var wrong3 = '(' + ($elm$core$String$fromInt(r.x - r.dx) + (', ' + ($elm$core$String$fromInt(r.y - r.dy) + ')')));
		var ny = r.y + r.dy;
		var nx = r.x + r.dx;
		var wrong1 = '(' + ($elm$core$String$fromInt(nx + 1) + (', ' + ($elm$core$String$fromInt(ny) + ')')));
		var wrong2 = '(' + ($elm$core$String$fromInt(nx) + (', ' + ($elm$core$String$fromInt(ny + 1) + ')')));
		var correct = '(' + ($elm$core$String$fromInt(nx) + (', ' + ($elm$core$String$fromInt(ny) + ')')));
		var choices = A2(
			$author$project$Game$Problem$Course2$shuffleChoices,
			correct,
			_List_fromArray(
				[wrong1, wrong2, wrong3]));
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Translate point (' + ($elm$core$String$fromInt(r.x) + (', ' + ($elm$core$String$fromInt(r.y) + (') by (' + ($author$project$Game$Problem$Course2$showSigned(r.dx) + (', ' + ($author$project$Game$Problem$Course2$showSigned(r.dy) + '). New point?'))))))),
					steps: _List_fromArray(
						[
							'Add dx to x: ' + ($elm$core$String$fromInt(r.x) + (' + ' + ($author$project$Game$Problem$Course2$showSigned(r.dx) + (' = ' + $elm$core$String$fromInt(nx))))),
							'Add dy to y: ' + ($elm$core$String$fromInt(r.y) + (' + ' + ($author$project$Game$Problem$Course2$showSigned(r.dy) + (' = ' + $elm$core$String$fromInt(ny))))),
							'New point: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Translate point (' + ($elm$core$String$fromInt(r.x) + (', ' + ($elm$core$String$fromInt(r.y) + (') by (' + ($author$project$Game$Problem$Course2$showSigned(r.dx) + (', ' + ($author$project$Game$Problem$Course2$showSigned(r.dy) + '). New point?')))))))
			});
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (x, y, dx, dy) {
				return {dx: dx, dy: dy, x: x, y: y};
			}),
		A2($author$project$Game$Problem$Common$randInt, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, -4, 4),
		A2($author$project$Game$Problem$Common$randInt, -4, 4)));
var $author$project$Game$Problem$Course2$genTriangleClassify = A2(
	$elm$random$Random$map,
	function (t) {
		switch (t) {
			case 0:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Equilateral',
						prompt: 'All three sides equal?',
						steps: _List_fromArray(
							['Equilateral: all 3 sides equal, all angles 60°', 'Isosceles: 2 sides equal', 'Scalene: no sides equal'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Equilateral', 'Isosceles', 'Scalene', 'Right'])),
					prompt: 'A triangle with all sides equal is called:'
				};
			case 1:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Isosceles',
						prompt: 'Exactly two equal sides?',
						steps: _List_fromArray(
							['Isosceles triangles have exactly two equal sides (and two equal base angles)'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Isosceles', 'Equilateral', 'Scalene', 'Obtuse'])),
					prompt: 'A triangle with exactly two equal sides is:'
				};
			default:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Right',
						prompt: 'A triangle with a 90° angle is?',
						steps: _List_fromArray(
							['Acute: all angles < 90°', 'Right: one angle = 90°', 'Obtuse: one angle > 90°'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Right', 'Acute', 'Obtuse', 'Equilateral'])),
					prompt: 'A triangle with angles 90°, 45°, and 45° is what type by angles?'
				};
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course2$genTriangleSum = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = (180 - a) - b;
		var safeA = (c <= 0) ? 80 : a;
		var safeB = (c <= 0) ? 70 : b;
		var safeC = (c <= 0) ? 30 : c;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					$elm$core$String$fromInt(safeC) + '°',
					A2(
						$elm$core$List$map,
						function (w) {
							return w + '°';
						},
						wrong));
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(safeC) + '°',
						prompt: 'A triangle has angles ' + ($elm$core$String$fromInt(safeA) + ('° and ' + ($elm$core$String$fromInt(safeB) + '°. Find the third angle.'))),
						steps: _List_fromArray(
							[
								'Triangle angles sum to 180°',
								'180° - ' + ($elm$core$String$fromInt(safeA) + ('° - ' + ($elm$core$String$fromInt(safeB) + ('° = ' + ($elm$core$String$fromInt(safeC) + '°')))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'A triangle has angles ' + ($elm$core$String$fromInt(safeA) + ('° and ' + ($elm$core$String$fromInt(safeB) + '°. Find the third angle.')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(safeC));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 20, 80),
		A2($author$project$Game$Problem$Common$randInt, 20, 80)));
var $author$project$Game$Problem$Course2$genVerticalAngles = A2(
	$elm$random$Random$andThen,
	function (a) {
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					$elm$core$String$fromInt(a) + '°',
					A2(
						$elm$core$List$map,
						function (w) {
							return w + '°';
						},
						wrong));
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(a) + '°',
						prompt: 'Two lines intersect. One angle is ' + ($elm$core$String$fromInt(a) + '°. What is the vertical angle?'),
						steps: _List_fromArray(
							[
								'Vertical angles are opposite angles formed by intersecting lines',
								'Vertical angles are always equal',
								'Answer: ' + ($elm$core$String$fromInt(a) + '°')
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Two lines intersect. One angle is ' + ($elm$core$String$fromInt(a) + '°. What is the vertical angle?')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(a));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[30, 45, 55, 60, 70, 80, 100, 110, 120, 135]),
		70));
var $author$project$Game$Problem$Course2$unit6 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course2$genAngleClassify;
			case 1:
				return $author$project$Game$Problem$Course2$genCompSuppl;
			case 2:
				return $author$project$Game$Problem$Course2$genVerticalAngles;
			case 3:
				return $author$project$Game$Problem$Course2$genTriangleSum;
			case 4:
				return $author$project$Game$Problem$Course2$genTriangleClassify;
			default:
				return $author$project$Game$Problem$Course2$genTranslation;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Game$Problem$Course2$genCircleCalc = A2(
	$elm$random$Random$andThen,
	function (t) {
		return A2(
			$elm$random$Random$map,
			function (r) {
				return (!t) ? {
					answer: A2($author$project$Types$AFloat, (2.0 * 3.14) * r, 0.1),
					hint: {
						answer: $elm$core$String$fromFloat((2.0 * 3.14) * r),
						prompt: 'Circumference of a circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)'),
						steps: _List_fromArray(
							[
								'C = 2πr',
								'C = 2 × 3.14 × ' + ($elm$core$String$fromInt(r) + (' = ' + $elm$core$String$fromFloat((2.0 * 3.14) * r)))
							])
					},
					inputType: $author$project$Types$TDecimal,
					prompt: 'Circumference of a circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)')
				} : {
					answer: A2($author$project$Types$AFloat, (3.14 * r) * r, 0.5),
					hint: {
						answer: $elm$core$String$fromFloat((3.14 * r) * r),
						prompt: 'Area of a circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)'),
						steps: _List_fromArray(
							[
								'A = πr²',
								'A = 3.14 × ' + ($elm$core$String$fromInt(r) + ('² = 3.14 × ' + ($elm$core$String$fromInt(r * r) + (' = ' + $elm$core$String$fromFloat((3.14 * r) * r)))))
							])
					},
					inputType: $author$project$Types$TDecimal,
					prompt: 'Area of a circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)')
				};
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[3, 4, 5, 6, 7, 8, 10]),
				5));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genPerimArea = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$andThen,
					function (_v1) {
						var w = _v1.a;
						var h = _v1.b;
						var correct = 2 * (w + h);
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Course2$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: 'Perimeter of a rectangle with width ' + ($elm$core$String$fromInt(w) + (' and height ' + ($elm$core$String$fromInt(h) + '?'))),
										steps: _List_fromArray(
											[
												'P = 2(l + w)',
												'P = 2(' + ($elm$core$String$fromInt(w) + (' + ' + ($elm$core$String$fromInt(h) + (') = 2(' + ($elm$core$String$fromInt(w + h) + (') = ' + $elm$core$String$fromInt(correct)))))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'Perimeter of a rectangle with width ' + ($elm$core$String$fromInt(w) + (' and height ' + ($elm$core$String$fromInt(h) + '?')))
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 3, 12),
						A2($author$project$Game$Problem$Common$randInt, 3, 12)));
			case 1:
				return A2(
					$elm$random$Random$map,
					function (_v2) {
						var w = _v2.a;
						var h = _v2.b;
						return {
							answer: $author$project$Types$AInt(w * h),
							hint: {
								answer: $elm$core$String$fromInt(w * h),
								prompt: 'Area of rectangle: width=' + ($elm$core$String$fromInt(w) + (', height=' + ($elm$core$String$fromInt(h) + '?'))),
								steps: _List_fromArray(
									[
										'A = l × w = ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt(w * h)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Area of rectangle: width=' + ($elm$core$String$fromInt(w) + (', height=' + ($elm$core$String$fromInt(h) + '?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 3, 12),
						A2($author$project$Game$Problem$Common$randInt, 3, 12)));
			default:
				return A2(
					$elm$random$Random$map,
					function (_v3) {
						var bHalf = _v3.a;
						var h = _v3.b;
						var b = bHalf * 2;
						return {
							answer: $author$project$Types$AInt(((b * h) / 2) | 0),
							hint: {
								answer: $elm$core$String$fromInt(((b * h) / 2) | 0),
								prompt: 'Area of triangle: base=' + ($elm$core$String$fromInt(b) + (', height=' + ($elm$core$String$fromInt(h) + '?'))),
								steps: _List_fromArray(
									[
										'A = ½ × b × h = ½ × ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt(((b * h) / 2) | 0)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Area of triangle: base=' + ($elm$core$String$fromInt(b) + (', height=' + ($elm$core$String$fromInt(h) + '?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 2, 8),
						A2($author$project$Game$Problem$Common$randInt, 1, 6)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course2$genSurfaceAreaCylinder = A2(
	$elm$random$Random$andThen,
	function (r) {
		return A2(
			$elm$random$Random$map,
			function (h) {
				var pi_ = 3.14;
				var sa = (((2.0 * pi_) * r) * r) + (((2.0 * pi_) * r) * h);
				return {
					answer: A2($author$project$Types$AFloat, sa, 1.0),
					hint: {
						answer: $elm$core$String$fromFloat(sa),
						prompt: 'Surface area of a cylinder with radius ' + ($elm$core$String$fromInt(r) + (' and height ' + ($elm$core$String$fromInt(h) + '? (use π≈3.14)'))),
						steps: function () {
							var topBottom = ((2.0 * pi_) * r) * r;
							var side = ((2.0 * pi_) * r) * h;
							return _List_fromArray(
								[
									'SA = 2πr² + 2πrh',
									'= 2×3.14×' + ($elm$core$String$fromInt(r * r) + (' + 2×3.14×' + ($elm$core$String$fromInt(r) + ('×' + $elm$core$String$fromInt(h))))),
									'= ' + ($elm$core$String$fromFloat(topBottom) + (' + ' + ($elm$core$String$fromFloat(side) + (' = ' + $elm$core$String$fromFloat(sa)))))
								]);
						}()
					},
					inputType: $author$project$Types$TDecimal,
					prompt: 'Surface area of a cylinder with radius ' + ($elm$core$String$fromInt(r) + (' and height ' + ($elm$core$String$fromInt(h) + '? (use π≈3.14)')))
				};
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[3, 4, 5, 6, 8, 10]),
				5));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[2, 3, 4, 5]),
		3));
var $author$project$Game$Problem$Course2$genSurfaceAreaRect = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var l = _v0.a;
		var w = _v0.b;
		var h = _v0.c;
		var correct = 2 * (((l * w) + (l * h)) + (w * h));
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'Surface area of a rectangular prism: ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + '?'))))),
						steps: _List_fromArray(
							[
								'SA = 2(lw + lh + wh)',
								'= 2(' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + (' + ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(h) + (' + ' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + ')'))))))))))),
								'= 2(' + ($elm$core$String$fromInt(l * w) + (' + ' + ($elm$core$String$fromInt(l * h) + (' + ' + ($elm$core$String$fromInt(w * h) + (') = 2(' + ($elm$core$String$fromInt(((l * w) + (l * h)) + (w * h)) + (') = ' + $elm$core$String$fromInt(correct)))))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Surface area of a rectangular prism: ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + '?')))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (l, w, h) {
				return _Utils_Tuple3(l, w, h);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8)));
var $author$project$Game$Problem$Course2$genVolumeCylinder = A2(
	$elm$random$Random$andThen,
	function (r) {
		return A2(
			$elm$random$Random$map,
			function (h) {
				var v = ((3.14 * r) * r) * h;
				return {
					answer: A2($author$project$Types$AFloat, v, 1.0),
					hint: {
						answer: $elm$core$String$fromFloat(v),
						prompt: 'Volume of a cylinder with radius ' + ($elm$core$String$fromInt(r) + (' and height ' + ($elm$core$String$fromInt(h) + '? (use π≈3.14)'))),
						steps: _List_fromArray(
							[
								'V = πr²h',
								'= 3.14 × ' + ($elm$core$String$fromInt(r) + ('² × ' + $elm$core$String$fromInt(h))),
								'= 3.14 × ' + ($elm$core$String$fromInt(r * r) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromFloat(v)))))
							])
					},
					inputType: $author$project$Types$TDecimal,
					prompt: 'Volume of a cylinder with radius ' + ($elm$core$String$fromInt(r) + (' and height ' + ($elm$core$String$fromInt(h) + '? (use π≈3.14)')))
				};
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[3, 4, 5, 6, 8, 10]),
				5));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[2, 3, 4, 5]),
		3));
var $author$project$Game$Problem$Course2$genVolumeRect = A2(
	$elm$random$Random$map,
	function (_v0) {
		var l = _v0.a;
		var w = _v0.b;
		var h = _v0.c;
		return {
			answer: $author$project$Types$AInt((l * w) * h),
			hint: {
				answer: $elm$core$String$fromInt((l * w) * h),
				prompt: 'Volume of rectangular prism: ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + '?'))))),
				steps: _List_fromArray(
					[
						'V = l × w × h',
						'= ' + ($elm$core$String$fromInt(l) + (' × ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt((l * w) * h)))))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Volume of rectangular prism: ' + ($elm$core$String$fromInt(l) + ('×' + ($elm$core$String$fromInt(w) + ('×' + ($elm$core$String$fromInt(h) + '?')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (l, w, h) {
				return _Utils_Tuple3(l, w, h);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 10),
		A2($author$project$Game$Problem$Common$randInt, 2, 10),
		A2($author$project$Game$Problem$Common$randInt, 2, 10)));
var $author$project$Game$Problem$Course2$unit7 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course2$genPerimArea;
			case 1:
				return $author$project$Game$Problem$Course2$genCircleCalc;
			case 2:
				return $author$project$Game$Problem$Course2$genSurfaceAreaRect;
			case 3:
				return $author$project$Game$Problem$Course2$genSurfaceAreaCylinder;
			case 4:
				return $author$project$Game$Problem$Course2$genVolumeRect;
			default:
				return $author$project$Game$Problem$Course2$genVolumeCylinder;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Game$Problem$Course2$genBoxWhisker = A2(
	$elm$random$Random$andThen,
	function (sorted) {
		var q3 = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$head(
				A2($elm$core$List$drop, 3, sorted)));
		var q1 = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$head(sorted));
		var iqr = q3 - q1;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var numStr = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$map, $elm$core$String$fromInt, sorted));
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					$elm$core$String$fromInt(iqr),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(iqr),
						prompt: 'For data {' + (numStr + ('}: Q1=' + ($elm$core$String$fromInt(q1) + (', Q3=' + ($elm$core$String$fromInt(q3) + '. Find the IQR (interquartile range).'))))),
						steps: _List_fromArray(
							[
								'IQR = Q3 - Q1',
								'IQR = ' + ($elm$core$String$fromInt(q3) + (' - ' + ($elm$core$String$fromInt(q1) + (' = ' + $elm$core$String$fromInt(iqr)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'For data {' + (numStr + ('}: Q1=' + ($elm$core$String$fromInt(q1) + (', Q3=' + ($elm$core$String$fromInt(q3) + '. Find the IQR (interquartile range).')))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(iqr));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return $elm$core$List$sort(
					_List_fromArray(
						[a, b, c, d]));
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 10),
		A2($author$project$Game$Problem$Common$randInt, 11, 20),
		A2($author$project$Game$Problem$Common$randInt, 21, 30),
		A2($author$project$Game$Problem$Common$randInt, 31, 40)));
var $author$project$Game$Problem$Course2$genCompoundProb = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? $elm$random$Random$constant(
			{
				answer: A2($author$project$Types$AFraction, 1, 12),
				hint: {
					answer: '1/12',
					prompt: 'You flip a fair coin and roll a 6-sided die. What is P(heads AND rolling a 3)?',
					steps: _List_fromArray(
						['For independent events: P(A and B) = P(A) × P(B)', 'P(heads) = 1/2, P(rolling 3) = 1/6', '1/2 × 1/6 = 1/12'])
				},
				inputType: $author$project$Types$TFraction,
				prompt: 'You flip a fair coin and roll a 6-sided die. What is P(heads AND rolling a 3)?'
			}) : $elm$random$Random$constant(
			{
				answer: A2($author$project$Types$AFraction, 1, 1),
				hint: {
					answer: '1',
					prompt: 'A bag has 3 red and 4 blue marbles (7 total). What is P(red or blue)?',
					steps: _List_fromArray(
						['Mutually exclusive: P(A or B) = P(A) + P(B)', 'P(red) = 3/7, P(blue) = 4/7', '3/7 + 4/7 = 7/7 = 1', 'Certain event: probability = 1'])
				},
				inputType: $author$project$Types$TFraction,
				prompt: 'A bag has 3 red and 4 blue marbles (7 total). What is P(red or blue)?'
			});
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genCountingPrinciple = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var a = _v0.a;
				var b = _v0.b;
				var correct = a * b;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(correct),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(correct),
								prompt: 'A restaurant offers ' + ($elm$core$String$fromInt(a) + (' main dishes and ' + ($elm$core$String$fromInt(b) + ' drinks. How many different meal combinations are possible?'))),
								steps: _List_fromArray(
									[
										'Fundamental Counting Principle: multiply the choices',
										$elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(correct))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'A restaurant offers ' + ($elm$core$String$fromInt(a) + (' main dishes and ' + ($elm$core$String$fromInt(b) + ' drinks. How many different meal combinations are possible?')))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(correct));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 5),
				A2($author$project$Game$Problem$Common$randInt, 2, 5))) : A2(
			$elm$random$Random$andThen,
			function (_v1) {
				var a = _v1.a;
				var b = _v1.b;
				var c = _v1.c;
				var correct = (a * b) * c;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course2$shuffleChoices,
							$elm$core$String$fromInt(correct),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(correct),
								prompt: 'A shirt comes in ' + ($elm$core$String$fromInt(a) + (' colors, ' + ($elm$core$String$fromInt(b) + (' sizes, and ' + ($elm$core$String$fromInt(c) + ' styles. How many different shirts are possible?'))))),
								steps: _List_fromArray(
									[
										'Multiply all choices together: ' + ($elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt(correct)))))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'A shirt comes in ' + ($elm$core$String$fromInt(a) + (' colors, ' + ($elm$core$String$fromInt(b) + (' sizes, and ' + ($elm$core$String$fromInt(c) + ' styles. How many different shirts are possible?')))))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(correct));
			},
			A4(
				$elm$random$Random$map3,
				F3(
					function (a, b, c) {
						return _Utils_Tuple3(a, b, c);
					}),
				A2($author$project$Game$Problem$Common$randInt, 2, 4),
				A2($author$project$Game$Problem$Common$randInt, 2, 3),
				A2($author$project$Game$Problem$Common$randInt, 2, 3)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genMeanMedianMode = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$andThen,
					function (nums) {
						var s = $elm$core$List$sum(nums);
						var n = $elm$core$List$length(nums);
						var correct = (s / n) | 0;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var numStr = A2(
									$elm$core$String$join,
									', ',
									A2($elm$core$List$map, $elm$core$String$fromInt, nums));
								var choices = A2(
									$author$project$Game$Problem$Course2$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: 'Mean of {' + (numStr + '}?'),
										steps: _List_fromArray(
											[
												'Add all values: ' + (A2(
												$elm$core$String$join,
												'+',
												A2($elm$core$List$map, $elm$core$String$fromInt, nums)) + (' = ' + $elm$core$String$fromInt(s))),
												'Divide by count: ' + ($elm$core$String$fromInt(s) + (' / ' + ($elm$core$String$fromInt(n) + (' = ' + $elm$core$String$fromInt(correct)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'Mean of {' + (numStr + '}?')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A5(
						$elm$random$Random$map4,
						F4(
							function (a, b, c, d) {
								return _List_fromArray(
									[a, b, c, d]);
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 20),
						A2($author$project$Game$Problem$Common$randInt, 1, 20),
						A2($author$project$Game$Problem$Common$randInt, 1, 20),
						A2($author$project$Game$Problem$Common$randInt, 1, 20)));
			case 1:
				return A2(
					$elm$random$Random$andThen,
					function (sorted) {
						var mid2 = A2(
							$elm$core$Maybe$withDefault,
							0,
							$elm$core$List$head(
								A2($elm$core$List$drop, 2, sorted)));
						var mid1 = A2(
							$elm$core$Maybe$withDefault,
							0,
							$elm$core$List$head(
								A2($elm$core$List$drop, 1, sorted)));
						var correct = ((mid1 + mid2) / 2) | 0;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var numStr = A2(
									$elm$core$String$join,
									', ',
									A2($elm$core$List$map, $elm$core$String$fromInt, sorted));
								var choices = A2(
									$author$project$Game$Problem$Course2$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: 'Median of {' + (numStr + '}?'),
										steps: _List_fromArray(
											[
												'Sort the list: ' + numStr,
												'Even count: average middle two: (' + ($elm$core$String$fromInt(mid1) + ('+' + ($elm$core$String$fromInt(mid2) + (')/2 = ' + $elm$core$String$fromInt(correct)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'Median of {' + (numStr + '}?')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A5(
						$elm$random$Random$map4,
						F4(
							function (a, b, c, d) {
								return $elm$core$List$sort(
									_List_fromArray(
										[a, b, c, d]));
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 20),
						A2($author$project$Game$Problem$Common$randInt, 1, 20),
						A2($author$project$Game$Problem$Common$randInt, 1, 20),
						A2($author$project$Game$Problem$Common$randInt, 1, 20)));
			default:
				return A2(
					$elm$random$Random$andThen,
					function (nums) {
						var numStr = A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $elm$core$String$fromInt, nums));
						var correct = A2(
							$elm$core$Maybe$withDefault,
							0,
							$elm$core$List$head(nums));
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$Course2$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: 'Mode of {' + (numStr + '}? (most frequent)'),
										steps: _List_fromArray(
											[
												'Mode = the value that appears most often',
												$elm$core$String$fromInt(correct) + (' appears more than once in: ' + numStr),
												'Mode = ' + $elm$core$String$fromInt(correct)
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'Mode of {' + (numStr + '}? (most frequent)')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (mode, other1, other2) {
								return $elm$core$List$sort(
									_List_fromArray(
										[mode, mode, other1, other2, other1 + 1]));
							}),
						A2($author$project$Game$Problem$Common$randInt, 5, 15),
						A2($author$project$Game$Problem$Common$randInt, 1, 4),
						A2($author$project$Game$Problem$Common$randInt, 16, 20)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course2$genSimpleProb = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$map,
			function (_v0) {
				var fav = _v0.a;
				var total = _v0.b;
				var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, fav, total);
				var rn = _v1.a;
				var rd = _v1.b;
				return {
					answer: A2($author$project$Types$AFraction, rn, rd),
					hint: {
						answer: A2($author$project$Game$Problem$Course2$showFrac, rn, rd),
						prompt: 'A bag has ' + ($elm$core$String$fromInt(total) + (' marbles. ' + ($elm$core$String$fromInt(fav) + ' are red. What is P(red)?'))),
						steps: _List_fromArray(
							[
								'P(event) = favorable outcomes / total outcomes',
								'P(red) = ' + (A2($author$project$Game$Problem$Course2$showFrac, fav, total) + (' = ' + A2($author$project$Game$Problem$Course2$showFrac, rn, rd)))
							])
					},
					inputType: $author$project$Types$TFraction,
					prompt: 'A bag has ' + ($elm$core$String$fromInt(total) + (' marbles. ' + ($elm$core$String$fromInt(fav) + ' are red. What is P(red)?')))
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 1, 4),
				A2($author$project$Game$Problem$Common$randInt, 5, 10))) : A2(
			$elm$random$Random$map,
			function (n) {
				switch (n) {
					case 0:
						return {
							answer: A2($author$project$Types$AFraction, 1, 6),
							hint: {
								answer: '1/6',
								prompt: 'P(rolling a 4) on a 6-sided die?',
								steps: _List_fromArray(
									['There is 1 favorable outcome (rolling 4)', 'Total outcomes: 6', 'P = 1/6'])
							},
							inputType: $author$project$Types$TFraction,
							prompt: 'A fair 6-sided die is rolled. What is P(rolling a 4)?'
						};
					case 1:
						return {
							answer: A2($author$project$Types$AFraction, 1, 2),
							hint: {
								answer: '1/2',
								prompt: 'P(even) on a 6-sided die?',
								steps: _List_fromArray(
									['Even numbers: 2, 4, 6 → 3 outcomes', 'Total outcomes: 6', 'P = 3/6 = 1/2'])
							},
							inputType: $author$project$Types$TFraction,
							prompt: 'A fair 6-sided die is rolled. What is P(rolling an even number)?'
						};
					default:
						return {
							answer: A2($author$project$Types$AFraction, 1, 3),
							hint: {
								answer: '1/3',
								prompt: 'P(rolling > 4) on a 6-sided die?',
								steps: _List_fromArray(
									['Numbers > 4: 5, 6 → 2 outcomes', 'Total outcomes: 6', 'P = 2/6 = 1/3'])
							},
							inputType: $author$project$Types$TFraction,
							prompt: 'A fair 6-sided die is rolled. What is P(rolling a number > 4)?'
						};
				}
			},
			A2($elm$random$Random$int, 0, 2));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course2$genStemLeaf = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var stem = _v0.a;
		var leaf = _v0.b;
		var value = (stem * 10) + leaf;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course2$shuffleChoices,
					$elm$core$String$fromInt(value),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(value),
						prompt: 'In a stem-and-leaf plot, stem=' + ($elm$core$String$fromInt(stem) + (' and leaf=' + ($elm$core$String$fromInt(leaf) + '. What number does this represent?'))),
						steps: _List_fromArray(
							[
								'Stem represents the tens digit',
								'Leaf represents the ones digit',
								'Stem ' + ($elm$core$String$fromInt(stem) + (', leaf ' + ($elm$core$String$fromInt(leaf) + (' → ' + $elm$core$String$fromInt(value)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'In a stem-and-leaf plot, stem=' + ($elm$core$String$fromInt(stem) + (' and leaf=' + ($elm$core$String$fromInt(leaf) + '. What number does this represent?')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(value));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 7),
		A2($author$project$Game$Problem$Common$randInt, 0, 9)));
var $author$project$Game$Problem$Course2$unit8 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$Course2$genSimpleProb;
			case 1:
				return $author$project$Game$Problem$Course2$genCountingPrinciple;
			case 2:
				return $author$project$Game$Problem$Course2$genCompoundProb;
			case 3:
				return $author$project$Game$Problem$Course2$genMeanMedianMode;
			case 4:
				return $author$project$Game$Problem$Course2$genBoxWhisker;
			default:
				return $author$project$Game$Problem$Course2$genStemLeaf;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Game$Problem$Course2$generatorFor = function (unitNum) {
	switch (unitNum) {
		case 1:
			return $author$project$Game$Problem$Course2$unit1;
		case 2:
			return $author$project$Game$Problem$Course2$unit2;
		case 3:
			return $author$project$Game$Problem$Course2$unit3;
		case 4:
			return $author$project$Game$Problem$Course2$unit4;
		case 5:
			return $author$project$Game$Problem$Course2$unit5;
		case 6:
			return $author$project$Game$Problem$Course2$unit6;
		case 7:
			return $author$project$Game$Problem$Course2$unit7;
		case 8:
			return $author$project$Game$Problem$Course2$unit8;
		default:
			return $author$project$Game$Problem$Course2$unit1;
	}
};
var $author$project$Game$Problem$PreAlgebra$shuffleChoices = F2(
	function (correct, wrong) {
		return A2(
			$elm$core$List$cons,
			correct,
			A2($elm$core$List$take, 3, wrong));
	});
var $author$project$Game$Problem$PreAlgebra$genAbsoluteValue = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$map,
					function (n) {
						return {
							answer: $author$project$Types$AInt(
								$elm$core$Basics$abs(n)),
							hint: {
								answer: $elm$core$String$fromInt(
									$elm$core$Basics$abs(n)),
								prompt: '|' + ($elm$core$String$fromInt(n) + '| = ?'),
								steps: _List_fromArray(
									[
										'Absolute value = distance from zero on the number line',
										'|' + ($elm$core$String$fromInt(n) + ('| = ' + $elm$core$String$fromInt(
										$elm$core$Basics$abs(n))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: '|' + ($elm$core$String$fromInt(n) + '| = ?')
						};
					},
					A2($author$project$Game$Problem$Common$randInt, -15, 15));
			case 1:
				return A2(
					$elm$random$Random$andThen,
					function (_v1) {
						var a = _v1.a;
						var b = _v1.b;
						var correct = $elm$core$Basics$abs(a) + $elm$core$Basics$abs(b);
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$PreAlgebra$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: '|' + ($elm$core$String$fromInt(a) + ('| + |' + ($elm$core$String$fromInt(b) + '| = ?'))),
										steps: _List_fromArray(
											[
												'Evaluate each absolute value first',
												'|' + ($elm$core$String$fromInt(a) + ('| = ' + ($elm$core$String$fromInt(
												$elm$core$Basics$abs(a)) + (', |' + ($elm$core$String$fromInt(b) + ('| = ' + $elm$core$String$fromInt(
												$elm$core$Basics$abs(b)))))))),
												$elm$core$String$fromInt(
												$elm$core$Basics$abs(a)) + (' + ' + ($elm$core$String$fromInt(
												$elm$core$Basics$abs(b)) + (' = ' + $elm$core$String$fromInt(correct))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: '|' + ($elm$core$String$fromInt(a) + ('| + |' + ($elm$core$String$fromInt(b) + '| = ?')))
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, -10, 10),
						A2($author$project$Game$Problem$Common$randInt, -10, 10)));
			default:
				return A2(
					$elm$random$Random$andThen,
					function (_v2) {
						var a = _v2.a;
						var b = _v2.b;
						var correct = (_Utils_cmp(
							$elm$core$Basics$abs(a),
							$elm$core$Basics$abs(b)) > 0) ? 0 : 1;
						return $elm$random$Random$constant(
							{
								answer: $author$project$Types$AChoice(correct),
								hint: {
									answer: (_Utils_cmp(
										$elm$core$Basics$abs(a),
										$elm$core$Basics$abs(b)) > 0) ? ('|' + ($elm$core$String$fromInt(a) + '|')) : ('|' + ($elm$core$String$fromInt(b) + '|')),
									prompt: 'Which is greater: |' + ($elm$core$String$fromInt(a) + ('| or |' + ($elm$core$String$fromInt(b) + '|?'))),
									steps: _List_fromArray(
										[
											'|' + ($elm$core$String$fromInt(a) + ('| = ' + ($elm$core$String$fromInt(
											$elm$core$Basics$abs(a)) + (', |' + ($elm$core$String$fromInt(b) + ('| = ' + $elm$core$String$fromInt(
											$elm$core$Basics$abs(b)))))))),
											(_Utils_cmp(
											$elm$core$Basics$abs(a),
											$elm$core$Basics$abs(b)) > 0) ? ($elm$core$String$fromInt(
											$elm$core$Basics$abs(a)) + (' > ' + ($elm$core$String$fromInt(
											$elm$core$Basics$abs(b)) + (', so |' + ($elm$core$String$fromInt(a) + '| is greater'))))) : ($elm$core$String$fromInt(
											$elm$core$Basics$abs(b)) + (' > ' + ($elm$core$String$fromInt(
											$elm$core$Basics$abs(a)) + (', so |' + ($elm$core$String$fromInt(b) + '| is greater')))))
										])
								},
								inputType: $author$project$Types$TChoice(
									_List_fromArray(
										[
											'|' + ($elm$core$String$fromInt(a) + '|'),
											'|' + ($elm$core$String$fromInt(b) + '|'),
											'They are equal',
											'Cannot determine'
										])),
								prompt: 'Which is greater: |' + ($elm$core$String$fromInt(a) + ('| or |' + ($elm$core$String$fromInt(b) + '|?')))
							});
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, -12, 12),
						A2($author$project$Game$Problem$Common$randInt, -12, 12)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$PreAlgebra$genCubeRoot = A2(
	$elm$random$Random$andThen,
	function (cube) {
		var correct = $elm$core$Basics$round(
			A2($elm$core$Basics$pow, cube, 1.0 / 3.0));
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: '∛' + ($elm$core$String$fromInt(cube) + ' = ?'),
						steps: _List_fromArray(
							[
								'Ask: what number × itself × itself = ' + ($elm$core$String$fromInt(cube) + '?'),
								$elm$core$String$fromInt(correct) + (' × ' + ($elm$core$String$fromInt(correct) + (' × ' + ($elm$core$String$fromInt(correct) + (' = ' + $elm$core$String$fromInt(cube)))))),
								'∛' + ($elm$core$String$fromInt(cube) + (' = ' + $elm$core$String$fromInt(correct)))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: '∛' + ($elm$core$String$fromInt(cube) + ' = ?')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[1, 8, 27, 64, 125, 216]),
		8));
var $author$project$Game$Problem$PreAlgebra$showFrac = F2(
	function (n, d) {
		return $elm$core$String$fromInt(n) + ('/' + $elm$core$String$fromInt(d));
	});
var $author$project$Game$Problem$PreAlgebra$genFracOps = A2(
	$elm$random$Random$andThen,
	function (op) {
		switch (op) {
			case 0:
				return A2(
					$elm$random$Random$andThen,
					function (_v1) {
						var d1 = _v1.a;
						var d2raw = _v1.b;
						var d2 = _Utils_eq(d2raw, d1) ? (d2raw + 1) : d2raw;
						return A2(
							$elm$random$Random$map,
							function (_v2) {
								var n1 = _v2.a;
								var n2 = _v2.b;
								var rn = (n1 * d2) + (n2 * d1);
								var rd = d1 * d2;
								var _v3 = A2($author$project$Game$Problem$Common$reduceFraction, rn, rd);
								var srn = _v3.a;
								var srd = _v3.b;
								return {
									answer: A2($author$project$Types$AFraction, srn, srd),
									hint: {
										answer: A2($author$project$Game$Problem$PreAlgebra$showFrac, srn, srd),
										prompt: A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' + ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + ' = ?')),
										steps: _List_fromArray(
											[
												'LCD of ' + ($elm$core$String$fromInt(d1) + (' and ' + ($elm$core$String$fromInt(d2) + (' = ' + $elm$core$String$fromInt(rd))))),
												A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' = ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n1 * d2, rd) + (', ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + (' = ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, n2 * d1, rd)))))),
												A2($author$project$Game$Problem$PreAlgebra$showFrac, n1 * d2, rd) + (' + ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2 * d1, rd) + (' = ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, rn, rd) + (' = ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, srn, srd))))))
											])
									},
									inputType: $author$project$Types$TFraction,
									prompt: A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' + ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + ' = ?'))
								};
							},
							A3(
								$elm$random$Random$map2,
								$elm$core$Tuple$pair,
								A2($author$project$Game$Problem$Common$randInt, 1, d1 - 1),
								A2($author$project$Game$Problem$Common$randInt, 1, d2 - 1)));
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 2, 6),
						A2($author$project$Game$Problem$Common$randInt, 2, 6)));
			case 1:
				return A2(
					$elm$random$Random$andThen,
					function (_v4) {
						var d1 = _v4.a;
						var d2raw = _v4.b;
						var d2 = _Utils_eq(d2raw, d1) ? (d2raw + 1) : d2raw;
						return A2(
							$elm$random$Random$map,
							function (_v5) {
								var n1 = _v5.a;
								var n2 = _v5.b;
								var rn = (n1 * d2) - (n2 * d1);
								var rd = d1 * d2;
								var _v6 = A2(
									$author$project$Game$Problem$Common$reduceFraction,
									$elm$core$Basics$abs(rn),
									rd);
								var srn = _v6.a;
								var srd = _v6.b;
								return {
									answer: A2($author$project$Types$AFraction, srn, srd),
									hint: {
										answer: A2($author$project$Game$Problem$PreAlgebra$showFrac, srn, srd),
										prompt: A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' − ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + ' = ?')),
										steps: _List_fromArray(
											[
												'LCD of ' + ($elm$core$String$fromInt(d1) + (' and ' + ($elm$core$String$fromInt(d2) + (' = ' + $elm$core$String$fromInt(rd))))),
												A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' = ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n1 * d2, rd) + (', ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + (' = ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, n2 * d1, rd)))))),
												A2($author$project$Game$Problem$PreAlgebra$showFrac, n1 * d2, rd) + (' − ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2 * d1, rd) + (' = ' + (A2(
												$author$project$Game$Problem$PreAlgebra$showFrac,
												$elm$core$Basics$abs(rn),
												rd) + (' = ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, srn, srd))))))
											])
									},
									inputType: $author$project$Types$TFraction,
									prompt: A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' − ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + ' = ?'))
								};
							},
							A3(
								$elm$random$Random$map2,
								$elm$core$Tuple$pair,
								A2($author$project$Game$Problem$Common$randInt, 2, d1),
								A2($author$project$Game$Problem$Common$randInt, 1, d2 - 1)));
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 3, 8),
						A2($author$project$Game$Problem$Common$randInt, 2, 6)));
			case 2:
				return A2(
					$elm$random$Random$map,
					function (_v7) {
						var _v8 = _v7.a;
						var n1 = _v8.a;
						var d1 = _v8.b;
						var _v9 = _v7.b;
						var n2 = _v9.a;
						var d2 = _v9.b;
						var _v10 = A2($author$project$Game$Problem$Common$reduceFraction, n1 * n2, d1 * d2);
						var rn = _v10.a;
						var rd = _v10.b;
						return {
							answer: A2($author$project$Types$AFraction, rn, rd),
							hint: {
								answer: A2($author$project$Game$Problem$PreAlgebra$showFrac, rn, rd),
								prompt: A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' × ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + ' = ?')),
								steps: _List_fromArray(
									[
										'Multiply numerators: ' + ($elm$core$String$fromInt(n1) + (' × ' + ($elm$core$String$fromInt(n2) + (' = ' + $elm$core$String$fromInt(n1 * n2))))),
										'Multiply denominators: ' + ($elm$core$String$fromInt(d1) + (' × ' + ($elm$core$String$fromInt(d2) + (' = ' + $elm$core$String$fromInt(d1 * d2))))),
										'Simplify ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n1 * n2, d1 * d2) + (' = ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, rn, rd)))
									])
							},
							inputType: $author$project$Types$TFraction,
							prompt: A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' × ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + ' = ?'))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A3(
							$elm$random$Random$map2,
							$elm$core$Tuple$pair,
							A2($author$project$Game$Problem$Common$randInt, 1, 5),
							A2($author$project$Game$Problem$Common$randInt, 2, 7)),
						A3(
							$elm$random$Random$map2,
							$elm$core$Tuple$pair,
							A2($author$project$Game$Problem$Common$randInt, 1, 5),
							A2($author$project$Game$Problem$Common$randInt, 2, 7))));
			default:
				return A2(
					$elm$random$Random$map,
					function (_v11) {
						var _v12 = _v11.a;
						var n1 = _v12.a;
						var d1 = _v12.b;
						var _v13 = _v11.b;
						var n2 = _v13.a;
						var d2 = _v13.b;
						var _v14 = A2($author$project$Game$Problem$Common$reduceFraction, n1 * d2, d1 * n2);
						var rn = _v14.a;
						var rd = _v14.b;
						return {
							answer: A2($author$project$Types$AFraction, rn, rd),
							hint: {
								answer: A2($author$project$Game$Problem$PreAlgebra$showFrac, rn, rd),
								prompt: A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' / ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + ' = ?')),
								steps: _List_fromArray(
									[
										'Multiply by the reciprocal: ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' × ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, d2, n2))),
										'= ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n1 * d2, d1 * n2) + (' = ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, rn, rd)))
									])
							},
							inputType: $author$project$Types$TFraction,
							prompt: A2($author$project$Game$Problem$PreAlgebra$showFrac, n1, d1) + (' / ' + (A2($author$project$Game$Problem$PreAlgebra$showFrac, n2, d2) + ' = ?'))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A3(
							$elm$random$Random$map2,
							$elm$core$Tuple$pair,
							A2($author$project$Game$Problem$Common$randInt, 1, 5),
							A2($author$project$Game$Problem$Common$randInt, 2, 7)),
						A3(
							$elm$random$Random$map2,
							$elm$core$Tuple$pair,
							A2($author$project$Game$Problem$Common$randInt, 1, 5),
							A2($author$project$Game$Problem$Common$randInt, 2, 7))));
		}
	},
	A2($elm$random$Random$int, 0, 3));
var $author$project$Game$Problem$PreAlgebra$superscript = function (n) {
	switch (n) {
		case 2:
			return '²';
		case 3:
			return '³';
		default:
			return '^' + $elm$core$String$fromInt(n);
	}
};
var $author$project$Game$Problem$PreAlgebra$genNegativeExponent = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$andThen,
			function (base) {
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2($author$project$Game$Problem$PreAlgebra$shuffleChoices, '1', wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: '1',
								prompt: $elm$core$String$fromInt(base) + '⁰ = ?',
								steps: _List_fromArray(
									[
										'Any non-zero number raised to the 0 power equals 1',
										$elm$core$String$fromInt(base) + '⁰ = 1'
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: $elm$core$String$fromInt(base) + '⁰ = ?'
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(1));
			},
			A2($author$project$Game$Problem$Common$randInt, 2, 20)) : A2(
			$elm$random$Random$andThen,
			function (base) {
				return A2(
					$elm$random$Random$map,
					function (expAbs) {
						var denom = A2($elm$core$Basics$pow, base, expAbs);
						var wrong = _List_fromArray(
							[
								'−' + $elm$core$String$fromInt(denom),
								$elm$core$String$fromInt(denom),
								'−1/' + $elm$core$String$fromInt(denom)
							]);
						var correct = '1/' + $elm$core$String$fromInt(denom);
						var choices = A2($author$project$Game$Problem$PreAlgebra$shuffleChoices, correct, wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: correct,
								prompt: $elm$core$String$fromInt(base) + ($author$project$Game$Problem$PreAlgebra$superscript(-expAbs) + ' = ?'),
								steps: _List_fromArray(
									[
										'Negative exponent means take the reciprocal',
										$elm$core$String$fromInt(base) + ($author$project$Game$Problem$PreAlgebra$superscript(-expAbs) + (' = 1/(' + ($elm$core$String$fromInt(base) + ($author$project$Game$Problem$PreAlgebra$superscript(expAbs) + (') = ' + correct)))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: $elm$core$String$fromInt(base) + ($author$project$Game$Problem$PreAlgebra$superscript(-expAbs) + ' = ?')
						};
					},
					A2(
						$author$project$Game$Problem$Common$randChoice,
						_List_fromArray(
							[1, 2]),
						1));
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[2, 3, 4, 5]),
				2));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$PreAlgebra$genOrderOfOps = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$andThen,
					function (_v1) {
						var a = _v1.a;
						var b = _v1.b;
						var c = _v1.c;
						var correct = a + (b * c);
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$PreAlgebra$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + ' = ?')))),
										steps: _List_fromArray(
											[
												'Multiplication before addition (PEMDAS)',
												$elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + (' = ' + ($elm$core$String$fromInt(b * c) + (', then ' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b * c) + (' = ' + $elm$core$String$fromInt(correct))))))))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + ' = ?'))))
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 8),
						A2($author$project$Game$Problem$Common$randInt, 1, 6),
						A2($author$project$Game$Problem$Common$randInt, 1, 5)));
			case 1:
				return A2(
					$elm$random$Random$andThen,
					function (_v2) {
						var a = _v2.a;
						var b = _v2.b;
						var c = _v2.c;
						var correct = (a + b) * c;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$PreAlgebra$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: '(' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (') × ' + ($elm$core$String$fromInt(c) + ' = ?'))))),
										steps: _List_fromArray(
											[
												'Parentheses first: ' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(a + b))))),
												'Then multiply: ' + ($elm$core$String$fromInt(a + b) + (' × ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt(correct)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: '(' + ($elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + (') × ' + ($elm$core$String$fromInt(c) + ' = ?')))))
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 5),
						A2($author$project$Game$Problem$Common$randInt, 2, 8),
						A2($author$project$Game$Problem$Common$randInt, 2, 4)));
			default:
				return A2(
					$elm$random$Random$andThen,
					function (r) {
						var correct = (A2($elm$core$Basics$pow, r.a, r.b) + r.c) - r.d;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var choices = A2(
									$author$project$Game$Problem$PreAlgebra$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: $elm$core$String$fromInt(r.a) + ($author$project$Game$Problem$PreAlgebra$superscript(r.b) + (' + ' + ($elm$core$String$fromInt(r.c) + (' − ' + ($elm$core$String$fromInt(r.d) + ' = ?'))))),
										steps: _List_fromArray(
											[
												'Exponent first: ' + ($elm$core$String$fromInt(r.a) + ($author$project$Game$Problem$PreAlgebra$superscript(r.b) + (' = ' + $elm$core$String$fromInt(
												A2($elm$core$Basics$pow, r.a, r.b))))),
												'Then left to right: ' + ($elm$core$String$fromInt(
												A2($elm$core$Basics$pow, r.a, r.b)) + (' + ' + ($elm$core$String$fromInt(r.c) + (' − ' + ($elm$core$String$fromInt(r.d) + (' = ' + $elm$core$String$fromInt(correct)))))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: $elm$core$String$fromInt(r.a) + ($author$project$Game$Problem$PreAlgebra$superscript(r.b) + (' + ' + ($elm$core$String$fromInt(r.c) + (' − ' + ($elm$core$String$fromInt(r.d) + ' = ?')))))
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					},
					A5(
						$elm$random$Random$map4,
						F4(
							function (a, b, c, d) {
								return {a: a, b: b, c: c, d: d};
							}),
						A2($author$project$Game$Problem$Common$randInt, 2, 5),
						A2($author$project$Game$Problem$Common$randInt, 2, 4),
						A2($author$project$Game$Problem$Common$randInt, 1, 6),
						A2($author$project$Game$Problem$Common$randInt, 1, 5)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $author$project$Game$Problem$PreAlgebra$genSciNotation = A2(
	$elm$random$Random$andThen,
	function (direction) {
		return (!direction) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var coeff = _v0.a;
				var expn = _v0.b;
				var wrong = _List_fromArray(
					[
						$elm$core$String$fromInt(coeff) + (' × 10^' + $elm$core$String$fromInt(expn + 1)),
						$elm$core$String$fromInt(coeff) + (' × 10^' + $elm$core$String$fromInt(expn - 1)),
						$elm$core$String$fromInt(coeff + 1) + (' × 10^' + $elm$core$String$fromInt(expn))
					]);
				var value = coeff * A2($elm$core$Basics$pow, 10, expn);
				var correct = $elm$core$String$fromInt(coeff) + (' × 10^' + $elm$core$String$fromInt(expn));
				var choices = A2($author$project$Game$Problem$PreAlgebra$shuffleChoices, correct, wrong);
				return $elm$random$Random$constant(
					{
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: correct,
							prompt: 'Write ' + ($elm$core$String$fromInt(value) + ' in scientific notation.'),
							steps: _List_fromArray(
								[
									'Move decimal so only one digit is before it',
									$elm$core$String$fromInt(value) + (' → ' + ($elm$core$String$fromInt(coeff) + ('.' + (A2($elm$core$String$repeat, expn, '0') + (' × 10^' + $elm$core$String$fromInt(expn)))))),
									'Answer: ' + correct
								])
						},
						inputType: $author$project$Types$TChoice(choices),
						prompt: 'Write ' + ($elm$core$String$fromInt(value) + ' in scientific notation.')
					});
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 1, 9),
				A2($author$project$Game$Problem$Common$randInt, 2, 6))) : A2(
			$elm$random$Random$map,
			function (_v1) {
				var coeff = _v1.a;
				var expn = _v1.b;
				var value = coeff * A2($elm$core$Basics$pow, 10, expn);
				return {
					answer: $author$project$Types$AInt(value),
					hint: {
						answer: $elm$core$String$fromInt(value),
						prompt: 'Evaluate: ' + ($elm$core$String$fromInt(coeff) + (' × 10^' + $elm$core$String$fromInt(expn))),
						steps: _List_fromArray(
							[
								'10^' + ($elm$core$String$fromInt(expn) + (' = ' + $elm$core$String$fromInt(
								A2($elm$core$Basics$pow, 10, expn)))),
								$elm$core$String$fromInt(coeff) + (' × ' + ($elm$core$String$fromInt(
								A2($elm$core$Basics$pow, 10, expn)) + (' = ' + $elm$core$String$fromInt(value))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Evaluate: ' + ($elm$core$String$fromInt(coeff) + (' × 10^' + $elm$core$String$fromInt(expn)))
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 1, 9),
				A2($author$project$Game$Problem$Common$randInt, 1, 4)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$PreAlgebra$genSimplifyFrac = A2(
	$elm$random$Random$andThen,
	function (g) {
		return A2(
			$elm$random$Random$map,
			function (_v0) {
				var p = _v0.a;
				var q = _v0.b;
				var n = g * p;
				var d = g * q;
				var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, n, d);
				var rn = _v1.a;
				var rd = _v1.b;
				return {
					answer: A2($author$project$Types$AFraction, rn, rd),
					hint: {
						answer: A2($author$project$Game$Problem$PreAlgebra$showFrac, rn, rd),
						prompt: 'Simplify ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, n, d),
						steps: _List_fromArray(
							[
								'GCF of ' + ($elm$core$String$fromInt(n) + (' and ' + ($elm$core$String$fromInt(d) + (' is ' + $elm$core$String$fromInt(g))))),
								'Divide both by ' + ($elm$core$String$fromInt(g) + (': ' + ($elm$core$String$fromInt(n) + ('/' + ($elm$core$String$fromInt(g) + ('=' + ($elm$core$String$fromInt(rn) + (', ' + ($elm$core$String$fromInt(d) + ('/' + ($elm$core$String$fromInt(g) + ('=' + $elm$core$String$fromInt(rd))))))))))))),
								'Answer: ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, rn, rd)
							])
					},
					inputType: $author$project$Types$TFraction,
					prompt: 'Simplify ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, n, d)
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 6),
				A2($author$project$Game$Problem$Common$randInt, 2, 6)));
	},
	A2($author$project$Game$Problem$Common$randInt, 2, 8));
var $author$project$Game$Problem$PreAlgebra$genSquareRoot = A2(
	$elm$random$Random$andThen,
	function (sq) {
		var correct = $elm$core$Basics$round(
			$elm$core$Basics$sqrt(sq));
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: '√' + ($elm$core$String$fromInt(sq) + ' = ?'),
						steps: _List_fromArray(
							[
								'Ask: what number × itself = ' + ($elm$core$String$fromInt(sq) + '?'),
								$elm$core$String$fromInt(correct) + (' × ' + ($elm$core$String$fromInt(correct) + (' = ' + $elm$core$String$fromInt(sq)))),
								'√' + ($elm$core$String$fromInt(sq) + (' = ' + $elm$core$String$fromInt(correct)))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: '√' + ($elm$core$String$fromInt(sq) + ' = ?')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144]),
		25));
var $author$project$Game$Problem$PreAlgebra$unit1 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$PreAlgebra$genAbsoluteValue;
			case 1:
				return $author$project$Game$Problem$PreAlgebra$genSimplifyFrac;
			case 2:
				return $author$project$Game$Problem$PreAlgebra$genFracOps;
			case 3:
				return $author$project$Game$Problem$PreAlgebra$genNegativeExponent;
			case 4:
				return $author$project$Game$Problem$PreAlgebra$genSquareRoot;
			case 5:
				return $author$project$Game$Problem$PreAlgebra$genCubeRoot;
			case 6:
				return $author$project$Game$Problem$PreAlgebra$genSciNotation;
			default:
				return $author$project$Game$Problem$PreAlgebra$genOrderOfOps;
		}
	},
	A2($elm$random$Random$int, 0, 7));
var $author$project$Game$Problem$PreAlgebra$genCombineLike = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = (a + b) * x;
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'If x = ' + ($elm$core$String$fromInt(x) + (', what is ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + 'x?'))))),
						steps: _List_fromArray(
							[
								'Combine like terms: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('x = ' + ($elm$core$String$fromInt(a + b) + 'x'))))),
								'Substitute: ' + ($elm$core$String$fromInt(a + b) + ('(' + ($elm$core$String$fromInt(x) + (') = ' + $elm$core$String$fromInt(correct)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'If x = ' + ($elm$core$String$fromInt(x) + (', what is ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + 'x?')))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt((a + b) * x));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$PreAlgebra$genDistributeAndCombine = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		return A2(
			$elm$random$Random$andThen,
			function (x) {
				var correct = ((a * x) + (a * b)) + c;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$PreAlgebra$shuffleChoices,
							$elm$core$String$fromInt(correct),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(correct),
								prompt: 'Simplify ' + ($elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') + ' + ($elm$core$String$fromInt(c) + (' when x = ' + $elm$core$String$fromInt(x))))))),
								steps: _List_fromArray(
									[
										'Distribute: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(a * b) + (' + ' + $elm$core$String$fromInt(c))))),
										'Combine constants: ' + ($elm$core$String$fromInt(a) + ('x + ' + $elm$core$String$fromInt((a * b) + c))),
										'x=' + ($elm$core$String$fromInt(x) + (': ' + ($elm$core$String$fromInt(a * x) + (' + ' + ($elm$core$String$fromInt((a * b) + c) + (' = ' + $elm$core$String$fromInt(correct)))))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Simplify ' + ($elm$core$String$fromInt(a) + ('(x + ' + ($elm$core$String$fromInt(b) + (') + ' + ($elm$core$String$fromInt(c) + (' when x = ' + $elm$core$String$fromInt(x)))))))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(correct));
			},
			A2($author$project$Game$Problem$Common$randInt, 1, 5));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$PreAlgebra$genFactorLinear = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var g = _v0.a;
		var k = _v0.b;
		var b = g * (k + 1);
		var a = g * k;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					$elm$core$String$fromInt(g) + ('(x + ' + ($elm$core$String$fromInt(k + 1) + ')')),
					_List_fromArray(
						[
							$elm$core$String$fromInt(g) + ('(x + ' + ($elm$core$String$fromInt(k) + ')')),
							$elm$core$String$fromInt(g + 1) + ('(x + ' + ($elm$core$String$fromInt(k) + ')')),
							$elm$core$String$fromInt(g - 1) + ('(x + ' + ($elm$core$String$fromInt(k + 1) + ')'))
						]));
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(g) + ('(x + ' + ($elm$core$String$fromInt(k + 1) + ')')),
						prompt: 'Factor: ' + ($elm$core$String$fromInt(a) + ('x + ' + $elm$core$String$fromInt(b))),
						steps: _List_fromArray(
							[
								'Find GCF of ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(b) + (': GCF = ' + $elm$core$String$fromInt(g))))),
								'Divide each term by ' + ($elm$core$String$fromInt(g) + (': ' + ($elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt(g) + ('=' + ($elm$core$String$fromInt(k) + (', ' + ($elm$core$String$fromInt(b) + ('/' + ($elm$core$String$fromInt(g) + ('=' + $elm$core$String$fromInt(k + 1))))))))))))),
								'Factored: ' + ($elm$core$String$fromInt(g) + ('(x + ' + ($elm$core$String$fromInt(k + 1) + ')')))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Factor: ' + ($elm$core$String$fromInt(a) + ('x + ' + $elm$core$String$fromInt(b)))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(g));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $author$project$Game$Problem$PreAlgebra$genMonomialOps = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$andThen,
					function (r) {
						var expn = r.m + r.n;
						var coeff = r.a * r.b;
						var correct = $elm$core$String$fromInt(coeff) + ('x^' + $elm$core$String$fromInt(expn));
						var wrong = _List_fromArray(
							[
								$elm$core$String$fromInt(coeff) + ('x^' + $elm$core$String$fromInt(expn + 1)),
								$elm$core$String$fromInt(coeff + 1) + ('x^' + $elm$core$String$fromInt(expn)),
								$elm$core$String$fromInt(coeff) + ('x^' + $elm$core$String$fromInt(expn - 1))
							]);
						var choices = A2($author$project$Game$Problem$PreAlgebra$shuffleChoices, correct, wrong);
						return $elm$random$Random$constant(
							{
								answer: $author$project$Types$AChoice(0),
								hint: {
									answer: correct,
									prompt: $elm$core$String$fromInt(r.a) + ('x^' + ($elm$core$String$fromInt(r.m) + (' × ' + ($elm$core$String$fromInt(r.b) + ('x^' + ($elm$core$String$fromInt(r.n) + ' = ?')))))),
									steps: _List_fromArray(
										[
											'Multiply coefficients: ' + ($elm$core$String$fromInt(r.a) + (' × ' + ($elm$core$String$fromInt(r.b) + (' = ' + $elm$core$String$fromInt(coeff))))),
											'Add exponents: x^' + ($elm$core$String$fromInt(r.m) + (' × x^' + ($elm$core$String$fromInt(r.n) + (' = x^' + $elm$core$String$fromInt(expn))))),
											'Answer: ' + correct
										])
								},
								inputType: $author$project$Types$TChoice(choices),
								prompt: $elm$core$String$fromInt(r.a) + ('x^' + ($elm$core$String$fromInt(r.m) + (' × ' + ($elm$core$String$fromInt(r.b) + ('x^' + ($elm$core$String$fromInt(r.n) + ' = ?'))))))
							});
					},
					A5(
						$elm$random$Random$map4,
						F4(
							function (a, b, m, n) {
								return {a: a, b: b, m: m, n: n};
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 5),
						A2($author$project$Game$Problem$Common$randInt, 1, 5),
						A2($author$project$Game$Problem$Common$randInt, 1, 3),
						A2($author$project$Game$Problem$Common$randInt, 1, 3)));
			case 1:
				return A2(
					$elm$random$Random$andThen,
					function (r) {
						return A2(
							$elm$random$Random$andThen,
							function (m) {
								var expn = m - r.n;
								var wrong = _List_fromArray(
									[
										$elm$core$String$fromInt(r.q) + ('x^' + $elm$core$String$fromInt(expn + 1)),
										$elm$core$String$fromInt(r.q + 1) + ('x^' + $elm$core$String$fromInt(expn)),
										$elm$core$String$fromInt(r.q) + ('x^' + $elm$core$String$fromInt(expn - 1))
									]);
								var correct = $elm$core$String$fromInt(r.q) + ('x^' + $elm$core$String$fromInt(expn));
								var choices = A2($author$project$Game$Problem$PreAlgebra$shuffleChoices, correct, wrong);
								var a = r.b * r.q;
								return $elm$random$Random$constant(
									{
										answer: $author$project$Types$AChoice(0),
										hint: {
											answer: correct,
											prompt: $elm$core$String$fromInt(a) + ('x^' + ($elm$core$String$fromInt(m) + (' / ' + ($elm$core$String$fromInt(r.b) + ('x^' + ($elm$core$String$fromInt(r.n) + ' = ?')))))),
											steps: _List_fromArray(
												[
													'Divide coefficients: ' + ($elm$core$String$fromInt(a) + (' / ' + ($elm$core$String$fromInt(r.b) + (' = ' + $elm$core$String$fromInt(r.q))))),
													'Subtract exponents: x^' + ($elm$core$String$fromInt(m) + (' / x^' + ($elm$core$String$fromInt(r.n) + (' = x^' + $elm$core$String$fromInt(expn))))),
													'Answer: ' + correct
												])
										},
										inputType: $author$project$Types$TChoice(choices),
										prompt: $elm$core$String$fromInt(a) + ('x^' + ($elm$core$String$fromInt(m) + (' / ' + ($elm$core$String$fromInt(r.b) + ('x^' + ($elm$core$String$fromInt(r.n) + ' = ?'))))))
									});
							},
							A2($author$project$Game$Problem$Common$randInt, r.n + 1, r.n + 3));
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (b, q, n) {
								return {b: b, n: n, q: q};
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 4),
						A2($author$project$Game$Problem$Common$randInt, 1, 4),
						A2($author$project$Game$Problem$Common$randInt, 1, 2)));
			default:
				return A2(
					$elm$random$Random$andThen,
					function (_v1) {
						var a = _v1.a;
						var m = _v1.b;
						var n = _v1.c;
						var expn = m * n;
						var coeff = A2($elm$core$Basics$pow, a, n);
						var correct = $elm$core$String$fromInt(coeff) + ('x^' + $elm$core$String$fromInt(expn));
						var wrong = _List_fromArray(
							[
								$elm$core$String$fromInt(coeff) + ('x^' + $elm$core$String$fromInt(expn + 1)),
								$elm$core$String$fromInt(coeff + 1) + ('x^' + $elm$core$String$fromInt(expn)),
								$elm$core$String$fromInt(a) + ('x^' + $elm$core$String$fromInt(expn))
							]);
						var choices = A2($author$project$Game$Problem$PreAlgebra$shuffleChoices, correct, wrong);
						return $elm$random$Random$constant(
							{
								answer: $author$project$Types$AChoice(0),
								hint: {
									answer: correct,
									prompt: '(' + ($elm$core$String$fromInt(a) + ('x^' + ($elm$core$String$fromInt(m) + (')^' + ($elm$core$String$fromInt(n) + ' = ?'))))),
									steps: _List_fromArray(
										[
											'Raise coefficient to power: ' + ($elm$core$String$fromInt(a) + ($author$project$Game$Problem$PreAlgebra$superscript(n) + (' = ' + $elm$core$String$fromInt(coeff)))),
											'Multiply exponents: ' + ($elm$core$String$fromInt(m) + (' × ' + ($elm$core$String$fromInt(n) + (' = ' + $elm$core$String$fromInt(expn))))),
											'Answer: ' + correct
										])
								},
								inputType: $author$project$Types$TChoice(choices),
								prompt: '(' + ($elm$core$String$fromInt(a) + ('x^' + ($elm$core$String$fromInt(m) + (')^' + ($elm$core$String$fromInt(n) + ' = ?')))))
							});
					},
					A4(
						$elm$random$Random$map3,
						F3(
							function (a, m, n) {
								return _Utils_Tuple3(a, m, n);
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 4),
						A2($author$project$Game$Problem$Common$randInt, 1, 3),
						A2($author$project$Game$Problem$Common$randInt, 2, 3)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$PreAlgebra$genPolyAddSub = A2(
	$elm$random$Random$andThen,
	function (op) {
		return A2(
			$elm$random$Random$andThen,
			function (r) {
				var opStr = (!op) ? '+' : '−';
				var _v0 = (!op) ? _Utils_Tuple2(r.a + r.c, r.b + r.d) : _Utils_Tuple2(r.a - r.c, r.b - r.d);
				var xCoeff = _v0.a;
				var con = _v0.b;
				var correct = $elm$core$String$fromInt(xCoeff) + ('x + ' + $elm$core$String$fromInt(con));
				var wrong = _List_fromArray(
					[
						$elm$core$String$fromInt(xCoeff + 1) + ('x + ' + $elm$core$String$fromInt(con)),
						$elm$core$String$fromInt(xCoeff) + ('x + ' + $elm$core$String$fromInt(con + 1)),
						$elm$core$String$fromInt(xCoeff) + ('x − ' + $elm$core$String$fromInt(con))
					]);
				var choices = A2($author$project$Game$Problem$PreAlgebra$shuffleChoices, correct, wrong);
				return $elm$random$Random$constant(
					{
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: correct,
							prompt: '(' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (') ' + (opStr + (' (' + ($elm$core$String$fromInt(r.c) + ('x + ' + ($elm$core$String$fromInt(r.d) + ') = ?'))))))))),
							steps: _List_fromArray(
								[
									'Combine x terms: ' + ($elm$core$String$fromInt(r.a) + ('x ' + (opStr + (' ' + ($elm$core$String$fromInt(r.c) + ('x = ' + ($elm$core$String$fromInt(xCoeff) + 'x'))))))),
									'Combine constants: ' + ($elm$core$String$fromInt(r.b) + (' ' + (opStr + (' ' + ($elm$core$String$fromInt(r.d) + (' = ' + $elm$core$String$fromInt(con))))))),
									'Answer: ' + correct
								])
						},
						inputType: $author$project$Types$TChoice(choices),
						prompt: '(' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (') ' + (opStr + (' (' + ($elm$core$String$fromInt(r.c) + ('x + ' + ($elm$core$String$fromInt(r.d) + ') = ?')))))))))
					});
			},
			A5(
				$elm$random$Random$map4,
				F4(
					function (a, b, c, d) {
						return {a: a, b: b, c: c, d: d};
					}),
				A2($author$project$Game$Problem$Common$randInt, 1, 6),
				A2($author$project$Game$Problem$Common$randInt, 1, 9),
				A2($author$project$Game$Problem$Common$randInt, 1, 6),
				A2($author$project$Game$Problem$Common$randInt, 1, 9)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$PreAlgebra$genTranslateExpr = A2(
	$elm$random$Random$map,
	function (t) {
		switch (t) {
			case 0:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'n + 5',
						prompt: '\"5 more than n\" means?',
						steps: _List_fromArray(
							['\"More than\" means add', 'n + 5'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['n + 5', '5 − n', '5n', 'n − 5'])),
					prompt: 'Translate: \"5 more than a number n\"'
				};
			case 1:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: '3n − 4',
						prompt: '\"3 times n, decreased by 4\"',
						steps: _List_fromArray(
							['3 times n = 3n', 'decreased by 4 = subtract 4', '3n − 4'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['3n − 4', '3n + 4', '3(n − 4)', '4 − 3n'])),
					prompt: 'Translate: \"3 times a number n, decreased by 4\"'
				};
			case 2:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'n/6',
						prompt: '\"quotient of n and 6\"',
						steps: _List_fromArray(
							['Quotient means divide', 'n divided by 6 = n/6'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['n/6', '6/n', '6n', 'n − 6'])),
					prompt: 'Translate: \"the quotient of n and 6\"'
				};
			default:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: '2(n + 7)',
						prompt: '\"twice the sum of n and 7\"',
						steps: _List_fromArray(
							['Sum of n and 7 = (n + 7)', 'Twice = multiply by 2', '2(n + 7)'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['2(n + 7)', '2n + 7', '2n × 7', 'n + 14'])),
					prompt: 'Translate: \"twice the sum of a number n and 7\"'
				};
		}
	},
	A2($elm$random$Random$int, 0, 3));
var $author$project$Game$Problem$PreAlgebra$unit2 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$PreAlgebra$genTranslateExpr;
			case 1:
				return $author$project$Game$Problem$PreAlgebra$genCombineLike;
			case 2:
				return $author$project$Game$Problem$PreAlgebra$genDistributeAndCombine;
			case 3:
				return $author$project$Game$Problem$PreAlgebra$genFactorLinear;
			case 4:
				return $author$project$Game$Problem$PreAlgebra$genMonomialOps;
			default:
				return $author$project$Game$Problem$PreAlgebra$genPolyAddSub;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Game$Problem$PreAlgebra$genEqWithFractions = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var x = (b * c) - a;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: 'Solve: (x + ' + ($elm$core$String$fromInt(a) + (')/' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(c))))),
				steps: _List_fromArray(
					[
						'Multiply both sides by ' + ($elm$core$String$fromInt(b) + (': x + ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(b * c))))),
						'Subtract ' + ($elm$core$String$fromInt(a) + (': x = ' + $elm$core$String$fromInt(x)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: (x + ' + ($elm$core$String$fromInt(a) + (')/' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(c)))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$PreAlgebra$genMultiStepEq = A2(
	$elm$random$Random$map,
	function (r) {
		var rhs = (r.a * (r.x + r.b)) + r.c;
		return {
			answer: $author$project$Types$AInt(r.x),
			hint: {
				answer: $elm$core$String$fromInt(r.x),
				prompt: 'Solve: ' + ($elm$core$String$fromInt(r.a) + ('(x + ' + ($elm$core$String$fromInt(r.b) + (') + ' + ($elm$core$String$fromInt(r.c) + (' = ' + $elm$core$String$fromInt(rhs))))))),
				steps: _List_fromArray(
					[
						'Distribute: ' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.a * r.b) + (' + ' + ($elm$core$String$fromInt(r.c) + (' = ' + $elm$core$String$fromInt(rhs))))))),
						'Combine: ' + ($elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt((r.a * r.b) + r.c) + (' = ' + $elm$core$String$fromInt(rhs))))),
						'Subtract ' + ($elm$core$String$fromInt((r.a * r.b) + r.c) + (': ' + ($elm$core$String$fromInt(r.a) + ('x = ' + $elm$core$String$fromInt(r.a * r.x))))),
						'Divide by ' + ($elm$core$String$fromInt(r.a) + (': x = ' + $elm$core$String$fromInt(r.x)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: ' + ($elm$core$String$fromInt(r.a) + ('(x + ' + ($elm$core$String$fromInt(r.b) + (') + ' + ($elm$core$String$fromInt(r.c) + (' = ' + $elm$core$String$fromInt(rhs)))))))
		};
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, x) {
				return {a: a, b: b, c: c, x: x};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$PreAlgebra$genOneStepEq = A2(
	$elm$random$Random$andThen,
	function (op) {
		return (!op) ? A2(
			$elm$random$Random$map,
			function (_v0) {
				var a = _v0.a;
				var x = _v0.b;
				return {
					answer: $author$project$Types$AInt(x),
					hint: {
						answer: $elm$core$String$fromInt(x),
						prompt: 'Solve: x + ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(a + x))),
						steps: _List_fromArray(
							[
								'Subtract ' + ($elm$core$String$fromInt(a) + ' from both sides'),
								'x = ' + ($elm$core$String$fromInt(a + x) + (' − ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x)))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Solve: x + ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(a + x)))
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 1, 15),
				A2($author$project$Game$Problem$Common$randInt, 1, 20))) : A2(
			$elm$random$Random$map,
			function (_v1) {
				var a = _v1.a;
				var x = _v1.b;
				return {
					answer: $author$project$Types$AInt(x),
					hint: {
						answer: $elm$core$String$fromInt(x),
						prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(a * x))),
						steps: _List_fromArray(
							[
								'Divide both sides by ' + $elm$core$String$fromInt(a),
								'x = ' + ($elm$core$String$fromInt(a * x) + (' / ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x)))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(a * x)))
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randIntNonZero, 2, 9),
				A2($author$project$Game$Problem$Common$randInt, 1, 12)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$PreAlgebra$genRationalEq = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = a * b;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: 'Solve: x/' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(b))),
				steps: _List_fromArray(
					[
						'Multiply both sides by ' + $elm$core$String$fromInt(a),
						'x = ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: x/' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(b)))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 10)));
var $author$project$Game$Problem$PreAlgebra$genSolveBySquareRoot = A2(
	$elm$random$Random$map,
	function (n) {
		var x = $elm$core$Basics$round(
			$elm$core$Basics$sqrt(n));
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: 'Solve: x² = ' + ($elm$core$String$fromInt(n) + '  (give the positive solution)'),
				steps: _List_fromArray(
					[
						'Take the square root of both sides',
						'x = √' + ($elm$core$String$fromInt(n) + (' = ' + ($elm$core$String$fromInt(x) + '  (positive root)')))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: x² = ' + ($elm$core$String$fromInt(n) + '  (give the positive solution)')
		};
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]),
		25));
var $author$project$Game$Problem$PreAlgebra$genTwoStepEq = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt((a * x) + b))))),
				steps: _List_fromArray(
					[
						'Subtract ' + ($elm$core$String$fromInt(b) + (' from both sides: ' + ($elm$core$String$fromInt(a) + ('x = ' + $elm$core$String$fromInt(a * x))))),
						'Divide both sides by ' + ($elm$core$String$fromInt(a) + (': x = ' + $elm$core$String$fromInt(x)))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt((a * x) + b)))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 10),
		A2($author$project$Game$Problem$Common$randInt, 1, 10)));
var $author$project$Game$Problem$PreAlgebra$genTwoStepInequality = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		return A2(
			$elm$random$Random$map,
			function (dirN) {
				var rhs = (a * x) + b;
				var dirStr = (!dirN) ? '>' : '<';
				var dir = (!dirN) ? $author$project$Types$IGt : $author$project$Types$ILt;
				return {
					answer: A2($author$project$Types$AInequality, dir, x),
					hint: {
						answer: 'x ' + (dirStr + (' ' + $elm$core$String$fromInt(x))),
						prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' ' + (dirStr + (' ' + $elm$core$String$fromInt(rhs))))))),
						steps: _List_fromArray(
							[
								'Subtract ' + ($elm$core$String$fromInt(b) + (' from both sides: ' + ($elm$core$String$fromInt(a) + ('x ' + (dirStr + (' ' + $elm$core$String$fromInt(a * x))))))),
								'Divide both sides by ' + ($elm$core$String$fromInt(a) + (': x ' + (dirStr + (' ' + $elm$core$String$fromInt(x)))))
							])
					},
					inputType: $author$project$Types$TInequality,
					prompt: 'Solve: ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + (' ' + (dirStr + (' ' + $elm$core$String$fromInt(rhs)))))))
				};
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 10)));
var $author$project$Game$Problem$PreAlgebra$unit3 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$PreAlgebra$genOneStepEq;
			case 1:
				return $author$project$Game$Problem$PreAlgebra$genRationalEq;
			case 2:
				return $author$project$Game$Problem$PreAlgebra$genTwoStepEq;
			case 3:
				return $author$project$Game$Problem$PreAlgebra$genSolveBySquareRoot;
			case 4:
				return $author$project$Game$Problem$PreAlgebra$genMultiStepEq;
			case 5:
				return $author$project$Game$Problem$PreAlgebra$genEqWithFractions;
			default:
				return $author$project$Game$Problem$PreAlgebra$genTwoStepInequality;
		}
	},
	A2($elm$random$Random$int, 0, 6));
var $author$project$Game$Problem$PreAlgebra$genPercentChange = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var original = _v0.a;
		var pct = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (dir) {
				var dirStr = (!dir) ? 'increased' : 'decreased';
				var change = ((original * pct) / 100) | 0;
				var newVal = (!dir) ? (original + change) : (original - change);
				return {
					answer: $author$project$Types$AInt(newVal),
					hint: {
						answer: '$' + $elm$core$String$fromInt(newVal),
						prompt: 'A price of $' + ($elm$core$String$fromInt(original) + (' is ' + (dirStr + (' by ' + ($elm$core$String$fromInt(pct) + '%. New price?'))))),
						steps: _List_fromArray(
							[
								'Find the change: ' + ($elm$core$String$fromInt(pct) + ('% of ' + ($elm$core$String$fromInt(original) + (' = ' + $elm$core$String$fromInt(change))))),
								((!dir) ? 'Add to original: ' : 'Subtract from original: ') + ($elm$core$String$fromInt(original) + (((!dir) ? ' + ' : ' − ') + ($elm$core$String$fromInt(change) + (' = ' + $elm$core$String$fromInt(newVal)))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'A price of $' + ($elm$core$String$fromInt(original) + (' is ' + (dirStr + (' by ' + ($elm$core$String$fromInt(pct) + '%. New price?')))))
				};
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 10, 90),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[10, 20, 25, 50]),
			25)));
var $author$project$Game$Problem$PreAlgebra$genPercentProportion = A2(
	$elm$random$Random$andThen,
	function (pct) {
		return A2(
			$elm$random$Random$map,
			function (whole) {
				var correct = ((pct * whole) / 100) | 0;
				return {
					answer: $author$project$Types$AInt(correct),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'What is ' + ($elm$core$String$fromInt(pct) + ('% of ' + ($elm$core$String$fromInt(whole) + '?'))),
						steps: _List_fromArray(
							[
								'Percent proportion: part/whole = percent/100',
								'part/' + ($elm$core$String$fromInt(whole) + (' = ' + ($elm$core$String$fromInt(pct) + '/100'))),
								'part = ' + ($elm$core$String$fromInt(whole) + (' × ' + ($elm$core$String$fromInt(pct) + ('/100 = ' + $elm$core$String$fromInt(correct)))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'What is ' + ($elm$core$String$fromInt(pct) + ('% of ' + ($elm$core$String$fromInt(whole) + '?')))
				};
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					[20, 40, 50, 60, 80, 100, 120, 200]),
				100));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[10, 20, 25, 40, 50, 75]),
		25));
var $author$project$Game$Problem$PreAlgebra$genRatio = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, a, b);
		var ra = _v1.a;
		var rb = _v1.b;
		var correct = $elm$core$String$fromInt(ra) + (':' + $elm$core$String$fromInt(rb));
		var wrong = _List_fromArray(
			[
				$elm$core$String$fromInt(a) + (':' + $elm$core$String$fromInt(b)),
				$elm$core$String$fromInt(rb) + (':' + $elm$core$String$fromInt(ra)),
				$elm$core$String$fromInt(ra + 1) + (':' + $elm$core$String$fromInt(rb))
			]);
		var choices = A2($author$project$Game$Problem$PreAlgebra$shuffleChoices, correct, wrong);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Simplify the ratio ' + ($elm$core$String$fromInt(a) + (':' + $elm$core$String$fromInt(b))),
					steps: _List_fromArray(
						[
							'GCF of ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(b) + (' is ' + $elm$core$String$fromInt((a / ra) | 0))))),
							$elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt((a / ra) | 0) + (' = ' + ($elm$core$String$fromInt(ra) + (', ' + ($elm$core$String$fromInt(b) + ('/' + ($elm$core$String$fromInt((b / rb) | 0) + (' = ' + $elm$core$String$fromInt(rb)))))))))),
							'Simplified: ' + correct
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Simplify the ratio ' + ($elm$core$String$fromInt(a) + (':' + $elm$core$String$fromInt(b)))
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 10),
		A2($author$project$Game$Problem$Common$randInt, 2, 10)));
var $author$project$Game$Problem$PreAlgebra$genSimilarFigures = A2(
	$elm$random$Random$map,
	function (_v0) {
		var side = _v0.a;
		var scale = _v0.b;
		var missing = side * scale;
		return {
			answer: $author$project$Types$AInt(missing),
			hint: {
				answer: $elm$core$String$fromInt(missing),
				prompt: 'Two similar triangles. Smaller triangle has a side of ' + ($elm$core$String$fromInt(side) + (' cm. The scale factor is ' + ($elm$core$String$fromInt(scale) + ':1. Find the corresponding side of the larger triangle.'))),
				steps: _List_fromArray(
					[
						'Multiply the smaller side by the scale factor',
						$elm$core$String$fromInt(side) + (' × ' + ($elm$core$String$fromInt(scale) + (' = ' + $elm$core$String$fromInt(missing))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Two similar triangles. Smaller triangle has a side of ' + ($elm$core$String$fromInt(side) + (' cm. The scale factor is ' + ($elm$core$String$fromInt(scale) + ':1. Find the corresponding side of the larger triangle.')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 5)));
var $author$project$Game$Problem$PreAlgebra$genSimpleInterest = A2(
	$elm$random$Random$map,
	function (_v0) {
		var p = _v0.a;
		var r = _v0.b;
		var t = _v0.c;
		var interest = (((p * r) * t) / 100) | 0;
		return {
			answer: $author$project$Types$AInt(interest),
			hint: {
				answer: '$' + $elm$core$String$fromInt(interest),
				prompt: 'Simple interest: Principal = $' + ($elm$core$String$fromInt(p) + (', Rate = ' + ($elm$core$String$fromInt(r) + ('% per year, Time = ' + ($elm$core$String$fromInt(t) + ' years. Find the interest.'))))),
				steps: _List_fromArray(
					[
						'I = P × r × t',
						'I = ' + ($elm$core$String$fromInt(p) + (' × 0.0' + ($elm$core$String$fromInt(r) + (' × ' + ($elm$core$String$fromInt(t) + (' = ' + $elm$core$String$fromInt(interest)))))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Simple interest: Principal = $' + ($elm$core$String$fromInt(p) + (', Rate = ' + ($elm$core$String$fromInt(r) + ('% per year, Time = ' + ($elm$core$String$fromInt(t) + ' years. Find the interest.')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (p, r, t) {
				return _Utils_Tuple3(p, r, t);
			}),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[100, 200, 500, 1000]),
			200),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[2, 4, 5, 10]),
			5),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$PreAlgebra$genSolveProportion = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var k = _v0.b;
		var c = a + 2;
		var x = c * k;
		var b = a * k;
		return {
			answer: $author$project$Types$AInt(x),
			hint: {
				answer: $elm$core$String$fromInt(x),
				prompt: $elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(c) + '/x')))),
				steps: _List_fromArray(
					[
						'Cross multiply: ' + ($elm$core$String$fromInt(a) + ('x = ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(c) + (' = ' + $elm$core$String$fromInt(b * c))))))),
						'Divide: x = ' + ($elm$core$String$fromInt(b * c) + (' / ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(x)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: $elm$core$String$fromInt(a) + ('/' + ($elm$core$String$fromInt(b) + (' = ' + ($elm$core$String$fromInt(c) + '/x'))))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$PreAlgebra$genUnitRate = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var units = _v0.a;
		var rate = _v0.b;
		var total = units * rate;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					$elm$core$String$fromInt(rate),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: '$' + $elm$core$String$fromInt(rate),
						prompt: $elm$core$String$fromInt(units) + (' items cost $' + ($elm$core$String$fromInt(total) + '. What is the cost per item?')),
						steps: _List_fromArray(
							[
								'Unit rate = total cost / number of items',
								'$' + ($elm$core$String$fromInt(total) + (' / ' + ($elm$core$String$fromInt(units) + (' = $' + $elm$core$String$fromInt(rate)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: $elm$core$String$fromInt(units) + (' items cost $' + ($elm$core$String$fromInt(total) + '. What is the cost per item?'))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(rate));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $author$project$Game$Problem$PreAlgebra$unit4 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$PreAlgebra$genRatio;
			case 1:
				return $author$project$Game$Problem$PreAlgebra$genUnitRate;
			case 2:
				return $author$project$Game$Problem$PreAlgebra$genSolveProportion;
			case 3:
				return $author$project$Game$Problem$PreAlgebra$genSimilarFigures;
			case 4:
				return $author$project$Game$Problem$PreAlgebra$genPercentProportion;
			case 5:
				return $author$project$Game$Problem$PreAlgebra$genPercentChange;
			default:
				return $author$project$Game$Problem$PreAlgebra$genSimpleInterest;
		}
	},
	A2($elm$random$Random$int, 0, 6));
var $author$project$Game$Problem$PreAlgebra$genDirectVariation = A2(
	$elm$random$Random$map,
	function (_v0) {
		var k = _v0.a;
		var x1 = _v0.b;
		var x2 = _v0.c;
		var y2 = k * x2;
		var y1 = k * x1;
		return {
			answer: $author$project$Types$AInt(y2),
			hint: {
				answer: $elm$core$String$fromInt(y2),
				prompt: 'y varies directly with x. When x = ' + ($elm$core$String$fromInt(x1) + (', y = ' + ($elm$core$String$fromInt(y1) + ('. Find y when x = ' + ($elm$core$String$fromInt(x2) + '.'))))),
				steps: _List_fromArray(
					[
						'Find k: k = y/x = ' + ($elm$core$String$fromInt(y1) + ('/' + ($elm$core$String$fromInt(x1) + (' = ' + $elm$core$String$fromInt(k))))),
						'y = ' + ($elm$core$String$fromInt(k) + (' × ' + ($elm$core$String$fromInt(x2) + (' = ' + $elm$core$String$fromInt(y2)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'y varies directly with x. When x = ' + ($elm$core$String$fromInt(x1) + (', y = ' + ($elm$core$String$fromInt(y1) + ('. Find y when x = ' + ($elm$core$String$fromInt(x2) + '.')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (k, x1, x2) {
				return _Utils_Tuple3(k, x1, x2);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$PreAlgebra$genDomainRange = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$map,
			function (isFn) {
				var _v0 = (!isFn) ? _Utils_Tuple2('{(1,2), (3,4), (5,6)}', 'Yes') : _Utils_Tuple2('{(1,2), (1,4), (3,6)}', 'No');
				var pairs = _v0.a;
				var correct = _v0.b;
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					correct,
					_List_fromArray(
						[
							(correct === 'Yes') ? 'No' : 'Yes',
							'Sometimes',
							'Cannot determine'
						]));
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: correct,
						prompt: 'Is ' + (pairs + ' a function?'),
						steps: _List_fromArray(
							[
								'A function has exactly one output for each input',
								(!isFn) ? 'Each x-value appears only once, so it is a function' : 'x=1 maps to two different y-values, so it is not a function'
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Is ' + (pairs + ' a function?')
				};
			},
			A2($elm$random$Random$int, 0, 1)) : A2(
			$elm$random$Random$andThen,
			function (xs) {
				return A2(
					$elm$random$Random$andThen,
					function (ys) {
						return A2(
							$elm$random$Random$map,
							function (drChoice) {
								var yMin = A2(
									$elm$core$Maybe$withDefault,
									0,
									$elm$core$List$minimum(ys));
								var yMax = A2(
									$elm$core$Maybe$withDefault,
									0,
									$elm$core$List$maximum(ys));
								var xMin = A2(
									$elm$core$Maybe$withDefault,
									0,
									$elm$core$List$minimum(xs));
								var xMax = A2(
									$elm$core$Maybe$withDefault,
									0,
									$elm$core$List$maximum(xs));
								var pairs = A3(
									$elm$core$List$map2,
									F2(
										function (x, y) {
											return '(' + ($elm$core$String$fromInt(x) + (',' + ($elm$core$String$fromInt(y) + ')')));
										}),
									xs,
									ys);
								var pairStr = '{' + (A2($elm$core$String$join, ', ', pairs) + '}');
								return (!drChoice) ? {
									answer: $author$project$Types$AInt(xMin),
									hint: {
										answer: $elm$core$String$fromInt(xMin),
										prompt: 'For ' + (pairStr + ', what is the minimum value of the domain?'),
										steps: _List_fromArray(
											[
												'Domain = set of all x-values (inputs)',
												'x-values: ' + (A2(
												$elm$core$String$join,
												', ',
												A2($elm$core$List$map, $elm$core$String$fromInt, xs)) + (' → minimum is ' + $elm$core$String$fromInt(xMin)))
											])
									},
									inputType: $author$project$Types$TInteger,
									prompt: 'For ' + (pairStr + ', what is the minimum value of the domain?')
								} : {
									answer: $author$project$Types$AInt(yMin),
									hint: {
										answer: $elm$core$String$fromInt(yMin),
										prompt: 'For ' + (pairStr + ', what is the minimum value of the range?'),
										steps: _List_fromArray(
											[
												'Range = set of all y-values (outputs)',
												'y-values: ' + (A2(
												$elm$core$String$join,
												', ',
												A2($elm$core$List$map, $elm$core$String$fromInt, ys)) + (' → minimum is ' + $elm$core$String$fromInt(yMin)))
											])
									},
									inputType: $author$project$Types$TInteger,
									prompt: 'For ' + (pairStr + ', what is the minimum value of the range?')
								};
							},
							A2($elm$random$Random$int, 0, 1));
					},
					A5(
						$elm$random$Random$map4,
						F4(
							function (a, b, c, d) {
								return _List_fromArray(
									[a, b, c, d]);
							}),
						A2($author$project$Game$Problem$Common$randInt, 1, 8),
						A2($author$project$Game$Problem$Common$randInt, 1, 8),
						A2($author$project$Game$Problem$Common$randInt, 1, 8),
						A2($author$project$Game$Problem$Common$randInt, 1, 8)));
			},
			A5(
				$elm$random$Random$map4,
				F4(
					function (a, b, c, d) {
						return $elm$core$List$sort(
							_List_fromArray(
								[a, b, c, d]));
					}),
				A2($author$project$Game$Problem$Common$randInt, 1, 8),
				A2($author$project$Game$Problem$Common$randInt, 1, 8),
				A2($author$project$Game$Problem$Common$randInt, 1, 8),
				A2($author$project$Game$Problem$Common$randInt, 1, 8)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$PreAlgebra$genIdentifySlope = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var m = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$andThen,
			function (ask) {
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var correct = (!ask) ? m : b;
						var choices = A2(
							$author$project$Game$Problem$PreAlgebra$shuffleChoices,
							$elm$core$String$fromInt(correct),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(correct),
								prompt: 'y = ' + ($elm$core$String$fromInt(m) + ('x + ' + ($elm$core$String$fromInt(b) + ('. What is the ' + (((!ask) ? 'slope' : 'y-intercept') + '?'))))),
								steps: _List_fromArray(
									[
										'In y = mx + b, m is the slope and b is the y-intercept',
										_Utils_ap(
										(!ask) ? 'Slope = m = ' : 'y-intercept = b = ',
										$elm$core$String$fromInt(correct))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'y = ' + ($elm$core$String$fromInt(m) + ('x + ' + ($elm$core$String$fromInt(b) + ('. What is the ' + (((!ask) ? 'slope' : 'y-intercept') + '?')))))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(
						(!ask) ? m : b));
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randIntNonZero, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, -8, 8)));
var $author$project$Game$Problem$PreAlgebra$genSlopeFormula = A2(
	$elm$random$Random$andThen,
	function (r) {
		return A2(
			$elm$random$Random$map,
			function (dx) {
				var y2 = r.y1 + (r.m * dx);
				var x2 = r.x1 + dx;
				return {
					answer: $author$project$Types$AInt(r.m),
					hint: {
						answer: $elm$core$String$fromInt(r.m),
						prompt: 'Use the slope formula: points (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(r.y1) + (') and (' + ($elm$core$String$fromInt(x2) + (', ' + ($elm$core$String$fromInt(y2) + ')'))))))),
						steps: _List_fromArray(
							[
								'm = (y₂ − y₁)/(x₂ − x₁)',
								'm = (' + ($elm$core$String$fromInt(y2) + (' − ' + ($elm$core$String$fromInt(r.y1) + (')/(' + ($elm$core$String$fromInt(x2) + (' − ' + ($elm$core$String$fromInt(r.x1) + (') = ' + ($elm$core$String$fromInt(y2 - r.y1) + ('/' + ($elm$core$String$fromInt(dx) + (' = ' + $elm$core$String$fromInt(r.m)))))))))))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Use the slope formula: points (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(r.y1) + (') and (' + ($elm$core$String$fromInt(x2) + (', ' + ($elm$core$String$fromInt(y2) + ')')))))))
				};
			},
			A2($author$project$Game$Problem$Common$randInt, 1, 3));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (m, x1, y1) {
				return {m: m, x1: x1, y1: y1};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, -4, 4),
		A2($author$project$Game$Problem$Common$randInt, -4, 4)));
var $author$project$Game$Problem$PreAlgebra$genSlopeFromPoints = A2(
	$elm$random$Random$andThen,
	function (r) {
		var y2 = r.y1 + (r.m * r.dx);
		var x2 = r.x1 + r.dx;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					$elm$core$String$fromInt(r.m),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(r.m),
						prompt: 'Find the slope through (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(r.y1) + (') and (' + ($elm$core$String$fromInt(x2) + (', ' + ($elm$core$String$fromInt(y2) + ')'))))))),
						steps: _List_fromArray(
							[
								'slope = (y₂ − y₁)/(x₂ − x₁)',
								'(' + ($elm$core$String$fromInt(y2) + (' − ' + ($elm$core$String$fromInt(r.y1) + (')/(' + ($elm$core$String$fromInt(x2) + (' − ' + ($elm$core$String$fromInt(r.x1) + (') = ' + ($elm$core$String$fromInt(y2 - r.y1) + ('/' + ($elm$core$String$fromInt(x2 - r.x1) + (' = ' + $elm$core$String$fromInt(r.m)))))))))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Find the slope through (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(r.y1) + (') and (' + ($elm$core$String$fromInt(x2) + (', ' + ($elm$core$String$fromInt(y2) + ')')))))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(r.m));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (m, x1, y1, dx) {
				return {dx: dx, m: m, x1: x1, y1: y1};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, -4, 4),
		A2($author$project$Game$Problem$Common$randInt, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 4)));
var $author$project$Game$Problem$PreAlgebra$genSlopeIntercept = A2(
	$elm$random$Random$map,
	function (_v0) {
		var m = _v0.a;
		var b = _v0.b;
		var x0 = _v0.c;
		var y = (m * x0) + b;
		return {
			answer: $author$project$Types$AInt(y),
			hint: {
				answer: $elm$core$String$fromInt(y),
				prompt: 'y = ' + ($elm$core$String$fromInt(m) + ('x + ' + ($elm$core$String$fromInt(b) + ('. Find y when x = ' + ($elm$core$String$fromInt(x0) + '.'))))),
				steps: _List_fromArray(
					[
						'Substitute x = ' + ($elm$core$String$fromInt(x0) + (': y = ' + ($elm$core$String$fromInt(m) + ('(' + ($elm$core$String$fromInt(x0) + (') + ' + $elm$core$String$fromInt(b))))))),
						'y = ' + ($elm$core$String$fromInt(m * x0) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(y)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'y = ' + ($elm$core$String$fromInt(m) + ('x + ' + ($elm$core$String$fromInt(b) + ('. Find y when x = ' + ($elm$core$String$fromInt(x0) + '.')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (m, b, x0) {
				return _Utils_Tuple3(m, b, x0);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, -4, 4),
		A2($author$project$Game$Problem$Common$randInt, -6, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$PreAlgebra$genWriteLinearEq = A2(
	$elm$random$Random$andThen,
	function (r) {
		var y2 = (r.m * r.x2) + r.b;
		var y1 = (r.m * r.x1) + r.b;
		var slopeStr = $elm$core$String$fromInt(r.m);
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2($author$project$Game$Problem$PreAlgebra$shuffleChoices, slopeStr, wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: slopeStr,
						prompt: 'A line passes through (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(y1) + (') and (' + ($elm$core$String$fromInt(r.x2) + (', ' + ($elm$core$String$fromInt(y2) + '). What is the slope?'))))))),
						steps: _List_fromArray(
							[
								'm = (' + ($elm$core$String$fromInt(y2) + (' − ' + ($elm$core$String$fromInt(y1) + (')/(' + ($elm$core$String$fromInt(r.x2) + (' − ' + ($elm$core$String$fromInt(r.x1) + (') = ' + ($elm$core$String$fromInt(y2 - y1) + ('/' + ($elm$core$String$fromInt(r.x2 - r.x1) + (' = ' + slopeStr))))))))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'A line passes through (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(y1) + (') and (' + ($elm$core$String$fromInt(r.x2) + (', ' + ($elm$core$String$fromInt(y2) + '). What is the slope?')))))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(r.m));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (m, b, x1, x2) {
				return {b: b, m: m, x1: x1, x2: x2};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, -3, 3),
		A2($author$project$Game$Problem$Common$randInt, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, 0, 3),
		A2($author$project$Game$Problem$Common$randInt, 4, 7)));
var $author$project$Game$Problem$PreAlgebra$unit5 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$PreAlgebra$genDomainRange;
			case 1:
				return $author$project$Game$Problem$PreAlgebra$genSlopeFromPoints;
			case 2:
				return $author$project$Game$Problem$PreAlgebra$genSlopeFormula;
			case 3:
				return $author$project$Game$Problem$PreAlgebra$genSlopeIntercept;
			case 4:
				return $author$project$Game$Problem$PreAlgebra$genWriteLinearEq;
			case 5:
				return $author$project$Game$Problem$PreAlgebra$genDirectVariation;
			default:
				return $author$project$Game$Problem$PreAlgebra$genIdentifySlope;
		}
	},
	A2($elm$random$Random$int, 0, 6));
var $author$project$Game$Problem$PreAlgebra$genSystemApp = A2(
	$elm$random$Random$map,
	function (_v0) {
		var y = _v0.a;
		var x = _v0.b;
		var s = x + y;
		var d = y - x;
		return {
			answer: A2($author$project$Types$ASystem, x, y),
			hint: {
				answer: 'x=' + ($elm$core$String$fromInt(x) + (', y=' + $elm$core$String$fromInt(y))),
				prompt: 'Sum=' + ($elm$core$String$fromInt(s) + (', difference=' + ($elm$core$String$fromInt(d) + ('. x+y=' + ($elm$core$String$fromInt(s) + (', y-x=' + $elm$core$String$fromInt(d))))))),
				steps: _List_fromArray(
					[
						'Add equations: 2y = ' + ($elm$core$String$fromInt(s + d) + ('  →  y = ' + $elm$core$String$fromInt(y))),
						'Substitute: x + ' + ($elm$core$String$fromInt(y) + (' = ' + ($elm$core$String$fromInt(s) + ('  →  x = ' + $elm$core$String$fromInt(x)))))
					])
			},
			inputType: $author$project$Types$TSystem,
			prompt: 'Two numbers have a sum of ' + ($elm$core$String$fromInt(s) + (' and a difference of ' + ($elm$core$String$fromInt(d) + ('.\nLet x = smaller, y = larger.\nSolve the system:\nx + y = ' + ($elm$core$String$fromInt(s) + ('\ny − x = ' + ($elm$core$String$fromInt(d) + '\n\nEnter x:')))))))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$PreAlgebra$genSystemElimination = A2(
	$elm$random$Random$map,
	function (_v0) {
		var x = _v0.a;
		var y = _v0.b;
		var eq2rhs = x + y;
		var eq1rhs = (2 * x) + y;
		return {
			answer: A2($author$project$Types$ASystem, x, y),
			hint: {
				answer: 'x=' + ($elm$core$String$fromInt(x) + (', y=' + $elm$core$String$fromInt(y))),
				prompt: '2x + y = ' + ($elm$core$String$fromInt(eq1rhs) + (', x + y = ' + $elm$core$String$fromInt(eq2rhs))),
				steps: _List_fromArray(
					[
						'Subtract equation 2 from equation 1',
						'(2x+y) − (x+y) = ' + ($elm$core$String$fromInt(eq1rhs) + ('−' + ($elm$core$String$fromInt(eq2rhs) + ('  →  x = ' + $elm$core$String$fromInt(x))))),
						'Substitute: ' + ($elm$core$String$fromInt(x) + (' + y = ' + ($elm$core$String$fromInt(eq2rhs) + ('  →  y = ' + $elm$core$String$fromInt(y)))))
					])
			},
			inputType: $author$project$Types$TSystem,
			prompt: 'Solve by elimination:\n2x + y = ' + ($elm$core$String$fromInt(eq1rhs) + ('\nx + y = ' + ($elm$core$String$fromInt(eq2rhs) + '\n\nEnter x:')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$PreAlgebra$showSigned = function (n) {
	return (n < 0) ? ('(' + ($elm$core$String$fromInt(n) + ')')) : $elm$core$String$fromInt(n);
};
var $author$project$Game$Problem$PreAlgebra$genSystemSubstitution = A2(
	$elm$random$Random$map,
	function (_v0) {
		var x = _v0.a;
		var y = _v0.b;
		var s = x + y;
		var d = x - y;
		var dStr = (d >= 0) ? $elm$core$String$fromInt(d) : $author$project$Game$Problem$PreAlgebra$showSigned(d);
		return {
			answer: A2($author$project$Types$ASystem, x, y),
			hint: {
				answer: 'x=' + ($elm$core$String$fromInt(x) + (', y=' + $elm$core$String$fromInt(y))),
				prompt: 'x + y = ' + ($elm$core$String$fromInt(s) + (', x − y = ' + dStr)),
				steps: _List_fromArray(
					[
						'From equation 2: x = y + ' + dStr,
						'Substitute into equation 1: (y + ' + (dStr + (') + y = ' + $elm$core$String$fromInt(s))),
						'2y + ' + (dStr + (' = ' + ($elm$core$String$fromInt(s) + ('  →  y = ' + $elm$core$String$fromInt(y))))),
						'x = ' + ($elm$core$String$fromInt(y) + (' + ' + (dStr + (' = ' + $elm$core$String$fromInt(x)))))
					])
			},
			inputType: $author$project$Types$TSystem,
			prompt: 'Solve by substitution:\nx + y = ' + ($elm$core$String$fromInt(s) + ('\nx − y = ' + (dStr + '\n\nEnter x:')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$PreAlgebra$unit6 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$PreAlgebra$genSystemSubstitution;
			case 1:
				return $author$project$Game$Problem$PreAlgebra$genSystemElimination;
			default:
				return $author$project$Game$Problem$PreAlgebra$genSystemApp;
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$PreAlgebra$genAngleRelationships = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$map,
			function (a) {
				var b = 90 - a;
				return {
					answer: $author$project$Types$AInt(b),
					hint: {
						answer: $elm$core$String$fromInt(b) + '°',
						prompt: 'Two angles are complementary. One measures ' + ($elm$core$String$fromInt(a) + '°. Find the other.'),
						steps: _List_fromArray(
							[
								'Complementary angles add to 90°',
								'90 − ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(b)))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Two angles are complementary. One measures ' + ($elm$core$String$fromInt(a) + '°. Find the other.')
				};
			},
			A2($author$project$Game$Problem$Common$randInt, 10, 79)) : A2(
			$elm$random$Random$map,
			function (a) {
				var b = 180 - a;
				return {
					answer: $author$project$Types$AInt(b),
					hint: {
						answer: $elm$core$String$fromInt(b) + '°',
						prompt: 'Two angles are supplementary. One measures ' + ($elm$core$String$fromInt(a) + '°. Find the other.'),
						steps: _List_fromArray(
							[
								'Supplementary angles add to 180°',
								'180 − ' + ($elm$core$String$fromInt(a) + (' = ' + $elm$core$String$fromInt(b)))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Two angles are supplementary. One measures ' + ($elm$core$String$fromInt(a) + '°. Find the other.')
				};
			},
			A2($author$project$Game$Problem$Common$randInt, 10, 169));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$PreAlgebra$genAngleTypes = A2(
	$elm$random$Random$andThen,
	function (deg) {
		var correct = (deg < 90) ? 'Acute' : ((deg === 90) ? 'Right' : ((deg < 180) ? 'Obtuse' : 'Straight'));
		var wrongList = A2(
			$elm$core$List$filter,
			function (s) {
				return !_Utils_eq(s, correct);
			},
			_List_fromArray(
				['Acute', 'Right', 'Obtuse', 'Straight']));
		var choices = A2(
			$author$project$Game$Problem$PreAlgebra$shuffleChoices,
			correct,
			A2($elm$core$List$take, 3, wrongList));
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Classify a ' + ($elm$core$String$fromInt(deg) + '° angle.'),
					steps: _List_fromArray(
						[
							'Acute: less than 90°',
							'Right: exactly 90°',
							'Obtuse: between 90° and 180°',
							'Straight: exactly 180°',
							$elm$core$String$fromInt(deg) + ('° is ' + correct)
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Classify a ' + ($elm$core$String$fromInt(deg) + '° angle.')
			});
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[30, 45, 60, 90, 120, 145, 180]),
		90));
var $author$project$Game$Problem$PreAlgebra$genDilation = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var x = _v0.a;
		var y = _v0.b;
		var k = _v0.c;
		return A2(
			$elm$random$Random$map,
			function (coord) {
				return (!coord) ? {
					answer: $author$project$Types$AInt(k * x),
					hint: {
						answer: $elm$core$String$fromInt(k * x),
						prompt: 'Dilate (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + (') with scale factor ' + ($elm$core$String$fromInt(k) + '. New x-coordinate?'))))),
						steps: _List_fromArray(
							[
								'Multiply x by scale factor',
								'x: ' + ($elm$core$String$fromInt(x) + (' × ' + ($elm$core$String$fromInt(k) + (' = ' + $elm$core$String$fromInt(k * x)))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Dilate (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + (') with scale factor ' + ($elm$core$String$fromInt(k) + '. New x-coordinate?')))))
				} : {
					answer: $author$project$Types$AInt(k * y),
					hint: {
						answer: $elm$core$String$fromInt(k * y),
						prompt: 'Dilate (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + (') with scale factor ' + ($elm$core$String$fromInt(k) + '. New y-coordinate?'))))),
						steps: _List_fromArray(
							[
								'Multiply y by scale factor',
								'y: ' + ($elm$core$String$fromInt(y) + (' × ' + ($elm$core$String$fromInt(k) + (' = ' + $elm$core$String$fromInt(k * y)))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Dilate (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + (') with scale factor ' + ($elm$core$String$fromInt(k) + '. New y-coordinate?')))))
				};
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (x, y, k) {
				return _Utils_Tuple3(x, y, k);
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, -6, 6),
		A2($author$project$Game$Problem$Common$randIntNonZero, -6, 6),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 4)));
var $author$project$Game$Problem$PreAlgebra$genInteriorAngles = A2(
	$elm$random$Random$andThen,
	function (n) {
		var correct = (n - 2) * 180;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct) + '°',
						prompt: 'What is the sum of interior angles of a polygon with ' + ($elm$core$String$fromInt(n) + ' sides?'),
						steps: _List_fromArray(
							[
								'Formula: (n − 2) × 180°',
								'(' + ($elm$core$String$fromInt(n) + (' − 2) × 180 = ' + ($elm$core$String$fromInt(n - 2) + (' × 180 = ' + $elm$core$String$fromInt(correct)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'What is the sum of interior angles of a polygon with ' + ($elm$core$String$fromInt(n) + ' sides?')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[3, 4, 5, 6, 8]),
		4));
var $author$project$Game$Problem$PreAlgebra$genPythagorean = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		return A2(
			$elm$random$Random$map,
			function (missing) {
				return (!missing) ? {
					answer: $author$project$Types$AInt(c),
					hint: {
						answer: $elm$core$String$fromInt(c),
						prompt: 'Right triangle: legs ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(b) + '. Find the hypotenuse.'))),
						steps: _List_fromArray(
							[
								'a² + b² = c²',
								$elm$core$String$fromInt(a) + ('² + ' + ($elm$core$String$fromInt(b) + ('² = ' + ($elm$core$String$fromInt(a * a) + (' + ' + ($elm$core$String$fromInt(b * b) + (' = ' + $elm$core$String$fromInt((a * a) + (b * b))))))))),
								'c = √' + ($elm$core$String$fromInt((a * a) + (b * b)) + (' = ' + $elm$core$String$fromInt(c)))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Right triangle: legs ' + ($elm$core$String$fromInt(a) + (' and ' + ($elm$core$String$fromInt(b) + '. Find the hypotenuse.')))
				} : {
					answer: $author$project$Types$AInt(b),
					hint: {
						answer: $elm$core$String$fromInt(b),
						prompt: 'Right triangle: one leg ' + ($elm$core$String$fromInt(a) + (', hypotenuse ' + ($elm$core$String$fromInt(c) + '. Find the other leg.'))),
						steps: _List_fromArray(
							[
								'a² + b² = c²',
								$elm$core$String$fromInt(a) + ('² + b² = ' + ($elm$core$String$fromInt(c) + '²')),
								$elm$core$String$fromInt(a * a) + (' + b² = ' + ($elm$core$String$fromInt(c * c) + ('  →  b² = ' + ($elm$core$String$fromInt((c * c) - (a * a)) + ('  →  b = ' + $elm$core$String$fromInt(b))))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Right triangle: one leg ' + ($elm$core$String$fromInt(a) + (', hypotenuse ' + ($elm$core$String$fromInt(c) + '. Find the other leg.')))
				};
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[
				_Utils_Tuple3(3, 4, 5),
				_Utils_Tuple3(5, 12, 13),
				_Utils_Tuple3(6, 8, 10),
				_Utils_Tuple3(8, 15, 17)
			]),
		_Utils_Tuple3(3, 4, 5)));
var $author$project$Game$Problem$PreAlgebra$genTransformation = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var x = _v0.a;
				var y = _v0.b;
				var reflY = -y;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$PreAlgebra$shuffleChoices,
							$elm$core$String$fromInt(reflY),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(reflY),
								prompt: 'Point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ') reflected over the x-axis. What is the new y-coordinate?'))),
								steps: _List_fromArray(
									[
										'Reflection over x-axis: (x, y) → (x, −y)',
										'y = ' + ($elm$core$String$fromInt(y) + (' becomes −(' + ($elm$core$String$fromInt(y) + (') = ' + $elm$core$String$fromInt(reflY)))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Point (' + ($elm$core$String$fromInt(x) + (', ' + ($elm$core$String$fromInt(y) + ') reflected over the x-axis. What is the new y-coordinate?')))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(reflY));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, -6, 6),
				A2($author$project$Game$Problem$Common$randIntNonZero, -6, 6))) : A2(
			$elm$random$Random$andThen,
			function (r) {
				return A2(
					$elm$random$Random$map,
					function (coord) {
						return (!coord) ? {
							answer: $author$project$Types$AInt(r.x + r.dx),
							hint: {
								answer: $elm$core$String$fromInt(r.x + r.dx),
								prompt: 'Translate (' + ($elm$core$String$fromInt(r.x) + (', ' + ($elm$core$String$fromInt(r.y) + (') by (' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dx) + (', ' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dy) + '). New x-coordinate?'))))))),
								steps: _List_fromArray(
									[
										'Add dx to x: ' + ($elm$core$String$fromInt(r.x) + (' + ' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dx) + (' = ' + $elm$core$String$fromInt(r.x + r.dx)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Translate (' + ($elm$core$String$fromInt(r.x) + (', ' + ($elm$core$String$fromInt(r.y) + (') by (' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dx) + (', ' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dy) + '). New x-coordinate?')))))))
						} : {
							answer: $author$project$Types$AInt(r.y + r.dy),
							hint: {
								answer: $elm$core$String$fromInt(r.y + r.dy),
								prompt: 'Translate (' + ($elm$core$String$fromInt(r.x) + (', ' + ($elm$core$String$fromInt(r.y) + (') by (' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dx) + (', ' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dy) + '). New y-coordinate?'))))))),
								steps: _List_fromArray(
									[
										'Add dy to y: ' + ($elm$core$String$fromInt(r.y) + (' + ' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dy) + (' = ' + $elm$core$String$fromInt(r.y + r.dy)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Translate (' + ($elm$core$String$fromInt(r.x) + (', ' + ($elm$core$String$fromInt(r.y) + (') by (' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dx) + (', ' + ($author$project$Game$Problem$PreAlgebra$showSigned(r.dy) + '). New y-coordinate?')))))))
						};
					},
					A2($elm$random$Random$int, 0, 1));
			},
			A5(
				$elm$random$Random$map4,
				F4(
					function (x, y, dx, dy) {
						return {dx: dx, dy: dy, x: x, y: y};
					}),
				A2($author$project$Game$Problem$Common$randInt, -5, 5),
				A2($author$project$Game$Problem$Common$randInt, -5, 5),
				A2($author$project$Game$Problem$Common$randIntNonZero, -4, 4),
				A2($author$project$Game$Problem$Common$randIntNonZero, -4, 4)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$PreAlgebra$genTriangleSum = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = (180 - a) - b;
		return (c <= 0) ? {
			answer: $author$project$Types$AInt(50),
			hint: {
				answer: '50°',
				prompt: 'A triangle has angles 60° and 70°. Find the third angle.',
				steps: _List_fromArray(
					['Sum of angles in a triangle = 180°', '180 − 60 − 70 = 50'])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'A triangle has angles 60° and 70°. Find the third angle.'
		} : {
			answer: $author$project$Types$AInt(c),
			hint: {
				answer: $elm$core$String$fromInt(c) + '°',
				prompt: 'A triangle has angles ' + ($elm$core$String$fromInt(a) + ('° and ' + ($elm$core$String$fromInt(b) + '°. Find the third angle.'))),
				steps: _List_fromArray(
					[
						'Triangle angle sum = 180°',
						'180 − ' + ($elm$core$String$fromInt(a) + (' − ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(c)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'A triangle has angles ' + ($elm$core$String$fromInt(a) + ('° and ' + ($elm$core$String$fromInt(b) + '°. Find the third angle.')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 30, 80),
		A2($author$project$Game$Problem$Common$randInt, 30, 80)));
var $author$project$Game$Problem$PreAlgebra$unit7 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$PreAlgebra$genAngleTypes;
			case 1:
				return $author$project$Game$Problem$PreAlgebra$genAngleRelationships;
			case 2:
				return $author$project$Game$Problem$PreAlgebra$genTriangleSum;
			case 3:
				return $author$project$Game$Problem$PreAlgebra$genPythagorean;
			case 4:
				return $author$project$Game$Problem$PreAlgebra$genInteriorAngles;
			case 5:
				return $author$project$Game$Problem$PreAlgebra$genTransformation;
			default:
				return $author$project$Game$Problem$PreAlgebra$genDilation;
		}
	},
	A2($elm$random$Random$int, 0, 6));
var $author$project$Game$Problem$PreAlgebra$genAreaPerimeter = A2(
	$elm$random$Random$andThen,
	function (shape) {
		return (!shape) ? A2(
			$elm$random$Random$map,
			function (_v0) {
				var w = _v0.a;
				var h = _v0.b;
				return {
					answer: $author$project$Types$AInt(w * h),
					hint: {
						answer: $elm$core$String$fromInt(w * h),
						prompt: 'Area of rectangle: width = ' + ($elm$core$String$fromInt(w) + (', height = ' + ($elm$core$String$fromInt(h) + '?'))),
						steps: _List_fromArray(
							[
								'A = l × w',
								$elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt(w * h))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Area of rectangle: width = ' + ($elm$core$String$fromInt(w) + (', height = ' + ($elm$core$String$fromInt(h) + '?')))
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 15),
				A2($author$project$Game$Problem$Common$randInt, 2, 15))) : A2(
			$elm$random$Random$map,
			function (_v1) {
				var h = _v1.a;
				var bHalf = _v1.b;
				var b = bHalf * 2;
				return {
					answer: $author$project$Types$AInt(((b * h) / 2) | 0),
					hint: {
						answer: $elm$core$String$fromInt(((b * h) / 2) | 0),
						prompt: 'Area of triangle: base = ' + ($elm$core$String$fromInt(b) + (', height = ' + ($elm$core$String$fromInt(h) + '?'))),
						steps: _List_fromArray(
							[
								'A = ½ × b × h',
								'½ × ' + ($elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt(((b * h) / 2) | 0)))))
							])
					},
					inputType: $author$project$Types$TInteger,
					prompt: 'Area of triangle: base = ' + ($elm$core$String$fromInt(b) + (', height = ' + ($elm$core$String$fromInt(h) + '?')))
				};
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 1, 8),
				A2($author$project$Game$Problem$Common$randInt, 1, 8)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$PreAlgebra$genCircleArea = A2(
	$elm$random$Random$andThen,
	function (r) {
		return A2(
			$elm$random$Random$map,
			function (which) {
				if (!which) {
					var correct = $elm$core$Basics$round((3.14 * r) * r);
					return {
						answer: $author$project$Types$AInt(correct),
						hint: {
							answer: $elm$core$String$fromInt(correct),
							prompt: 'Area of circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)'),
							steps: _List_fromArray(
								[
									'A = πr²',
									'3.14 × ' + ($elm$core$String$fromInt(r) + ('² = 3.14 × ' + ($elm$core$String$fromInt(r * r) + (' ≈ ' + $elm$core$String$fromInt(correct)))))
								])
						},
						inputType: $author$project$Types$TInteger,
						prompt: 'Area of circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)')
					};
				} else {
					var correctF = (2.0 * 3.14) * r;
					return {
						answer: A2($author$project$Types$AFloat, correctF, 0.5),
						hint: {
							answer: $elm$core$String$fromFloat(correctF),
							prompt: 'Circumference of circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)'),
							steps: _List_fromArray(
								[
									'C = 2πr',
									'2 × 3.14 × ' + ($elm$core$String$fromInt(r) + (' = ' + $elm$core$String$fromFloat(correctF)))
								])
						},
						inputType: $author$project$Types$TDecimal,
						prompt: 'Circumference of circle with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14)')
					};
				}
			},
			A2($elm$random$Random$int, 0, 1));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[2, 3, 4, 5, 6, 7]),
		5));
var $author$project$Game$Problem$PreAlgebra$genCompositeArea = A2(
	$elm$random$Random$map,
	function (_v0) {
		var w = _v0.a;
		var h1 = _v0.b;
		var h2 = _v0.c;
		var triArea = ((w * h2) / 2) | 0;
		var rectArea = w * h1;
		var total = rectArea + triArea;
		return {
			answer: $author$project$Types$AInt(total),
			hint: {
				answer: $elm$core$String$fromInt(total),
				prompt: 'A composite figure has a rectangle (width=' + ($elm$core$String$fromInt(w) + (', height=' + ($elm$core$String$fromInt(h1) + (') with a triangle on top (same base, height=' + ($elm$core$String$fromInt(h2) + '). Total area?'))))),
				steps: _List_fromArray(
					[
						'Rectangle area: ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h1) + (' = ' + $elm$core$String$fromInt(rectArea))))),
						'Triangle area: ½ × ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h2) + (' = ' + $elm$core$String$fromInt(triArea))))),
						'Total: ' + ($elm$core$String$fromInt(rectArea) + (' + ' + ($elm$core$String$fromInt(triArea) + (' = ' + $elm$core$String$fromInt(total)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'A composite figure has a rectangle (width=' + ($elm$core$String$fromInt(w) + (', height=' + ($elm$core$String$fromInt(h1) + (') with a triangle on top (same base, height=' + ($elm$core$String$fromInt(h2) + '). Total area?')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (w, h1, h2) {
				return _Utils_Tuple3(w, h1, h2);
			}),
		A2($author$project$Game$Problem$Common$randInt, 4, 10),
		A2($author$project$Game$Problem$Common$randInt, 3, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$PreAlgebra$genSphereVolume = A2(
	$elm$random$Random$map,
	function (r) {
		var correctF = ((4.0 / 3.0) * 3.14) * A2($elm$core$Basics$pow, r, 3);
		return {
			answer: $author$project$Types$AInt(
				$elm$core$Basics$round(correctF)),
			hint: {
				answer: $elm$core$String$fromInt(
					$elm$core$Basics$round(correctF)),
				prompt: 'Volume of sphere with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14, round to nearest whole)'),
				steps: _List_fromArray(
					[
						'V = (4/3)πr³',
						'(4/3) × 3.14 × ' + ($elm$core$String$fromInt((r * r) * r) + (' ≈ ' + $elm$core$String$fromInt(
						$elm$core$Basics$round(correctF))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Volume of sphere with radius ' + ($elm$core$String$fromInt(r) + '? (use π≈3.14, round to nearest whole)')
		};
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[2, 3, 4]),
		3));
var $author$project$Game$Problem$PreAlgebra$genSurfaceAreaPrism = A2(
	$elm$random$Random$map,
	function (_v0) {
		var l = _v0.a;
		var w = _v0.b;
		var h = _v0.c;
		var sa = 2 * (((l * w) + (l * h)) + (w * h));
		return {
			answer: $author$project$Types$AInt(sa),
			hint: {
				answer: $elm$core$String$fromInt(sa),
				prompt: 'Surface area of rectangular prism: ' + ($elm$core$String$fromInt(l) + (' × ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + '?'))))),
				steps: _List_fromArray(
					[
						'SA = 2(lw + lh + wh)',
						'2(' + ($elm$core$String$fromInt(l * w) + (' + ' + ($elm$core$String$fromInt(l * h) + (' + ' + ($elm$core$String$fromInt(w * h) + (') = 2(' + ($elm$core$String$fromInt(((l * w) + (l * h)) + (w * h)) + (') = ' + $elm$core$String$fromInt(sa)))))))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Surface area of rectangular prism: ' + ($elm$core$String$fromInt(l) + (' × ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + '?')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (l, w, h) {
				return _Utils_Tuple3(l, w, h);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8)));
var $author$project$Game$Problem$PreAlgebra$genVolumeCone = A2(
	$elm$random$Random$map,
	function (_v0) {
		var r = _v0.a;
		var h = _v0.b;
		var correctF = ((((1.0 / 3.0) * 3.14) * r) * r) * h;
		return {
			answer: $author$project$Types$AInt(
				$elm$core$Basics$round(correctF)),
			hint: {
				answer: $elm$core$String$fromInt(
					$elm$core$Basics$round(correctF)),
				prompt: 'Volume of cone: radius = ' + ($elm$core$String$fromInt(r) + (', height = ' + ($elm$core$String$fromInt(h) + '? (use π≈3.14, round to nearest whole)'))),
				steps: _List_fromArray(
					[
						'V = (1/3)πr²h',
						'(1/3) × 3.14 × ' + ($elm$core$String$fromInt(r * r) + (' × ' + ($elm$core$String$fromInt(h) + (' ≈ ' + $elm$core$String$fromInt(
						$elm$core$Basics$round(correctF))))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Volume of cone: radius = ' + ($elm$core$String$fromInt(r) + (', height = ' + ($elm$core$String$fromInt(h) + '? (use π≈3.14, round to nearest whole)')))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[2, 3, 4, 6]),
			3),
		A2($author$project$Game$Problem$Common$randInt, 5, 12)));
var $author$project$Game$Problem$PreAlgebra$genVolumePrism = A2(
	$elm$random$Random$map,
	function (_v0) {
		var l = _v0.a;
		var w = _v0.b;
		var h = _v0.c;
		return {
			answer: $author$project$Types$AInt((l * w) * h),
			hint: {
				answer: $elm$core$String$fromInt((l * w) * h),
				prompt: 'Volume of rectangular prism: ' + ($elm$core$String$fromInt(l) + (' × ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + '?'))))),
				steps: _List_fromArray(
					[
						'V = l × w × h',
						$elm$core$String$fromInt(l) + (' × ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt((l * w) * h))))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Volume of rectangular prism: ' + ($elm$core$String$fromInt(l) + (' × ' + ($elm$core$String$fromInt(w) + (' × ' + ($elm$core$String$fromInt(h) + '?')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (l, w, h) {
				return _Utils_Tuple3(l, w, h);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 10),
		A2($author$project$Game$Problem$Common$randInt, 2, 10),
		A2($author$project$Game$Problem$Common$randInt, 2, 10)));
var $author$project$Game$Problem$PreAlgebra$unit8 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$PreAlgebra$genAreaPerimeter;
			case 1:
				return $author$project$Game$Problem$PreAlgebra$genCircleArea;
			case 2:
				return $author$project$Game$Problem$PreAlgebra$genCompositeArea;
			case 3:
				return $author$project$Game$Problem$PreAlgebra$genVolumePrism;
			case 4:
				return $author$project$Game$Problem$PreAlgebra$genVolumeCone;
			case 5:
				return $author$project$Game$Problem$PreAlgebra$genSurfaceAreaPrism;
			default:
				return $author$project$Game$Problem$PreAlgebra$genSphereVolume;
		}
	},
	A2($elm$random$Random$int, 0, 6));
var $author$project$Game$Problem$PreAlgebra$genCompoundProbability = A2(
	$elm$random$Random$andThen,
	function (t) {
		return (!t) ? $elm$random$Random$constant(
			{
				answer: A2($author$project$Types$AFraction, 1, 4),
				hint: {
					answer: '1/4',
					prompt: 'P(H,H) for two flips?',
					steps: _List_fromArray(
						['P(H) = 1/2 each flip', 'Independent: P(H,H) = 1/2 × 1/2 = 1/4'])
				},
				inputType: $author$project$Types$TFraction,
				prompt: 'A fair coin is flipped twice. What is the probability of getting heads both times?'
			}) : $elm$random$Random$constant(
			{
				answer: A2($author$project$Types$AFraction, 1, 2),
				hint: {
					answer: '1/2',
					prompt: 'P(even) on a 6-sided die?',
					steps: _List_fromArray(
						['Even numbers on a die: 2, 4, 6 → 3 favorable', 'Total outcomes: 6', 'P = 3/6 = 1/2'])
				},
				inputType: $author$project$Types$TFraction,
				prompt: 'A fair die is rolled. What is the probability of rolling an even number?'
			});
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$PreAlgebra$genCountingOutcomes = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var choices1 = _v0.a;
		var choices2 = _v0.b;
		var total = choices1 * choices2;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					$elm$core$String$fromInt(total),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(total),
						prompt: 'A menu has ' + ($elm$core$String$fromInt(choices1) + (' entrees and ' + ($elm$core$String$fromInt(choices2) + ' sides. How many different meals are possible?'))),
						steps: _List_fromArray(
							[
								'Counting Principle: multiply the number of choices',
								$elm$core$String$fromInt(choices1) + (' × ' + ($elm$core$String$fromInt(choices2) + (' = ' + $elm$core$String$fromInt(total))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'A menu has ' + ($elm$core$String$fromInt(choices1) + (' entrees and ' + ($elm$core$String$fromInt(choices2) + ' sides. How many different meals (1 entree + 1 side) are possible?')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(total));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 2, 5)));
var $author$project$Game$Problem$PreAlgebra$genMAD = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var nums = _v0.a;
		var mean = _v0.b;
		var mad = _v0.c;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var numStr = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$map, $elm$core$String$fromInt, nums));
				var choices = A2(
					$author$project$Game$Problem$PreAlgebra$shuffleChoices,
					$elm$core$String$fromInt(mad),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(mad),
						prompt: 'Find the mean absolute deviation (MAD) of {' + (numStr + '}.'),
						steps: _List_fromArray(
							[
								'Mean = (' + (A2(
								$elm$core$String$join,
								'+',
								A2($elm$core$List$map, $elm$core$String$fromInt, nums)) + (')/' + ($elm$core$String$fromInt(
								$elm$core$List$length(nums)) + (' = ' + $elm$core$String$fromInt(mean))))),
								'Deviations from mean: ' + A2(
								$elm$core$String$join,
								', ',
								A2(
									$elm$core$List$map,
									function (x) {
										return '|' + ($elm$core$String$fromInt(x) + ('−' + ($elm$core$String$fromInt(mean) + ('|=' + $elm$core$String$fromInt(
											$elm$core$Basics$abs(x - mean))))));
									},
									nums)),
								'MAD = ' + $elm$core$String$fromInt(mad)
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Find the mean absolute deviation (MAD) of {' + (numStr + '}.')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(mad));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[
				_Utils_Tuple3(
				_List_fromArray(
					[2, 4, 6, 8]),
				5,
				2),
				_Utils_Tuple3(
				_List_fromArray(
					[1, 3, 5, 7]),
				4,
				2),
				_Utils_Tuple3(
				_List_fromArray(
					[10, 20, 30, 40]),
				25,
				10)
			]),
		_Utils_Tuple3(
			_List_fromArray(
				[2, 4, 6, 8]),
			5,
			2)));
var $author$project$Game$Problem$PreAlgebra$genMeasuresOfCenter = A2(
	$elm$random$Random$andThen,
	function (t) {
		return A2(
			$elm$random$Random$andThen,
			function (nums) {
				switch (t) {
					case 0:
						var s = $elm$core$List$sum(nums);
						var n = $elm$core$List$length(nums);
						var correct = (s / n) | 0;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var numStr = A2(
									$elm$core$String$join,
									', ',
									A2($elm$core$List$map, $elm$core$String$fromInt, nums));
								var choices = A2(
									$author$project$Game$Problem$PreAlgebra$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: 'Mean of {' + (numStr + '}?'),
										steps: _List_fromArray(
											[
												'Sum = ' + (A2(
												$elm$core$String$join,
												'+',
												A2($elm$core$List$map, $elm$core$String$fromInt, nums)) + (' = ' + $elm$core$String$fromInt(s))),
												'Mean = ' + ($elm$core$String$fromInt(s) + (' / ' + ($elm$core$String$fromInt(n) + (' = ' + $elm$core$String$fromInt(correct)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'Mean of {' + (numStr + '}?')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					case 1:
						var sorted = $elm$core$List$sort(nums);
						var mid2 = A2(
							$elm$core$Maybe$withDefault,
							0,
							$elm$core$List$head(
								A2($elm$core$List$drop, 2, sorted)));
						var mid1 = A2(
							$elm$core$Maybe$withDefault,
							0,
							$elm$core$List$head(
								A2($elm$core$List$drop, 1, sorted)));
						var correct = ((mid1 + mid2) / 2) | 0;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var numStr = A2(
									$elm$core$String$join,
									', ',
									A2($elm$core$List$map, $elm$core$String$fromInt, sorted));
								var choices = A2(
									$author$project$Game$Problem$PreAlgebra$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: 'Median of {' + (numStr + '}?'),
										steps: _List_fromArray(
											[
												'Sorted: ' + numStr,
												'Even count: average middle two: ' + ($elm$core$String$fromInt(mid1) + (' and ' + $elm$core$String$fromInt(mid2))),
												'(' + ($elm$core$String$fromInt(mid1) + (' + ' + ($elm$core$String$fromInt(mid2) + (') / 2 = ' + $elm$core$String$fromInt(correct)))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'Median of {' + (numStr + '}?')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
					default:
						var mx = A2(
							$elm$core$Maybe$withDefault,
							0,
							$elm$core$List$maximum(nums));
						var mn = A2(
							$elm$core$Maybe$withDefault,
							0,
							$elm$core$List$minimum(nums));
						var correct = mx - mn;
						return A2(
							$elm$random$Random$map,
							function (wrong) {
								var numStr = A2(
									$elm$core$String$join,
									', ',
									A2($elm$core$List$map, $elm$core$String$fromInt, nums));
								var choices = A2(
									$author$project$Game$Problem$PreAlgebra$shuffleChoices,
									$elm$core$String$fromInt(correct),
									wrong);
								return {
									answer: $author$project$Types$AChoice(0),
									hint: {
										answer: $elm$core$String$fromInt(correct),
										prompt: 'Range of {' + (numStr + '}?'),
										steps: _List_fromArray(
											[
												'Range = max − min',
												$elm$core$String$fromInt(mx) + (' − ' + ($elm$core$String$fromInt(mn) + (' = ' + $elm$core$String$fromInt(correct))))
											])
									},
									inputType: $author$project$Types$TChoice(choices),
									prompt: 'Range of {' + (numStr + '}?')
								};
							},
							$author$project$Game$Problem$Common$wrongChoicesInt(correct));
				}
			},
			A5(
				$elm$random$Random$map4,
				F4(
					function (a, b, c, d) {
						return _List_fromArray(
							[a, b, c, d]);
					}),
				A2($author$project$Game$Problem$Common$randInt, 2, 20),
				A2($author$project$Game$Problem$Common$randInt, 2, 20),
				A2($author$project$Game$Problem$Common$randInt, 2, 20),
				A2($author$project$Game$Problem$Common$randInt, 2, 20)));
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$PreAlgebra$genSimpleProbability = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var fav = _v0.a;
		var rest = _v0.b;
		var total = fav + rest;
		var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, fav, total);
		var rn = _v1.a;
		var rd = _v1.b;
		return $elm$random$Random$constant(
			{
				answer: A2($author$project$Types$AFraction, rn, rd),
				hint: {
					answer: A2($author$project$Game$Problem$PreAlgebra$showFrac, rn, rd),
					prompt: 'A bag has ' + ($elm$core$String$fromInt(fav) + (' red marbles and ' + ($elm$core$String$fromInt(rest) + ' blue marbles. Probability of drawing red?'))),
					steps: _List_fromArray(
						[
							'P = favorable outcomes / total outcomes',
							'P(red) = ' + ($elm$core$String$fromInt(fav) + ('/' + ($elm$core$String$fromInt(total) + (' = ' + A2($author$project$Game$Problem$PreAlgebra$showFrac, rn, rd)))))
						])
				},
				inputType: $author$project$Types$TFraction,
				prompt: 'A bag has ' + ($elm$core$String$fromInt(fav) + (' red marbles and ' + ($elm$core$String$fromInt(rest) + ' blue marbles. Probability of drawing red?')))
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 3, 9)));
var $author$project$Game$Problem$PreAlgebra$genTwoWayTable = A2(
	$elm$random$Random$andThen,
	function (r) {
		var rowTotal2 = r.c + r.d;
		var rowTotal1 = r.a + r.b;
		var grandTotal = rowTotal1 + rowTotal2;
		return A2(
			$elm$random$Random$map,
			function (q) {
				switch (q) {
					case 0:
						return {
							answer: $author$project$Types$AInt(grandTotal),
							hint: {
								answer: $elm$core$String$fromInt(grandTotal),
								prompt: 'Find the grand total.',
								steps: _List_fromArray(
									[
										'Add all four cell values: ' + ($elm$core$String$fromInt(r.a) + (' + ' + ($elm$core$String$fromInt(r.b) + (' + ' + ($elm$core$String$fromInt(r.c) + (' + ' + $elm$core$String$fromInt(r.d))))))),
										'Or add row totals: ' + ($elm$core$String$fromInt(rowTotal1) + (' + ' + ($elm$core$String$fromInt(rowTotal2) + (' = ' + $elm$core$String$fromInt(grandTotal)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Two-way table:\n' + ('         | Cat A | Cat B | Total\n' + ('Group 1  |  ' + ($elm$core$String$fromInt(r.a) + ('   |  ' + ($elm$core$String$fromInt(r.b) + ('   |  ' + ($elm$core$String$fromInt(rowTotal1) + ('\n' + ('Group 2  |  ' + ($elm$core$String$fromInt(r.c) + ('   |  ' + ($elm$core$String$fromInt(r.d) + ('   |  ' + ($elm$core$String$fromInt(rowTotal2) + ('\n' + 'Find the grand total.')))))))))))))))
						};
					case 1:
						return {
							answer: $author$project$Types$AInt(rowTotal1),
							hint: {
								answer: $elm$core$String$fromInt(rowTotal1),
								prompt: 'How many total are in Group 1?',
								steps: _List_fromArray(
									[
										'Add all values in Group 1 row: ' + ($elm$core$String$fromInt(r.a) + (' + ' + ($elm$core$String$fromInt(r.b) + (' = ' + $elm$core$String$fromInt(rowTotal1)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Two-way table:\n' + ('         | Cat A | Cat B\n' + ('Group 1  |  ' + ($elm$core$String$fromInt(r.a) + ('   |  ' + ($elm$core$String$fromInt(r.b) + ('\n' + ('Group 2  |  ' + ($elm$core$String$fromInt(r.c) + ('   |  ' + ($elm$core$String$fromInt(r.d) + ('\n' + 'How many total are in Group 1?')))))))))))
						};
					default:
						return {
							answer: $author$project$Types$AInt(r.a + r.c),
							hint: {
								answer: $elm$core$String$fromInt(r.a + r.c),
								prompt: 'How many total are in Category A?',
								steps: _List_fromArray(
									[
										'Add all values in Cat A column: ' + ($elm$core$String$fromInt(r.a) + (' + ' + ($elm$core$String$fromInt(r.c) + (' = ' + $elm$core$String$fromInt(r.a + r.c)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'Two-way table:\n' + ('         | Cat A | Cat B\n' + ('Group 1  |  ' + ($elm$core$String$fromInt(r.a) + ('   |  ' + ($elm$core$String$fromInt(r.b) + ('\n' + ('Group 2  |  ' + ($elm$core$String$fromInt(r.c) + ('   |  ' + ($elm$core$String$fromInt(r.d) + ('\n' + 'How many total are in Category A?')))))))))))
						};
				}
			},
			A2($elm$random$Random$int, 0, 2));
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, c, d) {
				return {a: a, b: b, c: c, d: d};
			}),
		A2($author$project$Game$Problem$Common$randInt, 5, 20),
		A2($author$project$Game$Problem$Common$randInt, 5, 20),
		A2($author$project$Game$Problem$Common$randInt, 5, 20),
		A2($author$project$Game$Problem$Common$randInt, 5, 20)));
var $author$project$Game$Problem$PreAlgebra$unit9 = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return $author$project$Game$Problem$PreAlgebra$genSimpleProbability;
			case 1:
				return $author$project$Game$Problem$PreAlgebra$genCountingOutcomes;
			case 2:
				return $author$project$Game$Problem$PreAlgebra$genCompoundProbability;
			case 3:
				return $author$project$Game$Problem$PreAlgebra$genMeasuresOfCenter;
			case 4:
				return $author$project$Game$Problem$PreAlgebra$genMAD;
			default:
				return $author$project$Game$Problem$PreAlgebra$genTwoWayTable;
		}
	},
	A2($elm$random$Random$int, 0, 5));
var $author$project$Game$Problem$PreAlgebra$generatorFor = function (unitNum) {
	switch (unitNum) {
		case 1:
			return $author$project$Game$Problem$PreAlgebra$unit1;
		case 2:
			return $author$project$Game$Problem$PreAlgebra$unit2;
		case 3:
			return $author$project$Game$Problem$PreAlgebra$unit3;
		case 4:
			return $author$project$Game$Problem$PreAlgebra$unit4;
		case 5:
			return $author$project$Game$Problem$PreAlgebra$unit5;
		case 6:
			return $author$project$Game$Problem$PreAlgebra$unit6;
		case 7:
			return $author$project$Game$Problem$PreAlgebra$unit7;
		case 8:
			return $author$project$Game$Problem$PreAlgebra$unit8;
		case 9:
			return $author$project$Game$Problem$PreAlgebra$unit9;
		default:
			return $author$project$Game$Problem$PreAlgebra$unit1;
	}
};
var $author$project$Game$Problem$Algebra1$genExpGrowthDecay = A2(
	$elm$random$Random$andThen,
	function (t) {
		if (!t) {
			return A2(
				$elm$random$Random$andThen,
				function (_v1) {
					var p = _v1.a;
					var years = _v1.b;
					var result = p * A2($elm$core$Basics$pow, 2, years);
					return A2(
						$elm$random$Random$map,
						function (wrong) {
							var choices = A2(
								$author$project$Game$Problem$Algebra1$shuffleChoices,
								$elm$core$String$fromInt(result),
								wrong);
							return {
								answer: $author$project$Types$AChoice(0),
								hint: {
									answer: $elm$core$String$fromInt(result),
									prompt: 'A colony starts with ' + ($elm$core$String$fromInt(p) + (' organisms and doubles each hour. How many after ' + ($elm$core$String$fromInt(years) + ' hours?'))),
									steps: _List_fromArray(
										[
											'A = P · 2^t',
											'A = ' + ($elm$core$String$fromInt(p) + (' · 2^' + ($elm$core$String$fromInt(years) + (' = ' + ($elm$core$String$fromInt(p) + (' · ' + ($elm$core$String$fromInt(
											A2($elm$core$Basics$pow, 2, years)) + (' = ' + $elm$core$String$fromInt(result)))))))))
										])
								},
								inputType: $author$project$Types$TChoice(choices),
								prompt: 'A colony starts with ' + ($elm$core$String$fromInt(p) + (' organisms and doubles each hour. How many after ' + ($elm$core$String$fromInt(years) + ' hours?')))
							};
						},
						$author$project$Game$Problem$Common$wrongChoicesInt(result));
				},
				A3(
					$elm$random$Random$map2,
					$elm$core$Tuple$pair,
					A2($author$project$Game$Problem$Common$randInt, 1, 5),
					A2($author$project$Game$Problem$Common$randInt, 1, 4)));
		} else {
			return A2(
				$elm$random$Random$andThen,
				function (_v2) {
					var factor = _v2.a;
					var years = _v2.b;
					var result = 1;
					var p = A2($elm$core$Basics$pow, factor, years);
					return A2(
						$elm$random$Random$map,
						function (wrong) {
							var choices = A2(
								$author$project$Game$Problem$Algebra1$shuffleChoices,
								$elm$core$String$fromInt(result),
								wrong);
							return {
								answer: $author$project$Types$AChoice(0),
								hint: {
									answer: $elm$core$String$fromInt(result),
									prompt: 'A substance of ' + ($elm$core$String$fromInt(p) + (' grams is cut in half each year. How many grams remain after ' + ($elm$core$String$fromInt(years) + ' years? (Assume exact halving)'))),
									steps: _List_fromArray(
										[
											'Each year the amount is divided by 2',
											'After ' + ($elm$core$String$fromInt(years) + (' years: ' + ($elm$core$String$fromInt(p) + (' / 2^' + ($elm$core$String$fromInt(years) + (' = ' + ($elm$core$String$fromInt(p) + (' / ' + ($elm$core$String$fromInt(
											A2($elm$core$Basics$pow, factor, years)) + (' = ' + $elm$core$String$fromInt(result)))))))))))
										])
								},
								inputType: $author$project$Types$TChoice(choices),
								prompt: 'A substance of ' + ($elm$core$String$fromInt(p) + (' grams is cut in half each year. How many grams remain after ' + ($elm$core$String$fromInt(years) + ' years? (Assume exact halving)')))
							};
						},
						$author$project$Game$Problem$Common$wrongChoicesInt(result));
				},
				A3(
					$elm$random$Random$map2,
					$elm$core$Tuple$pair,
					A2($author$project$Game$Problem$Common$randInt, 2, 6),
					A2($author$project$Game$Problem$Common$randInt, 1, 3)));
		}
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Algebra1$genFactorDiffSquares = A2(
	$elm$random$Random$andThen,
	function (a) {
		var wrongs = _List_fromArray(
			[
				'(x + ' + ($elm$core$String$fromInt(a + 1) + (')(x − ' + ($elm$core$String$fromInt(a - 1) + ')'))),
				'(x + ' + ($elm$core$String$fromInt(a) + ')²'),
				'(x − ' + ($elm$core$String$fromInt(a) + ')²')
			]);
		var radicand = a * a;
		var correct = '(x + ' + ($elm$core$String$fromInt(a) + (')(x − ' + ($elm$core$String$fromInt(a) + ')')));
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Factor: x² − ' + $elm$core$String$fromInt(radicand),
					steps: _List_fromArray(
						[
							'Difference of squares: a² − b² = (a+b)(a−b)',
							'√' + ($elm$core$String$fromInt(radicand) + (' = ' + $elm$core$String$fromInt(a))),
							'x² − ' + ($elm$core$String$fromInt(radicand) + (' = ' + correct))
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Factor: x² − ' + $elm$core$String$fromInt(radicand)
			});
	},
	A2($author$project$Game$Problem$Common$randInt, 2, 9));
var $author$project$Game$Problem$Algebra1$genFunctionTable = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var x = _v0.c;
		return {
			answer: $author$project$Types$AInt((a * x) + b),
			hint: {
				answer: $elm$core$String$fromInt((a * x) + b),
				prompt: 'Complete the table for f(x) = ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('. What is f(' + ($elm$core$String$fromInt(x) + ')?'))))),
				steps: _List_fromArray(
					[
						'Replace x with ' + ($elm$core$String$fromInt(x) + (': ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(x) + (') + ' + $elm$core$String$fromInt(b))))))),
						'= ' + ($elm$core$String$fromInt(a * x) + (' + ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt((a * x) + b)))))
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'Complete the table for f(x) = ' + ($elm$core$String$fromInt(a) + ('x + ' + ($elm$core$String$fromInt(b) + ('. What is f(' + ($elm$core$String$fromInt(x) + ')?')))))
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, x) {
				return _Utils_Tuple3(a, b, x);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 0, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$Algebra1$genMultiStepIneq = A2(
	$elm$random$Random$map,
	function (r) {
		var x0 = r.x;
		var c = (r.a * r.x) - r.b;
		var _v0 = (!r.t) ? _Utils_Tuple2(' > ', $author$project$Types$IGt) : _Utils_Tuple2(' < ', $author$project$Types$ILt);
		var dirStr = _v0.a;
		var dirType = _v0.b;
		return {
			answer: A2($author$project$Types$AInequality, dirType, x0),
			hint: {
				answer: 'x ' + (((!r.t) ? '>' : '<') + (' ' + $elm$core$String$fromInt(r.x))),
				prompt: $elm$core$String$fromInt(r.a) + ('x − ' + ($elm$core$String$fromInt(r.b) + (dirStr + $elm$core$String$fromInt(c)))),
				steps: _List_fromArray(
					[
						'Add ' + ($elm$core$String$fromInt(r.b) + (' to both sides: ' + ($elm$core$String$fromInt(r.a) + ('x ' + (((!r.t) ? '>' : '<') + (' ' + $elm$core$String$fromInt(c + r.b))))))),
						'Divide by ' + ($elm$core$String$fromInt(r.a) + (': x ' + (((!r.t) ? '>' : '<') + (' ' + $elm$core$String$fromInt(r.x)))))
					])
			},
			inputType: $author$project$Types$TInequality,
			prompt: $elm$core$String$fromInt(r.a) + ('x − ' + ($elm$core$String$fromInt(r.b) + (dirStr + $elm$core$String$fromInt(c))))
		};
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, x, t) {
				return {a: a, b: b, t: t, x: x};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($elm$random$Random$int, 0, 1)));
var $author$project$Game$Problem$Algebra1$genPointSlopeEq = A2(
	$elm$random$Random$map,
	function (r) {
		var yTarget = r.y1 + (r.m * r.x);
		var xTarget = r.x1 + r.x;
		return {
			answer: $author$project$Types$AInt(yTarget),
			hint: {
				answer: $elm$core$String$fromInt(yTarget),
				prompt: 'A line passes through (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(r.y1) + (') with slope ' + ($author$project$Game$Problem$Algebra1$showSigned(r.m) + ('. Find y when x = ' + ($elm$core$String$fromInt(xTarget) + '.'))))))),
				steps: _List_fromArray(
					[
						'y − ' + ($elm$core$String$fromInt(r.y1) + (' = ' + ($elm$core$String$fromInt(r.m) + ('(x − ' + ($elm$core$String$fromInt(r.x1) + ')'))))),
						'y − ' + ($elm$core$String$fromInt(r.y1) + (' = ' + ($elm$core$String$fromInt(r.m) + ('(' + ($elm$core$String$fromInt(xTarget) + (' − ' + ($elm$core$String$fromInt(r.x1) + (') = ' + $elm$core$String$fromInt(r.m * r.x))))))))),
						'y = ' + $elm$core$String$fromInt(yTarget)
					])
			},
			inputType: $author$project$Types$TInteger,
			prompt: 'A line passes through (' + ($elm$core$String$fromInt(r.x1) + (', ' + ($elm$core$String$fromInt(r.y1) + (') with slope ' + ($author$project$Game$Problem$Algebra1$showSigned(r.m) + ('. Find y when x = ' + ($elm$core$String$fromInt(xTarget) + '.')))))))
		};
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (m, x1, y1, x) {
				return {m: m, x: x, x1: x1, y1: y1};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, -4, 4),
		A2($author$project$Game$Problem$Common$randInt, -3, 3),
		A2($author$project$Game$Problem$Common$randInt, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 6)));
var $author$project$Game$Problem$Algebra1$genSystemIdentifySolution = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var x = _v0.a;
		var y = _v0.b;
		var yStr = $elm$core$String$fromInt(y);
		var xStr = $elm$core$String$fromInt(x);
		var wrong3 = '(' + ($elm$core$String$fromInt(x - 1) + (', ' + ($elm$core$String$fromInt(y + 1) + ')')));
		var wrong2 = '(' + (xStr + (', ' + ($elm$core$String$fromInt(y + 1) + ')')));
		var wrong1 = '(' + ($elm$core$String$fromInt(x + 1) + (', ' + ($elm$core$String$fromInt(y) + ')')));
		var t = (2 * x) + y;
		var s = x + y;
		var correct = '(' + (xStr + (', ' + (yStr + ')')));
		var choices = A2(
			$author$project$Game$Problem$Algebra1$shuffleChoices,
			correct,
			_List_fromArray(
				[wrong1, wrong2, wrong3]));
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Which ordered pair is the solution?\nx + y = ' + ($elm$core$String$fromInt(s) + ('\n2x + y = ' + $elm$core$String$fromInt(t))),
					steps: _List_fromArray(
						[
							'Subtract first from second: x = ' + $elm$core$String$fromInt(x),
							'Substitute: ' + ($elm$core$String$fromInt(x) + (' + y = ' + ($elm$core$String$fromInt(s) + (' → y = ' + $elm$core$String$fromInt(y)))))
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Which ordered pair is the solution?\nx + y = ' + ($elm$core$String$fromInt(s) + ('\n2x + y = ' + $elm$core$String$fromInt(t)))
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 5)));
var $author$project$Game$Problem$Algebra1$genTwoStepInequality = A2(
	$elm$random$Random$map,
	function (r) {
		var x0 = r.x;
		var c = (r.a * r.x) + r.b;
		var _v0 = (!r.t) ? _Utils_Tuple3(' > ', '>', $author$project$Types$IGt) : _Utils_Tuple3(' < ', '<', $author$project$Types$ILt);
		var dir = _v0.a;
		var symStr = _v0.b;
		var dirType = _v0.c;
		return {
			answer: A2($author$project$Types$AInequality, dirType, x0),
			hint: {
				answer: 'x ' + (symStr + (' ' + $elm$core$String$fromInt(r.x))),
				prompt: $elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (dir + $elm$core$String$fromInt(c)))),
				steps: _List_fromArray(
					[
						'Subtract ' + ($elm$core$String$fromInt(r.b) + (' from both sides: ' + ($elm$core$String$fromInt(r.a) + ('x ' + (symStr + (' ' + $elm$core$String$fromInt(c - r.b))))))),
						'Divide by ' + ($elm$core$String$fromInt(r.a) + (': x ' + (symStr + (' ' + $elm$core$String$fromInt(r.x)))))
					])
			},
			inputType: $author$project$Types$TInequality,
			prompt: $elm$core$String$fromInt(r.a) + ('x + ' + ($elm$core$String$fromInt(r.b) + (dir + $elm$core$String$fromInt(c))))
		};
	},
	A5(
		$elm$random$Random$map4,
		F4(
			function (a, b, x, t) {
				return {a: a, b: b, t: t, x: x};
			}),
		A2($author$project$Game$Problem$Common$randIntNonZero, 1, 5),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($elm$random$Random$int, 0, 1)));
var $author$project$Game$Problem$Algebra1$genVertexForm = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var h = _v0.a;
		var k = _v0.b;
		var wrongs = _List_fromArray(
			[
				'(' + ($elm$core$String$fromInt(-h) + (', ' + ($elm$core$String$fromInt(k) + ')'))),
				'(' + ($elm$core$String$fromInt(h) + (', ' + ($elm$core$String$fromInt(-k) + ')'))),
				'(' + ($elm$core$String$fromInt(h + 1) + (', ' + ($elm$core$String$fromInt(k) + ')')))
			]);
		var correct = '(' + ($elm$core$String$fromInt(h) + (', ' + ($elm$core$String$fromInt(k) + ')')));
		var choices = A2($author$project$Game$Problem$Algebra1$shuffleChoices, correct, wrongs);
		return $elm$random$Random$constant(
			{
				answer: $author$project$Types$AChoice(0),
				hint: {
					answer: correct,
					prompt: 'Find the vertex of y = (x − ' + ($elm$core$String$fromInt(h) + (')² + ' + $elm$core$String$fromInt(k))),
					steps: _List_fromArray(
						[
							'Vertex form: y = (x − h)² + k',
							'Vertex is at (h, k) = (' + ($elm$core$String$fromInt(h) + (', ' + ($elm$core$String$fromInt(k) + ')')))
						])
				},
				inputType: $author$project$Types$TChoice(choices),
				prompt: 'Find the vertex of y = (x − ' + ($elm$core$String$fromInt(h) + (')² + ' + $elm$core$String$fromInt(k)))
			});
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, -5, 5),
		A2($author$project$Game$Problem$Common$randInt, -5, 5)));
var $author$project$Game$Problem$Algebra1$generatorForQuest = F3(
	function (unitNum, questIndex, _v0) {
		var _v1 = _Utils_Tuple2(unitNum, questIndex);
		_v1$67:
		while (true) {
			switch (_v1.b) {
				case 6:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$Algebra1$genTwoStepInequality;
						case 4:
							return $author$project$Game$Problem$Algebra1$genPerpSlope;
						case 6:
							return $author$project$Game$Problem$Algebra1$genSimplifyRadical;
						default:
							break _v1$67;
					}
				case 5:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$Algebra1$genTwoStepEquation;
						case 2:
							return $author$project$Game$Problem$Algebra1$genMultiStepIneq;
						case 4:
							return $author$project$Game$Problem$Algebra1$genParallelSlope;
						case 5:
							return $author$project$Game$Problem$Algebra1$genSystemSubstitution;
						case 6:
							return $author$project$Game$Problem$Algebra1$genExpGrowthDecay;
						case 7:
							return $author$project$Game$Problem$Algebra1$genFactorTrinomial;
						case 8:
							return $author$project$Game$Problem$Algebra1$genVertexForm;
						default:
							break _v1$67;
					}
				case 4:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$Algebra1$genTranslateExpr;
						case 2:
							return $author$project$Game$Problem$Algebra1$genLiteralEq;
						case 3:
							return $author$project$Game$Problem$Algebra1$genArithmeticSeq;
						case 4:
							return $author$project$Game$Problem$Algebra1$genPointSlopeEq;
						case 5:
							return $author$project$Game$Problem$Algebra1$genSystemWordProblem;
						case 6:
							return $author$project$Game$Problem$Algebra1$genScientificNotation;
						case 7:
							return $author$project$Game$Problem$Algebra1$genFactorDiffSquares;
						case 8:
							return $author$project$Game$Problem$Algebra1$genQuadraticFormula;
						case 11:
							return $author$project$Game$Problem$Algebra1$genSolveRadicalEq;
						default:
							break _v1$67;
					}
				case 0:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$Algebra1$genOrderOfOps;
						case 2:
							return $author$project$Game$Problem$Algebra1$genMultiStepEq;
						case 3:
							return $author$project$Game$Problem$Algebra1$genDomainRange;
						case 4:
							return $author$project$Game$Problem$Algebra1$genSlopeFromPoints;
						case 5:
							return $author$project$Game$Problem$Algebra1$genSystemSubstitution;
						case 6:
							return $author$project$Game$Problem$Algebra1$genProductRule;
						case 7:
							return $author$project$Game$Problem$Algebra1$genAddSubPolynomial;
						case 8:
							return $author$project$Game$Problem$Algebra1$genAxisOfSymmetry;
						case 9:
							return $author$project$Game$Problem$Algebra1$genIdentifyFunctionType;
						case 10:
							return $author$project$Game$Problem$Algebra1$genSimplifyRational;
						case 11:
							return $author$project$Game$Problem$Algebra1$genSimplifyRadical;
						case 12:
							return $author$project$Game$Problem$Algebra1$genMeanSD;
						default:
							break _v1$67;
					}
				case 1:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$Algebra1$genEvalExpr;
						case 2:
							return $author$project$Game$Problem$Algebra1$genVarsBothSides;
						case 3:
							return $author$project$Game$Problem$Algebra1$genIsFunction;
						case 4:
							return $author$project$Game$Problem$Algebra1$genSlopeIntercept;
						case 5:
							return $author$project$Game$Problem$Algebra1$genSystemElimination;
						case 6:
							return $author$project$Game$Problem$Algebra1$genQuotientRule;
						case 7:
							return $author$project$Game$Problem$Algebra1$genMonomialTimesPolynomial;
						case 8:
							return $author$project$Game$Problem$Algebra1$genDiscriminant;
						case 9:
							return $author$project$Game$Problem$Algebra1$genEvalPiecewise;
						case 10:
							return $author$project$Game$Problem$Algebra1$genMultiplyRational;
						case 11:
							return $author$project$Game$Problem$Algebra1$genAddSubRadical;
						case 12:
							return $author$project$Game$Problem$Algebra1$genZScore;
						default:
							break _v1$67;
					}
				case 2:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$Algebra1$genAbsoluteValue;
						case 2:
							return $author$project$Game$Problem$Algebra1$genAlgebraicProportion;
						case 3:
							return $author$project$Game$Problem$Algebra1$genEvalFunction;
						case 4:
							return $author$project$Game$Problem$Algebra1$genYIntercept;
						case 5:
							return $author$project$Game$Problem$Algebra1$genSystemWordProblem;
						case 6:
							return $author$project$Game$Problem$Algebra1$genPowerRule;
						case 7:
							return $author$project$Game$Problem$Algebra1$genFOIL;
						case 8:
							return $author$project$Game$Problem$Algebra1$genSolveByFactoring;
						case 9:
							return $author$project$Game$Problem$Algebra1$genIdentifyFunctionType;
						case 10:
							return $author$project$Game$Problem$Algebra1$genSimplifyRational;
						case 11:
							return $author$project$Game$Problem$Algebra1$genMultiplyRadical;
						case 12:
							return $author$project$Game$Problem$Algebra1$genVariance;
						default:
							break _v1$67;
					}
				case 3:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$Algebra1$genCombineLike;
						case 2:
							return $author$project$Game$Problem$Algebra1$genAbsValueEq;
						case 3:
							return $author$project$Game$Problem$Algebra1$genFunctionTable;
						case 4:
							return $author$project$Game$Problem$Algebra1$genXIntercept;
						case 5:
							return $author$project$Game$Problem$Algebra1$genSystemIdentifySolution;
						case 6:
							return $author$project$Game$Problem$Algebra1$genNegativeExponent;
						case 7:
							return $author$project$Game$Problem$Algebra1$genFactorGCF;
						case 8:
							return $author$project$Game$Problem$Algebra1$genSolveBySquareRoot;
						case 9:
							return $author$project$Game$Problem$Algebra1$genEvalPiecewise;
						case 10:
							return $author$project$Game$Problem$Algebra1$genMultiplyRational;
						case 11:
							return $author$project$Game$Problem$Algebra1$genSimplifyRadical;
						case 12:
							return $author$project$Game$Problem$Algebra1$genMeanSD;
						default:
							break _v1$67;
					}
				default:
					break _v1$67;
			}
		}
		return $author$project$Game$Problem$Algebra1$generatorFor(unitNum);
	});
var $author$project$Game$Problem$Course1$genAddSub = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = a + b;
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + ' = ?')),
						steps: _List_fromArray(
							[
								'Line up the ones: ' + ($elm$core$String$fromInt(
								A2($elm$core$Basics$modBy, 10, a)) + (' + ' + ($elm$core$String$fromInt(
								A2($elm$core$Basics$modBy, 10, b)) + (' = ' + $elm$core$String$fromInt(
								A2($elm$core$Basics$modBy, 10, a) + A2($elm$core$Basics$modBy, 10, b)))))),
								'Line up the tens: ' + ($elm$core$String$fromInt((a / 10) | 0) + (' + ' + ($elm$core$String$fromInt((b / 10) | 0) + (' = ' + $elm$core$String$fromInt(((a / 10) | 0) + ((b / 10) | 0)))))),
								'Answer: ' + $elm$core$String$fromInt(correct)
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: $elm$core$String$fromInt(a) + (' + ' + ($elm$core$String$fromInt(b) + ' = ?'))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(a + b));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 10, 99),
		A2($author$project$Game$Problem$Common$randInt, 10, 99)));
var $author$project$Game$Problem$Course1$genAlgProperties = A2(
	$elm$random$Random$map,
	function (t) {
		switch (t) {
			case 0:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Identity',
						prompt: 'Which property? 5 × 1 = 5',
						steps: _List_fromArray(
							['Multiplying by 1 does not change the value — that is the Identity Property'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Identity', 'Commutative', 'Associative', 'Zero'])),
					prompt: 'Which property? a × 1 = a'
				};
			case 1:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Identity',
						prompt: 'Which property? 7 + 0 = 7',
						steps: _List_fromArray(
							['Adding 0 does not change the value — that is the Additive Identity Property'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Identity', 'Inverse', 'Zero', 'Commutative'])),
					prompt: 'Which property? a + 0 = a'
				};
			case 2:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Zero Property',
						prompt: 'Which property? 9 × 0 = 0',
						steps: _List_fromArray(
							['Any number times zero equals zero — that is the Zero Property of Multiplication'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Zero Property', 'Identity', 'Inverse', 'Commutative'])),
					prompt: 'Which property? a × 0 = 0'
				};
			default:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Inverse',
						prompt: 'Which property? 5 + (-5) = 0',
						steps: _List_fromArray(
							['Adding a number and its opposite gives zero — that is the Additive Inverse Property'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Inverse', 'Identity', 'Zero', 'Distributive'])),
					prompt: 'Which property? a + (-a) = 0'
				};
		}
	},
	A2($elm$random$Random$int, 0, 3));
var $author$project$Game$Problem$Course1$genAreaTrapezoid = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var b1 = _v0.a;
		var b2 = _v0.b;
		var h = _v0.c;
		var sumB = b1 + b2;
		var area = ((sumB * h) / 2) | 0;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(area),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(area),
						prompt: 'Area of trapezoid: bases=' + ($elm$core$String$fromInt(b1) + (' and ' + ($elm$core$String$fromInt(b2) + (', height=' + ($elm$core$String$fromInt(h) + '?'))))),
						steps: _List_fromArray(
							[
								'A = ½ × (b1 + b2) × h',
								'A = ½ × (' + ($elm$core$String$fromInt(b1) + (' + ' + ($elm$core$String$fromInt(b2) + (') × ' + $elm$core$String$fromInt(h))))),
								'A = ½ × ' + ($elm$core$String$fromInt(sumB) + (' × ' + ($elm$core$String$fromInt(h) + (' = ' + $elm$core$String$fromInt(area)))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Area of trapezoid: bases=' + ($elm$core$String$fromInt(b1) + (' and ' + ($elm$core$String$fromInt(b2) + (', height=' + ($elm$core$String$fromInt(h) + '?')))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(area));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (b1, b2, h) {
				return _Utils_Tuple3(b1, b2, h);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 2, 8)));
var $author$project$Game$Problem$Course1$genDecDiv = A2(
	$elm$random$Random$map,
	function (_v0) {
		var divisor = _v0.a;
		var quotient = _v0.b;
		var dividend = (divisor * quotient) / 10.0;
		return {
			answer: A2($author$project$Types$AFloat, quotient / 10.0, 0.01),
			hint: {
				answer: $elm$core$String$fromFloat(quotient / 10.0),
				prompt: $elm$core$String$fromFloat(dividend) + (' / ' + ($elm$core$String$fromInt(divisor) + ' = ?')),
				steps: _List_fromArray(
					[
						'Divide ignoring the decimal: ' + ($elm$core$String$fromInt(divisor * quotient) + (' / ' + ($elm$core$String$fromInt(divisor) + (' = ' + $elm$core$String$fromInt(quotient))))),
						'Place the decimal: ' + $elm$core$String$fromFloat(quotient / 10.0)
					])
			},
			inputType: $author$project$Types$TDecimal,
			prompt: $elm$core$String$fromFloat(dividend) + (' / ' + ($elm$core$String$fromInt(divisor) + ' = ?'))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $author$project$Game$Problem$Course1$genDecDivWhole = A2(
	$elm$random$Random$map,
	function (_v0) {
		var quotientTenths = _v0.a;
		var divisor = _v0.b;
		var quotient = quotientTenths / 10.0;
		var dividend = quotient * divisor;
		return {
			answer: A2($author$project$Types$AFloat, quotient, 0.01),
			hint: {
				answer: $elm$core$String$fromFloat(quotient),
				prompt: $elm$core$String$fromFloat(dividend) + (' / ' + ($elm$core$String$fromInt(divisor) + ' = ?')),
				steps: _List_fromArray(
					[
						'Divide ignoring the decimal: ' + ($elm$core$String$fromInt(quotientTenths) + (' × ' + ($elm$core$String$fromInt(divisor) + (' → ' + $elm$core$String$fromFloat(dividend))))),
						'Quotient: ' + $elm$core$String$fromFloat(quotient)
					])
			},
			inputType: $author$project$Types$TDecimal,
			prompt: $elm$core$String$fromFloat(dividend) + (' / ' + ($elm$core$String$fromInt(divisor) + ' = ?'))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 2, 5)));
var $author$project$Game$Problem$Common$toFixed = F2(
	function (places, n) {
		var factor = A2($elm$core$Basics$pow, 10, places);
		return $elm$core$Basics$round(n * factor) / factor;
	});
var $author$project$Game$Problem$Common$wrongChoicesFloat = function (correct) {
	return A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				var fmt = function (n) {
					return $elm$core$String$fromFloat(
						A2($author$project$Game$Problem$Common$toFixed, 2, n));
				};
				return A2(
					$elm$core$List$map,
					fmt,
					_List_fromArray(
						[correct + a, correct - b, correct * (1.0 + (c * 0.1))]));
			}),
		A2($elm$random$Random$int, 1, 5),
		A2($elm$random$Random$int, 1, 3),
		A2($elm$random$Random$int, 1, 4));
};
var $author$project$Game$Problem$Course1$genDecRound = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var whole = _v0.a;
		var tenths = _v0.b;
		var hundredths = _v0.c;
		var roundedTenths = (hundredths >= 5) ? (whole + ((tenths + 1) / 10.0)) : (whole + (tenths / 10.0));
		var numStr = $elm$core$String$fromInt(whole) + ('.' + ($elm$core$String$fromInt(tenths) + $elm$core$String$fromInt(hundredths)));
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var corrStr = $elm$core$String$fromFloat(roundedTenths);
				var choices = A2($author$project$Game$Problem$Course1$shuffleChoices, corrStr, wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: corrStr,
						prompt: 'Round ' + (numStr + ' to the nearest tenth.'),
						steps: _List_fromArray(
							[
								'Look at the hundredths digit: ' + $elm$core$String$fromInt(hundredths),
								(hundredths >= 5) ? ($elm$core$String$fromInt(hundredths) + ' ≥ 5, so round the tenths digit up') : ($elm$core$String$fromInt(hundredths) + ' < 5, so keep the tenths digit'),
								'Answer: ' + corrStr
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Round ' + (numStr + ' to the nearest tenth.')
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesFloat(roundedTenths));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (whole, tenths, hundredths) {
				return _Utils_Tuple3(whole, tenths, hundredths);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 0, 9),
		A2($author$project$Game$Problem$Common$randInt, 0, 9)));
var $author$project$Game$Problem$Course1$genDecSub = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var small = A2($elm$core$Basics$min, a, b);
		var fb = small / 10.0;
		var big = A2($elm$core$Basics$max, a, b);
		var fa = big / 10.0;
		var correct = fa - fb;
		return {
			answer: A2($author$project$Types$AFloat, correct, 0.01),
			hint: {
				answer: $elm$core$String$fromFloat(correct),
				prompt: $elm$core$String$fromFloat(fa) + (' - ' + ($elm$core$String$fromFloat(fb) + ' = ?')),
				steps: _List_fromArray(
					[
						'Line up the decimal points',
						'Subtract as whole numbers: ' + ($elm$core$String$fromInt(big) + (' - ' + ($elm$core$String$fromInt(small) + (' = ' + $elm$core$String$fromInt(big - small))))),
						'Place the decimal: ' + $elm$core$String$fromFloat(correct)
					])
			},
			inputType: $author$project$Types$TDecimal,
			prompt: $elm$core$String$fromFloat(fa) + (' - ' + ($elm$core$String$fromFloat(fb) + ' = ?'))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 11, 99),
		A2($author$project$Game$Problem$Common$randInt, 10, 99)));
var $author$project$Game$Problem$Course1$genDistributive = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var correct = (a * b) + (a * c);
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'Expand: ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(b) + (' + ' + ($elm$core$String$fromInt(c) + ')'))))),
						steps: _List_fromArray(
							[
								'Multiply ' + ($elm$core$String$fromInt(a) + (' by each term: ' + ($elm$core$String$fromInt(a) + ('×' + ($elm$core$String$fromInt(b) + (' + ' + ($elm$core$String$fromInt(a) + ('×' + $elm$core$String$fromInt(c))))))))),
								'= ' + ($elm$core$String$fromInt(a * b) + (' + ' + $elm$core$String$fromInt(a * c))),
								'= ' + $elm$core$String$fromInt(correct)
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Expand: ' + ($elm$core$String$fromInt(a) + ('(' + ($elm$core$String$fromInt(b) + (' + ' + ($elm$core$String$fromInt(c) + ')')))))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(correct));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		A2($author$project$Game$Problem$Common$randInt, 2, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8),
		A2($author$project$Game$Problem$Common$randInt, 1, 8)));
var $author$project$Game$Problem$Course1$genDivisibility = A2(
	$elm$random$Random$andThen,
	function (divisor) {
		return A2(
			$elm$random$Random$andThen,
			function (base) {
				return A2(
					$elm$random$Random$map,
					function (flip) {
						var n = (!flip) ? (base * divisor) : ((base * divisor) + 1);
						var isDivisible = !A2($elm$core$Basics$modBy, divisor, n);
						var wrong = isDivisible ? _List_fromArray(
							['No']) : _List_fromArray(
							['Yes']);
						var correct = isDivisible ? 'Yes' : 'No';
						var choices = A2($author$project$Game$Problem$Course1$shuffleChoices, correct, wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: correct,
								prompt: 'Is ' + ($elm$core$String$fromInt(n) + (' divisible by ' + ($elm$core$String$fromInt(divisor) + '?'))),
								steps: _List_fromArray(
									[
										'Check: ' + ($elm$core$String$fromInt(n) + (' / ' + ($elm$core$String$fromInt(divisor) + (' = ' + $elm$core$String$fromFloat(n / divisor))))),
										isDivisible ? ('No remainder, so ' + ($elm$core$String$fromInt(n) + (' is divisible by ' + $elm$core$String$fromInt(divisor)))) : ('Has a remainder, so ' + ($elm$core$String$fromInt(n) + (' is not divisible by ' + $elm$core$String$fromInt(divisor)))),
										'Answer: ' + correct
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Is ' + ($elm$core$String$fromInt(n) + (' divisible by ' + ($elm$core$String$fromInt(divisor) + '?')))
						};
					},
					A2($elm$random$Random$int, 0, 1));
			},
			A2($author$project$Game$Problem$Common$randInt, 10, 99));
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[2, 3, 5, 9, 10]),
		2));
var $author$project$Game$Problem$Course1$genEquivFrac = A2(
	$elm$random$Random$map,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		var k = _v0.c;
		var safeB = (_Utils_cmp(b, a) < 1) ? (a + 1) : b;
		var wrong1 = A2($author$project$Game$Problem$Course1$showFrac, (k * a) + 1, k * safeB);
		var wrong2 = A2($author$project$Game$Problem$Course1$showFrac, k * a, (k * safeB) + 1);
		var wrong3 = A2($author$project$Game$Problem$Course1$showFrac, (k * a) - 1, k * safeB);
		var correct = A2($author$project$Game$Problem$Course1$showFrac, k * a, k * safeB);
		var choices = A2(
			$author$project$Game$Problem$Course1$shuffleChoices,
			correct,
			_List_fromArray(
				[wrong1, wrong2, wrong3]));
		return {
			answer: $author$project$Types$AChoice(0),
			hint: {
				answer: correct,
				prompt: 'Which fraction is equivalent to ' + (A2($author$project$Game$Problem$Course1$showFrac, a, safeB) + '?'),
				steps: _List_fromArray(
					[
						'Multiply top and bottom by the same number',
						A2($author$project$Game$Problem$Course1$showFrac, a, safeB) + (' × ' + ($elm$core$String$fromInt(k) + ('/' + ($elm$core$String$fromInt(k) + (' = ' + correct))))),
						'Answer: ' + correct
					])
			},
			inputType: $author$project$Types$TChoice(choices),
			prompt: 'Which fraction is equivalent to ' + (A2($author$project$Game$Problem$Course1$showFrac, a, safeB) + '?')
		};
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (a, b, k) {
				return _Utils_Tuple3(a, b, k);
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 4),
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 2, 4)));
var $author$project$Game$Problem$Course1$genFracApp = A2(
	$elm$random$Random$andThen,
	function (t) {
		switch (t) {
			case 0:
				return A2(
					$elm$random$Random$map,
					function (_v1) {
						var n1 = _v1.a;
						var n2 = _v1.b;
						var d = 12;
						var _v2 = A2($author$project$Game$Problem$Common$reduceFraction, n1 + n2, d);
						var rn = _v2.a;
						var rd = _v2.b;
						return {
							answer: A2($author$project$Types$AFraction, rn, rd),
							hint: {
								answer: A2($author$project$Game$Problem$Course1$showFrac, rn, rd),
								prompt: A2($author$project$Game$Problem$Course1$showFrac, n1, d) + (' + ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d) + ' = ?')),
								steps: _List_fromArray(
									[
										'Same denominator: add numerators',
										A2($author$project$Game$Problem$Course1$showFrac, n1, d) + (' + ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d) + (' = ' + (A2($author$project$Game$Problem$Course1$showFrac, n1 + n2, d) + (' = ' + A2($author$project$Game$Problem$Course1$showFrac, rn, rd))))))
									])
							},
							inputType: $author$project$Types$TFraction,
							prompt: 'You ate ' + (A2($author$project$Game$Problem$Course1$showFrac, n1, d) + (' of a pizza and your friend ate ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d) + '. How much was eaten in total?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 1, 3),
						A2($author$project$Game$Problem$Common$randInt, 1, 3)));
			case 1:
				return A2(
					$elm$random$Random$map,
					function (_v3) {
						var d = _v3.a;
						var n = _v3.b;
						var used = n;
						var _v4 = A2($author$project$Game$Problem$Common$reduceFraction, d - used, d);
						var rn = _v4.a;
						var rd = _v4.b;
						return {
							answer: A2($author$project$Types$AFraction, rn, rd),
							hint: {
								answer: A2($author$project$Game$Problem$Course1$showFrac, rn, rd),
								prompt: '1 whole minus ' + (A2($author$project$Game$Problem$Course1$showFrac, used, d) + ' = ?'),
								steps: _List_fromArray(
									[
										'1 = ' + A2($author$project$Game$Problem$Course1$showFrac, d, d),
										A2($author$project$Game$Problem$Course1$showFrac, d, d) + (' - ' + (A2($author$project$Game$Problem$Course1$showFrac, used, d) + (' = ' + A2($author$project$Game$Problem$Course1$showFrac, rn, rd))))
									])
							},
							inputType: $author$project$Types$TFraction,
							prompt: 'A rope is 1 metre long. You use ' + (A2($author$project$Game$Problem$Course1$showFrac, used, d) + ' of it. How much is left?')
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 3, 7),
						A2($author$project$Game$Problem$Common$randInt, 1, 2)));
			default:
				return A2(
					$elm$random$Random$map,
					function (_v5) {
						var n = _v5.a;
						var d = _v5.b;
						var total = d * 4;
						return {
							answer: $author$project$Types$AInt(((total * n) / d) | 0),
							hint: {
								answer: $elm$core$String$fromInt(((total * n) / d) | 0),
								prompt: $elm$core$String$fromInt(total) + (' students, ' + (A2($author$project$Game$Problem$Course1$showFrac, n, d) + ' passed. How many?')),
								steps: _List_fromArray(
									[
										'Multiply: ' + ($elm$core$String$fromInt(total) + (' × ' + A2($author$project$Game$Problem$Course1$showFrac, n, d))),
										'= ' + ($elm$core$String$fromInt(total * n) + ('/' + ($elm$core$String$fromInt(d) + (' = ' + $elm$core$String$fromInt(((total * n) / d) | 0)))))
									])
							},
							inputType: $author$project$Types$TInteger,
							prompt: 'There are ' + ($elm$core$String$fromInt(total) + (' students in a class. ' + (A2($author$project$Game$Problem$Course1$showFrac, n, d) + ' of them passed the test. How many students passed?')))
						};
					},
					A3(
						$elm$random$Random$map2,
						$elm$core$Tuple$pair,
						A2($author$project$Game$Problem$Common$randInt, 2, 5),
						A2($author$project$Game$Problem$Common$randInt, 2, 4)));
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course1$genFracDiv = A2(
	$elm$random$Random$map,
	function (_v0) {
		var _v1 = _v0.a;
		var n1 = _v1.a;
		var d1 = _v1.b;
		var _v2 = _v0.b;
		var n2 = _v2.a;
		var d2 = _v2.b;
		var _v3 = A2($author$project$Game$Problem$Common$reduceFraction, n1 * d2, d1 * n2);
		var rn = _v3.a;
		var rd = _v3.b;
		return {
			answer: A2($author$project$Types$AFraction, rn, rd),
			hint: {
				answer: A2($author$project$Game$Problem$Course1$showFrac, rn, rd),
				prompt: A2($author$project$Game$Problem$Course1$showFrac, n1, d1) + (' / ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d2) + ' = ?')),
				steps: _List_fromArray(
					[
						'Keep, Change, Flip: keep the first fraction, change / to ×, flip the second',
						A2($author$project$Game$Problem$Course1$showFrac, n1, d1) + (' × ' + A2($author$project$Game$Problem$Course1$showFrac, d2, n2)),
						'Multiply: (' + ($elm$core$String$fromInt(n1) + ('×' + ($elm$core$String$fromInt(d2) + (')/(' + ($elm$core$String$fromInt(d1) + ('×' + ($elm$core$String$fromInt(n2) + (') = ' + A2($author$project$Game$Problem$Course1$showFrac, n1 * d2, d1 * n2))))))))),
						'Simplify: ' + A2($author$project$Game$Problem$Course1$showFrac, rn, rd)
					])
			},
			inputType: $author$project$Types$TFraction,
			prompt: A2($author$project$Game$Problem$Course1$showFrac, n1, d1) + (' / ' + (A2($author$project$Game$Problem$Course1$showFrac, n2, d2) + ' = ?'))
		};
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A3(
			$elm$random$Random$map2,
			$elm$core$Tuple$pair,
			A2($author$project$Game$Problem$Common$randInt, 1, 6),
			A2($author$project$Game$Problem$Common$randInt, 2, 8)),
		A3(
			$elm$random$Random$map2,
			$elm$core$Tuple$pair,
			A2($author$project$Game$Problem$Common$randInt, 1, 6),
			A2($author$project$Game$Problem$Common$randInt, 2, 8))));
var $author$project$Game$Problem$Course1$genInequalitySolution = A2(
	$elm$random$Random$andThen,
	function (dir) {
		return A2(
			$elm$random$Random$map,
			function (threshold) {
				var wrong3 = (!dir) ? (threshold - 2) : (threshold + 2);
				var wrong2 = (!dir) ? (threshold - 1) : (threshold + 1);
				var wrong1 = threshold;
				var symbol = (!dir) ? '>' : '<';
				var correct = (!dir) ? (threshold + 1) : (threshold - 1);
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					_List_fromArray(
						[
							$elm$core$String$fromInt(wrong1),
							$elm$core$String$fromInt(wrong2),
							$elm$core$String$fromInt(wrong3)
						]));
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'Which value satisfies x ' + (symbol + (' ' + ($elm$core$String$fromInt(threshold) + '?'))),
						steps: _List_fromArray(
							[
								'x ' + (symbol + (' ' + ($elm$core$String$fromInt(threshold) + (' means x must be ' + (((!dir) ? 'greater' : 'less') + (' than ' + $elm$core$String$fromInt(threshold))))))),
								$elm$core$String$fromInt(correct) + (' ' + (symbol + (' ' + ($elm$core$String$fromInt(threshold) + (' is true; ' + ($elm$core$String$fromInt(threshold) + ' is not'))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Which value satisfies x ' + (symbol + (' ' + ($elm$core$String$fromInt(threshold) + '?')))
				};
			},
			A2($author$project$Game$Problem$Common$randInt, 1, 8));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course1$genIntCompare = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var b = _v0.b;
		if (_Utils_eq(a, b)) {
			var bigger2 = b + 1;
			return $elm$random$Random$constant(
				{
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $author$project$Game$Problem$Course1$showSigned(bigger2),
						prompt: 'Which is greater: ' + ($author$project$Game$Problem$Course1$showSigned(a) + (' or ' + ($author$project$Game$Problem$Course1$showSigned(bigger2) + '?'))),
						steps: _List_fromArray(
							[
								'On a number line, numbers to the right are greater',
								$author$project$Game$Problem$Course1$showSigned(bigger2) + (' is to the right of ' + ($author$project$Game$Problem$Course1$showSigned(a) + (', so ' + ($author$project$Game$Problem$Course1$showSigned(bigger2) + (' > ' + $author$project$Game$Problem$Course1$showSigned(a))))))
							])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							[
								$author$project$Game$Problem$Course1$showSigned(bigger2),
								$author$project$Game$Problem$Course1$showSigned(a)
							])),
					prompt: 'Which is greater: ' + ($author$project$Game$Problem$Course1$showSigned(a) + (' or ' + ($author$project$Game$Problem$Course1$showSigned(bigger2) + '?')))
				});
		} else {
			var smaller = A2($elm$core$Basics$min, a, b);
			var bigger = A2($elm$core$Basics$max, a, b);
			var choices = A2(
				$author$project$Game$Problem$Course1$shuffleChoices,
				$author$project$Game$Problem$Course1$showSigned(bigger),
				_List_fromArray(
					[
						$author$project$Game$Problem$Course1$showSigned(smaller)
					]));
			return $elm$random$Random$constant(
				{
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $author$project$Game$Problem$Course1$showSigned(bigger),
						prompt: 'Which is greater: ' + ($author$project$Game$Problem$Course1$showSigned(a) + (' or ' + ($author$project$Game$Problem$Course1$showSigned(b) + '?'))),
						steps: _List_fromArray(
							[
								'On a number line, numbers to the right are greater',
								$author$project$Game$Problem$Course1$showSigned(bigger) + (' is to the right of ' + ($author$project$Game$Problem$Course1$showSigned(smaller) + (', so ' + ($author$project$Game$Problem$Course1$showSigned(bigger) + (' > ' + $author$project$Game$Problem$Course1$showSigned(smaller))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Which is greater: ' + ($author$project$Game$Problem$Course1$showSigned(a) + (' or ' + ($author$project$Game$Problem$Course1$showSigned(b) + '?')))
				});
		}
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, -20, 20),
		A2($author$project$Game$Problem$Common$randInt, -20, 20)));
var $author$project$Game$Problem$Course1$genMulDiv = A2(
	$elm$random$Random$andThen,
	function (op) {
		return (!op) ? A2(
			$elm$random$Random$andThen,
			function (_v0) {
				var a = _v0.a;
				var b = _v0.b;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course1$shuffleChoices,
							$elm$core$String$fromInt(a * b),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(a * b),
								prompt: $elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(b) + ' = ?')),
								steps: _List_fromArray(
									[
										'Count by ' + ($elm$core$String$fromInt(a) + ('s up to ' + ($elm$core$String$fromInt(b) + ' groups'))),
										$elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(b) + (' = ' + $elm$core$String$fromInt(a * b))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: $elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(b) + ' = ?'))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(a * b));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 12),
				A2($author$project$Game$Problem$Common$randInt, 2, 12))) : A2(
			$elm$random$Random$andThen,
			function (_v1) {
				var b = _v1.a;
				var q = _v1.b;
				var a = b * q;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course1$shuffleChoices,
							$elm$core$String$fromInt(q),
							wrong);
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(q),
								prompt: $elm$core$String$fromInt(a) + (' / ' + ($elm$core$String$fromInt(b) + ' = ?')),
								steps: _List_fromArray(
									[
										'Ask: ' + ($elm$core$String$fromInt(b) + (' × ? = ' + $elm$core$String$fromInt(a))),
										$elm$core$String$fromInt(b) + (' × ' + ($elm$core$String$fromInt(q) + (' = ' + ($elm$core$String$fromInt(a) + (', so answer is ' + $elm$core$String$fromInt(q))))))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: $elm$core$String$fromInt(a) + (' / ' + ($elm$core$String$fromInt(b) + ' = ?'))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(q));
			},
			A3(
				$elm$random$Random$map2,
				$elm$core$Tuple$pair,
				A2($author$project$Game$Problem$Common$randInt, 2, 9),
				A2($author$project$Game$Problem$Common$randInt, 2, 12)));
	},
	A2($elm$random$Random$int, 0, 1));
var $author$project$Game$Problem$Course1$genPlaceValue = A2(
	$elm$random$Random$andThen,
	function (n) {
		return A2(
			$elm$random$Random$andThen,
			function (place) {
				var correct = function () {
					switch (place) {
						case 'ones':
							return A2($elm$core$Basics$modBy, 10, n);
						case 'tens':
							return A2($elm$core$Basics$modBy, 10, (n / 10) | 0);
						default:
							return (n / 100) | 0;
					}
				}();
				var wrong = A2(
					$elm$core$List$map,
					$elm$core$String$fromInt,
					A2(
						$elm$core$List$take,
						3,
						A2(
							$elm$core$List$filter,
							function (d) {
								return !_Utils_eq(d, correct);
							},
							_List_fromArray(
								[
									A2($elm$core$Basics$modBy, 10, n),
									A2($elm$core$Basics$modBy, 10, (n / 10) | 0),
									(n / 100) | 0
								]))));
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return $elm$random$Random$constant(
					{
						answer: $author$project$Types$AChoice(0),
						hint: {
							answer: $elm$core$String$fromInt(correct),
							prompt: 'What digit is in the ' + (place + (' place of ' + ($elm$core$String$fromInt(n) + '?'))),
							steps: _List_fromArray(
								[
									$elm$core$String$fromInt(n) + (' → ones=' + ($elm$core$String$fromInt(
									A2($elm$core$Basics$modBy, 10, n)) + (', tens=' + ($elm$core$String$fromInt(
									A2($elm$core$Basics$modBy, 10, (n / 10) | 0)) + (', hundreds=' + $elm$core$String$fromInt((n / 100) | 0)))))),
									'The ' + (place + (' digit is ' + $elm$core$String$fromInt(correct)))
								])
						},
						inputType: $author$project$Types$TChoice(choices),
						prompt: 'What digit is in the ' + (place + (' place of ' + ($elm$core$String$fromInt(n) + '?')))
					});
			},
			A2(
				$author$project$Game$Problem$Common$randChoice,
				_List_fromArray(
					['ones', 'tens', 'hundreds']),
				'tens'));
	},
	A4(
		$elm$random$Random$map3,
		F3(
			function (h, t, o) {
				return ((h * 100) + (t * 10)) + o;
			}),
		A2($author$project$Game$Problem$Common$randInt, 1, 9),
		A2($author$project$Game$Problem$Common$randInt, 0, 9),
		A2($author$project$Game$Problem$Common$randInt, 0, 9)));
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $author$project$Game$Problem$Course1$genPrimeComposite = A2(
	$elm$random$Random$map,
	function (n) {
		var isPrime = A2(
			$elm$core$List$all,
			function (d) {
				return !(!A2($elm$core$Basics$modBy, d, n));
			},
			A2($elm$core$List$range, 2, n - 1));
		var wrong = isPrime ? _List_fromArray(
			['Composite']) : _List_fromArray(
			['Prime']);
		var correct = isPrime ? 'Prime' : 'Composite';
		var choices = A2($author$project$Game$Problem$Course1$shuffleChoices, correct, wrong);
		return {
			answer: $author$project$Types$AChoice(0),
			hint: {
				answer: correct,
				prompt: 'Is ' + ($elm$core$String$fromInt(n) + ' prime or composite?'),
				steps: isPrime ? _List_fromArray(
					[
						'A prime number has exactly 2 factors: 1 and itself',
						$elm$core$String$fromInt(n) + (' is only divisible by 1 and ' + $elm$core$String$fromInt(n)),
						'So ' + ($elm$core$String$fromInt(n) + ' is prime')
					]) : _List_fromArray(
					[
						'A composite number has more than 2 factors',
						'Factors of ' + ($elm$core$String$fromInt(n) + (': ' + A2(
						$elm$core$String$join,
						', ',
						A2(
							$elm$core$List$map,
							$elm$core$String$fromInt,
							$author$project$Game$Problem$Course1$factorsOf(n))))),
						'So ' + ($elm$core$String$fromInt(n) + ' is composite')
					])
			},
			inputType: $author$project$Types$TChoice(choices),
			prompt: 'Is ' + ($elm$core$String$fromInt(n) + ' prime or composite?')
		};
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 17, 19, 20, 23]),
		7));
var $author$project$Game$Problem$Course1$groupFactors = function (fs) {
	return $elm$core$List$reverse(
		A3(
			$elm$core$List$foldl,
			F2(
				function (f, acc) {
					if (!acc.b) {
						return _List_fromArray(
							[
								_Utils_Tuple2(f, 1)
							]);
					} else {
						var _v1 = acc.a;
						var p = _v1.a;
						var e = _v1.b;
						var rest = acc.b;
						return _Utils_eq(p, f) ? A2(
							$elm$core$List$cons,
							_Utils_Tuple2(p, e + 1),
							rest) : A2(
							$elm$core$List$cons,
							_Utils_Tuple2(f, 1),
							acc);
					}
				}),
			_List_Nil,
			fs));
};
var $author$project$Game$Problem$Course1$primeFactorsHelper = F3(
	function (n, d, acc) {
		primeFactorsHelper:
		while (true) {
			if (n <= 1) {
				return $elm$core$List$reverse(acc);
			} else {
				if (!A2($elm$core$Basics$modBy, d, n)) {
					var $temp$n = (n / d) | 0,
						$temp$d = d,
						$temp$acc = A2($elm$core$List$cons, d, acc);
					n = $temp$n;
					d = $temp$d;
					acc = $temp$acc;
					continue primeFactorsHelper;
				} else {
					var $temp$n = n,
						$temp$d = d + 1,
						$temp$acc = acc;
					n = $temp$n;
					d = $temp$d;
					acc = $temp$acc;
					continue primeFactorsHelper;
				}
			}
		}
	});
var $author$project$Game$Problem$Course1$primeFactors = function (n) {
	return A3($author$project$Game$Problem$Course1$primeFactorsHelper, n, 2, _List_Nil);
};
var $author$project$Game$Problem$Course1$genPrimeFact = A2(
	$elm$random$Random$map,
	function (n) {
		var factStr = function (num) {
			return A2(
				$elm$core$String$join,
				' × ',
				A2(
					$elm$core$List$map,
					function (_v0) {
						var p = _v0.a;
						var e = _v0.b;
						return (e === 1) ? $elm$core$String$fromInt(p) : _Utils_ap(
							$elm$core$String$fromInt(p),
							$author$project$Game$Problem$Course1$superscript(e));
					},
					$author$project$Game$Problem$Course1$groupFactors(
						$author$project$Game$Problem$Course1$primeFactors(num))));
		};
		var wrongs = _List_fromArray(
			[
				factStr(n + 2),
				$elm$core$String$fromInt((n / 2) | 0) + ' × 2',
				$elm$core$String$fromInt(n + 1)
			]);
		var correct = factStr(n);
		var choices = A2(
			$author$project$Game$Problem$Course1$shuffleChoices,
			correct,
			A2($elm$core$List$take, 3, wrongs));
		return {
			answer: $author$project$Types$AChoice(0),
			hint: {
				answer: correct,
				prompt: 'Prime factorization of ' + ($elm$core$String$fromInt(n) + '?'),
				steps: function () {
					var factors = $author$project$Game$Problem$Course1$primeFactors(n);
					return _List_fromArray(
						[
							'Divide by smallest prime factors of ' + $elm$core$String$fromInt(n),
							'Prime factors: ' + A2(
							$elm$core$String$join,
							' × ',
							A2($elm$core$List$map, $elm$core$String$fromInt, factors)),
							'Answer: ' + correct
						]);
				}()
			},
			inputType: $author$project$Types$TChoice(choices),
			prompt: 'Prime factorization of ' + ($elm$core$String$fromInt(n) + '?')
		};
	},
	A2(
		$author$project$Game$Problem$Common$randChoice,
		_List_fromArray(
			[6, 8, 9, 10, 12, 14, 15, 18, 20, 21, 22, 25]),
		12));
var $author$project$Game$Problem$Course1$genProperties = A2(
	$elm$random$Random$map,
	function (t) {
		switch (t) {
			case 0:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Commutative',
						prompt: 'Which property: 3 + 5 = 5 + 3?',
						steps: _List_fromArray(
							['When you swap the order and get the same result, that\'s the Commutative Property'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Commutative', 'Associative', 'Distributive', 'Identity'])),
					prompt: 'Which property: a + b = b + a?'
				};
			case 1:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Associative',
						prompt: 'Which property: (2 + 3) + 4 = 2 + (3 + 4)?',
						steps: _List_fromArray(
							['When you regroup without changing order and get the same result, that\'s the Associative Property'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Associative', 'Commutative', 'Distributive', 'Identity'])),
					prompt: 'Which property: (a + b) + c = a + (b + c)?'
				};
			default:
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: 'Distributive',
						prompt: 'Which property: 3(4 + 5) = 3×4 + 3×5?',
						steps: _List_fromArray(
							['Multiply the outside number by each term inside the parentheses — that\'s the Distributive Property'])
					},
					inputType: $author$project$Types$TChoice(
						_List_fromArray(
							['Distributive', 'Commutative', 'Associative', 'Identity'])),
					prompt: 'Which property: a(b + c) = ab + ac?'
				};
		}
	},
	A2($elm$random$Random$int, 0, 2));
var $author$project$Game$Problem$Course1$genRatio = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var k = _v0.a;
		var a = _v0.b;
		return A2(
			$elm$random$Random$andThen,
			function (b) {
				var n = k * a;
				var d = k * b;
				var _v1 = A2($author$project$Game$Problem$Common$reduceFraction, n, d);
				var rn = _v1.a;
				var rd = _v1.b;
				return A2(
					$elm$random$Random$map,
					function (wrong) {
						var choices = A2(
							$author$project$Game$Problem$Course1$shuffleChoices,
							$elm$core$String$fromInt(rn) + (':' + $elm$core$String$fromInt(rd)),
							A2(
								$elm$core$List$map,
								function (w) {
									return w + (':' + $elm$core$String$fromInt(rd));
								},
								wrong));
						return {
							answer: $author$project$Types$AChoice(0),
							hint: {
								answer: $elm$core$String$fromInt(rn) + (':' + $elm$core$String$fromInt(rd)),
								prompt: 'Simplify the ratio ' + ($elm$core$String$fromInt(n) + (':' + $elm$core$String$fromInt(d))),
								steps: _List_fromArray(
									[
										'Find the GCF of ' + ($elm$core$String$fromInt(n) + (' and ' + ($elm$core$String$fromInt(d) + (': GCF = ' + $elm$core$String$fromInt(k))))),
										'Divide both by ' + ($elm$core$String$fromInt(k) + (': ' + ($elm$core$String$fromInt(n) + ('/' + ($elm$core$String$fromInt(k) + (' = ' + ($elm$core$String$fromInt(rn) + (', ' + ($elm$core$String$fromInt(d) + ('/' + ($elm$core$String$fromInt(k) + (' = ' + $elm$core$String$fromInt(rd))))))))))))),
										'Simplified ratio: ' + ($elm$core$String$fromInt(rn) + (':' + $elm$core$String$fromInt(rd)))
									])
							},
							inputType: $author$project$Types$TChoice(choices),
							prompt: 'Simplify the ratio ' + ($elm$core$String$fromInt(n) + (':' + $elm$core$String$fromInt(d)))
						};
					},
					$author$project$Game$Problem$Common$wrongChoicesInt(rn));
			},
			A2($author$project$Game$Problem$Common$randInt, 2, 5));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 6),
		A2($author$project$Game$Problem$Common$randInt, 2, 6)));
var $author$project$Game$Problem$Course1$genRounding = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var n = _v0.a;
		var roundTo = _v0.b;
		var placeStr = (roundTo === 10) ? 'ten' : 'hundred';
		var actual = (roundTo === 10) ? n : (n * 10);
		var rounded = (roundTo === 10) ? ((((actual + 5) / 10) | 0) * 10) : ((((actual + 50) / 100) | 0) * 100);
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(rounded),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: function () {
						var lookAt = (roundTo === 10) ? A2($elm$core$Basics$modBy, 10, actual) : A2($elm$core$Basics$modBy, 10, (actual / 10) | 0);
						return {
							answer: $elm$core$String$fromInt(rounded),
							prompt: 'Round ' + ($elm$core$String$fromInt(actual) + (' to the nearest ' + (placeStr + '.'))),
							steps: _List_fromArray(
								[
									'Look at the ' + (((roundTo === 10) ? 'ones' : 'tens') + (' digit: ' + $elm$core$String$fromInt(lookAt))),
									(lookAt >= 5) ? '≥ 5, so round up' : '< 5, so round down',
									'Answer: ' + $elm$core$String$fromInt(rounded)
								])
						};
					}(),
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Round ' + ($elm$core$String$fromInt(actual) + (' to the nearest ' + (placeStr + '.')))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(rounded));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 10, 99),
		A2(
			$author$project$Game$Problem$Common$randChoice,
			_List_fromArray(
				[10, 100]),
			10)));
var $author$project$Game$Problem$Course1$genVarExpr = A2(
	$elm$random$Random$andThen,
	function (_v0) {
		var a = _v0.a;
		var x = _v0.b;
		return A2(
			$elm$random$Random$map,
			function (wrong) {
				var correct = a * x;
				var choices = A2(
					$author$project$Game$Problem$Course1$shuffleChoices,
					$elm$core$String$fromInt(correct),
					wrong);
				return {
					answer: $author$project$Types$AChoice(0),
					hint: {
						answer: $elm$core$String$fromInt(correct),
						prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x when x = ' + $elm$core$String$fromInt(x))),
						steps: _List_fromArray(
							[
								$elm$core$String$fromInt(a) + ('x means ' + ($elm$core$String$fromInt(a) + ' times x')),
								'Replace x with ' + ($elm$core$String$fromInt(x) + (': ' + ($elm$core$String$fromInt(a) + (' × ' + ($elm$core$String$fromInt(x) + (' = ' + $elm$core$String$fromInt(correct)))))))
							])
					},
					inputType: $author$project$Types$TChoice(choices),
					prompt: 'Evaluate ' + ($elm$core$String$fromInt(a) + ('x when x = ' + $elm$core$String$fromInt(x)))
				};
			},
			$author$project$Game$Problem$Common$wrongChoicesInt(a * x));
	},
	A3(
		$elm$random$Random$map2,
		$elm$core$Tuple$pair,
		A2($author$project$Game$Problem$Common$randInt, 2, 9),
		A2($author$project$Game$Problem$Common$randInt, 1, 9)));
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Game$Problem$Common$pickGen = F3(
	function (variant, fallback, gens) {
		return $elm$core$List$isEmpty(gens) ? fallback : A2(
			$elm$core$Maybe$withDefault,
			fallback,
			$elm$core$List$head(
				A2(
					$elm$core$List$drop,
					A2(
						$elm$core$Basics$modBy,
						$elm$core$List$length(gens),
						$elm$core$Basics$abs(variant)),
					gens)));
	});
var $author$project$Game$Problem$Course1$generatorForQuest = F3(
	function (unitNum, questIndex, variant) {
		var _v0 = _Utils_Tuple2(unitNum, questIndex);
		_v0$71:
		while (true) {
			switch (_v0.a) {
				case 1:
					switch (_v0.b) {
						case 0:
							return A3(
								$author$project$Game$Problem$Common$pickGen,
								variant,
								$author$project$Game$Problem$Course1$genPlaceValue,
								_List_fromArray(
									[$author$project$Game$Problem$Course1$genPlaceValue, $author$project$Game$Problem$Course1$genRounding]));
						case 1:
							return $author$project$Game$Problem$Course1$genAddSub;
						case 2:
							return $author$project$Game$Problem$Course1$genMulDiv;
						case 3:
							return $author$project$Game$Problem$Course1$genDivisibility;
						case 4:
							return $author$project$Game$Problem$Course1$genWholeNumApp;
						case 5:
							return $author$project$Game$Problem$Course1$genExponent;
						case 6:
							return $author$project$Game$Problem$Course1$genPerfectSquare;
						case 7:
							return $author$project$Game$Problem$Course1$genPerfectCube;
						case 8:
							return $author$project$Game$Problem$Course1$genOrderOfOps;
						case 9:
							return $author$project$Game$Problem$Course1$genProperties;
						case 10:
							return A3(
								$author$project$Game$Problem$Common$pickGen,
								variant,
								$author$project$Game$Problem$Course1$genPrimeFact,
								_List_fromArray(
									[$author$project$Game$Problem$Course1$genPrimeFact, $author$project$Game$Problem$Course1$genPrimeComposite]));
						case 11:
							return A3(
								$author$project$Game$Problem$Common$pickGen,
								variant,
								$author$project$Game$Problem$Course1$genGcf,
								_List_fromArray(
									[$author$project$Game$Problem$Course1$genGcf, $author$project$Game$Problem$Course1$genLcm]));
						case 12:
							return $author$project$Game$Problem$Course1$genGcfLcmApp;
						default:
							break _v0$71;
					}
				case 2:
					switch (_v0.b) {
						case 0:
							return $author$project$Game$Problem$Course1$genIntCompare;
						case 1:
							return $author$project$Game$Problem$Course1$genIntAdd;
						case 2:
							return $author$project$Game$Problem$Course1$genIntSub;
						case 3:
							return $author$project$Game$Problem$Course1$genIntMul;
						case 4:
							return $author$project$Game$Problem$Course1$genIntDiv;
						case 5:
							return $author$project$Game$Problem$Course1$genIntApp;
						case 6:
							return $author$project$Game$Problem$Course1$genIntOrderOfOps;
						case 7:
							return $author$project$Game$Problem$Course1$genCoordinatePlane;
						default:
							break _v0$71;
					}
				case 3:
					switch (_v0.b) {
						case 0:
							return $author$project$Game$Problem$Course1$genSimplifyFrac;
						case 1:
							return $author$project$Game$Problem$Course1$genEquivFrac;
						case 2:
							return $author$project$Game$Problem$Course1$genFracAdd;
						case 3:
							return $author$project$Game$Problem$Course1$genFracAddUnlike;
						case 4:
							return $author$project$Game$Problem$Course1$genFracSub;
						case 5:
							return $author$project$Game$Problem$Course1$genFracMul;
						case 6:
							return $author$project$Game$Problem$Course1$genFracDiv;
						case 7:
							return $author$project$Game$Problem$Course1$genFracApp;
						case 8:
							return $author$project$Game$Problem$Course1$genDecRound;
						case 9:
							return A3(
								$author$project$Game$Problem$Common$pickGen,
								variant,
								$author$project$Game$Problem$Course1$genDecAdd,
								_List_fromArray(
									[$author$project$Game$Problem$Course1$genDecAdd, $author$project$Game$Problem$Course1$genDecSub]));
						case 10:
							return $author$project$Game$Problem$Course1$genDecMul;
						case 11:
							return $author$project$Game$Problem$Course1$genDecDivWhole;
						case 12:
							return $author$project$Game$Problem$Course1$genDecDiv;
						case 13:
							return $author$project$Game$Problem$Course1$genNegRational;
						default:
							break _v0$71;
					}
				case 4:
					switch (_v0.b) {
						case 0:
							return $author$project$Game$Problem$Course1$genVarExpr;
						case 1:
							return A3(
								$author$project$Game$Problem$Common$pickGen,
								variant,
								$author$project$Game$Problem$Course1$genEvalLinear,
								_List_fromArray(
									[$author$project$Game$Problem$Course1$genEvalLinear, $author$project$Game$Problem$Course1$genEvalTwoVar]));
						case 2:
							return $author$project$Game$Problem$Course1$genCombineLike;
						case 3:
							return $author$project$Game$Problem$Course1$genDistributive;
						case 4:
							return $author$project$Game$Problem$Course1$genTranslateExpr;
						case 5:
							return $author$project$Game$Problem$Course1$genSimplifyExpr;
						case 6:
							return $author$project$Game$Problem$Course1$genFactorExpr;
						case 7:
							return $author$project$Game$Problem$Course1$genAlgProperties;
						default:
							break _v0$71;
					}
				case 5:
					switch (_v0.b) {
						case 0:
							return $author$project$Game$Problem$Course1$genSolveAdd;
						case 1:
							return $author$project$Game$Problem$Course1$genSolveMul;
						case 2:
							return $author$project$Game$Problem$Course1$genTwoStep;
						case 3:
							return $author$project$Game$Problem$Course1$genInequality;
						case 4:
							return $author$project$Game$Problem$Course1$genWriteEquation;
						case 5:
							return $author$project$Game$Problem$Course1$genInequalitySolution;
						case 6:
							return $author$project$Game$Problem$Course1$genSolveInequality;
						default:
							break _v0$71;
					}
				case 6:
					switch (_v0.b) {
						case 0:
							return $author$project$Game$Problem$Course1$genRatio;
						case 1:
							return $author$project$Game$Problem$Course1$genEquivRatio;
						case 2:
							return $author$project$Game$Problem$Course1$genUnitRate;
						case 3:
							return $author$project$Game$Problem$Course1$genMissingProportion;
						case 4:
							return $author$project$Game$Problem$Course1$genConvertFDP;
						case 5:
							return $author$project$Game$Problem$Course1$genPercent;
						case 6:
							return $author$project$Game$Problem$Course1$genPercentOfNum;
						default:
							break _v0$71;
					}
				case 7:
					switch (_v0.b) {
						case 0:
							return $author$project$Game$Problem$Course1$genPerimeter;
						case 1:
							return $author$project$Game$Problem$Course1$genAreaRect;
						case 2:
							return $author$project$Game$Problem$Course1$genAreaTriangle;
						case 3:
							return $author$project$Game$Problem$Course1$genAreaTrapezoid;
						case 4:
							return $author$project$Game$Problem$Course1$genCircumference;
						case 5:
							return $author$project$Game$Problem$Course1$genSurfaceArea;
						case 6:
							return $author$project$Game$Problem$Course1$genVolumeBox;
						default:
							break _v0$71;
					}
				case 8:
					switch (_v0.b) {
						case 0:
							return $author$project$Game$Problem$Course1$genMean;
						case 1:
							return $author$project$Game$Problem$Course1$genMedian;
						case 2:
							return $author$project$Game$Problem$Course1$genRange;
						case 3:
							return $author$project$Game$Problem$Course1$genMean;
						case 4:
							return $author$project$Game$Problem$Course1$genIQR;
						case 5:
							return $author$project$Game$Problem$Course1$genMAD;
						default:
							return $author$project$Game$Problem$Course1$genMean;
					}
				default:
					break _v0$71;
			}
		}
		return $author$project$Game$Problem$Course1$generatorFor(unitNum);
	});
var $author$project$Game$Problem$Course2$generatorForQuest = F3(
	function (unitNum, questIndex, _v0) {
		var _v1 = _Utils_Tuple2(unitNum, questIndex);
		switch (_v1.a) {
			case 1:
				switch (_v1.b) {
					case 0:
						return $author$project$Game$Problem$Course2$genIntAddSubPos;
					case 1:
						return $author$project$Game$Problem$Course2$genIntAddSubNeg;
					case 2:
						return $author$project$Game$Problem$Course2$genIntMulDiv;
					case 3:
						return $author$project$Game$Problem$Course2$genSimplifyFrac;
					case 4:
						return $author$project$Game$Problem$Course2$genFracAddSub;
					case 5:
						return $author$project$Game$Problem$Course2$genFracMulDiv;
					case 6:
						return $author$project$Game$Problem$Course2$genConvertFDP;
					case 7:
						return $author$project$Game$Problem$Course2$genExpSquareRoot;
					default:
						return $author$project$Game$Problem$Course2$unit1;
				}
			case 2:
				switch (_v1.b) {
					case 0:
						return $author$project$Game$Problem$Course2$genOrderOfOps;
					case 1:
						return $author$project$Game$Problem$Course2$genTranslateEval;
					case 2:
						return $author$project$Game$Problem$Course2$genCombineLike;
					case 3:
						return $author$project$Game$Problem$Course2$genDistributive;
					case 4:
						return $author$project$Game$Problem$Course2$genSimplifyExpr;
					case 5:
						return $author$project$Game$Problem$Course2$genFactorExpr;
					case 6:
						return $author$project$Game$Problem$Course2$genMonomialOps;
					default:
						return $author$project$Game$Problem$Course2$unit2;
				}
			case 3:
				switch (_v1.b) {
					case 0:
						return $author$project$Game$Problem$Course2$genOneStepEq;
					case 1:
						return $author$project$Game$Problem$Course2$genTwoStepEq;
					case 2:
						return $author$project$Game$Problem$Course2$genMultiStepEq;
					case 3:
						return $author$project$Game$Problem$Course2$genOneStepIneq;
					case 4:
						return $author$project$Game$Problem$Course2$genTwoStepIneq;
					default:
						return $author$project$Game$Problem$Course2$unit3;
				}
			case 4:
				switch (_v1.b) {
					case 0:
						return $author$project$Game$Problem$Course2$genRatioSimplify;
					case 1:
						return $author$project$Game$Problem$Course2$genUnitRate;
					case 2:
						return $author$project$Game$Problem$Course2$genSolveProportion;
					case 3:
						return $author$project$Game$Problem$Course2$genScaleDrawing;
					case 4:
						return $author$project$Game$Problem$Course2$genSimilarFigures;
					case 5:
						return $author$project$Game$Problem$Course2$genPercentProportion;
					case 6:
						return $author$project$Game$Problem$Course2$genDiscountMarkup;
					case 7:
						return $author$project$Game$Problem$Course2$genSimpleInterest;
					default:
						return $author$project$Game$Problem$Course2$unit4;
				}
			case 5:
				switch (_v1.b) {
					case 0:
						return $author$project$Game$Problem$Course2$genQuadrant;
					case 1:
						return $author$project$Game$Problem$Course2$genIsFunction;
					case 2:
						return $author$project$Game$Problem$Course2$genSlopeFromPoints;
					case 3:
						return $author$project$Game$Problem$Course2$genSlopeIntercept;
					case 4:
						return $author$project$Game$Problem$Course2$genLinearFuncValue;
					case 5:
						return $author$project$Game$Problem$Course2$genProportionalRelation;
					default:
						return $author$project$Game$Problem$Course2$unit5;
				}
			case 6:
				switch (_v1.b) {
					case 0:
						return $author$project$Game$Problem$Course2$genAngleClassify;
					case 1:
						return $author$project$Game$Problem$Course2$genCompSuppl;
					case 2:
						return $author$project$Game$Problem$Course2$genVerticalAngles;
					case 3:
						return $author$project$Game$Problem$Course2$genTriangleSum;
					case 4:
						return $author$project$Game$Problem$Course2$genTriangleClassify;
					case 5:
						return $author$project$Game$Problem$Course2$genTranslation;
					default:
						return $author$project$Game$Problem$Course2$unit6;
				}
			case 7:
				switch (_v1.b) {
					case 0:
						return $author$project$Game$Problem$Course2$genPerimArea;
					case 1:
						return $author$project$Game$Problem$Course2$genCircleCalc;
					case 2:
						return $author$project$Game$Problem$Course2$genSurfaceAreaRect;
					case 3:
						return $author$project$Game$Problem$Course2$genSurfaceAreaCylinder;
					case 4:
						return $author$project$Game$Problem$Course2$genVolumeRect;
					case 5:
						return $author$project$Game$Problem$Course2$genVolumeCylinder;
					default:
						return $author$project$Game$Problem$Course2$unit7;
				}
			case 8:
				switch (_v1.b) {
					case 0:
						return $author$project$Game$Problem$Course2$genSimpleProb;
					case 1:
						return $author$project$Game$Problem$Course2$genCountingPrinciple;
					case 2:
						return $author$project$Game$Problem$Course2$genCompoundProb;
					case 3:
						return $author$project$Game$Problem$Course2$genMeanMedianMode;
					case 4:
						return $author$project$Game$Problem$Course2$genBoxWhisker;
					case 5:
						return $author$project$Game$Problem$Course2$genStemLeaf;
					default:
						return $author$project$Game$Problem$Course2$unit8;
				}
			default:
				return $author$project$Game$Problem$Course2$generatorFor(unitNum);
		}
	});
var $author$project$Game$Problem$PreAlgebra$generatorForQuest = F3(
	function (unitNum, questIndex, _v0) {
		var _v1 = _Utils_Tuple2(unitNum, questIndex);
		_v1$59:
		while (true) {
			switch (_v1.b) {
				case 7:
					if (_v1.a === 1) {
						return $author$project$Game$Problem$PreAlgebra$genOrderOfOps;
					} else {
						break _v1$59;
					}
				case 6:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$PreAlgebra$genSciNotation;
						case 3:
							return $author$project$Game$Problem$PreAlgebra$genTwoStepInequality;
						case 4:
							return $author$project$Game$Problem$PreAlgebra$genSimpleInterest;
						case 5:
							return $author$project$Game$Problem$PreAlgebra$genIdentifySlope;
						case 7:
							return $author$project$Game$Problem$PreAlgebra$genDilation;
						case 8:
							return $author$project$Game$Problem$PreAlgebra$genSphereVolume;
						default:
							break _v1$59;
					}
				case 0:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$PreAlgebra$genAbsoluteValue;
						case 2:
							return $author$project$Game$Problem$PreAlgebra$genTranslateExpr;
						case 3:
							return $author$project$Game$Problem$PreAlgebra$genOneStepEq;
						case 4:
							return $author$project$Game$Problem$PreAlgebra$genRatio;
						case 5:
							return $author$project$Game$Problem$PreAlgebra$genDomainRange;
						case 6:
							return $author$project$Game$Problem$PreAlgebra$genSystemSubstitution;
						case 7:
							return $author$project$Game$Problem$PreAlgebra$genAngleTypes;
						case 8:
							return $author$project$Game$Problem$PreAlgebra$genAreaPerimeter;
						case 9:
							return $author$project$Game$Problem$PreAlgebra$genSimpleProbability;
						default:
							break _v1$59;
					}
				case 1:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$PreAlgebra$genSimplifyFrac;
						case 2:
							return $author$project$Game$Problem$PreAlgebra$genCombineLike;
						case 3:
							return $author$project$Game$Problem$PreAlgebra$genRationalEq;
						case 4:
							return $author$project$Game$Problem$PreAlgebra$genUnitRate;
						case 5:
							return $author$project$Game$Problem$PreAlgebra$genSlopeFromPoints;
						case 6:
							return $author$project$Game$Problem$PreAlgebra$genSystemElimination;
						case 7:
							return $author$project$Game$Problem$PreAlgebra$genAngleRelationships;
						case 8:
							return $author$project$Game$Problem$PreAlgebra$genCircleArea;
						case 9:
							return $author$project$Game$Problem$PreAlgebra$genCountingOutcomes;
						default:
							break _v1$59;
					}
				case 2:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$PreAlgebra$genFracOps;
						case 2:
							return $author$project$Game$Problem$PreAlgebra$genDistributeAndCombine;
						case 3:
							return $author$project$Game$Problem$PreAlgebra$genTwoStepEq;
						case 4:
							return $author$project$Game$Problem$PreAlgebra$genSolveProportion;
						case 5:
							return $author$project$Game$Problem$PreAlgebra$genSlopeFormula;
						case 6:
							return $author$project$Game$Problem$PreAlgebra$genSystemApp;
						case 7:
							return $author$project$Game$Problem$PreAlgebra$genTriangleSum;
						case 8:
							return $author$project$Game$Problem$PreAlgebra$genCompositeArea;
						case 9:
							return $author$project$Game$Problem$PreAlgebra$genCompoundProbability;
						default:
							break _v1$59;
					}
				case 3:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$PreAlgebra$genNegativeExponent;
						case 2:
							return $author$project$Game$Problem$PreAlgebra$genFactorLinear;
						case 3:
							return $author$project$Game$Problem$PreAlgebra$genSolveBySquareRoot;
						case 4:
							return $author$project$Game$Problem$PreAlgebra$genSimilarFigures;
						case 5:
							return $author$project$Game$Problem$PreAlgebra$genSlopeIntercept;
						case 6:
							return $author$project$Game$Problem$PreAlgebra$genSystemSubstitution;
						case 7:
							return $author$project$Game$Problem$PreAlgebra$genPythagorean;
						case 8:
							return $author$project$Game$Problem$PreAlgebra$genVolumePrism;
						case 9:
							return $author$project$Game$Problem$PreAlgebra$genMeasuresOfCenter;
						default:
							break _v1$59;
					}
				case 4:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$PreAlgebra$genSquareRoot;
						case 2:
							return $author$project$Game$Problem$PreAlgebra$genMonomialOps;
						case 3:
							return $author$project$Game$Problem$PreAlgebra$genMultiStepEq;
						case 4:
							return $author$project$Game$Problem$PreAlgebra$genPercentProportion;
						case 5:
							return $author$project$Game$Problem$PreAlgebra$genWriteLinearEq;
						case 7:
							return $author$project$Game$Problem$PreAlgebra$genInteriorAngles;
						case 8:
							return $author$project$Game$Problem$PreAlgebra$genVolumeCone;
						case 9:
							return $author$project$Game$Problem$PreAlgebra$genMAD;
						default:
							break _v1$59;
					}
				case 5:
					switch (_v1.a) {
						case 1:
							return $author$project$Game$Problem$PreAlgebra$genCubeRoot;
						case 2:
							return $author$project$Game$Problem$PreAlgebra$genPolyAddSub;
						case 3:
							return $author$project$Game$Problem$PreAlgebra$genEqWithFractions;
						case 4:
							return $author$project$Game$Problem$PreAlgebra$genPercentChange;
						case 5:
							return $author$project$Game$Problem$PreAlgebra$genDirectVariation;
						case 7:
							return $author$project$Game$Problem$PreAlgebra$genTransformation;
						case 8:
							return $author$project$Game$Problem$PreAlgebra$genSurfaceAreaPrism;
						case 9:
							return $author$project$Game$Problem$PreAlgebra$genTwoWayTable;
						default:
							break _v1$59;
					}
				default:
					break _v1$59;
			}
		}
		return $author$project$Game$Problem$PreAlgebra$generatorFor(unitNum);
	});
var $author$project$Game$Problem$megaBossGenerator = function (variant) {
	var gens = _Utils_ap(
		A2(
			$elm$core$List$map,
			$author$project$Game$Problem$Course1$generatorFor,
			A2($elm$core$List$range, 1, 8)),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				$author$project$Game$Problem$Course2$generatorFor,
				A2($elm$core$List$range, 1, 8)),
			_Utils_ap(
				A2(
					$elm$core$List$map,
					$author$project$Game$Problem$PreAlgebra$generatorFor,
					A2($elm$core$List$range, 1, 9)),
				A2(
					$elm$core$List$map,
					$author$project$Game$Problem$Algebra1$generatorFor,
					A2($elm$core$List$range, 1, 12)))));
	return A3(
		$author$project$Game$Problem$Common$pickGen,
		variant,
		$author$project$Game$Problem$Course1$generatorFor(1),
		gens);
};
var $author$project$Game$Problem$generatorFor = F3(
	function (uid, questIndex, variant) {
		var _v0 = uid.unit;
		if (_v0.$ === 'MegaBoss') {
			return $author$project$Game$Problem$megaBossGenerator(variant);
		} else {
			var unitNum = _v0.a;
			var _v1 = uid.course;
			switch (_v1.$) {
				case 'Course1':
					return (questIndex < 0) ? $author$project$Game$Problem$Course1$generatorFor(unitNum) : A3($author$project$Game$Problem$Course1$generatorForQuest, unitNum, questIndex, variant);
				case 'Course2':
					return (questIndex < 0) ? $author$project$Game$Problem$Course2$generatorFor(unitNum) : A3($author$project$Game$Problem$Course2$generatorForQuest, unitNum, questIndex, variant);
				case 'PreAlgebra':
					return (questIndex < 0) ? $author$project$Game$Problem$PreAlgebra$generatorFor(unitNum) : A3($author$project$Game$Problem$PreAlgebra$generatorForQuest, unitNum, questIndex, variant);
				default:
					return (questIndex < 0) ? $author$project$Game$Problem$Algebra1$generatorFor(unitNum) : A3($author$project$Game$Problem$Algebra1$generatorForQuest, unitNum, questIndex, variant);
			}
		}
	});
var $elm$core$String$toFloat = _String_toFloat;
var $author$project$Game$Battle$checkAnswer = F2(
	function (input, correct) {
		var _v0 = _Utils_Tuple2(input, correct);
		_v0$7:
		while (true) {
			switch (_v0.a.$) {
				case 'IInt':
					if (_v0.b.$ === 'AInt') {
						var s = _v0.a.a;
						var n = _v0.b.a;
						return _Utils_eq(
							$elm$core$String$toInt(s),
							$elm$core$Maybe$Just(n));
					} else {
						break _v0$7;
					}
				case 'IDecimal':
					if (_v0.b.$ === 'AFloat') {
						var s = _v0.a.a;
						var _v1 = _v0.b;
						var v = _v1.a;
						var tol = _v1.b;
						var _v2 = $elm$core$String$toFloat(s);
						if (_v2.$ === 'Just') {
							var f = _v2.a;
							return _Utils_cmp(
								$elm$core$Basics$abs(f - v),
								tol) < 1;
						} else {
							return false;
						}
					} else {
						break _v0$7;
					}
				case 'IFraction':
					if (_v0.b.$ === 'AFraction') {
						var den = _v0.a.a.den;
						var num = _v0.a.a.num;
						var _v3 = _v0.b;
						var cn = _v3.a;
						var cd = _v3.b;
						var _v4 = _Utils_Tuple2(
							$elm$core$String$toInt(num),
							$elm$core$String$toInt(den));
						if ((_v4.a.$ === 'Just') && (_v4.b.$ === 'Just')) {
							var n = _v4.a.a;
							var d = _v4.b.a;
							return (!(!d)) && _Utils_eq(n * cd, cn * d);
						} else {
							return false;
						}
					} else {
						break _v0$7;
					}
				case 'IChoice':
					if ((_v0.a.a.$ === 'Just') && (_v0.b.$ === 'AChoice')) {
						var idx = _v0.a.a.a;
						var ci = _v0.b.a;
						return _Utils_eq(idx, ci);
					} else {
						break _v0$7;
					}
				case 'IInequality':
					if (_v0.b.$ === 'AInequality') {
						var val = _v0.a.a.val;
						var dir = _v0.a.a.dir;
						var _v5 = _v0.b;
						var cd = _v5.a;
						var cv = _v5.b;
						var _v6 = _Utils_Tuple2(
							dir,
							$elm$core$String$toFloat(val));
						if ((_v6.a.$ === 'Just') && (_v6.b.$ === 'Just')) {
							var d = _v6.a.a;
							var v = _v6.b.a;
							return _Utils_eq(d, cd) && ($elm$core$Basics$abs(v - cv) < 0.01);
						} else {
							return false;
						}
					} else {
						break _v0$7;
					}
				case 'ISystem':
					if (_v0.b.$ === 'ASystem') {
						var y = _v0.a.a.y;
						var x = _v0.a.a.x;
						var _v7 = _v0.b;
						var cx = _v7.a;
						var cy = _v7.b;
						var _v8 = _Utils_Tuple2(
							$elm$core$String$toFloat(x),
							$elm$core$String$toFloat(y));
						if ((_v8.a.$ === 'Just') && (_v8.b.$ === 'Just')) {
							var fx = _v8.a.a;
							var fy = _v8.b.a;
							return ($elm$core$Basics$abs(fx - cx) < 0.01) && ($elm$core$Basics$abs(fy - cy) < 0.01);
						} else {
							return false;
						}
					} else {
						break _v0$7;
					}
				default:
					if (_v0.b.$ === 'ARoots') {
						var r2 = _v0.a.a.r2;
						var r1 = _v0.a.a.r1;
						var _v9 = _v0.b;
						var cr1 = _v9.a;
						var cr2 = _v9.b;
						var _v10 = _Utils_Tuple2(
							$elm$core$String$toFloat(r1),
							$elm$core$String$toFloat(r2));
						if ((_v10.a.$ === 'Just') && (_v10.b.$ === 'Just')) {
							var f1 = _v10.a.a;
							var f2 = _v10.b.a;
							return (($elm$core$Basics$abs(f1 - cr1) < 0.01) && ($elm$core$Basics$abs(f2 - cr2) < 0.01)) || (($elm$core$Basics$abs(f1 - cr2) < 0.01) && ($elm$core$Basics$abs(f2 - cr1) < 0.01));
						} else {
							return false;
						}
					} else {
						break _v0$7;
					}
			}
		}
		return false;
	});
var $author$project$Types$BattleLost = {$: 'BattleLost'};
var $author$project$Types$CorrectHit = {$: 'CorrectHit'};
var $author$project$Types$ShowResult = function (a) {
	return {$: 'ShowResult', a: a};
};
var $author$project$Types$WrongHit = {$: 'WrongHit'};
var $author$project$Config$multiplierFor = function (streak) {
	return (streak >= 7) ? _Utils_Tuple2(3, 1) : ((streak >= 5) ? _Utils_Tuple2(2, 1) : ((streak >= 3) ? _Utils_Tuple2(3, 2) : _Utils_Tuple2(1, 1)));
};
var $author$project$Config$applyMultiplier = F2(
	function (streak, base) {
		var _v0 = $author$project$Config$multiplierFor(streak);
		var num = _v0.a;
		var den = _v0.b;
		return ((base * num) / den) | 0;
	});
var $author$project$Config$baseDamage = 15;
var $author$project$Config$bossCounterDamage = 20;
var $author$project$Types$FlashDone = {$: 'FlashDone'};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $author$project$Config$flashDurationMs = 150.0;
var $elm$core$Process$sleep = _Process_sleep;
var $author$project$Main$flashCmd = A2(
	$elm$core$Task$perform,
	$elm$core$Basics$always($author$project$Types$FlashDone),
	$elm$core$Process$sleep($author$project$Config$flashDurationMs));
var $author$project$Config$minProblems = 5;
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $author$project$Main$handleBossAnswer = F3(
	function (isCorrect, state, model) {
		if (isCorrect) {
			var newStreak = state.streak + 1;
			var newDone = state.problemsDone + 1;
			var damage = A2($author$project$Config$applyMultiplier, state.streak, $author$project$Config$baseDamage);
			var newBossHp = A2($elm$core$Basics$max, 0, state.bossHp - damage);
			var wonBattle = (!newBossHp) && (_Utils_cmp(newDone, $author$project$Config$minProblems) > -1);
			if (wonBattle) {
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							screen: $author$project$Types$BattleScreen(
								_Utils_update(
									state,
									{bossHp: newBossHp, phase: $author$project$Types$BattleWon, problemsDone: newDone, streak: newStreak}))
						}),
					$elm$core$Platform$Cmd$none);
			} else {
				var _v0 = A2(
					$elm$random$Random$step,
					A3($author$project$Game$Problem$generatorFor, state.unit, -1, newDone),
					model.seed);
				var nextProblem = _v0.a;
				var newSeed = _v0.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							screen: $author$project$Types$BattleScreen(
								_Utils_update(
									state,
									{
										bossHp: newBossHp,
										input: $author$project$Game$Battle$defaultInput(nextProblem.inputType),
										phase: $author$project$Types$ShowResult($author$project$Types$CorrectHit),
										problem: nextProblem,
										problemsDone: newDone,
										streak: newStreak
									})),
							seed: newSeed
						}),
					$author$project$Main$flashCmd);
			}
		} else {
			var newHp = A2($elm$core$Basics$max, 0, state.playerHp - $author$project$Config$bossCounterDamage);
			var lostBattle = !newHp;
			if (lostBattle) {
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							screen: $author$project$Types$BattleScreen(
								_Utils_update(
									state,
									{phase: $author$project$Types$BattleLost, playerHp: newHp, streak: 0}))
						}),
					$elm$core$Platform$Cmd$none);
			} else {
				var newDoneWrong = state.problemsDone + 1;
				var _v1 = A2(
					$elm$random$Random$step,
					A3($author$project$Game$Problem$generatorFor, state.unit, -1, newDoneWrong),
					model.seed);
				var nextProblem = _v1.a;
				var newSeed = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							screen: $author$project$Types$BattleScreen(
								_Utils_update(
									state,
									{
										input: $author$project$Game$Battle$defaultInput(nextProblem.inputType),
										phase: $author$project$Types$ShowResult($author$project$Types$WrongHit),
										playerHp: newHp,
										problem: nextProblem,
										problemsDone: newDoneWrong,
										streak: 0
									})),
							seed: newSeed
						}),
					$author$project$Main$flashCmd);
			}
		}
	});
var $author$project$Types$QuestComplete = {$: 'QuestComplete'};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Game$Curriculum$questsFor = function (uid) {
	var _v0 = _Utils_Tuple2(uid.course, uid.unit);
	_v0$41:
	while (true) {
		if (_v0.b.$ === 'Unit') {
			switch (_v0.a.$) {
				case 'Course1':
					switch (_v0.b.a) {
						case 1:
							var _v1 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Place Value & Rounding', story: 'The Number Golem guards the Valley of Digits, hurling boulders carved with numerals. Show him you can read the land by rounding and comparing the stones he throws.'},
									{minCorrect: 3, name: 'Adding & Subtracting', story: 'A bridge over the Chasm of Sums has crumbled, and monsters lurk below. Prove your strength by adding and subtracting your way to the other side.'},
									{minCorrect: 3, name: 'Multiplying & Dividing', story: 'Goblin raiders have split the royal treasure into equal piles and scattered them. Multiply your speed and divide your enemies to reclaim what is lost.'},
									{minCorrect: 3, name: 'Divisibility Rules', story: 'The Iron Gate of the dungeon only opens when the correct number is spoken. Master the secret rules of divisibility to pass through unharmed.'},
									{minCorrect: 3, name: 'Whole Number Applications', story: 'The village elder needs supplies divided among the townsfolk, and monsters threaten unless the math is right. Solve these real-world whole-number problems before the siege begins.'},
									{minCorrect: 3, name: 'Powers & Exponents', story: 'A dragon\'s roar grows with every echo — each shout squared, each breath cubed. Learn the law of perfect powers before the beast\'s might overwhelms you.'},
									{minCorrect: 3, name: 'Perfect Squares', story: 'The Crystal Golem\'s armour is arranged in perfect square formations. Only by naming each square number exactly can you find the cracks in its defenses.'},
									{minCorrect: 3, name: 'Perfect Cubes', story: 'Deep in the dungeon, the Cube Warden stacks stone in cubic towers of increasing power. Master the perfect cubes to predict and topple each tower.'},
									{minCorrect: 3, name: 'Order of Operations', story: 'The wizard\'s spell book is written in a precise order; cast the steps wrong and the magic turns on you. Follow the order of operations to defeat the Arcane Sentinel.'},
									{minCorrect: 3, name: 'Properties of Numbers', story: 'The Commutative Cultists rearrange the dungeon tiles to confuse heroes. Show them that no matter the order or grouping, your arithmetic cannot be tricked.'},
									{minCorrect: 3, name: 'Prime Factorization', story: 'The Stone Golem is made of composite boulders that crumble only when broken into their prime factors. Shatter each number to its irreducible core.'},
									{minCorrect: 4, name: 'GCF & LCM', story: 'Two rival clans meet at the crossroads, and only the warrior who finds the greatest common bond or the least common meeting time can broker peace. Master GCF and LCM to end the feud.'},
									{minCorrect: 3, name: 'GCF & LCM Applications', story: 'The dungeon quartermaster must distribute rations in equal groups with nothing left over. Solve these real-world GCF and LCM problems before the army starves.'}
								]);
						case 2:
							var _v2 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Intro to Integers', story: 'You step beyond the walls of the village into the Frozen Tundra, where temperatures plunge below zero. Plot your position on the number line to survive the bitter cold.'},
									{minCorrect: 3, name: 'Adding Integers', story: 'The Integer Imp steals your gold and then hands some back — sometimes you gain, sometimes you lose. Add the imp\'s transactions to keep track of your coin.'},
									{minCorrect: 3, name: 'Subtracting Integers', story: 'The Frost Wraith strikes from the left side of zero, driving your score deep into negative territory. Subtract your way back to safety before the cold claims you.'},
									{minCorrect: 3, name: 'Multiplying Integers', story: 'The cursed mirror doubles every negative curse cast upon you. Understand how multiplying negatives flips the sign, and turn the curse back on your enemies.'},
									{minCorrect: 3, name: 'Dividing Integers', story: 'The dungeon spoils must be split equally among surviving warriors, even when debt is shared. Divide integers correctly to claim your rightful share.'},
									{minCorrect: 3, name: 'Integer Applications', story: 'The kingdom sends you to chart the depths of the Abyss Mine and the peaks of the Skyreach Tower. Use integers to solve real-world problems of elevation, temperature, and debt.'},
									{minCorrect: 3, name: 'Order of Operations', story: 'The Arcane Forge demands its enchantments be applied in a strict sequence. Get the order wrong and the magic backfires — solve integer expressions with full order-of-operations rules.'},
									{minCorrect: 3, name: 'Coordinate Plane', story: 'The Dragon\'s treasure map uses a mysterious grid of axes. Navigate the four quadrants, identify hidden landmarks, and plot your route to the hoard.'}
								]);
						case 3:
							var _v3 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Simplifying Fractions', story: 'The Fraction Phantom wears a disguise of unreduced form. Strip away its mask by simplifying each fraction to reveal the true creature beneath.'},
									{minCorrect: 3, name: 'Equivalent Fractions', story: 'The Phantom multiplies its illusions — many fractions that look different but are secretly the same. Identify the equivalent forms to see through its tricks.'},
									{minCorrect: 3, name: 'Adding Fractions (Like Denominators)', story: 'The Fraction Phantom has split the healing potion into equal-sized shards. Combine the pieces with the same denominator before your party falls.'},
									{minCorrect: 3, name: 'Adding Fractions (Unlike Denominators)', story: 'The potion shards come in mismatched sizes this time. Find a common vessel — the LCD — and pour them together to restore the healing draught.'},
									{minCorrect: 3, name: 'Subtracting Fractions', story: 'A curse has eaten away at your shield piece by piece. Subtract the fractional damage and calculate how much protection remains.'},
									{minCorrect: 3, name: 'Multiplying Fractions', story: 'The enchanted scroll grants only a fraction of its power for each fraction of the ritual completed. Multiply the fractions to reveal the spell\'s true strength.'},
									{minCorrect: 3, name: 'Dividing Fractions', story: 'The ancient bridge is one-half of a league long, but your steps cover only a fraction of that. Divide to learn exactly how many steps stand between you and the other shore.'},
									{minCorrect: 3, name: 'Fraction Applications', story: 'The castle cook must portion out fractional amounts of each ingredient for the victory feast. Solve these real-world fraction problems before the guests arrive.'},
									{minCorrect: 3, name: 'Decimal Place Value & Rounding', story: 'The royal treasurer records all taxes to the nearest tenth and hundredth. Master decimal place value and rounding to audit the books before the tax revolt.'},
									{minCorrect: 3, name: 'Adding & Subtracting Decimals', story: 'The merchant\'s ledger records every coin in decimals, and bandits have tampered with the totals. Add and subtract the columns correctly to expose the fraud.'},
									{minCorrect: 3, name: 'Multiplying Decimals', story: 'Each arrow in the quiver costs a fraction of a gold piece, and you need dozens for the siege. Multiply the decimals to tally the true cost before the armorer closes.'},
									{minCorrect: 3, name: 'Dividing by Whole Numbers', story: 'The spoils of battle must be shared equally among the warriors, down to the last tenth of a gold coin. Divide each decimal prize without error.'},
									{minCorrect: 4, name: 'Dividing Decimals', story: 'The alchemist\'s recipe calls for a precise decimal portion divided into equal doses. Divide without error or the potion becomes poison.'},
									{minCorrect: 3, name: 'Negative Rational Numbers', story: 'The dungeon plunges below sea level where temperatures and debts both turn negative. Add and subtract negative fractions and decimals to navigate safely.'}
								]);
						case 4:
							var _v4 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Variables & Expressions', story: 'The Expression Elemental hides its true form behind unknown symbols. Learn to read the language of variables and expose the creature for what it is.'},
									{minCorrect: 3, name: 'Evaluating Expressions', story: 'The dungeon door\'s lock changes with every visit, its combination stored in an expression. Substitute the given values and turn the tumblers to open the way forward.'},
									{minCorrect: 3, name: 'Combining Like Terms', story: 'Scattered potion bottles litter the wizard\'s chamber — potions of the same kind must be gathered before the battle begins. Combine like terms to simplify your arsenal.'},
									{minCorrect: 3, name: 'Distributive Property', story: 'The Elemental surrounds itself with identical minions at every corner. Use the distributive law to sweep them all away in one decisive strike.'},
									{minCorrect: 3, name: 'Translating Expressions', story: 'The village oracle speaks only in riddles of words, but the wizard demands pure algebra. Translate the oracle\'s phrases into expressions before the spell expires.'},
									{minCorrect: 3, name: 'Simplifying Expressions', story: 'The Elemental\'s form is tangled — distribute its outer shell and combine what remains. Simplify the expression completely to reveal its true power level.'},
									{minCorrect: 3, name: 'Factoring Expressions', story: 'The dungeon door is locked behind a factored expression. Pull out the common factor from each term and the lock will yield to your hand.'},
									{minCorrect: 3, name: 'Algebraic Properties', story: 'The ancient runes on the wall display the fundamental laws of algebra. Name each property correctly and the runes will light the path to the boss chamber.'}
								]);
						case 5:
							var _v5 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'One-Step Equations (Add/Sub)', story: 'The Equation Knight has stolen a number and hidden it behind a wall of addition. Undo his trick with a single reverse operation to reclaim the unknown.'},
									{minCorrect: 3, name: 'One-Step Equations (Mul/Div)', story: 'A troll has multiplied the curse tenfold to confuse you. Divide both sides of the enchantment to isolate the truth and break the hex.'},
									{minCorrect: 4, name: 'Two-Step Equations', story: 'The Equation Knight fights in two phases, first adding poison then multiplying his strength. Unravel both steps in order to land the finishing blow.'},
									{minCorrect: 3, name: 'Inequalities', story: 'The bridge troll allows only heroes whose strength exceeds a certain threshold to pass. Solve the inequality and prove you are greater than what he demands.'},
									{minCorrect: 3, name: 'Writing Equations', story: 'The royal scribe has left word problems in plain speech, but the dungeon gate requires pure algebra. Translate each scenario into an equation and solve for the unknown.'},
									{minCorrect: 3, name: 'Inequality Solutions', story: 'The Knight posts a list of numbers at the castle gate, claiming only some satisfy his challenge. Identify which values make the inequality true and call his bluff.'},
									{minCorrect: 3, name: 'Solving Inequalities', story: 'The Equation Knight returns with a range of demands rather than a single value. Solve the inequality completely and graph your answer to claim victory.'}
								]);
						case 6:
							var _v6 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Ratios', story: 'The Ratio Serpent guards a recipe for the antidote written in parts — get the proportion wrong and the cure becomes a curse. Master ratios to brew it right.'},
									{minCorrect: 3, name: 'Equivalent Ratios', story: 'The Serpent hides among identical-looking potions that are secretly the same ratio in disguise. Find the equivalent forms before you drink the wrong one.'},
									{minCorrect: 3, name: 'Unit Rates', story: 'The goblin courier charges by the league, but you need to know the cost per step to budget your gold. Calculate the unit rate before the courier vanishes.'},
									{minCorrect: 3, name: 'Proportions', story: 'The Serpent\'s lair is a scaled map of the dungeon, and wrong proportions send heroes into walls. Set up and solve the proportion to navigate safely to the exit.'},
									{minCorrect: 3, name: 'Converting Fractions, Decimals & Percents', story: 'The dungeon merchant posts prices in three different forms and refuses to accept the wrong one. Convert between fractions, decimals, and percents before the deal falls through.'},
									{minCorrect: 3, name: 'Percents', story: 'The dragon\'s hoard is taxed by the king, and the tax collectors quote only percentages. Find the true amount owed or lose your share of the plunder.'},
									{minCorrect: 3, name: 'Percent of a Number', story: 'The wizard\'s potion restores only a percentage of your maximum health. Calculate the exact amount healed before the next monster strikes.'}
								]);
						case 7:
							var _v7 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Perimeter', story: 'The castle wall must be reinforced with iron bands, and the blacksmith needs the exact perimeter of each section. Measure the boundary before the siege engines arrive.'},
									{minCorrect: 3, name: 'Area of Rectangles & Parallelograms', story: 'The Geometry Gargoyle has sealed the throne room with stone tiles, and you must count every square inch to know where to strike. Calculate the area before the door closes forever.'},
									{minCorrect: 3, name: 'Area of Triangles', story: 'The dungeon floor is split into triangular traps, each charged with a different amount of dark energy proportional to its area. Find each triangle\'s area to disarm the grid.'},
									{minCorrect: 3, name: 'Area of Trapezoids', story: 'The Gargoyle rearranges the floor into trapezoidal sections to confuse your footing. Calculate each trapezoid\'s area to find the safe squares before you step.'},
									{minCorrect: 3, name: 'Circumference & Area of Circles', story: 'A circular rune on the dungeon floor pulses with power, and the wizard needs its exact circumference and area to contain it. Measure the rune before the pulse explodes.'},
									{minCorrect: 3, name: 'Surface Area', story: 'To coat the stone prison with warding magic, the mage must know every outer surface of the rectangular prism. Calculate the surface area or leave a gap for evil to seep through.'},
									{minCorrect: 4, name: 'Volume of Prisms', story: 'The Gargoyle fills stone prism traps with poison gas — knowing the volume tells you how long you have before the air runs out. Calculate the volume and time your escape.'}
								]);
						case 8:
							var _v8 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Mean', story: 'The Stats Sphinx demands you prove your worth by finding the average number of monsters slain by your party. Compute the mean or become its next riddle.'},
									{minCorrect: 3, name: 'Median & Mode', story: 'The Sphinx poses two more riddles — find the middle value of the battle scores and the score that appears most often. Solve both to earn passage to the next chamber.'},
									{minCorrect: 3, name: 'Range', story: 'The Sphinx tests how wildly your party\'s skills vary from the weakest to the strongest warrior. Find the range and show that you understand the full spread of power.'},
									{minCorrect: 3, name: 'Interpreting Graphs', story: 'The dungeon archives hold battle records charted in cryptic bar graphs and line plots. Read the charts correctly to reveal the enemy\'s weakness before the final assault.'},
									{minCorrect: 3, name: 'Quartiles & IQR', story: 'The Sphinx reveals a deeper secret: the spread within the middle half of the data. Find the quartiles and the interquartile range to unlock the inner sanctum.'},
									{minCorrect: 3, name: 'Mean Absolute Deviation', story: 'The final riddle of the Stats Sphinx asks how far each warrior strays from the average. Calculate the mean absolute deviation to prove you understand true variability.'}
								]);
						default:
							break _v0$41;
					}
				case 'Course2':
					switch (_v0.b.a) {
						case 1:
							var _v11 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Adding & Subtracting Positives', story: 'The Sense Golem pelts the village gate with numbered boulders, each carved with a sum or difference. Prove your addition and subtraction to hold the gate.'},
									{minCorrect: 3, name: 'Adding & Subtracting Negatives', story: 'Frost wraiths descend from the north with negative energy blasts. Only a hero who can add and subtract across zero can drive them back.'},
									{minCorrect: 3, name: 'Multiplying & Dividing Integers', story: 'The Golem spawns cursed twins — multiplied negatives that flip signs and divide the party. Master integer multiplication and division to restore order.'},
									{minCorrect: 3, name: 'Simplifying Fractions', story: 'The Golem wears armour disguised as unsimplified fractions, each piece hiding a simpler truth. Reduce every fraction to expose its weakest form.'},
									{minCorrect: 3, name: 'Adding & Subtracting Fractions', story: 'Healing potions arrive in fractional doses with mismatched labels. Add and subtract across unlike denominators before the party\'s health runs dry.'},
									{minCorrect: 3, name: 'Multiplying & Dividing Fractions', story: 'The dungeon recipe for the antidote multiplies and divides fractional ingredients. Get the math wrong and the cure becomes a curse.'},
									{minCorrect: 3, name: 'Fractions, Decimals & Percents', story: 'Three merchants block the road, each quoting the toll in a different form — fraction, decimal, and percent. Convert between them all to pay and pass.'},
									{minCorrect: 3, name: 'Exponents & Square Roots', story: 'The Golem\'s final shield is inscribed with exponents and square roots. Calculate each value to shatter the shield and defeat the creature.'}
								]);
						case 2:
							var _v12 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Order of Operations', story: 'The Monomial Beast attacks in a precise sequence — wrong order means wrong answer and certain doom. Follow PEMDAS to survive the onslaught.'},
									{minCorrect: 3, name: 'Translating & Evaluating Expressions', story: 'The beast\'s ransom demands are written in plain speech, but the dungeon gate reads only algebra. Translate each phrase and evaluate to open the way.'},
									{minCorrect: 3, name: 'Combining Like Terms', story: 'Scattered potion bottles litter the beast\'s lair — matching types must be gathered before the battle begins. Combine like terms to simplify your arsenal.'},
									{minCorrect: 3, name: 'Distributive Property', story: 'The beast surrounds itself with identical minions at every corner. Use the distributive law to sweep them all away in one decisive strike.'},
									{minCorrect: 3, name: 'Simplifying Expressions', story: 'The beast\'s form is tangled with redundant layers. Distribute and combine until the expression stands in its simplest, most vulnerable shape.'},
									{minCorrect: 3, name: 'Factoring Expressions', story: 'The beast\'s armour is bound together by a common factor. Pull out the GCF and the pieces fall apart, leaving the creature exposed.'},
									{minCorrect: 3, name: 'Monomial Operations', story: 'Swarms of monomials multiply, divide, and raise each other to powers. Master the exponent rules to predict and counter every transformation.'}
								]);
						case 3:
							var _v13 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'One-Step Equations', story: 'The Equation Shade vanishes behind a single veil of mystery. Peel it back with one inverse operation to reveal the hidden variable.'},
									{minCorrect: 3, name: 'Two-Step Equations', story: 'The Shade retreats behind two layers of operations — first addition, then multiplication. Undo each step in reverse order to corner the creature.'},
									{minCorrect: 4, name: 'Multi-Step Equations', story: 'The Shade wraps itself in layer upon layer of operations to elude you. Distribute, combine, then isolate until the unknown stands exposed.'},
									{minCorrect: 3, name: 'One-Step Inequalities', story: 'The Shade posts guards with a single condition: only heroes stronger than a threshold may pass. Solve the one-step inequality to prove your worth.'},
									{minCorrect: 3, name: 'Two-Step Inequalities', story: 'The Shade demands two tests of valor before yielding. Solve both steps of the inequality and map the full range of heroes who qualify.'}
								]);
						case 4:
							var _v14 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Ratio Riddles', story: 'The Ratio Wraith shifts its form to match any proportion it chooses, confusing all who pursue it. Simplify the ratio to predict the Wraith\'s true shape.'},
									{minCorrect: 3, name: 'Rates & Unit Rates', story: 'The Wraith charges tolls by the league, but the fine print lists only total fees. Calculate the unit rate to expose the true cost at every checkpoint.'},
									{minCorrect: 3, name: 'Solving Proportions', story: 'The Wraith seals a door with a missing value in a proportion. Cross-multiply to find the unknown and force the door open.'},
									{minCorrect: 3, name: 'Scale Drawings & Models', story: 'The Wraith\'s lair is mapped at a fraction of true scale, and wrong conversions send heroes into walls. Use the map scale to find real distances.'},
									{minCorrect: 3, name: 'Similar Figures', story: 'The Wraith conjures a shadow twin of the dungeon in a different size. Identify the scale factor between similar figures to expose the real passage.'},
									{minCorrect: 3, name: 'Percent Proportion', story: 'The Wraith demands a percentage of the party\'s gold at each gate. Set up the percent proportion to calculate exactly how much you owe.'},
									{minCorrect: 3, name: 'Discounts, Mark-Ups & Tips', story: 'The dungeon market fluctuates wildly — prices drop with discounts and rise with mark-ups. Calculate the final price before the Wraith claims the difference.'},
									{minCorrect: 3, name: 'Simple Interest', story: 'The Wraith loans gold at interest, then vanishes before heroes realize the true cost. Compute the simple interest owed to escape the debt trap.'}
								]);
						case 5:
							var _v15 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Parts of the Coordinate Plane', story: 'The Slope Specter leaves coordinate clues across the grid-patterned dungeon floor. Identify each quadrant correctly to trace the specter\'s path.'},
									{minCorrect: 3, name: 'Relations & Functions', story: 'The Specter surrounds itself with relations — some true functions, some imposters. Apply the definition to expose every fake and find the real creature.'},
									{minCorrect: 3, name: 'Slope from Two Points', story: 'The Specter climbs walls at a constant angle only a true mathematician can measure. Calculate the slope from two points to intercept it at the summit.'},
									{minCorrect: 3, name: 'Slope-Intercept Form', story: 'The dungeon map charts the Specter\'s patrol in y = mx + b form. Evaluate the function to pinpoint the creature\'s location at any moment.'},
									{minCorrect: 3, name: 'Linear Function Values', story: 'The Specter\'s speed is encoded in f(x) notation on a crumbling scroll. Evaluate the function at key values to predict every waypoint on its route.'},
									{minCorrect: 3, name: 'Proportional Relationships', story: 'The Specter moves at a constant rate — a perfect proportional relationship. Find the constant of variation and project the beast\'s next position.'}
								]);
						case 6:
							var _v16 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Classifying Angles', story: 'The Angle Fiend carves angles into every dungeon wall to disorient heroes. Classify each angle as acute, right, obtuse, or straight to navigate safely.'},
									{minCorrect: 3, name: 'Complementary & Supplementary Angles', story: 'The Fiend splits corridors at angles that must sum to 90° or 180°. Find the missing angle to straighten the path and advance.'},
									{minCorrect: 3, name: 'Vertical Angles', story: 'The Fiend stands at the intersection of two blades, claiming the angles are different. Prove they are equal — vertical angles never lie.'},
									{minCorrect: 3, name: 'Triangle Sum Theorem', story: 'The Fiend hides behind triangular shields with one angle concealed. Use the triangle angle sum to reveal the hidden measure and shatter the shield.'},
									{minCorrect: 3, name: 'Classifying Triangles', story: 'The Fiend morphs between equilateral, isosceles, and scalene forms. Name each triangle type correctly to strip away its disguise.'},
									{minCorrect: 3, name: 'Translations', story: 'The Fiend slides across the dungeon grid, always moving by a fixed vector. Track the translation to find exactly where the creature will reappear.'}
								]);
						case 7:
							var _v17 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Perimeter & Area', story: 'The Volume Titan seals the treasure room with stone tiles, and you must calculate every edge and square unit to find the hidden lever. Measure precisely before the door closes.'},
									{minCorrect: 3, name: 'Circumference & Area of Circles', story: 'Circular runes pulsing on the dungeon floor hold the Titan\'s power. Calculate their circumference and area to contain the energy before it explodes.'},
									{minCorrect: 3, name: 'Surface Area of Rectangular Prisms', story: 'The Titan wraps itself in stone armour shaped like a rectangular prism. Calculate the total surface area to know exactly how much magic coating to apply.'},
									{minCorrect: 3, name: 'Surface Area of Cylinders', story: 'The Titan\'s cylindrical traps must be sealed with warding metal. Compute the full surface area so the blacksmith can cut the right amount of steel.'},
									{minCorrect: 3, name: 'Volume of Rectangular Prisms', story: 'The Titan fills rectangular chambers with poison gas. Knowing the volume tells you how long you have before the air runs out — calculate it and run.'},
									{minCorrect: 3, name: 'Volume of Cylinders', story: 'Cylindrical cisterns scattered across the Titan\'s lair hold the flooding water. Find each cylinder\'s volume to predict when the chamber will overflow.'}
								]);
						case 8:
							var _v18 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Simple Probability', story: 'The Probability Lich casts spells at random, and only by knowing the true odds can you dodge them in time. Calculate the probability of each attack.'},
									{minCorrect: 3, name: 'Counting Principle', story: 'The Lich locks its phylactery behind a combination of choices — shirt, color, and key. Use the counting principle to enumerate every possibility.'},
									{minCorrect: 3, name: 'Compound Probability', story: 'The Lich attacks with two spells at once — independent events chained together. Multiply the probabilities to find the true odds of both landing.'},
									{minCorrect: 3, name: 'Mean, Median & Mode', story: 'The dungeon archives hold centuries of battle records. Find the mean, median, and mode of the data to reveal the Lich\'s hidden pattern of attack.'},
									{minCorrect: 3, name: 'Box-and-Whisker Plots', story: 'The Lich\'s damage records spread across a wide range. Find the IQR from the quartiles to measure the true spread of its power.'},
									{minCorrect: 3, name: 'Stem-and-Leaf Plots', story: 'The Lich\'s attack log is recorded on ancient scrolls in stem-and-leaf form. Decode each entry to reconstruct the data set and predict the next strike.'}
								]);
						default:
							break _v0$41;
					}
				case 'PreAlgebra':
					switch (_v0.b.a) {
						case 1:
							var _v21 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Absolute Value', story: 'The Root Revenant dwells at zero on the number line, casting curses of equal strength in both directions. Master absolute value to measure the true distance of each curse and turn it back on the beast.'},
									{minCorrect: 3, name: 'Simplifying Fractions', story: 'The Revenant hides behind fractions in their most complex disguise, each one reducible to a simpler truth. Strip them down to lowest terms and expose the creature\'s real form.'},
									{minCorrect: 3, name: 'Fraction Operations', story: 'The dungeon vault is sealed by a lock that only opens when the correct fractional sum is entered. Add, subtract, multiply, and divide fractions to crack the combination.'},
									{minCorrect: 3, name: 'Zero & Negative Exponents', story: 'The Revenant flips its power to the dark side, wielding negative and zero exponents as shields. Learn the rules of inverted powers to strip away its defence.'},
									{minCorrect: 3, name: 'Square Roots', story: 'The dungeon walls are carved with square rune locks — each rune is a perfect square whose root unlocks a door. Extract each square root before the corridor collapses.'},
									{minCorrect: 3, name: 'Cube Roots', story: 'Deeper in the dungeon, cubic rune vaults demand their cube roots before granting passage. Solve each cubic lock to reveal the hidden chambers beyond.'},
									{minCorrect: 3, name: 'Scientific Notation', story: 'The archive of the Revenant\'s ancient wars records casualties in numbers too vast to write in full. Rewrite them in scientific notation to fit the enchanted stone tablets.'},
									{minCorrect: 3, name: 'Order of Operations', story: 'The Revenant scrambles the order of spells to maximize chaos, but a true mathematician knows the sequence. Apply the correct order of operations to unravel each enchantment.'}
								]);
						case 2:
							var _v22 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Translating Expressions', story: 'The Poly Phantom speaks in riddles of words that must be decoded into algebra. Translate each phrase into a proper expression or the Phantom\'s power will compound unchecked.'},
									{minCorrect: 3, name: 'Combining Like Terms', story: 'Spectral monomials float loose in the dungeon hall, and only by gathering the like ones can you weaken the Phantom\'s form. Combine the terms and strip the creature of its layers.'},
									{minCorrect: 3, name: 'Distribute & Combine', story: 'The Phantom cloaks itself in parentheses that must be opened before the like terms within can be gathered. Distribute the factor, then combine to simplify the expression completely.'},
									{minCorrect: 3, name: 'Factoring Linear Expressions', story: 'The Phantom\'s bindings are written as expanded expressions — factor out the greatest common factor to collapse the binding and weaken the creature.'},
									{minCorrect: 3, name: 'Monomial Operations', story: 'The Phantom\'s limbs are monomials that multiply and divide in combat. Apply the exponent rules to predict the outcome of each exchange and stay one step ahead.'},
									{minCorrect: 3, name: 'Adding & Subtracting Polynomials', story: 'Two spectral polynomial armies collide in the dungeon hall. Combine their like terms to merge the forces under one banner and march on the Phantom\'s lair.'}
								]);
						case 3:
							var _v23 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'One-Step Equations', story: 'The Multi-Step Mage opens with a simple trick — a single-operation equation designed to lower your guard. Solve each one cleanly before the Mage escalates the assault.'},
									{minCorrect: 3, name: 'Rational Equations', story: 'The Mage hides the variable beneath a fraction, daring you to multiply through and expose it. Isolate x and break the Mage\'s fractional shield.'},
									{minCorrect: 4, name: 'Two-Step Equations', story: 'The Mage attacks in two phases — first adding a constant to confuse, then multiplying to conceal. Undo both operations in reverse order to find the hidden value.'},
									{minCorrect: 3, name: 'Solving by Square Roots', story: 'The Mage squares the variable and dares you to unsquare it. Take the square root of both sides to reveal what was hidden beneath the exponent.'},
									{minCorrect: 4, name: 'Multi-Step Equations', story: 'The Mage layers operations three deep — distribute, combine, then isolate. Work through every step without error to bring the creature to its knees.'},
									{minCorrect: 3, name: 'Equations with Fractions', story: 'The Mage encloses the variable in a fractional cage and sets a condition on the whole. Clear the denominator to open the cage and solve for x.'},
									{minCorrect: 3, name: 'Two-Step Inequalities', story: 'The Mage sets not a single target but a range of forbidden values. Solve the two-step inequality and identify the full territory the hero may safely occupy.'}
								]);
						case 4:
							var _v24 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Simplifying Ratios', story: 'The Percent Predator guards the market in disguise, quoting prices in unsimplified ratios to confuse buyers. Simplify each ratio to expose the true exchange rate and foil the creature.'},
									{minCorrect: 3, name: 'Unit Rates', story: 'The Predator charges by the batch but hides the per-unit cost to overcharge heroes. Divide the total by the quantity to find the true unit rate before paying up.'},
									{minCorrect: 3, name: 'Solving Proportions', story: 'The Predator\'s lair is mapped in scaled proportions, and crossing the wrong threshold means a trap. Set up and solve the cross-multiplication to navigate safely.'},
									{minCorrect: 3, name: 'Similar Figures', story: 'The Predator projects illusions of itself at different scales to confuse the eye. Use the scale factor between similar figures to determine the true size of each image.'},
									{minCorrect: 3, name: 'Percent Proportion', story: 'The Predator taxes every transaction in the dungeon market at a percentage rate. Apply the percent proportion to calculate each levy before it empties your coin pouch.'},
									{minCorrect: 3, name: 'Percent of Change', story: 'The Predator raises and lowers prices at will to confuse merchants. Calculate the percent increase or decrease to track the creature\'s scheme and stay solvent.'},
									{minCorrect: 3, name: 'Simple Interest', story: 'The Predator loans gold at a fixed annual rate, then demands full repayment before heroes realize how much they owe. Compute the simple interest to expose the trap in time.'}
								]);
						case 5:
							var _v25 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Functions & Domain/Range', story: 'The Slope Stalker patrols only within specific input and output boundaries. Determine the domain and range of each relation to map the creature\'s territory before pursuing it.'},
									{minCorrect: 3, name: 'Slope from Two Points', story: 'Two scouts reported the Stalker\'s position at different times. Use those two coordinates to calculate the slope of its path and predict where it will strike next.'},
									{minCorrect: 3, name: 'The Slope Formula', story: 'The dungeon surveyor has marked two waypoints along the Stalker\'s route. Apply the slope formula to determine the exact steepness of its approach.'},
									{minCorrect: 3, name: 'Slope-Intercept Form', story: 'The Stalker\'s full trajectory is encoded in y = mx + b. Read the slope and y-intercept directly from the equation and use them to predict every position on the path.'},
									{minCorrect: 4, name: 'Writing Linear Equations', story: 'A scout witnessed the Stalker pass two landmarks. Write the linear equation from those two points to project the creature\'s destination before it vanishes.'},
									{minCorrect: 3, name: 'Direct Variation', story: 'The Stalker\'s speed varies directly with the phase of the moon — a perfect proportional relationship. Use the constant of variation to predict its pace under any moon.'},
									{minCorrect: 3, name: 'Identifying Slope & Intercept', story: 'The Stalker leaves equations carved in stone at each campsite. Read each equation in slope-intercept form and extract the slope and y-intercept to reconstruct its route.'}
								]);
						case 6:
							var _v26 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 4, name: 'Systems by Substitution', story: 'The System Serpent\'s two heads patrol paths that can be related by a single substitution. Fold one equation into the other to reduce the system and strike at the convergence point.'},
									{minCorrect: 4, name: 'Systems by Elimination', story: 'Neither of the Serpent\'s heads can be caught alone, but their paths add to a perfect cancellation. Eliminate one variable by combining the equations and isolate the truth.'},
									{minCorrect: 3, name: 'System Word Problems', story: 'Villagers report two numbers whose sum and difference are known but whose individual values remain hidden. Set up and solve the system to unmask each number and claim your reward.'},
									{minCorrect: 4, name: 'Systems Challenge', story: 'The Serpent\'s final form demands mastery of all system-solving techniques. Choose your method wisely and find the exact point of intersection before the creature regenerates.'}
								]);
						case 7:
							var _v27 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Angle Types', story: 'The Theorem Troll sets sentinels at every angle of the dungeon — acute guards at sharp bends, obtuse ones at wide passages, and a right-angle golem at the central gate. Name each type to command passage.'},
									{minCorrect: 3, name: 'Angle Relationships', story: 'The Troll chains pairs of angles together with enchanted links — complementary bonds summing to 90° and supplementary bonds summing to 180°. Break the link by finding the unknown angle.'},
									{minCorrect: 3, name: 'Triangle Sum Theorem', story: 'The Troll\'s triangular fortress conceals one angle in shadow. Apply the triangle sum theorem — all three angles sum to 180° — to reveal the hidden angle and breach the wall.'},
									{minCorrect: 3, name: 'Pythagorean Theorem', story: 'A right-angle bridge spans the chasm guarding the Troll\'s lair, and one side is missing from the blueprint. Apply the Pythagorean theorem to find the unknown length before the bridge is built wrong.'},
									{minCorrect: 3, name: 'Interior Angles of Polygons', story: 'The Troll\'s outer walls are polygons of many sides, each interior angle locked by a ward. Use the polygon interior-angle formula to calculate the total and disable every ward at once.'},
									{minCorrect: 3, name: 'Reflections & Translations', story: 'The Troll uses reflection and translation spells to reposition its guards instantly. Track each transformed coordinate to locate the guard\'s new post and position your counter-strike.'},
									{minCorrect: 3, name: 'Dilations', story: 'The Troll shrinks and enlarges its minions at will using dilation magic. Apply the scale factor to each coordinate to predict the new size and position of the transformed creature.'}
								]);
						case 8:
							var _v28 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Area & Perimeter', story: 'The Volume Viper seals passages with rectangular and triangular stone slabs enchanted by area. Calculate the area of each slab to know exactly how much warding dust is needed to dissolve it.'},
									{minCorrect: 3, name: 'Circle Area & Circumference', story: 'Circular rune seals pulsate on the dungeon floor, each demanding its exact area and circumference before it can be safely deactivated. Calculate both measurements to defuse every seal.'},
									{minCorrect: 3, name: 'Composite Figures', story: 'The Viper\'s chamber is floored with composite shapes — rectangles capped with triangles and circles merged with squares. Add the parts together to find the total area before the Viper returns.'},
									{minCorrect: 3, name: 'Volume of Prisms', story: 'The Viper stores its venom in rectangular prism vaults sealed with a volume lock. Calculate the volume of each prism to know the correct amount of antidote needed to fill the space.'},
									{minCorrect: 3, name: 'Volume of Cones', story: 'The Viper\'s lairs are conical pits filling with rising acid. Find each cone\'s volume to determine how long you have before the acid overflows and blocks the exit.'},
									{minCorrect: 3, name: 'Surface Area of Prisms', story: 'Sealing the Viper\'s rectangular vaults requires coating every face with warding stone. Compute the total surface area of each prism so the stonecutters prepare exactly the right amount.'},
									{minCorrect: 3, name: 'Volume of Spheres', story: 'The Viper rolls spherical boulders down the corridor, each one a sealed poison vessel. Compute the volume of each sphere to determine the danger level and calculate the required countermeasure.'}
								]);
						case 9:
							var _v29 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Simple Probability', story: 'The Scatter Shade draws attacks at random from a bag of cursed tokens. Calculate the probability of each outcome to know the odds before you commit to a defensive stance.'},
									{minCorrect: 3, name: 'Counting Outcomes', story: 'The Shade locks each treasure chest with a combination of choices from several categories. Apply the counting principle to tally every possible combination and narrow down the one that opens the lock.'},
									{minCorrect: 3, name: 'Compound Probability', story: 'The Shade chains events together, each independent of the last. Multiply the individual probabilities to find the chance that all outcomes align in the worst-case scenario.'},
									{minCorrect: 3, name: 'Measures of Center', story: 'Scouts return with conflicting damage reports, and the commander needs a single representative value. Find the mean, median, or range to distill the data into the one number that guides the next decision.'},
									{minCorrect: 3, name: 'Mean Absolute Deviation', story: 'The Shade\'s attack strength varies unpredictably, and the strategist needs a measure of that variability. Compute the mean absolute deviation to quantify how wildly the Shade\'s power fluctuates.'},
									{minCorrect: 3, name: 'Two-Way Tables', story: 'Informants have filed battle reports sorted by faction and outcome in a two-way table. Read the data correctly to answer the commander\'s questions and plan the final assault.'}
								]);
						default:
							break _v0$41;
					}
				default:
					switch (_v0.b.a) {
						case 1:
							var _v32 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Order of Operations', story: 'The Algebra Ogre mixes up the order of attacks to batter heroes into submission. Demonstrate perfect order-of-operations discipline to weather the assault.'},
									{minCorrect: 3, name: 'Evaluating Expressions', story: 'The Ogre\'s fortress is sealed by an algebraic lock — substitute the given value and evaluate the expression before the gate slams shut forever.'},
									{minCorrect: 3, name: 'Absolute Value', story: 'The Ogre hurls boulders from both sides of zero. No matter the direction, absolute value measures the true distance — master it to predict every impact.'},
									{minCorrect: 3, name: 'Combining Like Terms', story: 'The Ogre\'s armour is made of redundant layers of like terms. Strip them away by combining coefficients and find the core you must pierce.'},
									{minCorrect: 3, name: 'Translating Expressions', story: 'Village elders speak of the Ogre\'s weaknesses only in riddles. Translate each word phrase into algebraic language to decode the secret of its defeat.'},
									{minCorrect: 4, name: 'Two-Step Equations', story: 'The Ogre guards the dungeon behind a two-stage lock. Undo each operation in reverse order to peel open the gate and step inside.'},
									{minCorrect: 3, name: 'Two-Step Inequalities', story: 'The Ogre will only let heroes of a certain strength range pass. Solve the two-step inequality to prove you fall within the acceptable limits.'}
								]);
						case 2:
							var _v33 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 4, name: 'Multi-Step Equations', story: 'The Equation Wraith attacks through multiple phases of increasing complexity. Solve each step in turn and deny it the power to advance.'},
									{minCorrect: 4, name: 'Variables on Both Sides', story: 'The Wraith mirrors your every move, placing variables on both sides of the battlefield. Collect like terms and isolate the truth to break the stalemate.'},
									{minCorrect: 3, name: 'Algebraic Proportions', story: 'The Wraith hides inside a ratio, balancing two fractions across an invisible fulcrum. Cross-multiply to topple its equilibrium and drag it into the open.'},
									{minCorrect: 3, name: 'Absolute Value Equations', story: 'The Wraith exists in two mirror dimensions simultaneously. Solve the absolute value equation to locate it in both dimensions at once.'},
									{minCorrect: 3, name: 'Literal Equations', story: 'The Wraith\'s true name is hidden in a multi-variable formula. Rearrange the literal equation to isolate the name and speak it aloud.'},
									{minCorrect: 3, name: 'Multi-Step Inequalities', story: 'The Wraith declares only heroes within a certain power range may face it. Solve the multi-step inequality to confirm your eligibility before the duel begins.'}
								]);
						case 3:
							var _v34 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Domain & Range', story: 'The Function Fiend lurks only within certain bounds of input and output. Identify the domain and range to know exactly where to search for the creature.'},
									{minCorrect: 3, name: 'Identifying Functions', story: 'The Fiend surrounds itself with relations — some true functions, some imposters. Expose every fake by checking whether each x-value maps to a unique output.'},
									{minCorrect: 3, name: 'Function Notation', story: 'The Fiend communicates in f(x) notation that baffles common folk. Learn to read and evaluate function notation to understand its commands.'},
									{minCorrect: 3, name: 'Function Tables', story: 'The Fiend leaves a table of encrypted values at every checkpoint. Fill in the missing outputs by applying the function rule to each input.'},
									{minCorrect: 3, name: 'Arithmetic Sequences', story: 'The Fiend marches in perfectly spaced waves, each arriving at a predictable interval. Identify the common difference and name the next term before the wave arrives.'}
								]);
						case 4:
							var _v35 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Slope from Two Points', story: 'The Linear Leviathan rises at a constant rate from the ocean floor. Given two points on its trajectory, calculate the slope before it breaches the surface.'},
									{minCorrect: 4, name: 'Slope-Intercept Form', story: 'The Leviathan patrols along a line described in slope-intercept form. Read the slope and y-intercept directly from the equation to chart its exact course.'},
									{minCorrect: 3, name: 'Y-Intercepts', story: 'The Leviathan surfaces where the ocean floor meets the y-axis. Set x = 0 in the standard-form equation to pinpoint the landing zone.'},
									{minCorrect: 3, name: 'X-Intercepts', story: 'The Leviathan dives at the x-axis, leaving a mark exactly where y = 0. Solve for x to find the dive point before it vanishes beneath the waves.'},
									{minCorrect: 3, name: 'Point-Slope Equations', story: 'A lookout spotted the Leviathan at one coordinate moving at a known slope. Write the equation from a single point and the rate to predict its next position.'},
									{minCorrect: 3, name: 'Parallel Lines', story: 'The Leviathan carves parallel channels through the seafloor — lines that never meet. Recognize that parallel lines share the same slope to navigate around them.'},
									{minCorrect: 3, name: 'Perpendicular Lines', story: 'The Leviathan leaves perpendicular scars that cut channels at right angles. Find the negative reciprocal slope to identify each crossing cut.'}
								]);
						case 5:
							var _v36 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 4, name: 'Systems by Substitution', story: 'One patrol\'s position is fully determined by the other. Substitute and collapse the system into a single equation to corner the reunited Specter.'},
									{minCorrect: 4, name: 'Systems by Elimination', story: 'Neither patrol can be caught alone, but their combined equations contain a cancellation. Eliminate a variable to expose the Specter\'s hiding place.'},
									{minCorrect: 3, name: 'System Word Problems', story: 'The Specter has split the dungeon loot into two unknown piles and left only clues about their sum and difference. Set up and solve the system to reclaim every coin.'},
									{minCorrect: 3, name: 'Identifying System Solutions', story: 'The Specter offers several coordinates as its supposed location — only one satisfies both patrol equations. Test each pair and call out the truth.'},
									{minCorrect: 3, name: 'Systems by Graphing', story: 'The System Specter splits into two ghostly patrols on intersecting paths. Graph both equations and mark the intersection to summon the Specter into one vulnerable form.'},
									{minCorrect: 3, name: 'Systems of Inequalities', story: 'The Specter can roam freely within a shaded region where two inequality conditions overlap. Solve the system of inequalities to fence it inside the smallest possible area.'}
								]);
						case 6:
							var _v37 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Product Rule', story: 'The Exponent Elemental multiplies its power cores together, growing stronger in an instant. Apply the product rule to add exponents and predict the final magnitude.'},
									{minCorrect: 3, name: 'Quotient Rule', story: 'The Elemental sheds power cores at each encounter. Apply the quotient rule to subtract exponents and track how much energy remains.'},
									{minCorrect: 3, name: 'Power of a Power', story: 'The Elemental raises itself to a higher power every time you fail to strike. Use the power-of-a-power rule — multiply the exponents — to keep pace.'},
									{minCorrect: 3, name: 'Negative Exponents', story: 'The Elemental vanishes toward zero and flips into a fraction when struck with a negative exponent. Master this to reduce it to nearly nothing.'},
									{minCorrect: 3, name: 'Scientific Notation', story: 'The Elemental records its energy in numbers too vast for normal scrolls. Rewrite each quantity in scientific notation before the ink runs dry.'},
									{minCorrect: 3, name: 'Exponential Growth & Decay', story: 'The Elemental\'s army either doubles each hour or dwindles by half. Model the growth and decay to know when to strike for maximum effect.'},
									{minCorrect: 3, name: 'Simplifying Radicals', story: 'The Elemental hides its true magnitude beneath nested roots. Factor out perfect squares from each radical to reveal the simplified form.'}
								]);
						case 7:
							var _v38 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Adding & Subtracting Polynomials', story: 'The Poly Predator assembles itself from scattered monomials it finds on the dungeon floor. Combine like terms to counter each new form it takes.'},
									{minCorrect: 3, name: 'Monomial × Polynomial', story: 'The Predator coats its body in a common factor and flings it outward. Distribute the monomial across every term to neutralize the expansion.'},
									{minCorrect: 4, name: 'Multiplying Binomials (FOIL)', story: 'The Predator spawns new terms by multiplying its own limbs together. Use FOIL — First, Outer, Inner, Last — to predict and neutralize each spawn.'},
									{minCorrect: 3, name: 'Factoring GCF', story: 'The Predator\'s outer shell is held together by a greatest common factor. Pull it out from every term to crack the shell and expose the weakness inside.'},
									{minCorrect: 3, name: 'Difference of Squares', story: 'The Predator presents a perfect square minus another perfect square, believing it cannot be factored. Apply the difference-of-squares identity to prove it wrong.'},
									{minCorrect: 4, name: 'Factoring Trinomials', story: 'The Predator\'s strength comes from the trinomial that binds it together. Find the factor pair that multiplies to c and adds to b to unravel the binding completely.'}
								]);
						case 8:
							var _v39 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Axis of Symmetry', story: 'The Quadra Shade sails in a perfect parabolic arc, and its axis of symmetry reveals the peak. Calculate x = −b/(2a) to find the line it mirrors itself across.'},
									{minCorrect: 3, name: 'The Discriminant', story: 'Before solving, the wise mage checks b²−4ac to know how many roots the Shade has. Compute the discriminant to prepare the right counterstrike.'},
									{minCorrect: 4, name: 'Solving by Factoring', story: 'The Shade\'s arc is described by a quadratic that factors cleanly. Find the factors and set each to zero to discover both landing sites.'},
									{minCorrect: 3, name: 'Solving by Square Roots', story: 'When the quadratic has no middle term, the square-root method cuts straight to the answer. Isolate x² and take the positive and negative roots.'},
									{minCorrect: 4, name: 'The Quadratic Formula', story: 'When the Shade\'s arc cannot be factored, only the ancient quadratic formula can reveal its roots. Recite the formula and solve for both landing sites.'},
									{minCorrect: 3, name: 'Vertex Form', story: 'The Shade\'s path is encoded in vertex form, hiding the peak and turning point. Read h and k from the equation to expose the vertex instantly.'}
								]);
						case 9:
							var _v40 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Identifying Function Types', story: 'The Regression Revenant shifts between linear, quadratic, and exponential forms to confuse trackers. Study each equation and classify the function type to predict its next shape.'},
									{minCorrect: 3, name: 'Piecewise Functions', story: 'The Revenant behaves differently in different regions of the dungeon. Evaluate the piecewise function correctly for each zone to track its true location.'},
									{minCorrect: 3, name: 'Classifying from Equations', story: 'The Revenant has left three equations on the dungeon wall, one for each of its forms. Identify which is linear, which is quadratic, and which is exponential to unmask it.'},
									{minCorrect: 3, name: 'Evaluating Piecewise Functions', story: 'The Revenant activates different rules depending on which corridor it occupies. Substitute the given input into the correct piece of the function to find its power level.'}
								]);
						case 10:
							var _v41 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Simplifying Rational Expressions', story: 'The Rational Reaper\'s armour is made of unsimplified fractions that clink and drag it down. Cancel the common factors to strip away the armour piece by piece.'},
									{minCorrect: 4, name: 'Multiplying Rational Expressions', story: 'The Reaper fuses its fractional shields together in battle, multiplying them at will. Multiply numerators and denominators then simplify to see the true reduced form.'},
									{minCorrect: 3, name: 'Dividing Rational Expressions', story: 'The Reaper splits its shields apart, dividing fractions to confuse you. Flip the second fraction and multiply to cut through the confusion.'},
									{minCorrect: 4, name: 'Adding Rational Expressions', story: 'The Reaper fights on two fronts, combining fractions from different directions. Find the common denominator and add the expressions to consolidate the defence.'}
								]);
						case 11:
							var _v42 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Simplifying Radicals', story: 'The Radical Rider charges on a mount whose speed is measured in nested roots. Simplify each radical to calculate the true speed and plan your interception.'},
									{minCorrect: 3, name: 'Adding & Subtracting Radicals', story: 'The Rider hurls radical javelins from multiple angles. Combine like radicals — those with the same radicand — to tally the total force of the barrage.'},
									{minCorrect: 3, name: 'Multiplying Radicals', story: 'Two radical projectiles collide mid-air and merge into one. Multiply the radicands together and simplify the result before it explodes.'},
									{minCorrect: 4, name: 'Radical Equations', story: 'The Rider\'s battle cry is a radical equation that locks the dungeon gate. Isolate the radical, square both sides, and solve to break the seal.'},
									{minCorrect: 4, name: 'Advanced Radical Equations', story: 'The Rider returns with harder equations — the radical buried deeper inside. Isolate, square, and check for extraneous solutions to fully defeat the curse.'}
								]);
						case 12:
							var _v43 = _v0.a;
							return _List_fromArray(
								[
									{minCorrect: 3, name: 'Mean & Spread', story: 'The Variance Viper\'s poison affects heroes differently — the mean and spread of damage tell you who is most at risk. Calculate both to prioritize healing.'},
									{minCorrect: 3, name: 'Z-Scores', story: 'The Viper\'s venom strength follows a normal distribution the alchemist has catalogued. Compute the z-score to determine how extreme each dose is compared to the average.'},
									{minCorrect: 3, name: 'Variance', story: 'The Viper\'s strike timing varies around a mean — the variance measures how chaotic the pattern is. Compute variance from the deviations to predict the most dangerous window.'},
									{minCorrect: 3, name: 'Normal Distribution', story: 'The Viper\'s attacks cluster in a bell curve — most strikes near the centre, few at the extremes. Apply normal distribution knowledge to identify the safe zones.'}
								]);
						default:
							break _v0$41;
					}
			}
		} else {
			switch (_v0.a.$) {
				case 'Course1':
					var _v9 = _v0.a;
					var _v10 = _v0.b;
					return _List_Nil;
				case 'Course2':
					var _v19 = _v0.a;
					var _v20 = _v0.b;
					return _List_Nil;
				case 'PreAlgebra':
					var _v30 = _v0.a;
					var _v31 = _v0.b;
					return _List_Nil;
				default:
					var _v44 = _v0.a;
					var _v45 = _v0.b;
					return _List_Nil;
			}
		}
	}
	return _List_Nil;
};
var $author$project$Main$handleQuestAnswer = F4(
	function (qi, isCorrect, state, model) {
		var quests = $author$project$Game$Curriculum$questsFor(state.unit);
		var newStreak = isCorrect ? (state.streak + 1) : 0;
		var newCorrect = isCorrect ? (state.correctInQuest + 1) : state.correctInQuest;
		var minCorrect = A2(
			$elm$core$Maybe$withDefault,
			3,
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.minCorrect;
				},
				$elm$core$List$head(
					A2($elm$core$List$drop, qi, quests))));
		var questDone = isCorrect && (_Utils_cmp(newCorrect, minCorrect) > -1);
		if (isCorrect) {
			var _v0 = A2(
				$elm$random$Random$step,
				A3($author$project$Game$Problem$generatorFor, state.unit, qi, newCorrect),
				model.seed);
			var nextProblem = _v0.a;
			var newSeed = _v0.b;
			var newState = _Utils_update(
				state,
				{
					correctInQuest: newCorrect,
					input: $author$project$Game$Battle$defaultInput(nextProblem.inputType),
					phase: questDone ? $author$project$Types$QuestComplete : $author$project$Types$ShowResult($author$project$Types$CorrectHit),
					problem: nextProblem,
					problemsDone: state.problemsDone + 1,
					streak: newStreak
				});
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						screen: $author$project$Types$BattleScreen(newState),
						seed: newSeed
					}),
				questDone ? $elm$core$Platform$Cmd$none : $author$project$Main$flashCmd);
		} else {
			var newState = _Utils_update(
				state,
				{
					phase: A2($author$project$Types$ShowTutorial, state.problem, 0),
					problemsDone: state.problemsDone + 1,
					streak: 0
				});
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						screen: $author$project$Types$BattleScreen(newState)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$handleAnswer = F2(
	function (state, model) {
		var isCorrect = A2($author$project$Game$Battle$checkAnswer, state.input, state.problem.answer);
		var _v0 = state.mode;
		if (_v0.$ === 'QuestMode') {
			var qi = _v0.a;
			return A4($author$project$Main$handleQuestAnswer, qi, isCorrect, state, model);
		} else {
			return A3($author$project$Main$handleBossAnswer, isCorrect, state, model);
		}
	});
var $author$project$Types$QuestIntro = {$: 'QuestIntro'};
var $author$project$Types$QuestMode = function (a) {
	return {$: 'QuestMode', a: a};
};
var $author$project$Config$playerMaxHp = 100;
var $author$project$Game$Battle$initialPracticeState = F3(
	function (uid, questIndex, problem) {
		return {
			animFrame: $author$project$Types$FrameA,
			bossHp: 0,
			bossMaxHp: 0,
			correctInQuest: 0,
			input: $author$project$Game$Battle$defaultInput(problem.inputType),
			mode: $author$project$Types$QuestMode(questIndex),
			phase: $author$project$Types$QuestIntro,
			playerHp: $author$project$Config$playerMaxHp,
			practice: true,
			problem: problem,
			problemsDone: 0,
			streak: 0,
			unit: uid
		};
	});
var $author$project$Game$Curriculum$regularUnitCount = function (c) {
	switch (c.$) {
		case 'Course1':
			return 8;
		case 'Course2':
			return 8;
		case 'PreAlgebra':
			return 9;
		default:
			return 12;
	}
};
var $author$project$Game$Curriculum$nextUnit = function (uid) {
	var _v0 = uid.unit;
	if (_v0.$ === 'Unit') {
		var n = _v0.a;
		return (_Utils_cmp(
			n,
			$author$project$Game$Curriculum$regularUnitCount(uid.course)) < 0) ? $elm$core$Maybe$Just(
			_Utils_update(
				uid,
				{
					unit: $author$project$Types$Unit(n + 1)
				})) : $elm$core$Maybe$Just(
			_Utils_update(
				uid,
				{unit: $author$project$Types$MegaBoss}));
	} else {
		var _v1 = uid.course;
		switch (_v1.$) {
			case 'Course1':
				return $elm$core$Maybe$Just(
					{
						course: $author$project$Types$Course2,
						unit: $author$project$Types$Unit(1)
					});
			case 'Course2':
				return $elm$core$Maybe$Just(
					{
						course: $author$project$Types$PreAlgebra,
						unit: $author$project$Types$Unit(1)
					});
			case 'PreAlgebra':
				return $elm$core$Maybe$Just(
					{
						course: $author$project$Types$Algebra1,
						unit: $author$project$Types$Unit(1)
					});
			default:
				return $elm$core$Maybe$Nothing;
		}
	}
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$saveName = _Platform_outgoingPort('saveName', $elm$json$Json$Encode$string);
var $author$project$Types$BossMode = {$: 'BossMode'};
var $author$project$Game$Curriculum$bossHpFor = function (uid) {
	var _v0 = _Utils_Tuple2(uid.course, uid.unit);
	_v0$0:
	while (true) {
		switch (_v0.a.$) {
			case 'Course1':
				if (_v0.b.$ === 'MegaBoss') {
					break _v0$0;
				} else {
					var _v2 = _v0.a;
					return 280;
				}
			case 'Course2':
				if (_v0.b.$ === 'MegaBoss') {
					break _v0$0;
				} else {
					var _v3 = _v0.a;
					return 280;
				}
			case 'PreAlgebra':
				if (_v0.b.$ === 'MegaBoss') {
					break _v0$0;
				} else {
					var _v4 = _v0.a;
					return 280;
				}
			default:
				if (_v0.b.$ === 'MegaBoss') {
					break _v0$0;
				} else {
					var _v5 = _v0.a;
					return 280;
				}
		}
	}
	var _v1 = _v0.b;
	return 350;
};
var $author$project$Game$Battle$initialBattleState = F2(
	function (uid, problem) {
		return {
			animFrame: $author$project$Types$FrameA,
			bossHp: $author$project$Game$Curriculum$bossHpFor(uid),
			bossMaxHp: $author$project$Game$Curriculum$bossHpFor(uid),
			correctInQuest: 0,
			input: $author$project$Game$Battle$defaultInput(problem.inputType),
			mode: $author$project$Types$BossMode,
			phase: $author$project$Types$Idle,
			playerHp: $author$project$Config$playerMaxHp,
			practice: false,
			problem: problem,
			problemsDone: 0,
			streak: 0,
			unit: uid
		};
	});
var $author$project$Main$startBoss = F2(
	function (uid, model) {
		var _v0 = A2(
			$elm$random$Random$step,
			A3($author$project$Game$Problem$generatorFor, uid, -1, 0),
			model.seed);
		var problem = _v0.a;
		var newSeed = _v0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					screen: $author$project$Types$BattleScreen(
						A2($author$project$Game$Battle$initialBattleState, uid, problem)),
					seed: newSeed
				}),
			$author$project$Main$focusFirstInput(_Utils_Tuple0));
	});
var $author$project$Game$Battle$initialQuestState = F3(
	function (uid, questIndex, problem) {
		return {
			animFrame: $author$project$Types$FrameA,
			bossHp: 0,
			bossMaxHp: 0,
			correctInQuest: 0,
			input: $author$project$Game$Battle$defaultInput(problem.inputType),
			mode: $author$project$Types$QuestMode(questIndex),
			phase: $author$project$Types$QuestIntro,
			playerHp: $author$project$Config$playerMaxHp,
			practice: false,
			problem: problem,
			problemsDone: 0,
			streak: 0,
			unit: uid
		};
	});
var $author$project$Main$startQuest = F3(
	function (uid, questIndex, model) {
		var _v0 = A2(
			$elm$random$Random$step,
			A3($author$project$Game$Problem$generatorFor, uid, questIndex, 0),
			model.seed);
		var problem = _v0.a;
		var newSeed = _v0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					screen: $author$project$Types$BattleScreen(
						A3($author$project$Game$Battle$initialQuestState, uid, questIndex, problem)),
					seed: newSeed
				}),
			$elm$core$Platform$Cmd$none);
	});
var $elm$core$String$trim = _String_trim;
var $elm$core$String$toLower = _String_toLower;
var $author$project$Game$Passcode$unitForCode = function (raw) {
	return A2(
		$elm$core$Dict$get,
		$elm$core$String$toLower(
			$elm$core$String$trim(raw)),
		$author$project$Game$Passcode$table);
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'GoToTitle':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							confirmingExit: false,
							highestUnlocked: {
								course: $author$project$Types$Course1,
								unit: $author$project$Types$Unit(1)
							},
							playerName: '',
							screen: $author$project$Types$TitleScreen
						}),
					$author$project$Main$saveName(''));
			case 'RequestExit':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{confirmingExit: true}),
					$elm$core$Platform$Cmd$none);
			case 'CancelExit':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{confirmingExit: false}),
					$elm$core$Platform$Cmd$none);
			case 'GoToAct':
				var course = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							screen: $author$project$Types$MapScreen(
								{course: course})
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetNameDraft':
				var draft = msg.a;
				var _v1 = model.screen;
				switch (_v1.$) {
					case 'NameEntryScreen':
						var s = _v1.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$NameEntryScreen(
										_Utils_update(
											s,
											{draft: draft}))
								}),
							$elm$core$Platform$Cmd$none);
					case 'TitleScreen':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$NameEntryScreen(
										{destination: $elm$core$Maybe$Nothing, draft: draft})
								}),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'SubmitName':
				var _v2 = model.screen;
				switch (_v2.$) {
					case 'TitleScreen':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$NameEntryScreen(
										{destination: $elm$core$Maybe$Nothing, draft: ''})
								}),
							$elm$core$Platform$Cmd$none);
					case 'NameEntryScreen':
						var destination = _v2.a.destination;
						var draft = _v2.a.draft;
						var nextScreen = function () {
							if (destination.$ === 'Just') {
								var uid = destination.a;
								return $author$project$Types$MapScreen(
									{course: uid.course});
							} else {
								return $author$project$Types$MapScreen(
									{course: $author$project$Types$Course1});
							}
						}();
						var name = $elm$core$String$isEmpty(
							$elm$core$String$trim(draft)) ? 'HERO' : $elm$core$String$trim(draft);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{playerName: name, screen: nextScreen}),
							$author$project$Main$saveName(name));
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'SetPasscodeDraft':
				var draft = msg.a;
				var _v4 = model.screen;
				switch (_v4.$) {
					case 'PasscodeScreen':
						var s = _v4.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$PasscodeScreen(
										_Utils_update(
											s,
											{draft: draft}))
								}),
							$elm$core$Platform$Cmd$none);
					case 'TitleScreen':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$PasscodeScreen(
										{draft: draft, error: false})
								}),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'SubmitPasscode':
				var _v5 = model.screen;
				if (_v5.$ === 'PasscodeScreen') {
					var draft = _v5.a.draft;
					var _v6 = $author$project$Game$Passcode$unitForCode(draft);
					if (_v6.$ === 'Just') {
						var uid = _v6.a;
						var newHighest = _Utils_eq(
							A2($author$project$Main$compareUnits, uid, model.highestUnlocked),
							$elm$core$Basics$GT) ? uid : model.highestUnlocked;
						return $elm$core$String$isEmpty(model.playerName) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									highestUnlocked: newHighest,
									screen: $author$project$Types$NameEntryScreen(
										{
											destination: $elm$core$Maybe$Just(uid),
											draft: ''
										})
								}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									highestUnlocked: newHighest,
									screen: $author$project$Types$MapScreen(
										{course: uid.course})
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$PasscodeScreen(
										{draft: draft, error: true})
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'StartUnit':
				var uid = msg.a;
				var quests = $author$project$Game$Curriculum$questsFor(uid);
				if (!quests.b) {
					return A2($author$project$Main$startBoss, uid, model);
				} else {
					return A3($author$project$Main$startQuest, uid, 0, model);
				}
			case 'ViewChapter':
				var uid = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							screen: $author$project$Types$ChapterScreen(uid)
						}),
					$elm$core$Platform$Cmd$none);
			case 'PracticeQuest':
				var uid = msg.a;
				var qi = msg.b;
				var _v8 = A2(
					$elm$random$Random$step,
					A3($author$project$Game$Problem$generatorFor, uid, qi, 0),
					model.seed);
				var problem = _v8.a;
				var newSeed = _v8.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							screen: $author$project$Types$BattleScreen(
								A3($author$project$Game$Battle$initialPracticeState, uid, qi, problem)),
							seed: newSeed
						}),
					$elm$core$Platform$Cmd$none);
			case 'BeginQuest':
				var _v9 = model.screen;
				if (_v9.$ === 'BattleScreen') {
					var state = _v9.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								screen: $author$project$Types$BattleScreen(
									_Utils_update(
										state,
										{phase: $author$project$Types$Idle}))
							}),
						$author$project$Main$focusFirstInput(_Utils_Tuple0));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'GotProblem':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'UpdateInput':
				var input = msg.a;
				var _v10 = model.screen;
				if (_v10.$ === 'BattleScreen') {
					var state = _v10.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								screen: $author$project$Types$BattleScreen(
									_Utils_update(
										state,
										{input: input}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'SubmitAnswer':
				var _v11 = model.screen;
				if (_v11.$ === 'BattleScreen') {
					var state = _v11.a;
					return (!_Utils_eq(state.phase, $author$project$Types$Idle)) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : A2($author$project$Main$handleAnswer, state, model);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'AnimTick':
				var _v12 = model.screen;
				if (_v12.$ === 'BattleScreen') {
					var state = _v12.a;
					var newFrame = function () {
						var _v13 = state.animFrame;
						if (_v13.$ === 'FrameA') {
							return $author$project$Types$FrameB;
						} else {
							return $author$project$Types$FrameA;
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								screen: $author$project$Types$BattleScreen(
									_Utils_update(
										state,
										{animFrame: newFrame}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'FlashDone':
				var _v14 = model.screen;
				if (_v14.$ === 'BattleScreen') {
					var state = _v14.a;
					var _v15 = state.phase;
					if (_v15.$ === 'ShowResult') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$BattleScreen(
										_Utils_update(
											state,
											{phase: $author$project$Types$Idle}))
								}),
							$author$project$Main$focusFirstInput(_Utils_Tuple0));
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'AskForHelp':
				var _v16 = model.screen;
				if (_v16.$ === 'BattleScreen') {
					var state = _v16.a;
					var helpState = {hint: state.problem.hint, stepShown: 0};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								screen: A2(
									$author$project$Types$HelpScreen,
									helpState,
									_Utils_update(
										state,
										{streak: 0}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'NextHelpStep':
				var _v17 = model.screen;
				if (_v17.$ === 'HelpScreen') {
					var helpState = _v17.a;
					var battleState = _v17.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								screen: A2(
									$author$project$Types$HelpScreen,
									_Utils_update(
										helpState,
										{stepShown: helpState.stepShown + 1}),
									battleState)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'ExitHelp':
				var _v18 = model.screen;
				if (_v18.$ === 'HelpScreen') {
					var battleState = _v18.b;
					var questIndex = function () {
						var _v20 = battleState.mode;
						if (_v20.$ === 'QuestMode') {
							var qi = _v20.a;
							return qi;
						} else {
							return -1;
						}
					}();
					var _v19 = A2(
						$elm$random$Random$step,
						A3($author$project$Game$Problem$generatorFor, battleState.unit, questIndex, battleState.correctInQuest),
						model.seed);
					var nextProblem = _v19.a;
					var newSeed = _v19.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								screen: $author$project$Types$BattleScreen(
									_Utils_update(
										battleState,
										{
											input: $author$project$Game$Battle$defaultInput(nextProblem.inputType),
											phase: $author$project$Types$Idle,
											problem: nextProblem
										})),
								seed: newSeed
							}),
						$author$project$Main$focusFirstInput(_Utils_Tuple0));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'NextQuest':
				var _v21 = model.screen;
				if (_v21.$ === 'BattleScreen') {
					var state = _v21.a;
					var _v22 = state.mode;
					if (_v22.$ === 'QuestMode') {
						var qi = _v22.a;
						if (state.practice) {
							var _v23 = A2(
								$elm$random$Random$step,
								A3($author$project$Game$Problem$generatorFor, state.unit, qi, 0),
								model.seed);
							var problem = _v23.a;
							var newSeed = _v23.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										screen: $author$project$Types$BattleScreen(
											_Utils_update(
												state,
												{
													correctInQuest: 0,
													input: $author$project$Game$Battle$defaultInput(problem.inputType),
													phase: $author$project$Types$Idle,
													problem: problem
												})),
										seed: newSeed
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var quests = $author$project$Game$Curriculum$questsFor(state.unit);
							var nextQi = qi + 1;
							return (_Utils_cmp(
								nextQi,
								$elm$core$List$length(quests)) > -1) ? A2($author$project$Main$startBoss, state.unit, model) : A3($author$project$Main$startQuest, state.unit, nextQi, model);
						}
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'NextTutorialStep':
				var _v24 = model.screen;
				if (_v24.$ === 'BattleScreen') {
					var state = _v24.a;
					var _v25 = state.phase;
					if (_v25.$ === 'ShowTutorial') {
						var prob = _v25.a;
						var stepsShown = _v25.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$BattleScreen(
										_Utils_update(
											state,
											{
												phase: A2($author$project$Types$ShowTutorial, prob, stepsShown + 1)
											}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'DismissTutorial':
				var _v26 = model.screen;
				if (_v26.$ === 'BattleScreen') {
					var state = _v26.a;
					var qi = function () {
						var _v28 = state.mode;
						if (_v28.$ === 'QuestMode') {
							var i = _v28.a;
							return i;
						} else {
							return -1;
						}
					}();
					var _v27 = A2(
						$elm$random$Random$step,
						A3($author$project$Game$Problem$generatorFor, state.unit, qi, state.correctInQuest),
						model.seed);
					var nextProblem = _v27.a;
					var newSeed = _v27.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								screen: $author$project$Types$BattleScreen(
									_Utils_update(
										state,
										{
											input: $author$project$Game$Battle$defaultInput(nextProblem.inputType),
											phase: $author$project$Types$Idle,
											problem: nextProblem
										})),
								seed: newSeed
							}),
						$author$project$Main$focusFirstInput(_Utils_Tuple0));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'BackToMap':
				var _v29 = model.screen;
				switch (_v29.$) {
					case 'BattleScreen':
						var state = _v29.a;
						if (_Utils_eq(state.phase, $author$project$Types$BattleWon)) {
							var victoryCode = A2(
								$elm$core$Maybe$withDefault,
								'shard peak fire arch',
								$author$project$Game$Passcode$codeForUnit(state.unit));
							var nextUid = $author$project$Game$Curriculum$nextUnit(state.unit);
							var vs = {
								code: victoryCode,
								isLast: _Utils_eq(nextUid, $elm$core$Maybe$Nothing),
								unit: state.unit
							};
							var newHighest = function () {
								if (nextUid.$ === 'Just') {
									var nuid = nextUid.a;
									return _Utils_eq(
										A2($author$project$Main$compareUnits, nuid, model.highestUnlocked),
										$elm$core$Basics$GT) ? nuid : model.highestUnlocked;
								} else {
									return model.highestUnlocked;
								}
							}();
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										highestUnlocked: newHighest,
										screen: $author$project$Types$VictoryScreen(vs)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							if (state.practice) {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											screen: $author$project$Types$ChapterScreen(state.unit)
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											screen: $author$project$Types$MapScreen(
												{course: state.unit.course})
										}),
									$elm$core$Platform$Cmd$none);
							}
						}
					case 'ChapterScreen':
						var uid = _v29.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$MapScreen(
										{course: uid.course})
								}),
							$elm$core$Platform$Cmd$none);
					case 'VictoryScreen':
						var vs = _v29.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									screen: $author$project$Types$MapScreen(
										{course: vs.unit.course})
								}),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			default:
				var _v31 = model.screen;
				switch (_v31.$) {
					case 'BattleScreen':
						var state = _v31.a;
						return A3($author$project$Main$startQuest, state.unit, 0, model);
					case 'GameOverScreen':
						var uid = _v31.a;
						return A3($author$project$Main$startQuest, uid, 0, model);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$View$Theme$bgBlack = '#0f0f1a';
var $author$project$View$Theme$canvasH = 640;
var $author$project$View$Theme$canvasW = 480;
var $author$project$Types$CancelExit = {$: 'CancelExit'};
var $author$project$Types$GoToTitle = {$: 'GoToTitle'};
var $author$project$View$Theme$bgDark = '#1a1a2e';
var $elm$html$Html$button = _VirtualDom_node('button');
var $author$project$View$Theme$cream = '#f5f5dc';
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$View$Theme$fontFamily = '\'Press Start 2P\', monospace';
var $author$project$View$Theme$fontSizeLarge = 14;
var $author$project$View$Theme$fontSizeNormal = 10;
var $author$project$View$Theme$fontSizeSmall = 8;
var $author$project$View$Theme$gold = '#c8a000';
var $author$project$View$Theme$hpLow = '#cc2200';
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$confirmExitOverlay = function (playerName) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'inset', '0'),
				A2($elm$html$Html$Attributes$style, 'background', 'rgba(0,0,0,0.92)'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
				A2($elm$html$Html$Attributes$style, 'padding', '24px'),
				A2($elm$html$Html$Attributes$style, 'gap', '16px'),
				A2($elm$html$Html$Attributes$style, 'z-index', '1000')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeLarge) + 'px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Abandon your quest, ' + (playerName + '?'))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'line-height', '1.7'),
						A2($elm$html$Html$Attributes$style, 'max-width', '260px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Finish a chapter first to earn your passcode — you\'ll need it to pick up where you left off!')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'gap', '12px'),
						A2($elm$html$Html$Attributes$style, 'margin-top', '8px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
								A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
								A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
								A2(
								$elm$html$Html$Attributes$style,
								'font-size',
								$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
								A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$cream),
								A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
								A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
								A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px'),
								$elm$html$Html$Events$onClick($author$project$Types$CancelExit)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('STAY')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
								A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$hpLow),
								A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
								A2(
								$elm$html$Html$Attributes$style,
								'font-size',
								$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
								A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$hpLow),
								A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
								A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
								A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px'),
								$elm$html$Html$Events$onClick($author$project$Types$GoToTitle)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('YES, EXIT')
							]))
					]))
			]));
};
var $author$project$Game$Curriculum$bossName = function (uid) {
	var _v0 = _Utils_Tuple2(uid.course, uid.unit);
	_v0$41:
	while (true) {
		if (_v0.b.$ === 'Unit') {
			switch (_v0.a.$) {
				case 'Course1':
					switch (_v0.b.a) {
						case 1:
							var _v1 = _v0.a;
							return 'Number Golem';
						case 2:
							var _v2 = _v0.a;
							return 'Integer Imp';
						case 3:
							var _v3 = _v0.a;
							return 'Fraction Phantom';
						case 4:
							var _v4 = _v0.a;
							return 'Expression Elemental';
						case 5:
							var _v5 = _v0.a;
							return 'Equation Knight';
						case 6:
							var _v6 = _v0.a;
							return 'Ratio Serpent';
						case 7:
							var _v7 = _v0.a;
							return 'Geometry Gargoyle';
						case 8:
							var _v8 = _v0.a;
							return 'Stats Sphinx';
						default:
							break _v0$41;
					}
				case 'Course2':
					switch (_v0.b.a) {
						case 1:
							var _v11 = _v0.a;
							return 'Sense Golem';
						case 2:
							var _v12 = _v0.a;
							return 'Monomial Beast';
						case 3:
							var _v13 = _v0.a;
							return 'Equation Shade';
						case 4:
							var _v14 = _v0.a;
							return 'Ratio Wraith';
						case 5:
							var _v15 = _v0.a;
							return 'Slope Specter';
						case 6:
							var _v16 = _v0.a;
							return 'Angle Fiend';
						case 7:
							var _v17 = _v0.a;
							return 'Volume Titan';
						case 8:
							var _v18 = _v0.a;
							return 'Probability Lich';
						default:
							break _v0$41;
					}
				case 'PreAlgebra':
					switch (_v0.b.a) {
						case 1:
							var _v21 = _v0.a;
							return 'Root Revenant';
						case 2:
							var _v22 = _v0.a;
							return 'Poly Phantom';
						case 3:
							var _v23 = _v0.a;
							return 'Multi-Step Mage';
						case 4:
							var _v24 = _v0.a;
							return 'Percent Predator';
						case 5:
							var _v25 = _v0.a;
							return 'Slope Stalker';
						case 6:
							var _v26 = _v0.a;
							return 'System Serpent';
						case 7:
							var _v27 = _v0.a;
							return 'Theorem Troll';
						case 8:
							var _v28 = _v0.a;
							return 'Volume Viper';
						case 9:
							var _v29 = _v0.a;
							return 'Scatter Shade';
						default:
							break _v0$41;
					}
				default:
					switch (_v0.b.a) {
						case 1:
							var _v32 = _v0.a;
							return 'Algebra Ogre';
						case 2:
							var _v33 = _v0.a;
							return 'Equation Wraith';
						case 3:
							var _v34 = _v0.a;
							return 'Function Fiend';
						case 4:
							var _v35 = _v0.a;
							return 'Linear Leviathan';
						case 5:
							var _v36 = _v0.a;
							return 'System Specter';
						case 6:
							var _v37 = _v0.a;
							return 'Exponent Elemental';
						case 7:
							var _v38 = _v0.a;
							return 'Poly Predator';
						case 8:
							var _v39 = _v0.a;
							return 'Quadra Shade';
						case 9:
							var _v40 = _v0.a;
							return 'Regression Revenant';
						case 10:
							var _v41 = _v0.a;
							return 'Rational Reaper';
						case 11:
							var _v42 = _v0.a;
							return 'Radical Rider';
						case 12:
							var _v43 = _v0.a;
							return 'Variance Viper';
						default:
							break _v0$41;
					}
			}
		} else {
			switch (_v0.a.$) {
				case 'Course1':
					var _v9 = _v0.a;
					var _v10 = _v0.b;
					return 'Decimal Drake';
				case 'Course2':
					var _v19 = _v0.a;
					var _v20 = _v0.b;
					return 'Proportion Hydra';
				case 'PreAlgebra':
					var _v30 = _v0.a;
					var _v31 = _v0.b;
					return 'Linear Lich';
				default:
					var _v44 = _v0.a;
					var _v45 = _v0.b;
					return 'Quadratic Dragon';
			}
		}
	}
	return 'Unknown';
};
var $author$project$Types$RequestExit = {$: 'RequestExit'};
var $author$project$View$Battle$exitBtn = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			$elm$html$Html$Events$onClick($author$project$Types$RequestExit),
			A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
			A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
			A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
			A2(
			$elm$html$Html$Attributes$style,
			'font-size',
			$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
			A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + $author$project$View$Theme$cream),
			A2($elm$html$Html$Attributes$style, 'padding', '8px 14px'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('EXIT')
		]));
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$View$Battle$primaryBtnAttrs = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
		A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
		A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
		A2(
		$elm$html$Html$Attributes$style,
		'font-size',
		$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
		A2($elm$html$Html$Attributes$style, 'border', '3px double ' + $author$project$View$Theme$cream),
		A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
		A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
		A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
	]);
var $author$project$View$Window$windowTitle = F2(
	function (title, children) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'border', '3px double ' + $author$project$View$Theme$cream),
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
					A2($elm$html$Html$Attributes$style, 'padding', '12px'),
					A2($elm$html$Html$Attributes$style, 'position', 'relative')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + $author$project$View$Theme$cream),
							A2($elm$html$Html$Attributes$style, 'padding', '8px')
						]),
					A2(
						$elm$core$List$cons,
						A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '8px'),
									A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(title)
								])),
						children))
				]));
	});
var $author$project$View$Battle$viewBossDefeat = F2(
	function (_v0, state) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'padding', '24px'),
					A2($elm$html$Html$Attributes$style, 'gap', '20px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$hpLow)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('DEFEATED...')
						])),
					A2(
					$author$project$View$Window$windowTitle,
					$author$project$Game$Curriculum$bossName(state.unit),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'line-height', '1.8')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Study hard and face the boss again!')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$View$Battle$primaryBtnAttrs,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Types$RetryUnit)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text('TRY AGAIN')
								])),
							$author$project$View$Battle$exitBtn
						]))
				]));
	});
var $author$project$Game$Curriculum$unitName = function (uid) {
	var _v0 = _Utils_Tuple2(uid.course, uid.unit);
	_v0$41:
	while (true) {
		if (_v0.b.$ === 'Unit') {
			switch (_v0.a.$) {
				case 'Course1':
					switch (_v0.b.a) {
						case 1:
							var _v1 = _v0.a;
							return 'Whole Numbers';
						case 2:
							var _v2 = _v0.a;
							return 'Integer Operations';
						case 3:
							var _v3 = _v0.a;
							return 'Rational Numbers';
						case 4:
							var _v4 = _v0.a;
							return 'Algebraic Expressions';
						case 5:
							var _v5 = _v0.a;
							return 'Equations & Inequalities';
						case 6:
							var _v6 = _v0.a;
							return 'Proportional Relationships';
						case 7:
							var _v7 = _v0.a;
							return 'Area & Volume';
						case 8:
							var _v8 = _v0.a;
							return 'Statistics';
						default:
							break _v0$41;
					}
				case 'Course2':
					switch (_v0.b.a) {
						case 1:
							var _v11 = _v0.a;
							return 'Number Sense';
						case 2:
							var _v12 = _v0.a;
							return 'Expressions';
						case 3:
							var _v13 = _v0.a;
							return 'Equations & Inequalities';
						case 4:
							var _v14 = _v0.a;
							return 'Ratios & Percents';
						case 5:
							var _v15 = _v0.a;
							return 'Functions & Graphing';
						case 6:
							var _v16 = _v0.a;
							return 'Geometry';
						case 7:
							var _v17 = _v0.a;
							return 'Area & Volume';
						case 8:
							var _v18 = _v0.a;
							return 'Probability';
						default:
							break _v0$41;
					}
				case 'PreAlgebra':
					switch (_v0.b.a) {
						case 1:
							var _v21 = _v0.a;
							return 'The Real Numbers';
						case 2:
							var _v22 = _v0.a;
							return 'Algebraic Expressions';
						case 3:
							var _v23 = _v0.a;
							return 'Equations & Inequalities';
						case 4:
							var _v24 = _v0.a;
							return 'Ratios & Percents';
						case 5:
							var _v25 = _v0.a;
							return 'Linear Functions';
						case 6:
							var _v26 = _v0.a;
							return 'Systems of Equations';
						case 7:
							var _v27 = _v0.a;
							return 'Geometry';
						case 8:
							var _v28 = _v0.a;
							return 'Measurement';
						case 9:
							var _v29 = _v0.a;
							return 'Probability & Statistics';
						default:
							break _v0$41;
					}
				default:
					switch (_v0.b.a) {
						case 1:
							var _v32 = _v0.a;
							return 'Algebra Basics';
						case 2:
							var _v33 = _v0.a;
							return 'Multi-Step Equations';
						case 3:
							var _v34 = _v0.a;
							return 'Relations & Functions';
						case 4:
							var _v35 = _v0.a;
							return 'Linear Equations';
						case 5:
							var _v36 = _v0.a;
							return 'Systems of Equations';
						case 6:
							var _v37 = _v0.a;
							return 'Exponents';
						case 7:
							var _v38 = _v0.a;
							return 'Polynomials';
						case 8:
							var _v39 = _v0.a;
							return 'Quadratic Equations';
						case 9:
							var _v40 = _v0.a;
							return 'Functions';
						case 10:
							var _v41 = _v0.a;
							return 'Rational Expressions';
						case 11:
							var _v42 = _v0.a;
							return 'Radical Expressions';
						case 12:
							var _v43 = _v0.a;
							return 'Statistics';
						default:
							break _v0$41;
					}
			}
		} else {
			switch (_v0.a.$) {
				case 'Course1':
					var _v9 = _v0.a;
					var _v10 = _v0.b;
					return 'The Decimal Drake';
				case 'Course2':
					var _v19 = _v0.a;
					var _v20 = _v0.b;
					return 'The Proportion Hydra';
				case 'PreAlgebra':
					var _v30 = _v0.a;
					var _v31 = _v0.b;
					return 'The Linear Lich';
				default:
					var _v44 = _v0.a;
					var _v45 = _v0.b;
					return 'The Quadratic Dragon';
			}
		}
	}
	return '???';
};
var $author$project$View$Battle$viewBossVictory = F2(
	function (playerName, state) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'padding', '24px'),
					A2($elm$html$Html$Attributes$style, 'gap', '20px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
							A2($elm$html$Html$Attributes$style, 'text-shadow', '0 0 8px ' + $author$project$View$Theme$gold)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('VICTORY!')
						])),
					A2(
					$author$project$View$Window$windowTitle,
					$author$project$Game$Curriculum$bossName(state.unit) + ' DEFEATED',
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'line-height', '1.8')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									playerName + (' has proven their mastery of ' + ($author$project$Game$Curriculum$unitName(state.unit) + '!')))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$View$Battle$primaryBtnAttrs,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Types$BackToMap)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text('CONTINUE')
								])),
							$author$project$View$Battle$exitBtn
						]))
				]));
	});
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $author$project$View$Theme$hpGreen = '#2a7a2a';
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$View$Theme$streakEmpty = '#3a3a4a';
var $author$project$View$HpBar$hpBar = F3(
	function (label, current, maxHp) {
		var color = (_Utils_cmp(current * 4, maxHp) < 1) ? $author$project$View$Theme$hpLow : $author$project$View$Theme$hpGreen;
		var blocks = 20;
		var filled = (!maxHp) ? 0 : (((current * blocks) / maxHp) | 0);
		var filledClamped = A3($elm$core$Basics$clamp, 0, blocks, filled);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'gap', '6px'),
					A2($elm$html$Html$Attributes$style, 'margin-bottom', '4px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2(
							$elm$html$Html$Attributes$style,
							'font-size',
							$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
							A2($elm$html$Html$Attributes$style, 'min-width', '36px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '1px')
						]),
					A2(
						$elm$core$List$map,
						function (i) {
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'width', '10px'),
										A2($elm$html$Html$Attributes$style, 'height', '10px'),
										A2(
										$elm$html$Html$Attributes$style,
										'background',
										(_Utils_cmp(i, filledClamped) < 1) ? color : $author$project$View$Theme$streakEmpty)
									]),
								_List_Nil);
						},
						A2($elm$core$List$range, 1, blocks))),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2(
							$elm$html$Html$Attributes$style,
							'font-size',
							$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(current) + ('/' + $elm$core$String$fromInt(maxHp)))
						]))
				]));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$Sprite$Renderer$renderSprite = F2(
	function (sprite, frame) {
		var rows = function () {
			if (frame.$ === 'FrameA') {
				return sprite.frameA;
			} else {
				return sprite.frameB;
			}
		}();
		var px = sprite.pixelSize;
		var colorMap = $elm$core$Dict$fromList(sprite.palette);
		return $elm$core$List$concat(
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (rowIdx, rowStr) {
						return A2(
							$elm$core$List$filterMap,
							$elm$core$Basics$identity,
							A2(
								$elm$core$List$indexedMap,
								F2(
									function (colIdx, ch) {
										if (_Utils_eq(
											ch,
											_Utils_chr('.'))) {
											return $elm$core$Maybe$Nothing;
										} else {
											var _v0 = A2($elm$core$Dict$get, ch, colorMap);
											if (_v0.$ === 'Nothing') {
												return $elm$core$Maybe$Nothing;
											} else {
												var color = _v0.a;
												return $elm$core$Maybe$Just(
													A2(
														$elm$svg$Svg$rect,
														_List_fromArray(
															[
																$elm$svg$Svg$Attributes$x(
																$elm$core$String$fromInt(colIdx * px)),
																$elm$svg$Svg$Attributes$y(
																$elm$core$String$fromInt(rowIdx * px)),
																$elm$svg$Svg$Attributes$width(
																$elm$core$String$fromInt(px)),
																$elm$svg$Svg$Attributes$height(
																$elm$core$String$fromInt(px)),
																$elm$svg$Svg$Attributes$fill(color)
															]),
														_List_Nil));
											}
										}
									}),
								$elm$core$String$toList(rowStr)));
					}),
				rows));
	});
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$View$Battle$enemyArea = F4(
	function (sprite, spriteW, spriteH, state) {
		var _v0 = function () {
			var _v1 = state.mode;
			if (_v1.$ === 'BossMode') {
				return _Utils_Tuple2(
					$author$project$Game$Curriculum$bossName(state.unit),
					true);
			} else {
				var qi = _v1.a;
				var quests = $author$project$Game$Curriculum$questsFor(state.unit);
				var qName = A2(
					$elm$core$Maybe$withDefault,
					'Challenge',
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.name;
						},
						$elm$core$List$head(
							A2($elm$core$List$drop, qi, quests))));
				var minCorrect = A2(
					$elm$core$Maybe$withDefault,
					3,
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.minCorrect;
						},
						$elm$core$List$head(
							A2($elm$core$List$drop, qi, quests))));
				return _Utils_Tuple2(
					qName + (' (' + ($elm$core$String$fromInt(state.correctInQuest) + ('/' + ($elm$core$String$fromInt(minCorrect) + ' correct)')))),
					false);
			}
		}();
		var enemyName = _v0.a;
		var showHp = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'padding', '8px'),
					A2($elm$html$Html$Attributes$style, 'gap', '6px')
				]),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
								A2(
								$elm$html$Html$Attributes$style,
								'font-size',
								$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
								A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
								A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'center')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(enemyName)
							]))
					]),
				_Utils_ap(
					showHp ? _List_fromArray(
						[
							A3($author$project$View$HpBar$hpBar, 'HP', state.bossHp, state.bossMaxHp)
						]) : _List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$svg,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$width(
									$elm$core$String$fromInt(spriteW)),
									$elm$svg$Svg$Attributes$height(
									$elm$core$String$fromInt(spriteH)),
									$elm$svg$Svg$Attributes$viewBox(
									'0 0 ' + ($elm$core$String$fromInt(spriteW) + (' ' + $elm$core$String$fromInt(spriteH))))
								]),
							A2($author$project$Sprite$Renderer$renderSprite, sprite, state.animFrame))
						]))));
	});
var $author$project$Config$multiplierLabel = function (streak) {
	var _v0 = $author$project$Config$multiplierFor(streak);
	_v0$3:
	while (true) {
		switch (_v0.a) {
			case 2:
				if (_v0.b === 1) {
					return '2x';
				} else {
					break _v0$3;
				}
			case 3:
				switch (_v0.b) {
					case 1:
						return '3x';
					case 2:
						return '1.5x';
					default:
						break _v0$3;
				}
			default:
				break _v0$3;
		}
	}
	return '1x';
};
var $author$project$View$Theme$streakGem = '#d4a017';
var $author$project$View$Battle$playerStatusBar = F2(
	function (playerName, state) {
		var isBoss = _Utils_eq(state.mode, $author$project$Types$BossMode);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'padding', '6px 12px'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid ' + $author$project$View$Theme$cream)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '2px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(playerName)
								])),
							isBoss ? A3($author$project$View$HpBar$hpBar, 'HP', state.playerHp, $author$project$Config$playerMaxHp) : $elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$streakGem)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'STREAK ' + $elm$core$String$fromInt(state.streak))
								])),
							isBoss ? A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'ATK ' + $author$project$Config$multiplierLabel(state.streak))
								])) : $elm$html$Html$text('')
						]))
				]));
	});
var $author$project$Types$AskForHelp = {$: 'AskForHelp'};
var $author$project$Types$SubmitAnswer = {$: 'SubmitAnswer'};
var $author$project$View$Battle$actionButtons = function (state) {
	var _v0 = state.phase;
	switch (_v0.$) {
		case 'Idle':
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_Utils_ap(
									$author$project$View$Battle$primaryBtnAttrs,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Types$SubmitAnswer)
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('ATTACK!')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Types$AskForHelp),
										A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
										A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$streakGem),
										A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
										A2(
										$elm$html$Html$Attributes$style,
										'font-size',
										$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
										A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$streakGem),
										A2($elm$html$Html$Attributes$style, 'padding', '10px 14px'),
										A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('ASK THE TOME')
									]))
							])),
						$author$project$View$Battle$exitBtn
					]));
		case 'ShowResult':
			return $elm$html$Html$text('');
		case 'QuestIntro':
			return $elm$html$Html$text('');
		case 'ShowTutorial':
			return $elm$html$Html$text('');
		case 'QuestComplete':
			return $elm$html$Html$text('');
		case 'BattleWon':
			return $elm$html$Html$text('');
		default:
			return $elm$html$Html$text('');
	}
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$View$Math$leadingDigitCount = F2(
	function (i, s) {
		leadingDigitCount:
		while (true) {
			var _v0 = $elm$core$String$toInt(
				A3($elm$core$String$slice, i, i + 1, s));
			if (_v0.$ === 'Just') {
				var $temp$i = i + 1,
					$temp$s = s;
				i = $temp$i;
				s = $temp$s;
				continue leadingDigitCount;
			} else {
				return i;
			}
		}
	});
var $elm$core$String$foldl = _String_foldl;
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $author$project$View$Math$isOp = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('+')) || (_Utils_eq(
		c,
		_Utils_chr('-')) || (_Utils_eq(
		c,
		_Utils_chr('×')) || (_Utils_eq(
		c,
		_Utils_chr('/')) || (_Utils_eq(
		c,
		_Utils_chr('=')) || (_Utils_eq(
		c,
		_Utils_chr('<')) || _Utils_eq(
		c,
		_Utils_chr('>')))))));
};
var $author$project$View$Math$opSpan = function (c) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'color', '#ffd700'),
				A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(
				$elm$core$String$fromChar(c))
			]));
};
var $author$project$View$Math$renderWithOps = function (s) {
	var _v0 = A3(
		$elm$core$String$foldl,
		F2(
			function (c, _v1) {
				var acc = _v1.a;
				var buf = _v1.b;
				if ($author$project$View$Math$isOp(c)) {
					var prefix = $elm$core$String$isEmpty(buf) ? _List_Nil : _List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(buf)
								]))
						]);
					return _Utils_Tuple2(
						_Utils_ap(
							acc,
							_Utils_ap(
								prefix,
								_List_fromArray(
									[
										$author$project$View$Math$opSpan(c)
									]))),
						'');
				} else {
					return _Utils_Tuple2(
						acc,
						_Utils_ap(
							buf,
							$elm$core$String$fromChar(c)));
				}
			}),
		_Utils_Tuple2(_List_Nil, ''),
		s);
	var elems = _v0.a;
	var remaining = _v0.b;
	return $elm$core$String$isEmpty(remaining) ? elems : _Utils_ap(
		elems,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(remaining)
					]))
			]));
};
var $elm$html$Html$sup = _VirtualDom_node('sup');
var $author$project$View$Math$renderSupSegment = function (seg) {
	var n = A2($author$project$View$Math$leadingDigitCount, 0, seg);
	var remainder = A2($elm$core$String$dropLeft, n, seg);
	var digits = A2($elm$core$String$left, n, seg);
	return A2(
		$elm$core$List$cons,
		A2(
			$elm$html$Html$sup,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'font-size', '1.2em'),
					A2($elm$html$Html$Attributes$style, 'line-height', '0'),
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'top', '-0.4em')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(digits)
				])),
		$author$project$View$Math$renderWithOps(remainder));
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$View$Math$renderMath = function (raw) {
	var normalized = A3(
		$elm$core$String$replace,
		'³',
		'^3',
		A3($elm$core$String$replace, '²', '^2', raw));
	if (!A2($elm$core$String$contains, '^', normalized)) {
		return A2(
			$elm$html$Html$span,
			_List_Nil,
			$author$project$View$Math$renderWithOps(normalized));
	} else {
		var parts = A2($elm$core$String$split, '^', normalized);
		return A2(
			$elm$html$Html$span,
			_List_Nil,
			function () {
				if (!parts.b) {
					return _List_Nil;
				} else {
					var first = parts.a;
					var rest = parts.b;
					return _Utils_ap(
						$author$project$View$Math$renderWithOps(first),
						A2($elm$core$List$concatMap, $author$project$View$Math$renderSupSegment, rest));
				}
			}());
	}
};
var $author$project$View$Battle$resultMessage = function (state) {
	var _v0 = state.phase;
	if (_v0.$ === 'ShowResult') {
		if (_v0.a.$ === 'CorrectHit') {
			var _v1 = _v0.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$hpGreen)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						function () {
							var _v2 = state.mode;
							if (_v2.$ === 'BossMode') {
								return 'CORRECT! -' + ($elm$core$String$fromInt(
									A2($author$project$Config$applyMultiplier, state.streak, $author$project$Config$baseDamage)) + ' to boss!');
							} else {
								return 'CORRECT!';
							}
						}())
					]));
		} else {
			var _v3 = _v0.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$hpLow)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						function () {
							var _v4 = state.mode;
							if (_v4.$ === 'BossMode') {
								return 'WRONG! -' + ($elm$core$String$fromInt($author$project$Config$bossCounterDamage) + ' HP!');
							} else {
								return 'Not quite — try the next one!';
							}
						}())
					]));
		}
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Types$UpdateInput = function (a) {
	return {$: 'UpdateInput', a: a};
};
var $author$project$View$Input$viewChoiceInput = F2(
	function (choices, selected) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '6px')
				]),
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, label) {
						return A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick(
									$author$project$Types$UpdateInput(
										$author$project$Types$IChoice(
											$elm$core$Maybe$Just(i)))),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									_Utils_eq(
										selected,
										$elm$core$Maybe$Just(i)) ? $author$project$View$Theme$gold : $author$project$View$Theme$bgDark),
									A2(
									$elm$html$Html$Attributes$style,
									'color',
									_Utils_eq(
										selected,
										$elm$core$Maybe$Just(i)) ? $author$project$View$Theme$bgBlack : $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
									A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'padding', '8px 12px'),
									A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
									A2($elm$html$Html$Attributes$style, 'text-align', 'left')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(label)
								]));
					}),
				choices));
	});
var $elm$html$Html$input = _VirtualDom_node('input');
var $author$project$View$Input$inputAttrs = function (width) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
			A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
			A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
			A2(
			$elm$html$Html$Attributes$style,
			'font-size',
			$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
			A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$cream),
			A2($elm$html$Html$Attributes$style, 'padding', '6px'),
			A2($elm$html$Html$Attributes$style, 'width', width),
			A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box')
		]);
};
var $author$project$View$Input$onEnter = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'keydown',
		A2(
			$elm$json$Json$Decode$andThen,
			function (key) {
				return (key === 'Enter') ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('not enter');
			},
			A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string)));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$View$Input$fractionInput = F2(
	function (num, den) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'gap', '2px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$input,
					_Utils_ap(
						$author$project$View$Input$inputAttrs('80px'),
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$value(num),
								$elm$html$Html$Events$onInput(
								function (v) {
									return $author$project$Types$UpdateInput(
										$author$project$Types$IFraction(
											{den: den, num: v}));
								}),
								$author$project$View$Input$onEnter($author$project$Types$SubmitAnswer),
								A2($elm$html$Html$Attributes$style, 'text-align', 'center')
							])),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'width', '80px'),
							A2($elm$html$Html$Attributes$style, 'height', '2px'),
							A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$cream)
						]),
					_List_Nil),
					A2(
					$elm$html$Html$input,
					_Utils_ap(
						$author$project$View$Input$inputAttrs('80px'),
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$value(den),
								$elm$html$Html$Events$onInput(
								function (v) {
									return $author$project$Types$UpdateInput(
										$author$project$Types$IFraction(
											{den: v, num: num}));
								}),
								$author$project$View$Input$onEnter($author$project$Types$SubmitAnswer),
								A2($elm$html$Html$Attributes$style, 'text-align', 'center')
							])),
					_List_Nil)
				]));
	});
var $author$project$Types$IGte = {$: 'IGte'};
var $author$project$Types$ILte = {$: 'ILte'};
var $author$project$View$Input$inequalityInput = F2(
	function (dir, val) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '6px')
						]),
					A2(
						$elm$core$List$map,
						function (_v0) {
							var d = _v0.a;
							var lbl = _v0.b;
							return A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick(
										$author$project$Types$UpdateInput(
											$author$project$Types$IInequality(
												{
													dir: $elm$core$Maybe$Just(d),
													val: val
												}))),
										A2(
										$elm$html$Html$Attributes$style,
										'background',
										_Utils_eq(
											dir,
											$elm$core$Maybe$Just(d)) ? $author$project$View$Theme$gold : $author$project$View$Theme$bgDark),
										A2(
										$elm$html$Html$Attributes$style,
										'color',
										_Utils_eq(
											dir,
											$elm$core$Maybe$Just(d)) ? $author$project$View$Theme$bgBlack : $author$project$View$Theme$cream),
										A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
										A2(
										$elm$html$Html$Attributes$style,
										'font-size',
										$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
										A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$cream),
										A2($elm$html$Html$Attributes$style, 'padding', '6px 10px'),
										A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(lbl)
									]));
						},
						_List_fromArray(
							[
								_Utils_Tuple2($author$project$Types$ILt, '<'),
								_Utils_Tuple2($author$project$Types$ILte, '≤'),
								_Utils_Tuple2($author$project$Types$IGt, '>'),
								_Utils_Tuple2($author$project$Types$IGte, '≥')
							]))),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'gap', '6px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('x ')
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2($elm$html$Html$Attributes$style, 'font-size', '14px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									function () {
										if (dir.$ === 'Just') {
											switch (dir.a.$) {
												case 'ILt':
													var _v2 = dir.a;
													return '<';
												case 'ILte':
													var _v3 = dir.a;
													return '≤';
												case 'IGt':
													var _v4 = dir.a;
													return '>';
												default:
													var _v5 = dir.a;
													return '≥';
											}
										} else {
											return '?';
										}
									}())
								])),
							A2(
							$elm$html$Html$input,
							_Utils_ap(
								$author$project$View$Input$inputAttrs('80px'),
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(val),
										$elm$html$Html$Events$onInput(
										function (v) {
											return $author$project$Types$UpdateInput(
												$author$project$Types$IInequality(
													{dir: dir, val: v}));
										}),
										$author$project$View$Input$onEnter($author$project$Types$SubmitAnswer)
									])),
							_List_Nil)
						]))
				]));
	});
var $author$project$View$Input$numericInput = F3(
	function (val, toMsg, width) {
		return A2(
			$elm$html$Html$input,
			_Utils_ap(
				$author$project$View$Input$inputAttrs(width),
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('text'),
						$elm$html$Html$Attributes$value(val),
						$elm$html$Html$Events$onInput(toMsg),
						$author$project$View$Input$onEnter($author$project$Types$SubmitAnswer)
					])),
			_List_Nil);
	});
var $author$project$View$Input$rootsInput = F2(
	function (r1, r2) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('r₁ =')
								])),
							A2(
							$elm$html$Html$input,
							_Utils_ap(
								$author$project$View$Input$inputAttrs('80px'),
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(r1),
										$elm$html$Html$Events$onInput(
										function (v) {
											return $author$project$Types$UpdateInput(
												$author$project$Types$IRoots(
													{r1: v, r2: r2}));
										}),
										$author$project$View$Input$onEnter($author$project$Types$SubmitAnswer)
									])),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('r₂ =')
								])),
							A2(
							$elm$html$Html$input,
							_Utils_ap(
								$author$project$View$Input$inputAttrs('80px'),
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(r2),
										$elm$html$Html$Events$onInput(
										function (v) {
											return $author$project$Types$UpdateInput(
												$author$project$Types$IRoots(
													{r1: r1, r2: v}));
										}),
										$author$project$View$Input$onEnter($author$project$Types$SubmitAnswer)
									])),
							_List_Nil)
						]))
				]));
	});
var $author$project$View$Input$systemInput = F2(
	function (x, y) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('x =')
								])),
							A2(
							$elm$html$Html$input,
							_Utils_ap(
								$author$project$View$Input$inputAttrs('80px'),
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(x),
										$elm$html$Html$Events$onInput(
										function (v) {
											return $author$project$Types$UpdateInput(
												$author$project$Types$ISystem(
													{x: v, y: y}));
										}),
										$author$project$View$Input$onEnter($author$project$Types$SubmitAnswer)
									])),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('y =')
								])),
							A2(
							$elm$html$Html$input,
							_Utils_ap(
								$author$project$View$Input$inputAttrs('80px'),
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(y),
										$elm$html$Html$Events$onInput(
										function (v) {
											return $author$project$Types$UpdateInput(
												$author$project$Types$ISystem(
													{x: x, y: v}));
										}),
										$author$project$View$Input$onEnter($author$project$Types$SubmitAnswer)
									])),
							_List_Nil)
						]))
				]));
	});
var $author$project$View$Input$viewInput = function (answerInput) {
	switch (answerInput.$) {
		case 'IInt':
			var s = answerInput.a;
			return A3(
				$author$project$View$Input$numericInput,
				s,
				function (v) {
					return $author$project$Types$UpdateInput(
						$author$project$Types$IInt(v));
				},
				'120px');
		case 'IDecimal':
			var s = answerInput.a;
			return A3(
				$author$project$View$Input$numericInput,
				s,
				function (v) {
					return $author$project$Types$UpdateInput(
						$author$project$Types$IDecimal(v));
				},
				'120px');
		case 'IFraction':
			var den = answerInput.a.den;
			var num = answerInput.a.num;
			return A2($author$project$View$Input$fractionInput, num, den);
		case 'IChoice':
			return $elm$html$Html$text('');
		case 'IInequality':
			var val = answerInput.a.val;
			var dir = answerInput.a.dir;
			return A2($author$project$View$Input$inequalityInput, dir, val);
		case 'ISystem':
			var y = answerInput.a.y;
			var x = answerInput.a.x;
			return A2($author$project$View$Input$systemInput, x, y);
		default:
			var r2 = answerInput.a.r2;
			var r1 = answerInput.a.r1;
			return A2($author$project$View$Input$rootsInput, r1, r2);
	}
};
var $author$project$View$Battle$problemArea = function (state) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'flex', '1'),
				A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
				A2($elm$html$Html$Attributes$style, 'padding', '10px 12px'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'gap', '8px')
			]),
		_List_fromArray(
			[
				A2(
				$author$project$View$Window$windowTitle,
				'QUESTION',
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
								A2(
								$elm$html$Html$Attributes$style,
								'font-size',
								$elm$core$String$fromInt($author$project$View$Theme$fontSizeLarge) + 'px'),
								A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
								A2($elm$html$Html$Attributes$style, 'line-height', '2'),
								A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap'),
								A2($elm$html$Html$Attributes$style, 'word-break', 'break-word')
							]),
						_List_fromArray(
							[
								$author$project$View$Math$renderMath(state.problem.prompt)
							]))
					])),
				function () {
				var _v0 = state.problem.inputType;
				if (_v0.$ === 'TChoice') {
					var choices = _v0.a;
					var _v1 = state.input;
					if (_v1.$ === 'IChoice') {
						var selected = _v1.a;
						return A2($author$project$View$Input$viewChoiceInput, choices, selected);
					} else {
						return $elm$html$Html$text('');
					}
				} else {
					return $author$project$View$Input$viewInput(state.input);
				}
			}(),
				$author$project$View$Battle$resultMessage(state),
				$author$project$View$Battle$actionButtons(state)
			]));
};
var $author$project$View$Battle$questHeader = function (state) {
	var practiceTag = state.practice ? ' [PRACTICE]' : '';
	var chapterLabel = function () {
		var _v2 = state.unit.unit;
		if (_v2.$ === 'Unit') {
			var n = _v2.a;
			return 'Ch.' + $elm$core$String$fromInt(n);
		} else {
			return 'MEGA';
		}
	}();
	var _v0 = function () {
		var _v1 = state.mode;
		if (_v1.$ === 'BossMode') {
			return _Utils_Tuple2('BOSS BATTLE', $author$project$View$Theme$gold);
		} else {
			var qi = _v1.a;
			var quests = $author$project$Game$Curriculum$questsFor(state.unit);
			var total = $elm$core$List$length(quests);
			var questName = A2(
				$elm$core$Maybe$withDefault,
				'Quest',
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.name;
					},
					$elm$core$List$head(
						A2($elm$core$List$drop, qi, quests))));
			return _Utils_Tuple2(
				'Quest ' + ($elm$core$String$fromInt(qi + 1) + ('/' + ($elm$core$String$fromInt(total) + (' — ' + (questName + practiceTag))))),
				$author$project$View$Theme$cream);
		}
	}();
	var label = _v0.a;
	var color = _v0.b;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
				A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid ' + $author$project$View$Theme$cream),
				A2($elm$html$Html$Attributes$style, 'padding', '6px 12px'),
				A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
				A2(
				$elm$html$Html$Attributes$style,
				'font-size',
				$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
				A2($elm$html$Html$Attributes$style, 'color', color),
				A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(chapterLabel + (' | ' + label))
			]));
};
var $author$project$Sprite$Quest$questSprite = {
	frameA: _List_fromArray(
		['........PPPPP.........', '......PPPPPPPPPPP.....', '.....PPPPPPPPPPPPP....', '....PPPPPPPPPPPPPPP...', '....PPLDDDPPPDDLLPP...', '....PPLDDPPPPPDDLPP...', '....PPPPPPPPPPPPPPP...', '....PPWWPPPPPPWWPPP...', '....PPWEPPPPPPPEPPP...', '....PPWKWPPPPWKWPPP...', '....PPWEPPPPPPPEPPP...', '....PPWWPPPPPPWWPPP...', '....PPPPPPPPPPPPPPP...', '....PPPPPPPPPPPPPPP...', '....PBBBBBBBBBBBBPP...', '....PBNGGGGGGGGNNPP...', '....PBNGGGGGGGGNNPP...', '....PBBBBBBBBBBBBPP...', '....PPPPPPPPPPPPPPP...', '.....TPPPPPPPPPPT.....', '......TPPPPPPPT.......', '.......TPPPPPPT.......', '........TTTTTT........', '......................  ']),
	frameB: _List_fromArray(
		['........PPPPP.........', '......PPPPPPPPPPP.....', '.....PPPPPPPPPPPPP....', '....PPPPPPPPPPPPPPP...', '....PPLDDDPPPDDLLPP...', '....PPLDDPPPPPDDLPP...', '....PPPPPPPPPPPPPPP...', '....PPWWPPPPPPWWPPP...', '....PPWEPPPPPPPEPPP...', '....PPWKWPPPPWKWPPP...', '....PPWEPPPPPPPEPPP...', '....PPWWPPPPPPWWPPP...', '....PPPPPPPPPPPPPPP...', '....PPPPPPPPPPPPPPP...', '....PBBBBBBBBBBBBPP...', '....PBNGGGGGGGGNNPP...', '....PBNGGGGGGGGNNPP...', '....PBBBBBBBBBBBBPP...', '....PPPPPPPPPPPPPPP...', '......TPPPPPPPT.......', '.......TPPPPPPT.......', '........TTPPTT........', '.........TTTT.........', '......................  ']),
	name: 'Scroll Wisp',
	palette: _List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#f0d080'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#c8a040'),
			_Utils_Tuple2(
			_Utils_chr('L'),
			'#fff8d0'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#44aaff'),
			_Utils_Tuple2(
			_Utils_chr('K'),
			'#1166aa'),
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#bb8833'),
			_Utils_Tuple2(
			_Utils_chr('N'),
			'#996622'),
			_Utils_Tuple2(
			_Utils_chr('G'),
			'#e8f4d0'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#ddaa44')
		]),
	pixelSize: 7
};
var $author$project$Sprite$Lookup$questSpriteFor = function (_v0) {
	return $author$project$Sprite$Quest$questSprite;
};
var $author$project$Sprite$Act1$act1MegaBoss = {
	frameA: _List_fromArray(
		['......PPPPPPPPPPP......', '.....PPPPPPPPPPPPP.....', '....PPPPPHHHHHHPPPPP...', '....PPPPHHHHHHHPPPP....', '.....PPHHHHHHHHHPP.....', '.....PPHEEEEEEHPP......', '.....PPHERRRREHPP......', '.....PPHEEEEEEHPP......', '.....PPHHHHHHHHHPP.....', '....BBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '...BBBSSBBBBBBSSBBBB...', '...BBBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '....BBBSSSSSSSSBBBB....', '....BBBBBBBBBBBBBB.....', '....TBBBB.....BBBBT....', '....TBBBB.....BBBBT....', '....TSSBB.....BSSST....', '....TTTBB.....BBBTT....', '.....TTTT.....TTTT.....', '.......................']),
	frameB: _List_fromArray(
		['......PPPPPPPPPPP......', '.....PPPPPPPPPPPPP.....', '....PPPPPHHHHHHPPPPP...', '....PPPPHHHHHHHPPPP....', '.....PPHHHHHHHHHPP.....', '.....PPHEEEEEEHPP......', '.....PPHEDDDDEHPP......', '.....PPHEEEEEEHPP......', '.....PPHHHHHHHHHPP.....', '....BBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '...BBBSSBBBBBBSSBBBB...', '...BBBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '....BBBSSSSSSSSBBBB....', '....BBBBBBBBBBBBBB.....', '....TBBBB.....BBBBT....', '....TBBBB.....BBBBT....', '....TSSBB.....BSSST....', '....TTTBB.....BBBTT....', '.....TTTT.....TTTT.....', '.......................']),
	name: 'Chaos Wyrm',
	palette: _List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#b89000'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#664400'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#fff8cc'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#ff6600'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#332200'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#aa7700'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#553300'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#997700')
		]),
	pixelSize: 8
};
var $author$project$Sprite$Act1$knight = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['......PPPPPPPPPPP......', '.....PPPPPPPPPPPPP.....', '....PPPPPHHHHHHPPPPP...', '....PPPPHHHHHHHPPPP....', '.....PPHHHHHHHHHPP.....', '.....PPHEEEEEEEHPP.....', '.....PPHERRRREHPP......', '.....PPHEEEEEEEHPP.....', '.....PPHHHHHHHHHPP.....', '....BBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '...BBBSSBBBBBBSSBBBB...', '...BBBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '....BBBSSSSSSSSBBBB....', '....BBBBBBBBBBBBBB.....', '....TBBBB.....BBBBT....', '....TBBBB.....BBBBT....', '....TSSBB.....BSSST....', '....TTTBB.....BBBTT....', '.....TTTT.....TTTT.....', '.......................']),
			frameB: _List_fromArray(
				['......PPPPPPPPPPP......', '.....PPPPPPPPPPPPP.....', '....PPPPPHHHHHHPPPPP...', '....PPPPHHHHHHHPPPP....', '.....PPHHHHHHHHHPP.....', '.....PPHEEEEEEEHPP.....', '.....PPHEBBBBEHPP......', '.....PPHEEEEEEEHPP.....', '.....PPHHHHHHHHHPP.....', '....BBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '...BBBSSBBBBBBSSBBBB...', '...BBBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '....BBBSSSSSSSSBBBB....', '....BBBBBBBBBBBBBB.....', '....TBBBB.....BBBBT....', '....TBBBB.....BBBBT....', '....TSSBB.....BSSST....', '....TTTBB.....BBBTT....', '.....TTTT.....TTTT.....', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act1$equationKnight = A2(
	$author$project$Sprite$Act1$knight,
	'Equation Knight',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#aabbcc'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#667788'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#889aaa'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#cce0ff'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#4499ff'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#99aabb'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#334455')
		]));
var $author$project$Sprite$Act1$elemental = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['..........W............', '.........WWW...........', '......WWWWWWWWWW.......', '.....WWWWBBBBWWWWW.....', '....WWWWBBBBBBWWWWW....', '....WWWBBBCCCBBBWWW....', '...WWWBBBCCGCCBBBWWWW..', '...WWWBBBCCGCCBBBWWW...', '...WWWWBBBCCCBBBWWWWW..', '....WWWWBBBBBBBWWWWW...', '.....WWWWWWWWWWWWWW....', '......WWWWWWWWWWWWWW...', '.....SWWWWWWWWWWWWS....', '....SWWWWWWWWWWWWWSS...', '....SWWWWWWWWWWWWSS....', '.....SWWWWWWWWWWSS.....', '......SWWWWWWWWSS......', '.....SSSWWWWWWSSS......', '....SSWWW...WWWSS......', '...SSW.........WSS.....', '..SS............SS.....', '...SS..........SS......', '....SSS......SSS.......', '.......................']),
			frameB: _List_fromArray(
				['............W..........', '...........WWW.........', '......WWWWWWWWWWW......', '.....WWWWBBBBWWWWW.....', '....WWWWBBBBBBWWWWWW...', '....WWWBBBCCCBBBWWWW...', '...WWWWBBBCCGCCBBBWWW..', '...WWWBBBCCGCCBBBWWWWW.', '...WWWWBBBCCCBBBWWWWW..', '....WWWWBBBBBBBWWWWW...', '.....WWWWWWWWWWWWWWW...', '......WWWWWWWWWWWWWWW..', '.....SWWWWWWWWWWWWSS...', '....SWWWWWWWWWWWWSS....', '....SWWWWWWWWWWWSS.....', '.....SWWWWWWWWSS.......', '......SWWWWWWSS........', '.....SSWWWWWWSS........', '....SSWWW...WWSS.......', '...SSW.........WSS.....', '..SS............SS.....', '...SS..........SS......', '....SSS......SSS.......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act1$expressionElemental = A2(
	$author$project$Sprite$Act1$elemental,
	'Expression Elemental',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('G'),
			'#aaffff'),
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#44bbff'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#0077cc'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#003366')
		]));
var $author$project$Sprite$Act1$ghost = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['........BBBBB..........', '......BBBBBBBBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '....BBBBSSBBBBBSSBBBB..', '....BBBBSSBBBBBSSBBBB..', '...BBBBBBBBBBBBBBBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBWPPWBBBBWPPWBBB...', '...BBWPPWBBBBWPPWBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBSSSSSSBBBB.....', '....BBBBBBBBBBBBB......', '.....BBBBBBBBBBB.......', '...BBBB.....BBBB.......', '..TBBBB.......BBBBT....', '..TBBB.........BBBT....', '...TBB..........BT.....', '....TB..........BT.....', '.....TT.........TT.....', '......TT.......TT......', '.......................']),
			frameB: _List_fromArray(
				['........BBBBB..........', '......BBBBBBBBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '....BBBBSSBBBBBSSBBBB..', '....BBBBSSBBBBBSSBBBB..', '...BBBBBBBBBBBBBBBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBWBBWBBBBWBBWBBB...', '...BBWBBWBBBBWBBWBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBSSSSSSBBBB.....', '....BBBBBBBBBBBBB......', '.....BBBBBBBBBBB.......', '....BBBB.....BBBB......', '...TBBBB.......BBBBT...', '...TBBB.........BBBT...', '....TBB..........BT....', '.....TB..........BT....', '......TT........TT.....', '.......TT......TT......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act1$fractionPhantom = A2(
	$author$project$Sprite$Act1$ghost,
	'Fraction Phantom',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#9966cc'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#553388'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#eeccff'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#ff88ff'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#331166')
		]));
var $author$project$Sprite$Act1$gargoyle = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['W.....HBBBBBH.....W....', 'WW....BBBBBBBB....WW...', 'WWW..BBBBBBBBBBB..WWW..', 'WWWWBBBBBBBBBBBBWWWWW..', 'WWWWBBBDDBBBDDBBWWWW...', 'WWWWBBBDDBBBDDBBWWWWW..', 'WWWBBBBBBBBBBBBBBBWWW..', 'WWWBBEGBBBBBBGEBWWWW...', 'WWWBBGGGBBBBBGGGBWWWW..', 'WWWBBEGBBBBBBGEBWWWW...', 'WWWBBBBBBBBBBBBBBBWWW..', 'WWWWBBBBBBBBBBBBWWWW...', 'WWWWWBBBBBBBBBBWWWWWW..', '.WWWWWBBBBBBBBBWWWWW...', '..WWWWBBBBBBBBWWWWW....', '...WWWBBBBBBBWWWWW.....', '.....CBBBBBBBBC........', '.....CBBDDDBBBC........', '....CCBBDDDBBBBCC......', '....CCBBDBBDBBCC.......', '....CCCBBBBBBBCCC......', '.....CCCBBBBBCCC.......', '......CCCDDDDCCC.......', '.......................']),
			frameB: _List_fromArray(
				['W.....HBBBBBH.....W....', 'WW....BBBBBBBB....WW...', 'WWW..BBBBBBBBBBB..WWW..', 'WWWWBBBBBBBBBBBBWWWWW..', 'WWWWBBBDDBBBDDBBWWWW...', 'WWWWBBBDDBBBDDBBWWWWW..', 'WWWBBBBBBBBBBBBBBBWWW..', 'WWWBBEGBBBBBBGEBWWWW...', 'WWWBBGBBBBBBBBGBBWWWW..', 'WWWBBEGBBBBBBGEBWWWW...', 'WWWBBBBBBBBBBBBBBBWWW..', 'WWWWBBBBBBBBBBBBWWWWW..', 'WWWWWBBBBBBBBBBWWWWWWW.', '.WWWWWBBBBBBBBBWWWWWW..', '..WWWWBBBBBBBBWWWWWW...', '...WWWBBBBBBBWWWWWW....', '.....CBBBBBBBBC........', '.....CBBDDDBBBC........', '....CCBBDDDBBBBCC......', '....CCBBDBBDBBCC.......', '....CCCBBBBBBBCCC......', '.....CCCBBBBBCCC.......', '......CCCDDDDCCC.......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act1$geometryGargoyle = A2(
	$author$project$Sprite$Act1$gargoyle,
	'Geometry Gargoyle',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#778899'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#445566'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#aabbcc'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#cceeff'),
			_Utils_Tuple2(
			_Utils_chr('G'),
			'#55ccff'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#334455'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#223344')
		]));
var $author$project$Sprite$Act1$imp = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['..H...........H........', '..HH.........HH........', '...HH.......HH.........', '...HBBBBBBBBH..........', '...BBBBBBBBBBB.........', '..BBBBBBBBBBBBB........', '..BBEPPEBBBEPPED.......', '..BBPSSPBBBPSSPB.......', '..BBEPPEBBBEPPED.......', '..BBBBBBBBBBBBB........', '..BBBBBBBBBBBBBB.......', '...SSBBBBBBBBSS........', '...BBBBFBBBBBB.........', '....BBBBBBBBB..........', '....BBBBBBBBB.......C..', '....BBBBBBBBBBBBBBCC...', '...CBBBB....BBBBBBBC...', '..CCBB........BBCC.....', '..CCBB........BBCC.....', '..CBBB........BBBC.....', '..CCBB........BBCC.....', '..CSBB........BBSC.....', '..CCCC........CCCC.....', '.......................']),
			frameB: _List_fromArray(
				['..H...........H........', '..HH.........HH........', '...HH.......HH.........', '...HBBBBBBBBH..........', '...BBBBBBBBBBB.........', '..BBBBBBBBBBBBB........', '..BBEPPEBBBEPPED.......', '..BBPBBPBBBPBBPB.......', '..BBEPPEBBBEPPED.......', '..BBBBBBBBBBBBB........', '..BBBBBBBBBBBBBB.......', '...SSBBBBBBBBSS........', '...BBBBFBBBBBB.........', '....BBBBBBBBB..........', '.....BBBBBBBBB......C..', '....BBBBBBBBBBBBBBCC...', '...CBBBB....BBBBBBBC...', '..CCBB........BBCC.....', '..CCBB........BBCC.....', '..CBBB........BBBC.....', '..CCBB........BBCC.....', '..CSBB........BBSC.....', '..CCCC........CCCC.....', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act1$integerImp = A2(
	$author$project$Sprite$Act1$imp,
	'Integer Imp',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#cc3322'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#881100'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#332200'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffee88'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#ddaa00'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#881100'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#ff6655'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#882200')
		]));
var $author$project$Sprite$Act1$numberGolem = {
	frameA: _List_fromArray(
		['.......GGGGGGGG.......', '......GGGGGGGGGGG.....', '.....GGGDDGGGDDGGG....', '.....GGGDDGGGDDGGG....', '....GGGGGGGGGGGGGGGG..', '....GGYWWGGGGGWWYGGG..', '....GGWRRWGGGGWRRWGG..', '....GGWRRWGGGGWRRWGG..', '....GGYWWGGGGGWWYGG...', '....GGGGGGGGGGGGGGGG..', '....GGGDDDDDDDDGGGGG..', '.....GGGGGGGGGGGGG....', '......DDDGGGGGDDD.....', '.....GGGGGGGGGGGGG....', '....GGGGGGGGGGGGGGG...', '...DDGGGGGGGGGGGGGDD..', '...GGGGGDDDDDDDGGGGG..', '...GGGDDDDDDDDDDDGG...', '...BBBGGGGGGGGGGGBBB..', '...BBBDDDDDDDDDDDBB...', '....BBBBBBBBBBBBBBB...', '.....BBBBBBBBBBBBB....', '......DDDDDDDDDDD.....', '......................  ']),
	frameB: _List_fromArray(
		['.......GGGGGGGG.......', '......GGGGGGGGGGG.....', '.....GGGDDGGGDDGGG....', '.....GGGDDGGGDDGGG....', '....GGGGGGGGGGGGGGGG..', '....GGYWWGGGGGWWYGGG..', '....GGWDDWGGGGWDDWGG..', '....GGWDDWGGGGWDDWGG..', '....GGYWWGGGGGWWYGG...', '....GGGGGGGGGGGGGGGG..', '....GGGDDDDDDDDGGGGG..', '.....GGGGGGGGGGGGG....', '......DDDGGGGGDDD.....', '.....GGGGGGGGGGGGG....', '....GGGGGGGGGGGGGGG...', '...DDGGGGGGGGGGGGGDD..', '...GGGGGDDDDDDDGGGGG..', '...GGGDDDDDDDDDDDGG...', '...BBBGGGGGGGGGGGBBB..', '...BBBDDDDDDDDDDDBB...', '....BBBBBBBBBBBBBBB...', '.....BBBBBBBBBBBBB....', '......DDDDDDDDDDD.....', '......................  ']),
	name: 'Number Golem',
	palette: _List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('G'),
			'#888899'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#555566'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#f5f5dc'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#cc2200'),
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#664433'),
			_Utils_Tuple2(
			_Utils_chr('Y'),
			'#c8a000')
		]),
	pixelSize: 8
};
var $author$project$Sprite$Act1$serpent = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['.....HHHHHHH...........', '....HHHHHHHHHH.........', '...HHHEHHHHHHHHH.......', '...HHHEHHHHHHHHHH......', '...HHHHHHHHHHHHHH......', '....HHHHHHHHHHHHH......', '....HHHTTHHHHHHH.......', '.....HHTTHHHHHH........', '......BDBDBBBB.........', '.....BDBDBDBDBBB.......', '....BDBDBDBDBDBBB......', '....BDBDBDBDBDBDBB.....', '...BDBDBDBDBDBDBDBB....', '...BDBDBDBDBDBDBDBB....', '....BDBDBDBDBDBDBB.....', '.....BDBDBDBDBBB.......', '......BDBDBDBB.........', '.......BDBDBB..........', '.......SSBDB...........', '........SSSBD..........', '.........SSBD..........', '..........SSD..........', '...........SS..........', '.......................']),
			frameB: _List_fromArray(
				['.....HHHHHHH...........', '....HHHHHHHHHH.........', '...HHHEHHHHHHHHH.......', '...HHHEHHHHHHHHHH......', '...HHHHHHHHHHHHHH......', '....HHHHHHHHHHHHH......', '....HHHTTHHHHHHH.......', '.....HTTHHHHHH.........', '......BDBDBBBB.........', '.....BDBDBDBDBBB.......', '....BDBDBDBDBDBBB......', '....BDBDBDBDBDBDBB.....', '...BDBDBDBDBDBDBDBB....', '...BDBDBDBDBDBDBDBB....', '....BDBDBDBDBDBDBB.....', '.....BDBDBDBDBBB.......', '......BDBDBDBB.........', '......SBDBDBB..........', '.......SSSBD...........', '........SSSB...........', '.........SSBD..........', '..........SSD..........', '...........SS..........', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act1$ratioSerpent = A2(
	$author$project$Sprite$Act1$serpent,
	'Ratio Serpent',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#226633'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#115522'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#338844'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffee00'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#ff4444'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#113322')
		]));
var $author$project$Sprite$Act1$sphinx = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['.........HHH...........', '........HHHHH..........', '........HEHEH..........', '........HPPHH..........', '........HHHHH..........', '.......BHHHHHHB........', '......BBBHHHHBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBBB..', '...BBBBDBBBBBBBDBBBBB..', '...BBBBDBBBBBBBDBBBBB..', '...BBBBBBBBBBBBBBBBBB..', '..BBBBBBBBBBBBBBBBBBBB.', '..BBBBBBBBBBBBBBBBBBBB.', '..BBBBDDDBBBBBBDDDBBBB.', '..BBBBBBBBBBBBBBBBBBBB.', '..BBBBBBBBBBBBBBBBBBBB.', '.PBBBB...........BBBBP.', '.PBBBBB.........BBBBBP.', '.PBBBBBB.......BBBBBBP.', '.PPBBBBBB.....BBBBBBPP.', '..PPPPBBBB...BBBBPPPP..', '.......................']),
			frameB: _List_fromArray(
				['.........HHH...........', '........HHHHH..........', '........HEHEH..........', '........HHHPH..........', '........HHHHH..........', '.......BHHHHHHB........', '......BBBHHHHBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBBB..', '...BBBBDBBBBBBBDBBBBB..', '...BBBBDBBBBBBBDBBBBB..', '...BBBBBBBBBBBBBBBBBB..', '..BBBBBBBBBBBBBBBBBBBB.', '..BBBBBBBBBBBBBBBBBBBB.', '..BBBBDDDBBBBBBDDDBBBB.', '..BBBBBBBBBBBBBBBBBBBB.', '..BBBBBBBBBBBBBBBBBBBB.', '.PBBBB...........BBBBP.', '.PBBBBB.........BBBBBP.', '.PBBBBBB.......BBBBBBP.', '.PPBBBBBB.....BBBBBBPP.', '..PPPPBBBB...BBBBPPPP..', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act1$statsSphinx = A2(
	$author$project$Sprite$Act1$sphinx,
	'Stats Sphinx',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#cc9944'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#885522'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#ffcc88'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffddaa'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#884400'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ddbb66'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#aa6600')
		]));
var $author$project$Sprite$Act1$spriteFor = function (uid) {
	var _v0 = _Utils_Tuple2(uid.course, uid.unit);
	_v0$9:
	while (true) {
		if (_v0.a.$ === 'Course1') {
			if (_v0.b.$ === 'Unit') {
				switch (_v0.b.a) {
					case 1:
						var _v1 = _v0.a;
						return $author$project$Sprite$Act1$numberGolem;
					case 2:
						var _v2 = _v0.a;
						return $author$project$Sprite$Act1$integerImp;
					case 3:
						var _v3 = _v0.a;
						return $author$project$Sprite$Act1$fractionPhantom;
					case 4:
						var _v4 = _v0.a;
						return $author$project$Sprite$Act1$expressionElemental;
					case 5:
						var _v5 = _v0.a;
						return $author$project$Sprite$Act1$equationKnight;
					case 6:
						var _v6 = _v0.a;
						return $author$project$Sprite$Act1$ratioSerpent;
					case 7:
						var _v7 = _v0.a;
						return $author$project$Sprite$Act1$geometryGargoyle;
					case 8:
						var _v8 = _v0.a;
						return $author$project$Sprite$Act1$statsSphinx;
					default:
						break _v0$9;
				}
			} else {
				var _v9 = _v0.a;
				var _v10 = _v0.b;
				return $author$project$Sprite$Act1$act1MegaBoss;
			}
		} else {
			break _v0$9;
		}
	}
	return $author$project$Sprite$Act1$numberGolem;
};
var $author$project$Sprite$Act2$fiend = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['....H.........H........', '....HH.......HH........', '...HHHBBBBBHHH.........', '...BBBBBBBBBBBB........', '..WBBBBBBBBBBBBBW......', '..WBBEPPEBBBEPPED......', '..WBBPRRPBBBPRRPD......', '..WBBEPPEBBBEPPED......', '..WBBBBBBBBBBBBBW......', '..WWBBBBBBBBBBBWW......', '..WWWBBBBBBBBBWWWW.....', '...WWWBBBBBBBBWWW......', '...CBBBBBBBBBBBBC......', '...CBBSBBBBBBSBC.......', '....BBBBBBBBBBBB.......', '....BBBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '...CBBBB.....BBBBC.....', '..CCBBBB.....BBBBCC....', '..CCSSBB.....BBSSCC....', '..CCBBBB.....BBBBCC....', '..CCCBB.......BBCCC....', '...CCCC.......CCCC.....', '.......................']),
			frameB: _List_fromArray(
				['....H.........H........', '....HH.......HH........', '...HHHBBBBBHHH.........', '...BBBBBBBBBBBB........', '..WBBBBBBBBBBBBBW......', '..WBBEPPEBBBEPPED......', '..WBBPBBPBBBPBBPD......', '..WBBEPPEBBBEPPED......', '..WBBBBBBBBBBBBBW......', '..WWBBBBBBBBBBBWW......', '..WWWWBBBBBBBWWWWW.....', '...WWWWBBBBBBWWWW......', '...CBBBBBBBBBBBBC......', '...CBBSBBBBBBSBC.......', '....BBBBBBBBBBBB.......', '....BBBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '...CBBBB.....BBBBC.....', '..CCBBBB.....BBBBCC....', '..CCSSBB.....BBSSCC....', '..CCBBBB.....BBBBCC....', '..CCCBB.......BBCCC....', '...CCCC.......CCCC.....', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act2$angleFiend = A2(
	$author$project$Sprite$Act2$fiend,
	'Angle Fiend',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#881111'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#440000'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#661100'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#330000'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffddaa'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#ff6600'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#220000'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#550000'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#ff4400')
		]));
var $author$project$Sprite$Act2$ghost = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['........BBBBB..........', '......BBBBBBBBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '....BBBBSSBBBBBSSBBBB..', '....BBBBSSBBBBBSSBBBB..', '...BBBBBBBBBBBBBBBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBWPPWBBBBWPPWBBB...', '...BBWPPWBBBBWPPWBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBSSSSSSBBBB.....', '....BBBBBBBBBBBBB......', '.....BBBBBBBBBBB.......', '...BBBB.....BBBB.......', '..TBBBB.......BBBBT....', '..TBBB.........BBBT....', '...TBB..........BT.....', '....TB..........BT.....', '.....TT.........TT.....', '......TT.......TT......', '.......................']),
			frameB: _List_fromArray(
				['........BBBBB..........', '......BBBBBBBBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '....BBBBSSBBBBBSSBBBB..', '....BBBBSSBBBBBSSBBBB..', '...BBBBBBBBBBBBBBBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBWBBWBBBBWBBWBBB...', '...BBWBBWBBBBWBBWBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBSSSSSSBBBB.....', '....BBBBBBBBBBBBB......', '.....BBBBBBBBBBB.......', '....BBBB.....BBBB......', '...TBBBB.......BBBBT...', '...TBBB.........BBBT...', '....TBB..........BT....', '.....TB..........BT....', '......TT........TT.....', '.......TT......TT......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act2$equationShade = A2(
	$author$project$Sprite$Act2$ghost,
	'Equation Shade',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#445544'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#223322'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#aaccaa'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#eeffee'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#44ff88'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#112211')
		]));
var $author$project$Sprite$Act2$beast = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['....BBBBB..............', '...BBBBBBBBB...........', '..BBBBBDDBBB...........', '..BBBBDDDBBB...........', '..BBBBBBBBBBB..........', '.BBBEPPEBBBBBB.........', '.BBBPSSPBBBBDBB........', '.BBBEPPEBBBBDBB........', '.BBBBBBBBBBBBBB........', '.BBBBBBBBBBBBBBB.......', 'CBBBBBBBBBBBBBBBBB.....', 'CBBBBBBBBBBBBBBBBBB....', 'CBBDDBBBBBBBBBBBBBB....', '.BBDDBBBBBBBBBBBBBC....', '.BBBBBBBBBBBBBBBBC.....', '.CBBBBBBBBBBBBBBC......', '..BBBBBBBBBBBBBBB......', '..SBBBB.....BBBBS......', '..SBBBB.....BBBBS......', '..CSBBB.....BBBSC......', '..CCBB.......BBCC......', '..CCSS.......SSCC......', '...FFF.......FFF.......', '.......................']),
			frameB: _List_fromArray(
				['......BBBBB............', '.....BBBBBBBBB.........', '....BBBBBDDBBB.........', '....BBBBDDDBBB.........', '....BBBBBBBBBBB........', '...BBBEPPEBBBBBB.......', '...BBBPSSPBBBBDBB......', '...BBBEPPEBBBBDBB......', '...BBBBBBBBBBBBBB......', '...BBBBBBBBBBBBBBB.....', '..CBBBBBBBBBBBBBBBBB...', '..CBBBBBBBBBBBBBBBBBB..', '..CBBDDBBBBBBBBBBBBBB..', '...BBDDBBBBBBBBBBBBBC..', '...BBBBBBBBBBBBBBBBC...', '...CBBBBBBBBBBBBBBC....', '....BBBBBBBBBBBBBBB....', '....SBBBB.....BBBBS....', '....SBBBB.....BBBBS....', '....CSBBB.....BBBSC....', '....CCBB.......BBCC....', '....CCSS.......SSCC....', '.....FFF.......FFF.....', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act2$monomialBeast = A2(
	$author$project$Sprite$Act2$beast,
	'Monomial Beast',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#553322'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#332211'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffcccc'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#cc2200'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#221100'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#eebbaa'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#442211')
		]));
var $author$project$Sprite$Act2$lich = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['..........HHH..........', '.........HHHHH.........', '........HHHHHHH........', '.......HHHHHHHHH.......', '......HHHHHHHHHHH......', '.......HHHFFHHHH.......', '......HHFFFFFFF........', '......HFFERREFFE.......', '......HFFRRRRFFE.......', '......HFFERREFFE.......', '.......HFFFFFFF........', '......BBBBBBBBBB.......', '.....BBBBBBBBBBBB......', '.....BBSBBBBBBBSBB.....', '....BBBSBBBBBBBBSBB....', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '..BBBBBBBBBBBBBBBBBBB..', '..TBBBBBBBBBBBBBBBBBT..', '.TTBBBBBBBBBBBBBBBBBTT.', '.TTTTTTTTTTTTTTTTTTTTT.', '.......................']),
			frameB: _List_fromArray(
				['..........HHH..........', '.........HHHHH.........', '........HHHHHHH........', '.......HHHHHHHHH.......', '......HHHHHHHHHHH......', '.......HHHFFHHHH.......', '......HHFFFFFFF........', '......HFFESFEFE........', '......HFFSSSSFE........', '......HFFESFEFE........', '.......HFFFFFFF........', '......BBBBBBBBBB.......', '.....BBBBBBBBBBBB......', '.....BBSBBBBBBBSBB.....', '....BBBSBBBBBBBBSBB....', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '..BBBBBBBBBBBBBBBBBBB..', '..TBBBBBBBBBBBBBBBBBT..', '.TTBBBBBBBBBBBBBBBBBTT.', '.TTTTTTTTTTTTTTTTTTTTT.', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act2$probabilityLich = A2(
	$author$project$Sprite$Act2$lich,
	'Probability Lich',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#3a1a55'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#1a0a2a'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#2a0a44'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#ccbbdd'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#eeddff'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#bb44ff'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#100820')
		]));
var $author$project$Sprite$Act2$proportionHydra = {
	frameA: _List_fromArray(
		['..H....HHHHH....H......', '.HHH..HHHHHHH..HHH.....', '.HEHN.HHHEHHHH.NHEH....', '.HHHNN.HHHHHH.NNHHH....', '..HNNN.BHHHHB.NNNHH....', '..BNNNBBHHHBBBNNNB.....', '...BNNNBBDBBBNNNB......', '..DBBNNNNBBBNNNNBBD....', '.DDBBBNNNNBNNNNBBBD....', 'DDDBBBBBNNBNNBBBBBDDD..', 'DBBBBBBBBBBBBBBBBBBBD..', '.BDBDBDBDBBBDBDBDBDB...', '..BDBDBDBBBBDBDBDB.....', '...BDBDBBBBBDBDB.......', '....BDBBBBBBBDB........', '....DBBBBBBBBD.........', '....DBBBBBBBD..........', '....TBBBBBBBBT.........', '....TBBDDBBBBT.........', '....TBBDDBBBBT.........', '.....TBBBBBBT..........', '.....TTBBBBTT..........', '......TTSSTT...........', '.......................']),
	frameB: _List_fromArray(
		['..H....HHHHH....H......', '.HHH..HHHHHHH..HHH.....', '.HENHN.HHHEHH.NHENH....', '.HHHNN.HHHHHH.NNHHH....', '..HNNNN.HHHHB.NNHHH....', '..BNNNNBHHHBBBNNNNB....', '...BNNNNBBDBBNNNNB.....', '..DBBNNNNNBBNNNNNBBD...', '.DDBBBNNNNBNNNNBBBD....', 'DDDBBBBBNNBNNBBBBBDDD..', 'DBBBBBBBBBBBBBBBBBBBD..', '.BDBDBDBDBBBDBDBDBDB...', '..BDBDBDBBBBDBDBDB.....', '...BDBDBBBBBDBDB.......', '....BDBBBBBBBDB........', '....DBBBBBBBBD.........', '....DBBBBBBBD..........', '....TBBBBBBBBT.........', '....TBBDDBBBBT.........', '....TBBDDBBBBT.........', '.....TBBBBBBT..........', '.....TTBBBBTT..........', '......TTSSTT...........', '.......................']),
	name: 'Proportion Hydra',
	palette: _List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#116655'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#0a3d33'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#228866'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffee00'),
			_Utils_Tuple2(
			_Utils_chr('N'),
			'#1a5544'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#062820'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#083828')
		]),
	pixelSize: 9
};
var $author$project$Sprite$Act2$ratioWraith = A2(
	$author$project$Sprite$Act2$ghost,
	'Ratio Wraith',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#1a1a44'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#0a0a22'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#6688bb'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#aabbdd'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#cc2222'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#050510')
		]));
var $author$project$Sprite$Act2$senseGolem = {
	frameA: _List_fromArray(
		['.......GGGGGGGG........', '......GGGGGGGGGGG......', '.....GGGDDGGGDDGGG.....', '.....GGGDDGGGDDGGG.....', '....GGGGGGGGGGGGGGGG...', '....GGYWWGGGGGWWYGGG...', '....GGWRRWGGGGWRRWGG...', '....GGWRRWGGGGWRRWGG...', '....GGYWWGGGGGWWYGG....', '....GGGGGGGGGGGGGGGG...', '....GGGDDDDDDDDGGGGG...', '.....GGGGGGGGGGGGG.....', '......DDDGGGGGDDD......', '.....GGGGGGGGGGGGG.....', '....GGGGGGGGGGGGGGG....', '...DDGGGGGGGGGGGGGDD...', '...GGGGGDDDDDDDGGGGG...', '...GGGDDDDDDDDDDDGG....', '...BBBGGGGGGGGGGGBBB...', '...BBBDDDDDDDDDDDBB....', '....BBBBBBBBBBBBBBB....', '.....BBBBBBBBBBBBB.....', '......DDDDDDDDDDD......', '......................  ']),
	frameB: _List_fromArray(
		['.......GGGGGGGG........', '......GGGGGGGGGGG......', '.....GGGDDGGGDDGGG.....', '.....GGGDDGGGDDGGG.....', '....GGGGGGGGGGGGGGGG...', '....GGYWWGGGGGWWYGGG...', '....GGWDDWGGGGWDDWGG...', '....GGWDDWGGGGWDDWGG...', '....GGYWWGGGGGWWYGG....', '....GGGGGGGGGGGGGGGG...', '....GGGDDDDDDDDGGGGG...', '.....GGGGGGGGGGGGG.....', '......DDDGGGGGDDD......', '.....GGGGGGGGGGGGG.....', '....GGGGGGGGGGGGGGG....', '...DDGGGGGGGGGGGGGDD...', '...GGGGGDDDDDDDGGGGG...', '...GGGDDDDDDDDDDDGG....', '...BBBGGGGGGGGGGGBBB...', '...BBBDDDDDDDDDDDBB....', '....BBBBBBBBBBBBBBB....', '.....BBBBBBBBBBBBB.....', '......DDDDDDDDDDD......', '......................  ']),
	name: 'Sense Golem',
	palette: _List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('G'),
			'#5577aa'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#334466'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ddeeff'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#2244cc'),
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#334455'),
			_Utils_Tuple2(
			_Utils_chr('Y'),
			'#6699cc')
		]),
	pixelSize: 8
};
var $author$project$Sprite$Act2$slopeSpecter = A2(
	$author$project$Sprite$Act2$ghost,
	'Slope Specter',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#88aacc'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#446688'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ddeeff'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#aaddff'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#224466')
		]));
var $author$project$Sprite$Act2$titan = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['......BBBBBBBBB........', '.....BBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '....BBBMMBBBBBMMBB.....', '....BBBMMBBBBBMMBB.....', '...BBBBBBBBBBBBBBBBB...', '..BBBBBBBBBBBBBBBBBBB..', '..BBBBBEPPEBBBEPPED....', '..BBBBBPSSPBBBPSSPB....', '..BBBBBEPPEBBBEPPED....', '..BBBBBBBBBBBBBBBBBBB..', '.BBBBBBBBBBBBBBBBBBBB..', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBC..', '.CBBBBBBBBBBBBBBBBBBC..', '..BBBBBBBBBBBBBBBBBBB..', '..SBBBBBBBBBBBBBBBBBS..', '..SBBBB.....SBBBBSS....', '..TBBBB.....BBBBT......', '..TSBBB.....BBBST......', '..TTSBB.....BBSTT......', '...TTTT.....TTTT.......', '.......................']),
			frameB: _List_fromArray(
				['......BBBBBBBBB........', '.....BBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '....BBBMMBBBBBMMBB.....', '....BBBMMBBBBBMMBB.....', '...BBBBBBBBBBBBBBBBB...', '..BBBBBBBBBBBBBBBBBBB..', '..BBBBBEPPEBBBEPPED....', '..BBBBBPBBPBBBPBBPB....', '..BBBBBEPPEBBBEPPED....', '..BBBBBBBBBBBBBBBBBBB..', '.BBBBBBBBBBBBBBBBBBBB..', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBC..', '.CBBBBBBBBBBBBBBBBBBC..', '..BBBBBBBBBBBBBBBBBBB..', '..SBBBBBBBBBBBBBBBBBS..', '..SBBBB.....SBBBBSS....', '..TBBBB.....BBBBT......', '..TSBBB.....BBBST......', '..TTSBB.....BBSTT......', '...TTTT.....TTTT.......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act2$volumeTitan = A2(
	$author$project$Sprite$Act2$titan,
	'Volume Titan',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#446633'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#223311'),
			_Utils_Tuple2(
			_Utils_chr('M'),
			'#558844'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ccffcc'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#33aa44'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#112200'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#111100')
		]));
var $author$project$Sprite$Act2$spriteFor = function (uid) {
	var _v0 = _Utils_Tuple2(uid.course, uid.unit);
	_v0$9:
	while (true) {
		if (_v0.a.$ === 'Course2') {
			if (_v0.b.$ === 'Unit') {
				switch (_v0.b.a) {
					case 1:
						var _v1 = _v0.a;
						return $author$project$Sprite$Act2$senseGolem;
					case 2:
						var _v2 = _v0.a;
						return $author$project$Sprite$Act2$monomialBeast;
					case 3:
						var _v3 = _v0.a;
						return $author$project$Sprite$Act2$equationShade;
					case 4:
						var _v4 = _v0.a;
						return $author$project$Sprite$Act2$ratioWraith;
					case 5:
						var _v5 = _v0.a;
						return $author$project$Sprite$Act2$slopeSpecter;
					case 6:
						var _v6 = _v0.a;
						return $author$project$Sprite$Act2$angleFiend;
					case 7:
						var _v7 = _v0.a;
						return $author$project$Sprite$Act2$volumeTitan;
					case 8:
						var _v8 = _v0.a;
						return $author$project$Sprite$Act2$probabilityLich;
					default:
						break _v0$9;
				}
			} else {
				var _v9 = _v0.a;
				var _v10 = _v0.b;
				return $author$project$Sprite$Act2$proportionHydra;
			}
		} else {
			break _v0$9;
		}
	}
	return $author$project$Sprite$Act2$senseGolem;
};
var $author$project$Sprite$Act3$lich = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['..........HHH..........', '.........HHHHH.........', '........HHHHHHH........', '.......HHHHHHHHH.......', '......HHHHHHHHHHH......', '.......HHHFFHHHH.......', '......HHFFFFFFF........', '......HFFERREFFE.......', '......HFFRRRRFFE.......', '......HFFERREFFE.......', '.......HFFFFFFF........', '......BBBBBBBBBB.......', '.....BBBBBBBBBBBB......', '.....BBSBBBBBBBSBB.....', '....BBBSBBBBBBBBSBB....', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '..BBBBBBBBBBBBBBBBBBB..', '..TBBBBBBBBBBBBBBBBBT..', '.TTBBBBBBBBBBBBBBBBBTT.', '.TTTTTTTTTTTTTTTTTTTTT.', '.......................']),
			frameB: _List_fromArray(
				['..........HHH..........', '.........HHHHH.........', '........HHHHHHH........', '.......HHHHHHHHH.......', '......HHHHHHHHHHH......', '.......HHHFFHHHH.......', '......HHFFFFFFF........', '......HFFESFEFE........', '......HFFSSSSFE........', '......HFFESFEFE........', '.......HFFFFFFF........', '......BBBBBBBBBB.......', '.....BBBBBBBBBBBB......', '.....BBSBBBBBBBSBB.....', '....BBBSBBBBBBBBSBB....', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '..BBBBBBBBBBBBBBBBBBB..', '..TBBBBBBBBBBBBBBBBBT..', '.TTBBBBBBBBBBBBBBBBBTT.', '.TTTTTTTTTTTTTTTTTTTTT.', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act3$multiStepMage = A2(
	$author$project$Sprite$Act3$lich,
	'Multi-Step Mage',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#223388'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#111155'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#1a2266'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#ffeecc'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#fff5dd'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#ffcc00'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#660022')
		]));
var $author$project$Sprite$Act3$beast = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['....BBBBB..............', '...BBBBBBBBB...........', '..BBBBBDDBBB...........', '..BBBBDDDBBB...........', '..BBBBBBBBBBB..........', '.BBBEPPEBBBBBB.........', '.BBBPSSPBBBBDBB........', '.BBBEPPEBBBBDBB........', '.BBBBBBBBBBBBBB........', '.BBBBBBBBBBBBBBB.......', 'CBBBBBBBBBBBBBBBBB.....', 'CBBBBBBBBBBBBBBBBBB....', 'CBBDDBBBBBBBBBBBBBB....', '.BBDDBBBBBBBBBBBBBC....', '.BBBBBBBBBBBBBBBBC.....', '.CBBBBBBBBBBBBBBC......', '..BBBBBBBBBBBBBBB......', '..SBBBB.....BBBBS......', '..SBBBB.....BBBBS......', '..CSBBB.....BBBSC......', '..CCBB.......BBCC......', '..CCSS.......SSCC......', '...FFF.......FFF.......', '.......................']),
			frameB: _List_fromArray(
				['......BBBBB............', '.....BBBBBBBBB.........', '....BBBBBDDBBB.........', '....BBBBDDDBBB.........', '....BBBBBBBBBBB........', '...BBBEPPEBBBBBB.......', '...BBBPSSPBBBBDBB......', '...BBBEPPEBBBBDBB......', '...BBBBBBBBBBBBBB......', '...BBBBBBBBBBBBBBB.....', '..CBBBBBBBBBBBBBBBBB...', '..CBBBBBBBBBBBBBBBBBB..', '..CBBDDBBBBBBBBBBBBBB..', '...BBDDBBBBBBBBBBBBBC..', '...BBBBBBBBBBBBBBBBC...', '...CBBBBBBBBBBBBBBC....', '....BBBBBBBBBBBBBBB....', '....SBBBB.....BBBBS....', '....SBBBB.....BBBBS....', '....CSBBB.....BBBSC....', '....CCBB.......BBCC....', '....CCSS.......SSCC....', '.....FFF.......FFF.....', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act3$percentPredator = A2(
	$author$project$Sprite$Act3$beast,
	'Percent Predator',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#aa6622'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#663311'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffeeaa'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#cc8800'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#331100'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#ffddbb'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#773300')
		]));
var $author$project$Sprite$Act3$ghost = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['........BBBBB..........', '......BBBBBBBBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '....BBBBSSBBBBBSSBBBB..', '....BBBBSSBBBBBSSBBBB..', '...BBBBBBBBBBBBBBBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBWPPWBBBBWPPWBBB...', '...BBWPPWBBBBWPPWBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBSSSSSSBBBB.....', '....BBBBBBBBBBBBB......', '.....BBBBBBBBBBB.......', '...BBBB.....BBBB.......', '..TBBBB.......BBBBT....', '..TBBB.........BBBT....', '...TBB..........BT.....', '....TB..........BT.....', '.....TT.........TT.....', '......TT.......TT......', '.......................']),
			frameB: _List_fromArray(
				['........BBBBB..........', '......BBBBBBBBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '....BBBBSSBBBBBSSBBBB..', '....BBBBSSBBBBBSSBBBB..', '...BBBBBBBBBBBBBBBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBWBBWBBBBWBBWBBB...', '...BBWBBWBBBBWBBWBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBSSSSSSBBBB.....', '....BBBBBBBBBBBBB......', '.....BBBBBBBBBBB.......', '....BBBB.....BBBB......', '...TBBBB.......BBBBT...', '...TBBB.........BBBT...', '....TBB..........BT....', '.....TB..........BT....', '......TT........TT.....', '.......TT......TT......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act3$polyPhantom = A2(
	$author$project$Sprite$Act3$ghost,
	'Poly Phantom',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#7755aa'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#442266'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ddbbee'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#eeddff'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#220044')
		]));
var $author$project$Sprite$Act3$preAlgebraLich = {
	frameA: _List_fromArray(
		['...........HHH.........', '..........HHHHH........', '.........HHHHHHH.......', '........HHHHHHHHH......', '.......HHHHHHHHHHH.....', '........HHHFFHHH.......', '.......HHFFFFFFFF......', '..M....HFFEERREFFE.....', '..MA...HFFRRRRRRFE.....', '..MA...HFFEERREFFE.....', '..M....HFFFFFFFF.......', '..AAA..BBBBBBBBBBB.....', '..AAA.BBBBBBBBBBBBB....', '.....BBBSBBBBBBBSBB....', '....BBBSBBBBBBBBSBB....', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '..BBBBBBBBBBBBBBBBBBB..', '..TBBBBBBBBBBBBBBBBBT..', '.TTBBBBBBBBBBBBBBBBBTT.', '.TTTTTTTTTTTTTTTTTTTTT.', '......................  ']),
	frameB: _List_fromArray(
		['...........HHH.........', '..........HHHHH........', '.........HHHHHHH.......', '........HHHHHHHHH......', '.......HHHHHHHHHHH.....', '........HHHFFHHH.......', '.......HHFFFFFFFF......', '..M....HFFEESFEFE....', '..MA...HFFSSSSFFE....', '..MA...HFFEESFEFE....', '..M....HFFFFFFFF.......', '..AAA..BBBBBBBBBBB.....', '..AAA.BBBBBBBBBBBBB....', '.....BBBSBBBBBBBSBB....', '....BBBSBBBBBBBBSBB....', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '..BBBBBBBBBBBBBBBBBBB..', '..TBBBBBBBBBBBBBBBBBT..', '.TTBBBBBBBBBBBBBBBBBTT.', '.TTTTTTTTTTTTTTTTTTTTT.', '......................  ']),
	name: 'Pre-Algebra Lich',
	palette: _List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#331155'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#110033'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#220044'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#ddc8ee'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#cc44ff'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#110022'),
			_Utils_Tuple2(
			_Utils_chr('M'),
			'#9955dd'),
			_Utils_Tuple2(
			_Utils_chr('A'),
			'#663399')
		]),
	pixelSize: 8
};
var $author$project$Sprite$Act3$rootRevenant = A2(
	$author$project$Sprite$Act3$ghost,
	'Root Revenant',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#1a3322'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#0a1a0a'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#886655'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#cc9977'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#ff3300'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#050a05')
		]));
var $author$project$Sprite$Act3$scatterShade = A2(
	$author$project$Sprite$Act3$ghost,
	'Scatter Shade',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#778899'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#445566'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#aaffff'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#eeffff'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#00ddff'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#223344')
		]));
var $author$project$Sprite$Act3$slopeStalker = A2(
	$author$project$Sprite$Act3$beast,
	'Slope Stalker',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#444455'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#222233'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ccdde0'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#99bbcc'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#111122'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#aabbcc'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#333344')
		]));
var $author$project$Sprite$Act3$serpent = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['.....HHHHHHH...........', '....HHHHHHHHHH.........', '...HHHEHHHHHHHHH.......', '...HHHEHHHHHHHHHH......', '...HHHHHHHHHHHHHH......', '....HHHHHHHHHHHHH......', '....HHHTTHHHHHHH.......', '.....HHTTHHHHHH........', '......BDBDBBBB.........', '.....BDBDBDBDBBB.......', '....BDBDBDBDBDBBB......', '....BDBDBDBDBDBDBB.....', '...BDBDBDBDBDBDBDBB....', '...BDBDBDBDBDBDBDBB....', '....BDBDBDBDBDBDBB.....', '.....BDBDBDBDBBB.......', '......BDBDBDBB.........', '.......BDBDBB..........', '.......SSBDB...........', '........SSSBD..........', '.........SSBD..........', '..........SSD..........', '...........SS..........', '.......................']),
			frameB: _List_fromArray(
				['.....HHHHHHH...........', '....HHHHHHHHHH.........', '...HHHEHHHHHHHHH.......', '...HHHEHHHHHHHHHH......', '...HHHHHHHHHHHHHH......', '....HHHHHHHHHHHHH......', '....HHHTTHHHHHHH.......', '.....HTTHHHHHH.........', '......BDBDBBBB.........', '.....BDBDBDBDBBB.......', '....BDBDBDBDBDBBB......', '....BDBDBDBDBDBDBB.....', '...BDBDBDBDBDBDBDBB....', '...BDBDBDBDBDBDBDBB....', '....BDBDBDBDBDBDBB.....', '.....BDBDBDBDBBB.......', '......BDBDBDBB.........', '......SBDBDBB..........', '.......SSSBD...........', '........SSSB...........', '.........SSBD..........', '..........SSD..........', '...........SS..........', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act3$systemSerpent = A2(
	$author$project$Sprite$Act3$serpent,
	'System Serpent',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#bb6611'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#883300'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#cc7722'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffcc44'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#dd2200'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#441100')
		]));
var $author$project$Sprite$Act3$titan = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['......BBBBBBBBB........', '.....BBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '....BBBMMBBBBBMMBB.....', '....BBBMMBBBBBMMBB.....', '...BBBBBBBBBBBBBBBBB...', '..BBBBBBBBBBBBBBBBBBB..', '..BBBBBEPPEBBBEPPED....', '..BBBBBPSSPBBBPSSPB....', '..BBBBBEPPEBBBEPPED....', '..BBBBBBBBBBBBBBBBBBB..', '.BBBBBBBBBBBBBBBBBBBB..', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBC..', '.CBBBBBBBBBBBBBBBBBBC..', '..BBBBBBBBBBBBBBBBBBB..', '..SBBBBBBBBBBBBBBBBBS..', '..SBBBB.....SBBBBSS....', '..TBBBB.....BBBBT......', '..TSBBB.....BBBST......', '..TTSBB.....BBSTT......', '...TTTT.....TTTT.......', '.......................']),
			frameB: _List_fromArray(
				['......BBBBBBBBB........', '.....BBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '....BBBMMBBBBBMMBB.....', '....BBBMMBBBBBMMBB.....', '...BBBBBBBBBBBBBBBBB...', '..BBBBBBBBBBBBBBBBBBB..', '..BBBBBEPPEBBBEPPED....', '..BBBBBPBBPBBBPBBPB....', '..BBBBBEPPEBBBEPPED....', '..BBBBBBBBBBBBBBBBBBB..', '.BBBBBBBBBBBBBBBBBBBB..', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBC..', '.CBBBBBBBBBBBBBBBBBBC..', '..BBBBBBBBBBBBBBBBBBB..', '..SBBBBBBBBBBBBBBBBBS..', '..SBBBB.....SBBBBSS....', '..TBBBB.....BBBBT......', '..TSBBB.....BBBST......', '..TTSBB.....BBSTT......', '...TTTT.....TTTT.......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act3$theoremTroll = A2(
	$author$project$Sprite$Act3$titan,
	'Theorem Troll',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#446633'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#223311'),
			_Utils_Tuple2(
			_Utils_chr('M'),
			'#668844'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffeecc'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#996622'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#331100'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#221100')
		]));
var $author$project$Sprite$Act3$volumeViper = A2(
	$author$project$Sprite$Act3$serpent,
	'Volume Viper',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#551188'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#330066'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#7722aa'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ff8800'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#ff4400'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#220044')
		]));
var $author$project$Sprite$Act3$spriteFor = function (uid) {
	var _v0 = _Utils_Tuple2(uid.course, uid.unit);
	_v0$10:
	while (true) {
		if (_v0.a.$ === 'PreAlgebra') {
			if (_v0.b.$ === 'Unit') {
				switch (_v0.b.a) {
					case 1:
						var _v1 = _v0.a;
						return $author$project$Sprite$Act3$rootRevenant;
					case 2:
						var _v2 = _v0.a;
						return $author$project$Sprite$Act3$polyPhantom;
					case 3:
						var _v3 = _v0.a;
						return $author$project$Sprite$Act3$multiStepMage;
					case 4:
						var _v4 = _v0.a;
						return $author$project$Sprite$Act3$percentPredator;
					case 5:
						var _v5 = _v0.a;
						return $author$project$Sprite$Act3$slopeStalker;
					case 6:
						var _v6 = _v0.a;
						return $author$project$Sprite$Act3$systemSerpent;
					case 7:
						var _v7 = _v0.a;
						return $author$project$Sprite$Act3$theoremTroll;
					case 8:
						var _v8 = _v0.a;
						return $author$project$Sprite$Act3$volumeViper;
					case 9:
						var _v9 = _v0.a;
						return $author$project$Sprite$Act3$scatterShade;
					default:
						break _v0$10;
				}
			} else {
				var _v10 = _v0.a;
				var _v11 = _v0.b;
				return $author$project$Sprite$Act3$preAlgebraLich;
			}
		} else {
			break _v0$10;
		}
	}
	return $author$project$Sprite$Act3$preAlgebraLich;
};
var $author$project$Sprite$Act4$titan = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['......BBBBBBBBB........', '.....BBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '....BBBMMBBBBBMMBB.....', '....BBBMMBBBBBMMBB.....', '...BBBBBBBBBBBBBBBBB...', '..BBBBBBBBBBBBBBBBBBB..', '..BBBBBEPPEBBBEPPED....', '..BBBBBPSSPBBBPSSPB....', '..BBBBBEPPEBBBEPPED....', '..BBBBBBBBBBBBBBBBBBB..', '.BBBBBBBBBBBBBBBBBBBB..', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBC..', '.CBBBBBBBBBBBBBBBBBBC..', '..BBBBBBBBBBBBBBBBBBB..', '..SBBBBBBBBBBBBBBBBBS..', '..SBBBB.....SBBBBSS....', '..TBBBB.....BBBBT......', '..TSBBB.....BBBST......', '..TTSBB.....BBSTT......', '...TTTT.....TTTT.......', '.......................']),
			frameB: _List_fromArray(
				['......BBBBBBBBB........', '.....BBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '....BBBMMBBBBBMMBB.....', '....BBBMMBBBBBMMBB.....', '...BBBBBBBBBBBBBBBBB...', '..BBBBBBBBBBBBBBBBBBB..', '..BBBBBEPPEBBBEPPED....', '..BBBBBPBBPBBBPBBPB....', '..BBBBBEPPEBBBEPPED....', '..BBBBBBBBBBBBBBBBBBB..', '.BBBBBBBBBBBBBBBBBBBB..', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBBC.', 'CBBBBBBBBBBBBBBBBBBBC..', '.CBBBBBBBBBBBBBBBBBBC..', '..BBBBBBBBBBBBBBBBBBB..', '..SBBBBBBBBBBBBBBBBBS..', '..SBBBB.....SBBBBSS....', '..TBBBB.....BBBBT......', '..TSBBB.....BBBST......', '..TTSBB.....BBSTT......', '...TTTT.....TTTT.......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act4$algebraOgre = A2(
	$author$project$Sprite$Act4$titan,
	'Algebra Ogre',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#778833'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#445511'),
			_Utils_Tuple2(
			_Utils_chr('M'),
			'#99bb44'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffeecc'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#aacc00'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#223300'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#112200')
		]));
var $author$project$Sprite$Act4$algebraTitan = {
	frameA: _List_fromArray(
		['..PPPP..BBBB..PPPP....', '.PPPPPPBBBBBBPPPPPP...', '.PPPPPPBBBBBBPPPPPP...', '.PPPPPPBBBBBBPPPPPP...', '..PPPSSBBBBBBSSPPP....', '...SSSBHHHHHHBSSS.....', '....BBHHHHHHHHHBB.....', '....BHEEEEEEEEHB......', '....BHERRRRRREHB......', '....BHEEEEEEEEHB......', '....BBHHHHHHHHHBB.....', '....BBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBB...', '...BBBGXBBBBBXGBBB....', '...BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBB....', '...BBBBGGGGGGGBBBB....', '....BBBBBBBBBBBBBB....', '....XBBB......BBBX....', '...XXBBB......BBBXX...', '...XXBBB......BBBXX...', '...XXSSS......SSSXX...', '....XXXX......XXXX....', '......................  ']),
	frameB: _List_fromArray(
		['..PPPP..BBBB..PPPP....', '.PPPPPPBBBBBBPPPPPP...', '.PPPPPPBBBBBBPPPPPP...', '.PPPPPPBBBBBBPPPPPP...', '..PPPSSBBBBBBSSPPP....', '...SSSBHHHHHHBSSS.....', '....BBHHHHHHHHHBB.....', '....BHEEEEEEEEHB......', '....BHESSSSSEHB.......', '....BHEEEEEEEEHB......', '....BBHHHHHHHHHBB.....', '....BBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBB...', '...BBBGXBBBBBXGBBB....', '...BBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBB....', '...BBBBGGGGGGGBBBB....', '....BBBBBBBBBBBBBB....', '....XBBB......BBBX....', '...XXBBB......BBBXX...', '...XXBBB......BBBXX...', '...XXSSS......SSSXX...', '....XXXX......XXXX....', '......................  ']),
	name: 'Algebra Titan',
	palette: _List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#333344'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#111122'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#445566'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#222233'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffaaaa'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#ff2222'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#000011'),
			_Utils_Tuple2(
			_Utils_chr('G'),
			'#cc3300'),
			_Utils_Tuple2(
			_Utils_chr('X'),
			'#551100')
		]),
	pixelSize: 8
};
var $author$project$Sprite$Act4$ghost = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['........BBBBB..........', '......BBBBBBBBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '....BBBBSSBBBBBSSBBBB..', '....BBBBSSBBBBBSSBBBB..', '...BBBBBBBBBBBBBBBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBWPPWBBBBWPPWBBB...', '...BBWPPWBBBBWPPWBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBSSSSSSBBBB.....', '....BBBBBBBBBBBBB......', '.....BBBBBBBBBBB.......', '...BBBB.....BBBB.......', '..TBBBB.......BBBBT....', '..TBBB.........BBBT....', '...TBB..........BT.....', '....TB..........BT.....', '.....TT.........TT.....', '......TT.......TT......', '.......................']),
			frameB: _List_fromArray(
				['........BBBBB..........', '......BBBBBBBBBBB......', '.....BBBBBBBBBBBBB.....', '....BBBBBBBBBBBBBBB....', '....BBBBSSBBBBBSSBBBB..', '....BBBBSSBBBBBSSBBBB..', '...BBBBBBBBBBBBBBBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBWBBWBBBBWBBWBBB...', '...BBWBBWBBBBWBBWBBB...', '...BBEWWBBBBBBWWEBBB...', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBSSSSSSBBBB.....', '....BBBBBBBBBBBBB......', '.....BBBBBBBBBBB.......', '....BBBB.....BBBB......', '...TBBBB.......BBBBT...', '...TBBB.........BBBT...', '....TBB..........BT....', '.....TB..........BT....', '......TT........TT.....', '.......TT......TT......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act4$equationWraith = A2(
	$author$project$Sprite$Act4$ghost,
	'Equation Wraith',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#881122'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#440011'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffcccc'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ffeeee'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#ddcccc'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#220000')
		]));
var $author$project$Sprite$Act4$elemental = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['..........W............', '.........WWW...........', '......WWWWWWWWWW.......', '.....WWWWBBBBWWWWW.....', '....WWWWBBBBBBWWWWW....', '....WWWBBBCCCBBBWWW....', '...WWWBBBCCGCCBBBWWWW..', '...WWWBBBCCGCCBBBWWW...', '...WWWWBBBCCCBBBWWWWW..', '....WWWWBBBBBBBWWWWW...', '.....WWWWWWWWWWWWWW....', '......WWWWWWWWWWWWWW...', '.....SWWWWWWWWWWWWS....', '....SWWWWWWWWWWWWWSS...', '....SWWWWWWWWWWWWSS....', '.....SWWWWWWWWWWSS.....', '......SWWWWWWWWSS......', '.....SSSWWWWWWSSS......', '....SSWWW...WWWSS......', '...SSW.........WSS.....', '..SS............SS.....', '...SS..........SS......', '....SSS......SSS.......', '.......................']),
			frameB: _List_fromArray(
				['............W..........', '...........WWW.........', '......WWWWWWWWWWW......', '.....WWWWBBBBWWWWW.....', '....WWWWBBBBBBWWWWWW...', '....WWWBBBCCCBBBWWWW...', '...WWWWBBBCCGCCBBBWWW..', '...WWWBBBCCGCCBBBWWWWW.', '...WWWWBBBCCCBBBWWWWW..', '....WWWWBBBBBBBWWWWW...', '.....WWWWWWWWWWWWWWW...', '......WWWWWWWWWWWWWWW..', '.....SWWWWWWWWWWWWSS...', '....SWWWWWWWWWWWWSS....', '....SWWWWWWWWWWWSS.....', '.....SWWWWWWWWSS.......', '......SWWWWWWSS........', '.....SSWWWWWWSS........', '....SSWWW...WWSS.......', '...SSW.........WSS.....', '..SS............SS.....', '...SS..........SS......', '....SSS......SSS.......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act4$exponentElemental = A2(
	$author$project$Sprite$Act4$elemental,
	'Exponent Elemental',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('G'),
			'#ffff88'),
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#ffaa00'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#cc5500'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#662200')
		]));
var $author$project$Sprite$Act4$fiend = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['....H.........H........', '....HH.......HH........', '...HHHBBBBBHHH.........', '...BBBBBBBBBBBB........', '..WBBBBBBBBBBBBBW......', '..WBBEPPEBBBEPPED......', '..WBBPRRPBBBPRRPD......', '..WBBEPPEBBBEPPED......', '..WBBBBBBBBBBBBBW......', '..WWBBBBBBBBBBBWW......', '..WWWBBBBBBBBBWWWW.....', '...WWWBBBBBBBBWWW......', '...CBBBBBBBBBBBBC......', '...CBBSBBBBBBSBC.......', '....BBBBBBBBBBBB.......', '....BBBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '...CBBBB.....BBBBC.....', '..CCBBBB.....BBBBCC....', '..CCSSBB.....BBSSCC....', '..CCBBBB.....BBBBCC....', '..CCCBB.......BBCCC....', '...CCCC.......CCCC.....', '.......................']),
			frameB: _List_fromArray(
				['....H.........H........', '....HH.......HH........', '...HHHBBBBBHHH.........', '...BBBBBBBBBBBB........', '..WBBBBBBBBBBBBBW......', '..WBBEPPEBBBEPPED......', '..WBBPBBPBBBPBBPD......', '..WBBEPPEBBBEPPED......', '..WBBBBBBBBBBBBBW......', '..WWBBBBBBBBBBBWW......', '..WWWWBBBBBBBWWWWW.....', '...WWWWBBBBBBWWWW......', '...CBBBBBBBBBBBBC......', '...CBBSBBBBBBSBC.......', '....BBBBBBBBBBBB.......', '....BBBBBBBBBBBB.......', '....BBBBBBBBBBBBB......', '...CBBBB.....BBBBC.....', '..CCBBBB.....BBBBCC....', '..CCSSBB.....BBSSCC....', '..CCBBBB.....BBBBCC....', '..CCCBB.......BBCCC....', '...CCCC.......CCCC.....', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act4$functionFiend = A2(
	$author$project$Sprite$Act4$fiend,
	'Function Fiend',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#115522'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#002211'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#002200'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#001100'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#eeffee'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#001100'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#003311'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#aaffaa')
		]));
var $author$project$Sprite$Act4$serpent = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['.....HHHHHHH...........', '....HHHHHHHHHH.........', '...HHHEHHHHHHHHH.......', '...HHHEHHHHHHHHHH......', '...HHHHHHHHHHHHHH......', '....HHHHHHHHHHHHH......', '....HHHTTHHHHHHH.......', '.....HHTTHHHHHH........', '......BDBDBBBB.........', '.....BDBDBDBDBBB.......', '....BDBDBDBDBDBBB......', '....BDBDBDBDBDBDBB.....', '...BDBDBDBDBDBDBDBB....', '...BDBDBDBDBDBDBDBB....', '....BDBDBDBDBDBDBB.....', '.....BDBDBDBDBBB.......', '......BDBDBDBB.........', '.......BDBDBB..........', '.......SSBDB...........', '........SSSBD..........', '.........SSBD..........', '..........SSD..........', '...........SS..........', '.......................']),
			frameB: _List_fromArray(
				['.....HHHHHHH...........', '....HHHHHHHHHH.........', '...HHHEHHHHHHHHH.......', '...HHHEHHHHHHHHHH......', '...HHHHHHHHHHHHHH......', '....HHHHHHHHHHHHH......', '....HHHTTHHHHHHH.......', '.....HTTHHHHHH.........', '......BDBDBBBB.........', '.....BDBDBDBDBBB.......', '....BDBDBDBDBDBBB......', '....BDBDBDBDBDBDBB.....', '...BDBDBDBDBDBDBDBB....', '...BDBDBDBDBDBDBDBB....', '....BDBDBDBDBDBDBB.....', '.....BDBDBDBDBBB.......', '......BDBDBDBB.........', '......SBDBDBB..........', '.......SSSBD...........', '........SSSB...........', '.........SSBD..........', '..........SSD..........', '...........SS..........', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act4$linearLeviathan = A2(
	$author$project$Sprite$Act4$serpent,
	'Linear Leviathan',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#112266'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#0a1144'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#1a3388'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#00eeff'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#0088cc'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#050a22')
		]));
var $author$project$Sprite$Act4$beast = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['....BBBBB..............', '...BBBBBBBBB...........', '..BBBBBDDBBB...........', '..BBBBDDDBBB...........', '..BBBBBBBBBBB..........', '.BBBEPPEBBBBBB.........', '.BBBPSSPBBBBDBB........', '.BBBEPPEBBBBDBB........', '.BBBBBBBBBBBBBB........', '.BBBBBBBBBBBBBBB.......', 'CBBBBBBBBBBBBBBBBB.....', 'CBBBBBBBBBBBBBBBBBB....', 'CBBDDBBBBBBBBBBBBBB....', '.BBDDBBBBBBBBBBBBBC....', '.BBBBBBBBBBBBBBBBC.....', '.CBBBBBBBBBBBBBBC......', '..BBBBBBBBBBBBBBB......', '..SBBBB.....BBBBS......', '..SBBBB.....BBBBS......', '..CSBBB.....BBBSC......', '..CCBB.......BBCC......', '..CCSS.......SSCC......', '...FFF.......FFF.......', '.......................']),
			frameB: _List_fromArray(
				['......BBBBB............', '.....BBBBBBBBB.........', '....BBBBBDDBBB.........', '....BBBBDDDBBB.........', '....BBBBBBBBBBB........', '...BBBEPPEBBBBBB.......', '...BBBPSSPBBBBDBB......', '...BBBEPPEBBBBDBB......', '...BBBBBBBBBBBBBB......', '...BBBBBBBBBBBBBBB.....', '..CBBBBBBBBBBBBBBBBB...', '..CBBBBBBBBBBBBBBBBBB..', '..CBBDDBBBBBBBBBBBBBB..', '...BBDDBBBBBBBBBBBBBC..', '...BBBBBBBBBBBBBBBBC...', '...CBBBBBBBBBBBBBBC....', '....BBBBBBBBBBBBBBB....', '....SBBBB.....BBBBS....', '....SBBBB.....BBBBS....', '....CSBBB.....BBBSC....', '....CCBB.......BBCC....', '....CCSS.......SSCC....', '.....FFF.......FFF.....', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act4$polyPredator = A2(
	$author$project$Sprite$Act4$beast,
	'Poly Predator',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#442266'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#220044'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffeeaa'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#ffcc00'),
			_Utils_Tuple2(
			_Utils_chr('C'),
			'#110022'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#ccbbee'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#331155')
		]));
var $author$project$Sprite$Act4$quadraShade = A2(
	$author$project$Sprite$Act4$ghost,
	'Quadra Shade',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#111111'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#050505'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#440000'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#880000'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#ff0000'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#020202')
		]));
var $author$project$Sprite$Act4$knight = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['......PPPPPPPPPPP......', '.....PPPPPPPPPPPPP.....', '....PPPPPHHHHHHPPPPP...', '....PPPPHHHHHHHPPPP....', '.....PPHHHHHHHHHPP.....', '.....PPHEEEEEEEHPP.....', '.....PPHERRRREHPP......', '.....PPHEEEEEEEHPP.....', '.....PPHHHHHHHHHPP.....', '....BBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '...BBBSSBBBBBBSSBBBB...', '...BBBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '....BBBSSSSSSSSBBBB....', '....BBBBBBBBBBBBBB.....', '....TBBBB.....BBBBT....', '....TBBBB.....BBBBT....', '....TSSBB.....BSSST....', '....TTTBB.....BBBTT....', '.....TTTT.....TTTT.....', '.......................']),
			frameB: _List_fromArray(
				['......PPPPPPPPPPP......', '.....PPPPPPPPPPPPP.....', '....PPPPPHHHHHHPPPPP...', '....PPPPHHHHHHHPPPP....', '.....PPHHHHHHHHHPP.....', '.....PPHEEEEEEEHPP.....', '.....PPHEBBBBEHPP......', '.....PPHEEEEEEEHPP.....', '.....PPHHHHHHHHHPP.....', '....BBBBBBBBBBBBBBBB...', '...BBBBBBBBBBBBBBBBBB..', '...BBBSSBBBBBBSSBBBB...', '...BBBBBBBBBBBBBBBB....', '...BBBBBBBBBBBBBBBBB...', '....BBBBBBBBBBBBBBB....', '....BBBBBBBBBBBBBBB....', '....BBBSSSSSSSSBBBB....', '....BBBBBBBBBBBBBB.....', '....TBBBB.....BBBBT....', '....TBBBB.....BBBBT....', '....TSSBB.....BSSST....', '....TTTBB.....BBBTT....', '.....TTTT.....TTTT.....', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act4$radicalRider = A2(
	$author$project$Sprite$Act4$knight,
	'Radical Rider',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#222233'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#111122'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#333344'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ddbbff'),
			_Utils_Tuple2(
			_Utils_chr('R'),
			'#aa44ff'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#444455'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#000011')
		]));
var $author$project$Sprite$Act4$reaper = F2(
	function (name, palette) {
		return {
			frameA: _List_fromArray(
				['.....HHHHHHHH..........', '....HHHHHHHHHH.........', '....HHHFFFHHHH.........', '....HHFFFFFFF..........', '....HHFFEEFFF..........', '....HHFFEEFFF..........', '.....HHFFFFFF..........', '.....HHHHHHHHH.........', '.K...BBBBBBBBBB........', 'KK...BBBBBBBBBBB.......', 'KKKK.BBBBBBBBBBB.......', '.LKKKBBBSBBBBBBB.......', '..LLL.BBBSBBBBBB.......', '...LLL.BBBBBBBBBB......', '....LL..BBBBBBBBB......', '....LL..BBBBBBBBB......', '....LL..BBBBBBBBB......', '.....L..BBBSBBBB.......', '.....L.BBBBBBBBB.......', '......BBBBBBBBBB.......', '......SBBBBBBBBB.......', '.....SSBBBBBBBBBB......', '....SSSSSSSSSSSSS......', '.......................']),
			frameB: _List_fromArray(
				['.....HHHHHHHH..........', '....HHHHHHHHHH.........', '....HHHFFFHHHH.........', '....HHFFFFFFF..........', '....HHFFBBFFF..........', '....HHFFBBFFF..........', '.....HHFFFFFF..........', '.....HHHHHHHHH.........', '.K...BBBBBBBBBB........', 'KK...BBBBBBBBBBB.......', 'KKKK.BBBBBBBBBBB.......', '.LKKKBBBSBBBBBBB.......', '..LLL.BBBSBBBBBB.......', '...LLL.BBBBBBBBBB......', '....LL..BBBBBBBBB......', '....LL..BBBBBBBBB......', '....LL..BBBBBBBBB......', '.....L..BBBSBBBB.......', '.....L.BBBBBBBBB.......', '......BBBBBBBBBB.......', '......SBBBBBBBBB.......', '.....SSBBBBBBBBBB......', '....SSSSSSSSSSSSS......', '.......................']),
			name: name,
			palette: palette,
			pixelSize: 8
		};
	});
var $author$project$Sprite$Act4$rationalReaper = A2(
	$author$project$Sprite$Act4$reaper,
	'Rational Reaper',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#333322'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#1a1a11'),
			_Utils_Tuple2(
			_Utils_chr('F'),
			'#ccbb99'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#00ff88'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#221100'),
			_Utils_Tuple2(
			_Utils_chr('K'),
			'#ccccaa'),
			_Utils_Tuple2(
			_Utils_chr('L'),
			'#886644')
		]));
var $author$project$Sprite$Act4$regressionRevenant = A2(
	$author$project$Sprite$Act4$ghost,
	'Regression Revenant',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#115544'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#082a22'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#88ddcc'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ccffee'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#aaddcc'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#041510')
		]));
var $author$project$Sprite$Act4$systemSpecter = A2(
	$author$project$Sprite$Act4$ghost,
	'System Specter',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#ddddcc'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#aaaaaa'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('W'),
			'#ffffff'),
			_Utils_Tuple2(
			_Utils_chr('P'),
			'#999999'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#888888')
		]));
var $author$project$Sprite$Act4$varianceViper = A2(
	$author$project$Sprite$Act4$serpent,
	'Variance Viper',
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('B'),
			'#881122'),
			_Utils_Tuple2(
			_Utils_chr('D'),
			'#550011'),
			_Utils_Tuple2(
			_Utils_chr('H'),
			'#aa1133'),
			_Utils_Tuple2(
			_Utils_chr('E'),
			'#ff8800'),
			_Utils_Tuple2(
			_Utils_chr('T'),
			'#ff4400'),
			_Utils_Tuple2(
			_Utils_chr('S'),
			'#330000')
		]));
var $author$project$Sprite$Act4$spriteFor = function (uid) {
	var _v0 = _Utils_Tuple2(uid.course, uid.unit);
	_v0$13:
	while (true) {
		if (_v0.a.$ === 'Algebra1') {
			if (_v0.b.$ === 'Unit') {
				switch (_v0.b.a) {
					case 1:
						var _v1 = _v0.a;
						return $author$project$Sprite$Act4$algebraOgre;
					case 2:
						var _v2 = _v0.a;
						return $author$project$Sprite$Act4$equationWraith;
					case 3:
						var _v3 = _v0.a;
						return $author$project$Sprite$Act4$functionFiend;
					case 4:
						var _v4 = _v0.a;
						return $author$project$Sprite$Act4$linearLeviathan;
					case 5:
						var _v5 = _v0.a;
						return $author$project$Sprite$Act4$systemSpecter;
					case 6:
						var _v6 = _v0.a;
						return $author$project$Sprite$Act4$exponentElemental;
					case 7:
						var _v7 = _v0.a;
						return $author$project$Sprite$Act4$polyPredator;
					case 8:
						var _v8 = _v0.a;
						return $author$project$Sprite$Act4$quadraShade;
					case 9:
						var _v9 = _v0.a;
						return $author$project$Sprite$Act4$regressionRevenant;
					case 10:
						var _v10 = _v0.a;
						return $author$project$Sprite$Act4$rationalReaper;
					case 11:
						var _v11 = _v0.a;
						return $author$project$Sprite$Act4$radicalRider;
					case 12:
						var _v12 = _v0.a;
						return $author$project$Sprite$Act4$varianceViper;
					default:
						break _v0$13;
				}
			} else {
				var _v13 = _v0.a;
				var _v14 = _v0.b;
				return $author$project$Sprite$Act4$algebraTitan;
			}
		} else {
			break _v0$13;
		}
	}
	return $author$project$Sprite$Act4$algebraTitan;
};
var $author$project$Sprite$Lookup$spriteFor = function (uid) {
	var _v0 = uid.course;
	switch (_v0.$) {
		case 'Course1':
			return $author$project$Sprite$Act1$spriteFor(uid);
		case 'Course2':
			return $author$project$Sprite$Act2$spriteFor(uid);
		case 'PreAlgebra':
			return $author$project$Sprite$Act3$spriteFor(uid);
		default:
			return $author$project$Sprite$Act4$spriteFor(uid);
	}
};
var $author$project$View$Battle$viewFightScreen = F2(
	function (playerName, state) {
		var sprite = function () {
			var _v3 = state.mode;
			if (_v3.$ === 'BossMode') {
				return $author$project$Sprite$Lookup$spriteFor(state.unit);
			} else {
				return $author$project$Sprite$Lookup$questSpriteFor(state.unit);
			}
		}();
		var spriteH = sprite.pixelSize * 24;
		var spriteW = sprite.pixelSize * 20;
		var flashOverlay = function () {
			var _v0 = state.phase;
			if (_v0.$ === 'ShowResult') {
				if (_v0.a.$ === 'CorrectHit') {
					var _v1 = _v0.a;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
									A2($elm$html$Html$Attributes$style, 'inset', '0'),
									A2($elm$html$Html$Attributes$style, 'background', 'rgba(255,255,255,0.15)'),
									A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
								]),
							_List_Nil)
						]);
				} else {
					var _v2 = _v0.a;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
									A2($elm$html$Html$Attributes$style, 'inset', '0'),
									A2($elm$html$Html$Attributes$style, 'background', 'rgba(204,34,0,0.15)'),
									A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
								]),
							_List_Nil)
						]);
				}
			} else {
				return _List_Nil;
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'position', 'relative')
				]),
			_Utils_ap(
				flashOverlay,
				_List_fromArray(
					[
						$author$project$View$Battle$questHeader(state),
						A4($author$project$View$Battle$enemyArea, sprite, spriteW, spriteH, state),
						A2($author$project$View$Battle$playerStatusBar, playerName, state),
						$author$project$View$Battle$problemArea(state)
					])));
	});
var $author$project$View$Battle$viewNormalQuestComplete = function (state) {
	var quests = $author$project$Game$Curriculum$questsFor(state.unit);
	var total = $elm$core$List$length(quests);
	var qi = function () {
		var _v0 = state.mode;
		if (_v0.$ === 'QuestMode') {
			var i = _v0.a;
			return i;
		} else {
			return 0;
		}
	}();
	var nextQi = qi + 1;
	var isLast = _Utils_cmp(nextQi, total) > -1;
	var nextLabel = isLast ? 'FACE THE BOSS' : A2(
		$elm$core$Maybe$withDefault,
		'CONTINUE',
		A2(
			$elm$core$Maybe$map,
			function (q) {
				return 'NEXT: ' + q.name;
			},
			$elm$core$List$head(
				A2($elm$core$List$drop, nextQi, quests))));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
				A2($elm$html$Html$Attributes$style, 'padding', '20px'),
				A2($elm$html$Html$Attributes$style, 'gap', '16px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'text-shadow', '0 0 8px ' + $author$project$View$Theme$gold)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('QUEST COMPLETE!')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$fromInt(qi + 1) + (' of ' + ($elm$core$String$fromInt(total) + ' quests cleared')))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
						A2($elm$html$Html$Attributes$style, 'width', '100%')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_Utils_ap(
							$author$project$View$Battle$primaryBtnAttrs,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$Types$NextQuest)
								])),
						_List_fromArray(
							[
								$elm$html$Html$text(nextLabel)
							])),
						$author$project$View$Battle$exitBtn
					]))
			]));
};
var $author$project$View$Battle$viewPracticeComplete = function (state) {
	var quests = $author$project$Game$Curriculum$questsFor(state.unit);
	var qi = function () {
		var _v0 = state.mode;
		if (_v0.$ === 'QuestMode') {
			var i = _v0.a;
			return i;
		} else {
			return 0;
		}
	}();
	var questName = A2(
		$elm$core$Maybe$withDefault,
		'Quest',
		A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.name;
			},
			$elm$core$List$head(
				A2($elm$core$List$drop, qi, quests))));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
				A2($elm$html$Html$Attributes$style, 'padding', '24px'),
				A2($elm$html$Html$Attributes$style, 'gap', '20px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2($elm$html$Html$Attributes$style, 'font-size', '18px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'text-shadow', '0 0 6px ' + $author$project$View$Theme$gold)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('QUEST COMPLETE!')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(questName)
					])),
				A2(
				$elm$html$Html$button,
				_Utils_ap(
					$author$project$View$Battle$primaryBtnAttrs,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($author$project$Types$NextQuest)
						])),
				_List_fromArray(
					[
						$elm$html$Html$text('PRACTICE AGAIN')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$Types$BackToMap),
								A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
								A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
								A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
								A2(
								$elm$html$Html$Attributes$style,
								'font-size',
								$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
								A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$cream),
								A2($elm$html$Html$Attributes$style, 'padding', '8px 14px'),
								A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
								A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('← BACK TO CHAPTER')
							])),
						$author$project$View$Battle$exitBtn
					]))
			]));
};
var $author$project$View$Battle$viewQuestComplete = function (state) {
	return state.practice ? $author$project$View$Battle$viewPracticeComplete(state) : $author$project$View$Battle$viewNormalQuestComplete(state);
};
var $author$project$View$Battle$viewQuestIntro = function (state) {
	var quests = $author$project$Game$Curriculum$questsFor(state.unit);
	var total = $elm$core$List$length(quests);
	var qi = function () {
		var _v0 = state.mode;
		if (_v0.$ === 'QuestMode') {
			var i = _v0.a;
			return i;
		} else {
			return 0;
		}
	}();
	var quest = $elm$core$List$head(
		A2($elm$core$List$drop, qi, quests));
	var questName = A2(
		$elm$core$Maybe$withDefault,
		'Quest',
		A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.name;
			},
			quest));
	var story = A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.story;
			},
			quest));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'padding', '20px'),
				A2($elm$html$Html$Attributes$style, 'gap', '16px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
						A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						'QUEST ' + ($elm$core$String$fromInt(qi + 1) + (' OF ' + $elm$core$String$fromInt(total))))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2($elm$html$Html$Attributes$style, 'font-size', '18px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
						A2($elm$html$Html$Attributes$style, 'text-shadow', '0 0 6px ' + $author$project$View$Theme$gold)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(questName)
					])),
				A2(
				$author$project$View$Window$windowTitle,
				'MISSION',
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
								A2(
								$elm$html$Html$Attributes$style,
								'font-size',
								$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
								A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
								A2($elm$html$Html$Attributes$style, 'line-height', '1.8')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(story)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_Utils_ap(
							$author$project$View$Battle$primaryBtnAttrs,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$Types$BeginQuest)
								])),
						_List_fromArray(
							[
								$elm$html$Html$text('BEGIN QUEST')
							])),
						$author$project$View$Battle$exitBtn
					]))
			]));
};
var $author$project$Types$DismissTutorial = {$: 'DismissTutorial'};
var $author$project$Types$NextTutorialStep = {$: 'NextTutorialStep'};
var $author$project$View$Battle$formatAnswer = function (problem) {
	var _v0 = _Utils_Tuple2(problem.inputType, problem.answer);
	switch (_v0.b.$) {
		case 'AChoice':
			if (_v0.a.$ === 'TChoice') {
				var choices = _v0.a.a;
				var idx = _v0.b.a;
				return A2(
					$elm$core$Maybe$withDefault,
					'?',
					$elm$core$List$head(
						A2($elm$core$List$drop, idx, choices)));
			} else {
				return '?';
			}
		case 'AInt':
			var n = _v0.b.a;
			return $elm$core$String$fromInt(n);
		case 'AFloat':
			var _v1 = _v0.b;
			var v = _v1.a;
			return $elm$core$String$fromFloat(v);
		case 'AFraction':
			var _v2 = _v0.b;
			var n = _v2.a;
			var d = _v2.b;
			return $elm$core$String$fromInt(n) + ('/' + $elm$core$String$fromInt(d));
		case 'AInequality':
			var _v3 = _v0.b;
			var dir = _v3.a;
			var v = _v3.b;
			var dirStr = function () {
				switch (dir.$) {
					case 'ILt':
						return 'x < ';
					case 'ILte':
						return 'x ≤ ';
					case 'IGt':
						return 'x > ';
					default:
						return 'x ≥ ';
				}
			}();
			return _Utils_ap(
				dirStr,
				$elm$core$String$fromFloat(v));
		case 'ASystem':
			var _v5 = _v0.b;
			var x = _v5.a;
			var y = _v5.b;
			return 'x = ' + ($elm$core$String$fromFloat(x) + (', y = ' + $elm$core$String$fromFloat(y)));
		default:
			var _v6 = _v0.b;
			var r1 = _v6.a;
			var r2 = _v6.b;
			return $elm$core$String$fromFloat(r1) + (' and ' + $elm$core$String$fromFloat(r2));
	}
};
var $author$project$View$Battle$viewTutorial = F2(
	function (problem, stepsShown) {
		var hint = problem.hint;
		var visibleSteps = A2($elm$core$List$take, stepsShown, hint.steps);
		var allShown = _Utils_cmp(
			stepsShown,
			$elm$core$List$length(hint.steps)) > -1;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'padding', '16px'),
					A2($elm$html$Html$Attributes$style, 'gap', '10px'),
					A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2($elm$html$Html$Attributes$style, 'font-size', '11px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$hpLow),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('NOT QUITE — HERE\'S HOW')
						])),
					A2(
					$author$project$View$Window$windowTitle,
					'THE PROBLEM',
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeLarge) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'line-height', '2'),
									A2($elm$html$Html$Attributes$style, 'word-break', 'break-word')
								]),
							_List_fromArray(
								[
									$author$project$View$Math$renderMath(problem.prompt)
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
									A2($elm$html$Html$Attributes$style, 'margin-top', '6px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'Answer: ' + $author$project$View$Battle$formatAnswer(problem))
								]))
						])),
					A2(
					$author$project$View$Window$windowTitle,
					'STEP BY STEP',
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px')
								]),
							A2(
								$elm$core$List$indexedMap,
								F2(
									function (i, step) {
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'display', 'flex'),
													A2($elm$html$Html$Attributes$style, 'gap', '8px'),
													A2($elm$html$Html$Attributes$style, 'align-items', 'flex-start')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
															A2(
															$elm$html$Html$Attributes$style,
															'font-size',
															$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
															A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
															A2($elm$html$Html$Attributes$style, 'min-width', '18px')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromInt(i + 1) + '.')
														])),
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
															A2(
															$elm$html$Html$Attributes$style,
															'font-size',
															$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
															A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
															A2($elm$html$Html$Attributes$style, 'line-height', '1.7')
														]),
													_List_fromArray(
														[
															$author$project$View$Math$renderMath(step)
														]))
												]));
									}),
								visibleSteps))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px')
								]),
							_List_fromArray(
								[
									(!allShown) ? A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Types$NextTutorialStep),
											A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
											A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
											A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
											A2(
											$elm$html$Html$Attributes$style,
											'font-size',
											$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
											A2($elm$html$Html$Attributes$style, 'border', '3px double ' + $author$project$View$Theme$cream),
											A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
											A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('NEXT STEP')
										])) : $elm$html$Html$text(''),
									allShown ? A2(
									$elm$html$Html$button,
									_Utils_ap(
										$author$project$View$Battle$primaryBtnAttrs,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Types$DismissTutorial)
											])),
									_List_fromArray(
										[
											$elm$html$Html$text('GOT IT — NEXT PROBLEM')
										])) : $elm$html$Html$text('')
								])),
							$author$project$View$Battle$exitBtn
						]))
				]));
	});
var $author$project$View$Battle$viewBattle = F2(
	function (playerName, state) {
		var _v0 = state.phase;
		switch (_v0.$) {
			case 'QuestIntro':
				return $author$project$View$Battle$viewQuestIntro(state);
			case 'ShowTutorial':
				var prob = _v0.a;
				var stepsShown = _v0.b;
				return A2($author$project$View$Battle$viewTutorial, prob, stepsShown);
			case 'QuestComplete':
				return $author$project$View$Battle$viewQuestComplete(state);
			case 'BattleWon':
				return A2($author$project$View$Battle$viewBossVictory, playerName, state);
			case 'BattleLost':
				return A2($author$project$View$Battle$viewBossDefeat, playerName, state);
			default:
				return A2($author$project$View$Battle$viewFightScreen, playerName, state);
		}
	});
var $author$project$Types$StartUnit = function (a) {
	return {$: 'StartUnit', a: a};
};
var $author$project$View$Chapter$exitBtn = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			$elm$html$Html$Events$onClick($author$project$Types$RequestExit),
			A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
			A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
			A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
			A2(
			$elm$html$Html$Attributes$style,
			'font-size',
			$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
			A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + $author$project$View$Theme$cream),
			A2($elm$html$Html$Attributes$style, 'padding', '8px 14px'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('EXIT')
		]));
var $author$project$View$Chapter$primaryBtnAttrs = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
		A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
		A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
		A2(
		$elm$html$Html$Attributes$style,
		'font-size',
		$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
		A2($elm$html$Html$Attributes$style, 'border', '3px double ' + $author$project$View$Theme$cream),
		A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
		A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
		A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
	]);
var $author$project$Types$PracticeQuest = F2(
	function (a, b) {
		return {$: 'PracticeQuest', a: a, b: b};
	});
var $author$project$View$Chapter$questButton = F3(
	function (uid, qi, quest) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(
					A2($author$project$Types$PracticeQuest, uid, qi)),
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
					A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
					A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
					A2(
					$elm$html$Html$Attributes$style,
					'font-size',
					$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
					A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + $author$project$View$Theme$cream),
					A2($elm$html$Html$Attributes$style, 'padding', '8px 12px'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					'Quest ' + ($elm$core$String$fromInt(qi + 1) + (': ' + quest.name)))
				]));
	});
var $author$project$View$Chapter$viewChapter = F2(
	function (uid, quests) {
		var chapterNum = function () {
			var _v0 = uid.unit;
			if (_v0.$ === 'Unit') {
				var n = _v0.a;
				return $elm$core$String$fromInt(n);
			} else {
				return 'M';
			}
		}();
		var chapterTitle = 'Chapter ' + (chapterNum + (': ' + $author$project$Game$Curriculum$unitName(uid)));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'padding', '16px'),
					A2($elm$html$Html$Attributes$style, 'gap', '10px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
							A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(chapterTitle)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2($elm$html$Html$Attributes$style, 'font-size', '10px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							'Boss: ' + $author$project$Game$Curriculum$bossName(uid))
						])),
					A2(
					$elm$html$Html$button,
					_Utils_ap(
						$author$project$View$Chapter$primaryBtnAttrs,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Types$StartUnit(uid))
							])),
					_List_fromArray(
						[
							$elm$html$Html$text('▶  RUN FULL CHAPTER')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2($elm$html$Html$Attributes$style, 'font-size', '9px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$streakEmpty),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('— or practice a single quest —')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
							A2($elm$html$Html$Attributes$style, 'gap', '6px'),
							A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
							A2($elm$html$Html$Attributes$style, 'flex', '1')
						]),
					A2(
						$elm$core$List$indexedMap,
						$author$project$View$Chapter$questButton(uid),
						quests)),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$Types$BackToMap),
									A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
									A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'padding', '8px 14px'),
									A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
									A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('← BACK TO MAP')
								])),
							$author$project$View$Chapter$exitBtn
						]))
				]));
	});
var $author$project$View$Victory$exitBtn = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			$elm$html$Html$Events$onClick($author$project$Types$RequestExit),
			A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
			A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
			A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
			A2(
			$elm$html$Html$Attributes$style,
			'font-size',
			$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
			A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + $author$project$View$Theme$cream),
			A2($elm$html$Html$Attributes$style, 'padding', '8px 14px'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('EXIT')
		]));
var $author$project$View$Victory$labelStyle = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
		A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
		A2(
		$elm$html$Html$Attributes$style,
		'font-size',
		$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
		A2($elm$html$Html$Attributes$style, 'line-height', '1.8')
	]);
var $author$project$View$Victory$viewGameOver = F2(
	function (playerName, uid) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'padding', '24px'),
					A2($elm$html$Html$Attributes$style, 'gap', '24px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$hpLow),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('GAME OVER')
						])),
					A2(
					$author$project$View$Window$windowTitle,
					'YOU FELL TO',
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							$author$project$View$Victory$labelStyle,
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$Game$Curriculum$bossName(uid))
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2(
							$elm$html$Html$Attributes$style,
							'font-size',
							$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Study hard and try again!')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'width', '100%')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$Types$RetryUnit),
									A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
									A2($elm$html$Html$Attributes$style, 'border', '3px double ' + $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'padding', '12px 24px'),
									A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('TRY AGAIN')
								])),
							$author$project$View$Victory$exitBtn
						]))
				]));
	});
var $author$project$Types$ExitHelp = {$: 'ExitHelp'};
var $author$project$Types$NextHelpStep = {$: 'NextHelpStep'};
var $author$project$View$Help$buttons = function (helpState) {
	var allShown = _Utils_cmp(
		helpState.stepShown,
		$elm$core$List$length(helpState.hint.steps)) > -1;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'gap', '8px')
					]),
				_List_fromArray(
					[
						(!allShown) ? A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$Types$NextHelpStep),
								A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
								A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
								A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
								A2(
								$elm$html$Html$Attributes$style,
								'font-size',
								$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
								A2($elm$html$Html$Attributes$style, 'border', '3px double ' + $author$project$View$Theme$cream),
								A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
								A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('NEXT STEP')
							])) : $elm$html$Html$text(''),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$Types$ExitHelp),
								A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
								A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
								A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
								A2(
								$elm$html$Html$Attributes$style,
								'font-size',
								$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
								A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$cream),
								A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
								A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('BACK TO BATTLE')
							]))
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($author$project$Types$RequestExit),
						A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + $author$project$View$Theme$cream),
						A2($elm$html$Html$Attributes$style, 'padding', '8px 14px'),
						A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
						A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('EXIT')
					]))
			]));
};
var $author$project$View$Help$header = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
			A2(
			$elm$html$Html$Attributes$style,
			'font-size',
			$elm$core$String$fromInt($author$project$View$Theme$fontSizeLarge) + 'px'),
			A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
			A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
			A2($elm$html$Html$Attributes$style, 'letter-spacing', '2px')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('THE TOME SPEAKS...')
		]));
var $author$project$View$Help$hintSection = function (helpState) {
	return A2(
		$author$project$View$Window$windowTitle,
		'SIMILAR PROBLEM',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
						A2($elm$html$Html$Attributes$style, 'line-height', '1.8'),
						A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap')
					]),
				_List_fromArray(
					[
						$author$project$View$Math$renderMath(helpState.hint.prompt)
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
						A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
						A2($elm$html$Html$Attributes$style, 'margin-top', '8px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Answer: ' + helpState.hint.answer)
					]))
			]));
};
var $author$project$View$Help$stepSection = function (helpState) {
	var visibleSteps = A2($elm$core$List$take, helpState.stepShown, helpState.hint.steps);
	return A2(
		$author$project$View$Window$windowTitle,
		'STEP BY STEP',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2($elm$html$Html$Attributes$style, 'gap', '8px')
					]),
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (i, step) {
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px'),
										A2($elm$html$Html$Attributes$style, 'align-items', 'flex-start')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
												A2(
												$elm$html$Html$Attributes$style,
												'font-size',
												$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
												A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
												A2($elm$html$Html$Attributes$style, 'min-width', '20px')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$elm$core$String$fromInt(i + 1) + '.')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
												A2(
												$elm$html$Html$Attributes$style,
												'font-size',
												$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
												A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
												A2($elm$html$Html$Attributes$style, 'line-height', '1.7'),
												A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap')
											]),
										_List_fromArray(
											[
												$author$project$View$Math$renderMath(step)
											]))
									]));
						}),
					visibleSteps))
			]));
};
var $author$project$View$Help$viewHelp = F2(
	function (helpState, battleState) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'padding', '16px'),
					A2($elm$html$Html$Attributes$style, 'gap', '16px')
				]),
			_List_fromArray(
				[
					$author$project$View$Help$header,
					$author$project$View$Help$hintSection(helpState),
					$author$project$View$Help$stepSection(helpState),
					$author$project$View$Help$buttons(helpState)
				]));
	});
var $author$project$Types$GoToAct = function (a) {
	return {$: 'GoToAct', a: a};
};
var $author$project$View$Map$compareUnits = F2(
	function (a, b) {
		var slotRank = function (s) {
			if (s.$ === 'Unit') {
				var n = s.a;
				return n;
			} else {
				return 99;
			}
		};
		var courseRank = function (c) {
			switch (c.$) {
				case 'Course1':
					return 0;
				case 'Course2':
					return 1;
				case 'PreAlgebra':
					return 2;
				default:
					return 3;
			}
		};
		var _v0 = A2(
			$elm$core$Basics$compare,
			courseRank(a.course),
			courseRank(b.course));
		if (_v0.$ === 'EQ') {
			return A2(
				$elm$core$Basics$compare,
				slotRank(a.unit),
				slotRank(b.unit));
		} else {
			var other = _v0;
			return other;
		}
	});
var $author$project$View$Map$courseLabel = function (course) {
	switch (course.$) {
		case 'Course1':
			return 'ACT I';
		case 'Course2':
			return 'ACT II';
		case 'PreAlgebra':
			return 'ACT III';
		default:
			return 'ACT IV';
	}
};
var $author$project$Game$Curriculum$firstUnit = function (c) {
	return {
		course: c,
		unit: $author$project$Types$Unit(1)
	};
};
var $author$project$View$Map$header = F3(
	function (playerName, course, highestUnlocked) {
		var prevCourse = function () {
			switch (course.$) {
				case 'Course1':
					return $elm$core$Maybe$Nothing;
				case 'Course2':
					return $elm$core$Maybe$Just($author$project$Types$Course1);
				case 'PreAlgebra':
					return $elm$core$Maybe$Just($author$project$Types$Course2);
				default:
					return $elm$core$Maybe$Just($author$project$Types$PreAlgebra);
			}
		}();
		var nextCourse = function () {
			switch (course.$) {
				case 'Course1':
					return $elm$core$Maybe$Just($author$project$Types$Course2);
				case 'Course2':
					return $elm$core$Maybe$Just($author$project$Types$PreAlgebra);
				case 'PreAlgebra':
					return $elm$core$Maybe$Just($author$project$Types$Algebra1);
				default:
					return $elm$core$Maybe$Nothing;
			}
		}();
		var actUnlocked = function (c) {
			return !_Utils_eq(
				A2(
					$author$project$View$Map$compareUnits,
					$author$project$Game$Curriculum$firstUnit(c),
					highestUnlocked),
				$elm$core$Basics$GT);
		};
		var navBtn = F2(
			function (label, maybeCourse) {
				if (maybeCourse.$ === 'Nothing') {
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'width', '48px')
							]),
						_List_Nil);
				} else {
					var c = maybeCourse.a;
					return actUnlocked(c) ? A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Types$GoToAct(c)),
								A2($elm$html$Html$Attributes$style, 'background', 'transparent'),
								A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
								A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
								A2(
								$elm$html$Html$Attributes$style,
								'font-size',
								$elm$core$String$fromInt($author$project$View$Theme$fontSizeLarge) + 'px'),
								A2($elm$html$Html$Attributes$style, 'border', 'none'),
								A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
								A2($elm$html$Html$Attributes$style, 'padding', '0 4px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(label)
							])) : A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'width', '48px')
							]),
						_List_Nil);
				}
			});
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px')
						]),
					_List_fromArray(
						[
							A2(navBtn, '◀', prevCourse),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeLarge) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$View$Map$courseLabel(course))
								])),
							A2(navBtn, '▶', nextCourse)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2(
							$elm$html$Html$Attributes$style,
							'font-size',
							$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(playerName)
						]))
				]));
	});
var $author$project$Types$ViewChapter = function (a) {
	return {$: 'ViewChapter', a: a};
};
var $author$project$View$Map$chapterPrefix = function (uid) {
	var _v0 = uid.unit;
	if (_v0.$ === 'Unit') {
		var n = _v0.a;
		return 'Ch.' + ($elm$core$String$fromInt(n) + ': ');
	} else {
		return 'MEGA: ';
	}
};
var $author$project$View$Map$unitButton = F2(
	function (uid, unlocked) {
		var label = _Utils_ap(
			$author$project$View$Map$chapterPrefix(uid),
			$author$project$Game$Curriculum$unitName(uid));
		var bossLabel = 'vs ' + $author$project$Game$Curriculum$bossName(uid);
		var _v0 = unlocked ? _Utils_Tuple3($author$project$View$Theme$cream, $author$project$View$Theme$cream, $author$project$View$Theme$bgDark) : _Utils_Tuple3($author$project$View$Theme$streakEmpty, $author$project$View$Theme$streakEmpty, $author$project$View$Theme$bgBlack);
		var textColor = _v0.a;
		var borderColor = _v0.b;
		var bgColor = _v0.c;
		return A2(
			$elm$html$Html$button,
			_Utils_ap(
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background', bgColor),
						A2($elm$html$Html$Attributes$style, 'color', textColor),
						A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
						A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + borderColor),
						A2($elm$html$Html$Attributes$style, 'padding', '10px 12px'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				unlocked ? _List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$Types$ViewChapter(uid)),
						A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
					]) : _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'cursor', 'not-allowed')
					])),
			_List_fromArray(
				[
					$elm$html$Html$text(label),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'font-size',
							$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall - 1) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'color',
							unlocked ? $author$project$View$Theme$gold : $author$project$View$Theme$streakEmpty)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							unlocked ? bossLabel : 'LOCKED')
						]))
				]));
	});
var $author$project$Game$Curriculum$unitsForCourse = function (c) {
	return _Utils_ap(
		A2(
			$elm$core$List$map,
			function (n) {
				return {
					course: c,
					unit: $author$project$Types$Unit(n)
				};
			},
			A2(
				$elm$core$List$range,
				1,
				$author$project$Game$Curriculum$regularUnitCount(c))),
		_List_fromArray(
			[
				{course: c, unit: $author$project$Types$MegaBoss}
			]));
};
var $author$project$View$Map$unitList = F2(
	function (course, highestUnlocked) {
		var units = $author$project$Game$Curriculum$unitsForCourse(course);
		var isUnlocked = function (uid) {
			return !_Utils_eq(
				A2($author$project$View$Map$compareUnits, uid, highestUnlocked),
				$elm$core$Basics$GT);
		};
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px'),
					A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
					A2($elm$html$Html$Attributes$style, 'flex', '1')
				]),
			A2(
				$elm$core$List$map,
				function (uid) {
					return A2(
						$author$project$View$Map$unitButton,
						uid,
						isUnlocked(uid));
				},
				units));
	});
var $author$project$View$Map$viewMap = F3(
	function (playerName, course, highestUnlocked) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'padding', '16px'),
					A2($elm$html$Html$Attributes$style, 'gap', '12px')
				]),
			_List_fromArray(
				[
					A3($author$project$View$Map$header, playerName, course, highestUnlocked),
					A2($author$project$View$Map$unitList, course, highestUnlocked),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$Types$RequestExit),
									A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
									A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'padding', '8px 14px'),
									A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
									A2($elm$html$Html$Attributes$style, 'letter-spacing', '1px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('EXIT')
								]))
						]))
				]));
	});
var $author$project$Types$SetNameDraft = function (a) {
	return {$: 'SetNameDraft', a: a};
};
var $author$project$Types$SubmitName = {$: 'SubmitName'};
var $author$project$View$Title$canvasStyle = A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack);
var $author$project$View$Title$labelStyle = A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream);
var $author$project$View$Title$pixelButton = F2(
	function (label, msg) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(msg),
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
					A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
					A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
					A2(
					$elm$html$Html$Attributes$style,
					'font-size',
					$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
					A2($elm$html$Html$Attributes$style, 'border', '3px double ' + $author$project$View$Theme$cream),
					A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					A2($elm$html$Html$Attributes$style, 'letter-spacing', '2px'),
					A2($elm$html$Html$Attributes$style, 'width', '100%')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(label)
				]));
	});
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $author$project$View$Title$viewNameEntry = function (draft) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[$author$project$View$Title$canvasStyle]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
						A2($elm$html$Html$Attributes$style, 'height', '100%'),
						A2($elm$html$Html$Attributes$style, 'padding', '24px'),
						A2($elm$html$Html$Attributes$style, 'gap', '24px')
					]),
				_List_fromArray(
					[
						A2(
						$author$project$View$Window$windowTitle,
						'ENTER YOUR NAME',
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[$author$project$View$Title$labelStyle]),
								_List_fromArray(
									[
										$elm$html$Html$text('What is your name, hero?')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(draft),
										$elm$html$Html$Events$onInput($author$project$Types$SetNameDraft),
										$author$project$View$Input$onEnter($author$project$Types$SubmitName),
										$elm$html$Html$Attributes$placeholder('HERO'),
										A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
										A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
										A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
										A2(
										$elm$html$Html$Attributes$style,
										'font-size',
										$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
										A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$cream),
										A2($elm$html$Html$Attributes$style, 'padding', '8px'),
										A2($elm$html$Html$Attributes$style, 'width', '100%'),
										A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
										A2($elm$html$Html$Attributes$style, 'letter-spacing', '2px')
									]),
								_List_Nil),
								A2($author$project$View$Title$pixelButton, 'BEGIN', $author$project$Types$SubmitName)
							]))
					]))
			]));
};
var $author$project$Types$SetPasscodeDraft = function (a) {
	return {$: 'SetPasscodeDraft', a: a};
};
var $author$project$Types$SubmitPasscode = {$: 'SubmitPasscode'};
var $author$project$View$Title$viewPasscode = F2(
	function (draft, hasError) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[$author$project$View$Title$canvasStyle]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'padding', '24px'),
							A2($elm$html$Html$Attributes$style, 'gap', '24px')
						]),
					_List_fromArray(
						[
							A2(
							$author$project$View$Window$windowTitle,
							'CONTINUE JOURNEY',
							_List_fromArray(
								[
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[$author$project$View$Title$labelStyle]),
									_List_fromArray(
										[
											$elm$html$Html$text('Enter your 4-word passcode:')
										])),
									A2(
									$elm$html$Html$input,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('text'),
											$elm$html$Html$Attributes$value(draft),
											$elm$html$Html$Events$onInput($author$project$Types$SetPasscodeDraft),
											$author$project$View$Input$onEnter($author$project$Types$SubmitPasscode),
											$elm$html$Html$Attributes$placeholder('word word word word'),
											A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
											A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
											A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
											A2(
											$elm$html$Html$Attributes$style,
											'font-size',
											$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
											A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + $author$project$View$Theme$cream),
											A2($elm$html$Html$Attributes$style, 'padding', '8px'),
											A2($elm$html$Html$Attributes$style, 'width', '100%'),
											A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box')
										]),
									_List_Nil),
									hasError ? A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$hpLow),
											A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
											A2(
											$elm$html$Html$Attributes$style,
											'font-size',
											$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Unknown passcode. Try again.')
										])) : $elm$html$Html$text(''),
									A2($author$project$View$Title$pixelButton, 'CONTINUE', $author$project$Types$SubmitPasscode)
								]))
						]))
				]));
	});
var $author$project$View$Title$menuButtons = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'display', 'flex'),
			A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
			A2($elm$html$Html$Attributes$style, 'gap', '16px'),
			A2($elm$html$Html$Attributes$style, 'width', '260px')
		]),
	_List_fromArray(
		[
			A2($author$project$View$Title$pixelButton, 'NEW GAME', $author$project$Types$SubmitName),
			A2(
			$author$project$View$Title$pixelButton,
			'CONTINUE (PASSCODE)',
			$author$project$Types$SetPasscodeDraft(''))
		]));
var $elm$html$Html$br = _VirtualDom_node('br');
var $author$project$View$Title$titleText = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'text-align', 'center')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
					A2($elm$html$Html$Attributes$style, 'font-size', '22px'),
					A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
					A2($elm$html$Html$Attributes$style, 'line-height', '2'),
					A2($elm$html$Html$Attributes$style, 'text-shadow', '0 0 8px ' + $author$project$View$Theme$gold)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('TOME OF THE'),
					A2($elm$html$Html$br, _List_Nil, _List_Nil),
					$elm$html$Html$text('MATH DRAGON')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
					A2(
					$elm$html$Html$Attributes$style,
					'font-size',
					$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
					A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
					A2($elm$html$Html$Attributes$style, 'margin-top', '16px')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('A MATH RPG ADVENTURE')
				]))
		]));
var $author$project$View$Title$viewTitle = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[$author$project$View$Title$canvasStyle]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'gap', '32px'),
					A2($elm$html$Html$Attributes$style, 'padding', '24px')
				]),
			_List_fromArray(
				[$author$project$View$Title$titleText, $author$project$View$Title$menuButtons]))
		]));
var $author$project$View$Victory$viewVictory = F2(
	function (playerName, vs) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'padding', '24px'),
					A2($elm$html$Html$Attributes$style, 'gap', '20px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2($elm$html$Html$Attributes$style, 'text-shadow', '0 0 8px ' + $author$project$View$Theme$gold)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('VICTORY!')
						])),
					A2(
					$author$project$View$Window$windowTitle,
					'DEFEATED',
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							$author$project$View$Victory$labelStyle,
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$Game$Curriculum$bossName(vs.unit))
								]))
						])),
					vs.isLast ? A2(
					$author$project$View$Window$windowTitle,
					'QUEST COMPLETE',
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							$author$project$View$Victory$labelStyle,
							_List_fromArray(
								[
									$elm$html$Html$text('Well done, ' + (playerName + '!'))
								])),
							A2(
							$elm$html$Html$p,
							$author$project$View$Victory$labelStyle,
							_List_fromArray(
								[
									$elm$html$Html$text('You have mastered the Tome!')
								]))
						])) : A2(
					$author$project$View$Window$windowTitle,
					'YOUR PASSCODE',
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeSmall) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '4px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Write this down to continue later:')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
									A2($elm$html$Html$Attributes$style, 'letter-spacing', '2px'),
									A2($elm$html$Html$Attributes$style, 'line-height', '2'),
									A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
									A2($elm$html$Html$Attributes$style, 'padding', '8px'),
									A2($elm$html$Html$Attributes$style, 'border', '1px dashed ' + $author$project$View$Theme$gold)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(vs.code)
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'width', '100%')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$Types$BackToMap),
									A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgDark),
									A2($elm$html$Html$Attributes$style, 'color', $author$project$View$Theme$gold),
									A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily),
									A2(
									$elm$html$Html$Attributes$style,
									'font-size',
									$elm$core$String$fromInt($author$project$View$Theme$fontSizeNormal) + 'px'),
									A2($elm$html$Html$Attributes$style, 'border', '3px double ' + $author$project$View$Theme$cream),
									A2($elm$html$Html$Attributes$style, 'padding', '12px 24px'),
									A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
									A2($elm$html$Html$Attributes$style, 'letter-spacing', '2px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('CONTINUE')
								])),
							$author$project$View$Victory$exitBtn
						]))
				]));
	});
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$elm$core$String$fromInt($author$project$View$Theme$canvasW) + 'px'),
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$elm$core$String$fromInt($author$project$View$Theme$canvasH) + 'px'),
				A2($elm$html$Html$Attributes$style, 'max-width', '100vw'),
				A2($elm$html$Html$Attributes$style, 'max-height', '100svh'),
				A2($elm$html$Html$Attributes$style, 'margin', '0 auto'),
				A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
				A2($elm$html$Html$Attributes$style, 'position', 'relative'),
				A2($elm$html$Html$Attributes$style, 'background', $author$project$View$Theme$bgBlack),
				A2($elm$html$Html$Attributes$style, 'font-family', $author$project$View$Theme$fontFamily)
			]),
		_List_fromArray(
			[
				function () {
				var _v0 = model.screen;
				switch (_v0.$) {
					case 'TitleScreen':
						return $author$project$View$Title$viewTitle;
					case 'NameEntryScreen':
						var draft = _v0.a.draft;
						return $author$project$View$Title$viewNameEntry(draft);
					case 'PasscodeScreen':
						var error = _v0.a.error;
						var draft = _v0.a.draft;
						return A2($author$project$View$Title$viewPasscode, draft, error);
					case 'MapScreen':
						var course = _v0.a.course;
						return A3($author$project$View$Map$viewMap, model.playerName, course, model.highestUnlocked);
					case 'ChapterScreen':
						var uid = _v0.a;
						return A2(
							$author$project$View$Chapter$viewChapter,
							uid,
							$author$project$Game$Curriculum$questsFor(uid));
					case 'BattleScreen':
						var state = _v0.a;
						return A2($author$project$View$Battle$viewBattle, model.playerName, state);
					case 'HelpScreen':
						var helpState = _v0.a;
						var battleState = _v0.b;
						return A2($author$project$View$Help$viewHelp, helpState, battleState);
					case 'VictoryScreen':
						var vs = _v0.a;
						return A2($author$project$View$Victory$viewVictory, model.playerName, vs);
					default:
						var uid = _v0.a;
						return A2($author$project$View$Victory$viewGameOver, model.playerName, uid);
				}
			}(),
				model.confirmingExit ? $author$project$Main$confirmExitOverlay(model.playerName) : $elm$html$Html$text('')
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$string)(0)}});}(this));