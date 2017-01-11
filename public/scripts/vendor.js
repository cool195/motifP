/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

	var arr = [];

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
	// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		version = "2.1.4",

	// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

						// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},

		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );

			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				}

				// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
							[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

				// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArraylike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
		/*!
		 * Sizzle CSS Selector Engine v2.2.0-pre
		 * http://sizzlejs.com/
		 *
		 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
		 * Released under the MIT license
		 * http://jquery.org/license
		 *
		 * Date: 2014-12-16
		 */
		(function( window ) {

			var i,
				support,
				Expr,
				getText,
				isXML,
				tokenize,
				compile,
				select,
				outermostContext,
				sortInput,
				hasDuplicate,

			// Local document vars
				setDocument,
				document,
				docElem,
				documentIsHTML,
				rbuggyQSA,
				rbuggyMatches,
				matches,
				contains,

			// Instance-specific data
				expando = "sizzle" + 1 * new Date(),
				preferredDoc = window.document,
				dirruns = 0,
				done = 0,
				classCache = createCache(),
				tokenCache = createCache(),
				compilerCache = createCache(),
				sortOrder = function( a, b ) {
					if ( a === b ) {
						hasDuplicate = true;
					}
					return 0;
				},

			// General-purpose constants
				MAX_NEGATIVE = 1 << 31,

			// Instance methods
				hasOwn = ({}).hasOwnProperty,
				arr = [],
				pop = arr.pop,
				push_native = arr.push,
				push = arr.push,
				slice = arr.slice,
			// Use a stripped-down indexOf as it's faster than native
			// http://jsperf.com/thor-indexof-vs-for/5
				indexOf = function( list, elem ) {
					var i = 0,
						len = list.length;
					for ( ; i < len; i++ ) {
						if ( list[i] === elem ) {
							return i;
						}
					}
					return -1;
				},

				booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

			// Regular expressions

			// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
				whitespace = "[\\x20\\t\\r\\n\\f]",
			// http://www.w3.org/TR/css3-syntax/#characters
				characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

			// Loosely modeled on CSS identifier characters
			// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
			// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
				identifier = characterEncoding.replace( "w", "w#" ),

			// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
				attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
						// Operator (capture 2)
					"*([*^$|!~]?=)" + whitespace +
						// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
					"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
					"*\\]",

				pseudos = ":(" + characterEncoding + ")(?:\\((" +
						// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
						// 1. quoted (capture 3; capture 4 or capture 5)
					"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
						// 2. simple (capture 6)
					"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
						// 3. anything else (capture 2)
					".*" +
					")\\)|)",

			// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
				rwhitespace = new RegExp( whitespace + "+", "g" ),
				rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

				rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
				rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

				rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

				rpseudo = new RegExp( pseudos ),
				ridentifier = new RegExp( "^" + identifier + "$" ),

				matchExpr = {
					"ID": new RegExp( "^#(" + characterEncoding + ")" ),
					"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
					"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
					"ATTR": new RegExp( "^" + attributes ),
					"PSEUDO": new RegExp( "^" + pseudos ),
					"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
						"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
						"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
					"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
					// For use in libraries implementing .is()
					// We use this for POS matching in `select`
					"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
						whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
				},

				rinputs = /^(?:input|select|textarea|button)$/i,
				rheader = /^h\d$/i,

				rnative = /^[^{]+\{\s*\[native \w/,

			// Easily-parseable/retrievable ID or TAG or CLASS selectors
				rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

				rsibling = /[+~]/,
				rescape = /'|\\/g,

			// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
				runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
				funescape = function( _, escaped, escapedWhitespace ) {
					var high = "0x" + escaped - 0x10000;
					// NaN means non-codepoint
					// Support: Firefox<24
					// Workaround erroneous numeric interpretation of +"0x"
					return high !== high || escapedWhitespace ?
						escaped :
						high < 0 ?
							// BMP codepoint
							String.fromCharCode( high + 0x10000 ) :
							// Supplemental Plane codepoint (surrogate pair)
							String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
				},

			// Used for iframes
			// See setDocument()
			// Removing the function wrapper causes a "Permission Denied"
			// error in IE
				unloadHandler = function() {
					setDocument();
				};

// Optimize for push.apply( _, NodeList )
			try {
				push.apply(
					(arr = slice.call( preferredDoc.childNodes )),
					preferredDoc.childNodes
				);
				// Support: Android<4.0
				// Detect silently failing push.apply
				arr[ preferredDoc.childNodes.length ].nodeType;
			} catch ( e ) {
				push = { apply: arr.length ?

					// Leverage slice if possible
					function( target, els ) {
						push_native.apply( target, slice.call(els) );
					} :

					// Support: IE<9
					// Otherwise append directly
					function( target, els ) {
						var j = target.length,
							i = 0;
						// Can't trust NodeList.length
						while ( (target[j++] = els[i++]) ) {}
						target.length = j - 1;
					}
				};
			}

			function Sizzle( selector, context, results, seed ) {
				var match, elem, m, nodeType,
				// QSA vars
					i, groups, old, nid, newContext, newSelector;

				if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
					setDocument( context );
				}

				context = context || document;
				results = results || [];
				nodeType = context.nodeType;

				if ( typeof selector !== "string" || !selector ||
					nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

					return results;
				}

				if ( !seed && documentIsHTML ) {

					// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
					if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
						// Speed-up: Sizzle("#ID")
						if ( (m = match[1]) ) {
							if ( nodeType === 9 ) {
								elem = context.getElementById( m );
								// Check parentNode to catch when Blackberry 4.6 returns
								// nodes that are no longer in the document (jQuery #6963)
								if ( elem && elem.parentNode ) {
									// Handle the case where IE, Opera, and Webkit return items
									// by name instead of ID
									if ( elem.id === m ) {
										results.push( elem );
										return results;
									}
								} else {
									return results;
								}
							} else {
								// Context is not a document
								if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
									contains( context, elem ) && elem.id === m ) {
									results.push( elem );
									return results;
								}
							}

							// Speed-up: Sizzle("TAG")
						} else if ( match[2] ) {
							push.apply( results, context.getElementsByTagName( selector ) );
							return results;

							// Speed-up: Sizzle(".CLASS")
						} else if ( (m = match[3]) && support.getElementsByClassName ) {
							push.apply( results, context.getElementsByClassName( m ) );
							return results;
						}
					}

					// QSA path
					if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
						nid = old = expando;
						newContext = context;
						newSelector = nodeType !== 1 && selector;

						// qSA works strangely on Element-rooted queries
						// We can work around this by specifying an extra ID on the root
						// and working up from there (Thanks to Andrew Dupont for the technique)
						// IE 8 doesn't work on object elements
						if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
							groups = tokenize( selector );

							if ( (old = context.getAttribute("id")) ) {
								nid = old.replace( rescape, "\\$&" );
							} else {
								context.setAttribute( "id", nid );
							}
							nid = "[id='" + nid + "'] ";

							i = groups.length;
							while ( i-- ) {
								groups[i] = nid + toSelector( groups[i] );
							}
							newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
							newSelector = groups.join(",");
						}

						if ( newSelector ) {
							try {
								push.apply( results,
									newContext.querySelectorAll( newSelector )
								);
								return results;
							} catch(qsaError) {
							} finally {
								if ( !old ) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}

				// All others
				return select( selector.replace( rtrim, "$1" ), context, results, seed );
			}

			/**
			 * Create key-value caches of limited size
			 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
			 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
			 *	deleting the oldest entry
			 */
			function createCache() {
				var keys = [];

				function cache( key, value ) {
					// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
					if ( keys.push( key + " " ) > Expr.cacheLength ) {
						// Only keep the most recent entries
						delete cache[ keys.shift() ];
					}
					return (cache[ key + " " ] = value);
				}
				return cache;
			}

			/**
			 * Mark a function for special use by Sizzle
			 * @param {Function} fn The function to mark
			 */
			function markFunction( fn ) {
				fn[ expando ] = true;
				return fn;
			}

			/**
			 * Support testing using an element
			 * @param {Function} fn Passed the created div and expects a boolean result
			 */
			function assert( fn ) {
				var div = document.createElement("div");

				try {
					return !!fn( div );
				} catch (e) {
					return false;
				} finally {
					// Remove from its parent by default
					if ( div.parentNode ) {
						div.parentNode.removeChild( div );
					}
					// release memory in IE
					div = null;
				}
			}

			/**
			 * Adds the same handler for all of the specified attrs
			 * @param {String} attrs Pipe-separated list of attributes
			 * @param {Function} handler The method that will be applied
			 */
			function addHandle( attrs, handler ) {
				var arr = attrs.split("|"),
					i = attrs.length;

				while ( i-- ) {
					Expr.attrHandle[ arr[i] ] = handler;
				}
			}

			/**
			 * Checks document order of two siblings
			 * @param {Element} a
			 * @param {Element} b
			 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
			 */
			function siblingCheck( a, b ) {
				var cur = b && a,
					diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
						( ~b.sourceIndex || MAX_NEGATIVE ) -
						( ~a.sourceIndex || MAX_NEGATIVE );

				// Use IE sourceIndex if available on both nodes
				if ( diff ) {
					return diff;
				}

				// Check if b follows a
				if ( cur ) {
					while ( (cur = cur.nextSibling) ) {
						if ( cur === b ) {
							return -1;
						}
					}
				}

				return a ? 1 : -1;
			}

			/**
			 * Returns a function to use in pseudos for input types
			 * @param {String} type
			 */
			function createInputPseudo( type ) {
				return function( elem ) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === type;
				};
			}

			/**
			 * Returns a function to use in pseudos for buttons
			 * @param {String} type
			 */
			function createButtonPseudo( type ) {
				return function( elem ) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && elem.type === type;
				};
			}

			/**
			 * Returns a function to use in pseudos for positionals
			 * @param {Function} fn
			 */
			function createPositionalPseudo( fn ) {
				return markFunction(function( argument ) {
					argument = +argument;
					return markFunction(function( seed, matches ) {
						var j,
							matchIndexes = fn( [], seed.length, argument ),
							i = matchIndexes.length;

						// Match elements found at the specified indexes
						while ( i-- ) {
							if ( seed[ (j = matchIndexes[i]) ] ) {
								seed[j] = !(matches[j] = seed[j]);
							}
						}
					});
				});
			}

			/**
			 * Checks a node for validity as a Sizzle context
			 * @param {Element|Object=} context
			 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
			 */
			function testContext( context ) {
				return context && typeof context.getElementsByTagName !== "undefined" && context;
			}

// Expose support vars for convenience
			support = Sizzle.support = {};

			/**
			 * Detects XML nodes
			 * @param {Element|Object} elem An element or a document
			 * @returns {Boolean} True iff elem is a non-HTML XML node
			 */
			isXML = Sizzle.isXML = function( elem ) {
				// documentElement is verified for cases where it doesn't yet exist
				// (such as loading iframes in IE - #4833)
				var documentElement = elem && (elem.ownerDocument || elem).documentElement;
				return documentElement ? documentElement.nodeName !== "HTML" : false;
			};

			/**
			 * Sets document-related variables once based on the current document
			 * @param {Element|Object} [doc] An element or document object to use to set the document
			 * @returns {Object} Returns the current document
			 */
			setDocument = Sizzle.setDocument = function( node ) {
				var hasCompare, parent,
					doc = node ? node.ownerDocument || node : preferredDoc;

				// If no document and documentElement is available, return
				if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
					return document;
				}

				// Set our document
				document = doc;
				docElem = doc.documentElement;
				parent = doc.defaultView;

				// Support: IE>8
				// If iframe document is assigned to "document" variable and if iframe has been reloaded,
				// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
				// IE6-8 do not support the defaultView property so parent will be undefined
				if ( parent && parent !== parent.top ) {
					// IE11 does not have attachEvent, so all must suffer
					if ( parent.addEventListener ) {
						parent.addEventListener( "unload", unloadHandler, false );
					} else if ( parent.attachEvent ) {
						parent.attachEvent( "onunload", unloadHandler );
					}
				}

				/* Support tests
				 ---------------------------------------------------------------------- */
				documentIsHTML = !isXML( doc );

				/* Attributes
				 ---------------------------------------------------------------------- */

				// Support: IE<8
				// Verify that getAttribute really returns attributes and not properties
				// (excepting IE8 booleans)
				support.attributes = assert(function( div ) {
					div.className = "i";
					return !div.getAttribute("className");
				});

				/* getElement(s)By*
				 ---------------------------------------------------------------------- */

				// Check if getElementsByTagName("*") returns only elements
				support.getElementsByTagName = assert(function( div ) {
					div.appendChild( doc.createComment("") );
					return !div.getElementsByTagName("*").length;
				});

				// Support: IE<9
				support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

				// Support: IE<10
				// Check if getElementById returns elements by name
				// The broken getElementById methods don't pick up programatically-set names,
				// so use a roundabout getElementsByName test
				support.getById = assert(function( div ) {
					docElem.appendChild( div ).id = expando;
					return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
				});

				// ID find and filter
				if ( support.getById ) {
					Expr.find["ID"] = function( id, context ) {
						if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
							var m = context.getElementById( id );
							// Check parentNode to catch when Blackberry 4.6 returns
							// nodes that are no longer in the document #6963
							return m && m.parentNode ? [ m ] : [];
						}
					};
					Expr.filter["ID"] = function( id ) {
						var attrId = id.replace( runescape, funescape );
						return function( elem ) {
							return elem.getAttribute("id") === attrId;
						};
					};
				} else {
					// Support: IE6/7
					// getElementById is not reliable as a find shortcut
					delete Expr.find["ID"];

					Expr.filter["ID"] =  function( id ) {
						var attrId = id.replace( runescape, funescape );
						return function( elem ) {
							var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
							return node && node.value === attrId;
						};
					};
				}

				// Tag
				Expr.find["TAG"] = support.getElementsByTagName ?
					function( tag, context ) {
						if ( typeof context.getElementsByTagName !== "undefined" ) {
							return context.getElementsByTagName( tag );

							// DocumentFragment nodes don't have gEBTN
						} else if ( support.qsa ) {
							return context.querySelectorAll( tag );
						}
					} :

					function( tag, context ) {
						var elem,
							tmp = [],
							i = 0,
						// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
							results = context.getElementsByTagName( tag );

						// Filter out possible comments
						if ( tag === "*" ) {
							while ( (elem = results[i++]) ) {
								if ( elem.nodeType === 1 ) {
									tmp.push( elem );
								}
							}

							return tmp;
						}
						return results;
					};

				// Class
				Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
						if ( documentIsHTML ) {
							return context.getElementsByClassName( className );
						}
					};

				/* QSA/matchesSelector
				 ---------------------------------------------------------------------- */

				// QSA and matchesSelector support

				// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
				rbuggyMatches = [];

				// qSa(:focus) reports false when true (Chrome 21)
				// We allow this because of a bug in IE8/9 that throws an error
				// whenever `document.activeElement` is accessed on an iframe
				// So, we allow :focus to pass through QSA all the time to avoid the IE error
				// See http://bugs.jquery.com/ticket/13378
				rbuggyQSA = [];

				if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
					// Build QSA regex
					// Regex strategy adopted from Diego Perini
					assert(function( div ) {
						// Select is set to empty string on purpose
						// This is to test IE's treatment of not explicitly
						// setting a boolean content attribute,
						// since its presence should be enough
						// http://bugs.jquery.com/ticket/12359
						docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
							"<select id='" + expando + "-\f]' msallowcapture=''>" +
							"<option selected=''></option></select>";

						// Support: IE8, Opera 11-12.16
						// Nothing should be selected when empty strings follow ^= or $= or *=
						// The test attribute must be unknown in Opera but "safe" for WinRT
						// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
						if ( div.querySelectorAll("[msallowcapture^='']").length ) {
							rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
						}

						// Support: IE8
						// Boolean attributes and "value" are not treated correctly
						if ( !div.querySelectorAll("[selected]").length ) {
							rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
						}

						// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
						if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
							rbuggyQSA.push("~=");
						}

						// Webkit/Opera - :checked should return selected option elements
						// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						// IE8 throws error here and will not see later tests
						if ( !div.querySelectorAll(":checked").length ) {
							rbuggyQSA.push(":checked");
						}

						// Support: Safari 8+, iOS 8+
						// https://bugs.webkit.org/show_bug.cgi?id=136851
						// In-page `selector#id sibing-combinator selector` fails
						if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
							rbuggyQSA.push(".#.+[+~]");
						}
					});

					assert(function( div ) {
						// Support: Windows 8 Native Apps
						// The type and name attributes are restricted during .innerHTML assignment
						var input = doc.createElement("input");
						input.setAttribute( "type", "hidden" );
						div.appendChild( input ).setAttribute( "name", "D" );

						// Support: IE8
						// Enforce case-sensitivity of name attribute
						if ( div.querySelectorAll("[name=d]").length ) {
							rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
						}

						// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
						// IE8 throws error here and will not see later tests
						if ( !div.querySelectorAll(":enabled").length ) {
							rbuggyQSA.push( ":enabled", ":disabled" );
						}

						// Opera 10-11 does not throw on post-comma invalid pseudos
						div.querySelectorAll("*,:x");
						rbuggyQSA.push(",.*:");
					});
				}

				if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
						docElem.webkitMatchesSelector ||
						docElem.mozMatchesSelector ||
						docElem.oMatchesSelector ||
						docElem.msMatchesSelector) )) ) {

					assert(function( div ) {
						// Check to see if it's possible to do matchesSelector
						// on a disconnected node (IE 9)
						support.disconnectedMatch = matches.call( div, "div" );

						// This should fail with an exception
						// Gecko does not error, returns false instead
						matches.call( div, "[s!='']:x" );
						rbuggyMatches.push( "!=", pseudos );
					});
				}

				rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
				rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

				/* Contains
				 ---------------------------------------------------------------------- */
				hasCompare = rnative.test( docElem.compareDocumentPosition );

				// Element contains another
				// Purposefully does not implement inclusive descendent
				// As in, an element does not contain itself
				contains = hasCompare || rnative.test( docElem.contains ) ?
					function( a, b ) {
						var adown = a.nodeType === 9 ? a.documentElement : a,
							bup = b && b.parentNode;
						return a === bup || !!( bup && bup.nodeType === 1 && (
								adown.contains ?
									adown.contains( bup ) :
								a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
							));
					} :
					function( a, b ) {
						if ( b ) {
							while ( (b = b.parentNode) ) {
								if ( b === a ) {
									return true;
								}
							}
						}
						return false;
					};

				/* Sorting
				 ---------------------------------------------------------------------- */

				// Document order sorting
				sortOrder = hasCompare ?
					function( a, b ) {

						// Flag for duplicate removal
						if ( a === b ) {
							hasDuplicate = true;
							return 0;
						}

						// Sort on method existence if only one input has compareDocumentPosition
						var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
						if ( compare ) {
							return compare;
						}

						// Calculate position if both inputs belong to the same document
						compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
							a.compareDocumentPosition( b ) :

							// Otherwise we know they are disconnected
							1;

						// Disconnected nodes
						if ( compare & 1 ||
							(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

							// Choose the first element that is related to our preferred document
							if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
								return -1;
							}
							if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
								return 1;
							}

							// Maintain original order
							return sortInput ?
								( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
								0;
						}

						return compare & 4 ? -1 : 1;
					} :
					function( a, b ) {
						// Exit early if the nodes are identical
						if ( a === b ) {
							hasDuplicate = true;
							return 0;
						}

						var cur,
							i = 0,
							aup = a.parentNode,
							bup = b.parentNode,
							ap = [ a ],
							bp = [ b ];

						// Parentless nodes are either documents or disconnected
						if ( !aup || !bup ) {
							return a === doc ? -1 :
								b === doc ? 1 :
									aup ? -1 :
										bup ? 1 :
											sortInput ?
												( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
												0;

							// If the nodes are siblings, we can do a quick check
						} else if ( aup === bup ) {
							return siblingCheck( a, b );
						}

						// Otherwise we need full lists of their ancestors for comparison
						cur = a;
						while ( (cur = cur.parentNode) ) {
							ap.unshift( cur );
						}
						cur = b;
						while ( (cur = cur.parentNode) ) {
							bp.unshift( cur );
						}

						// Walk down the tree looking for a discrepancy
						while ( ap[i] === bp[i] ) {
							i++;
						}

						return i ?
							// Do a sibling check if the nodes have a common ancestor
							siblingCheck( ap[i], bp[i] ) :

							// Otherwise nodes in our document sort first
							ap[i] === preferredDoc ? -1 :
								bp[i] === preferredDoc ? 1 :
									0;
					};

				return doc;
			};

			Sizzle.matches = function( expr, elements ) {
				return Sizzle( expr, null, null, elements );
			};

			Sizzle.matchesSelector = function( elem, expr ) {
				// Set document vars if needed
				if ( ( elem.ownerDocument || elem ) !== document ) {
					setDocument( elem );
				}

				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				if ( support.matchesSelector && documentIsHTML &&
					( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
					( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || support.disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
							elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch (e) {}
				}

				return Sizzle( expr, document, null, [ elem ] ).length > 0;
			};

			Sizzle.contains = function( context, elem ) {
				// Set document vars if needed
				if ( ( context.ownerDocument || context ) !== document ) {
					setDocument( context );
				}
				return contains( context, elem );
			};

			Sizzle.attr = function( elem, name ) {
				// Set document vars if needed
				if ( ( elem.ownerDocument || elem ) !== document ) {
					setDocument( elem );
				}

				var fn = Expr.attrHandle[ name.toLowerCase() ],
				// Don't get fooled by Object.prototype properties (jQuery #13807)
					val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
						fn( elem, name, !documentIsHTML ) :
						undefined;

				return val !== undefined ?
					val :
					support.attributes || !documentIsHTML ?
						elem.getAttribute( name ) :
						(val = elem.getAttributeNode(name)) && val.specified ?
							val.value :
							null;
			};

			Sizzle.error = function( msg ) {
				throw new Error( "Syntax error, unrecognized expression: " + msg );
			};

			/**
			 * Document sorting and removing duplicates
			 * @param {ArrayLike} results
			 */
			Sizzle.uniqueSort = function( results ) {
				var elem,
					duplicates = [],
					j = 0,
					i = 0;

				// Unless we *know* we can detect duplicates, assume their presence
				hasDuplicate = !support.detectDuplicates;
				sortInput = !support.sortStable && results.slice( 0 );
				results.sort( sortOrder );

				if ( hasDuplicate ) {
					while ( (elem = results[i++]) ) {
						if ( elem === results[ i ] ) {
							j = duplicates.push( i );
						}
					}
					while ( j-- ) {
						results.splice( duplicates[ j ], 1 );
					}
				}

				// Clear input after sorting to release objects
				// See https://github.com/jquery/sizzle/pull/225
				sortInput = null;

				return results;
			};

			/**
			 * Utility function for retrieving the text value of an array of DOM nodes
			 * @param {Array|Element} elem
			 */
			getText = Sizzle.getText = function( elem ) {
				var node,
					ret = "",
					i = 0,
					nodeType = elem.nodeType;

				if ( !nodeType ) {
					// If no nodeType, this is expected to be an array
					while ( (node = elem[i++]) ) {
						// Do not traverse comment nodes
						ret += getText( node );
					}
				} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
					// Use textContent for elements
					// innerText usage removed for consistency of new lines (jQuery #11153)
					if ( typeof elem.textContent === "string" ) {
						return elem.textContent;
					} else {
						// Traverse its children
						for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
							ret += getText( elem );
						}
					}
				} else if ( nodeType === 3 || nodeType === 4 ) {
					return elem.nodeValue;
				}
				// Do not include comment or processing instruction nodes

				return ret;
			};

			Expr = Sizzle.selectors = {

				// Can be adjusted by the user
				cacheLength: 50,

				createPseudo: markFunction,

				match: matchExpr,

				attrHandle: {},

				find: {},

				relative: {
					">": { dir: "parentNode", first: true },
					" ": { dir: "parentNode" },
					"+": { dir: "previousSibling", first: true },
					"~": { dir: "previousSibling" }
				},

				preFilter: {
					"ATTR": function( match ) {
						match[1] = match[1].replace( runescape, funescape );

						// Move the given value to match[3] whether quoted or unquoted
						match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

						if ( match[2] === "~=" ) {
							match[3] = " " + match[3] + " ";
						}

						return match.slice( 0, 4 );
					},

					"CHILD": function( match ) {
						/* matches from matchExpr["CHILD"]
						 1 type (only|nth|...)
						 2 what (child|of-type)
						 3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
						 4 xn-component of xn+y argument ([+-]?\d*n|)
						 5 sign of xn-component
						 6 x of xn-component
						 7 sign of y-component
						 8 y of y-component
						 */
						match[1] = match[1].toLowerCase();

						if ( match[1].slice( 0, 3 ) === "nth" ) {
							// nth-* requires argument
							if ( !match[3] ) {
								Sizzle.error( match[0] );
							}

							// numeric x and y parameters for Expr.filter.CHILD
							// remember that false/true cast respectively to 0/1
							match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
							match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

							// other types prohibit arguments
						} else if ( match[3] ) {
							Sizzle.error( match[0] );
						}

						return match;
					},

					"PSEUDO": function( match ) {
						var excess,
							unquoted = !match[6] && match[2];

						if ( matchExpr["CHILD"].test( match[0] ) ) {
							return null;
						}

						// Accept quoted arguments as-is
						if ( match[3] ) {
							match[2] = match[4] || match[5] || "";

							// Strip excess characters from unquoted arguments
						} else if ( unquoted && rpseudo.test( unquoted ) &&
								// Get excess from tokenize (recursively)
							(excess = tokenize( unquoted, true )) &&
								// advance to the next closing parenthesis
							(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

							// excess is a negative index
							match[0] = match[0].slice( 0, excess );
							match[2] = unquoted.slice( 0, excess );
						}

						// Return only captures needed by the pseudo filter method (type and argument)
						return match.slice( 0, 3 );
					}
				},

				filter: {

					"TAG": function( nodeNameSelector ) {
						var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
						return nodeNameSelector === "*" ?
							function() { return true; } :
							function( elem ) {
								return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
							};
					},

					"CLASS": function( className ) {
						var pattern = classCache[ className + " " ];

						return pattern ||
							(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
							classCache( className, function( elem ) {
								return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
							});
					},

					"ATTR": function( name, operator, check ) {
						return function( elem ) {
							var result = Sizzle.attr( elem, name );

							if ( result == null ) {
								return operator === "!=";
							}
							if ( !operator ) {
								return true;
							}

							result += "";

							return operator === "=" ? result === check :
								operator === "!=" ? result !== check :
									operator === "^=" ? check && result.indexOf( check ) === 0 :
										operator === "*=" ? check && result.indexOf( check ) > -1 :
											operator === "$=" ? check && result.slice( -check.length ) === check :
												operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
													operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
														false;
						};
					},

					"CHILD": function( type, what, argument, first, last ) {
						var simple = type.slice( 0, 3 ) !== "nth",
							forward = type.slice( -4 ) !== "last",
							ofType = what === "of-type";

						return first === 1 && last === 0 ?

							// Shortcut for :nth-*(n)
							function( elem ) {
								return !!elem.parentNode;
							} :

							function( elem, context, xml ) {
								var cache, outerCache, node, diff, nodeIndex, start,
									dir = simple !== forward ? "nextSibling" : "previousSibling",
									parent = elem.parentNode,
									name = ofType && elem.nodeName.toLowerCase(),
									useCache = !xml && !ofType;

								if ( parent ) {

									// :(first|last|only)-(child|of-type)
									if ( simple ) {
										while ( dir ) {
											node = elem;
											while ( (node = node[ dir ]) ) {
												if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
													return false;
												}
											}
											// Reverse direction for :only-* (if we haven't yet done so)
											start = dir = type === "only" && !start && "nextSibling";
										}
										return true;
									}

									start = [ forward ? parent.firstChild : parent.lastChild ];

									// non-xml :nth-child(...) stores cache data on `parent`
									if ( forward && useCache ) {
										// Seek `elem` from a previously-cached index
										outerCache = parent[ expando ] || (parent[ expando ] = {});
										cache = outerCache[ type ] || [];
										nodeIndex = cache[0] === dirruns && cache[1];
										diff = cache[0] === dirruns && cache[2];
										node = nodeIndex && parent.childNodes[ nodeIndex ];

										while ( (node = ++nodeIndex && node && node[ dir ] ||

												// Fallback to seeking `elem` from the start
											(diff = nodeIndex = 0) || start.pop()) ) {

											// When found, cache indexes on `parent` and break
											if ( node.nodeType === 1 && ++diff && node === elem ) {
												outerCache[ type ] = [ dirruns, nodeIndex, diff ];
												break;
											}
										}

										// Use previously-cached element index if available
									} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
										diff = cache[1];

										// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
									} else {
										// Use the same loop as above to seek `elem` from the start
										while ( (node = ++nodeIndex && node && node[ dir ] ||
											(diff = nodeIndex = 0) || start.pop()) ) {

											if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
												// Cache the index of each encountered element
												if ( useCache ) {
													(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
												}

												if ( node === elem ) {
													break;
												}
											}
										}
									}

									// Incorporate the offset, then check against cycle size
									diff -= last;
									return diff === first || ( diff % first === 0 && diff / first >= 0 );
								}
							};
					},

					"PSEUDO": function( pseudo, argument ) {
						// pseudo-class names are case-insensitive
						// http://www.w3.org/TR/selectors/#pseudo-classes
						// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
						// Remember that setFilters inherits from pseudos
						var args,
							fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
								Sizzle.error( "unsupported pseudo: " + pseudo );

						// The user may use createPseudo to indicate that
						// arguments are needed to create the filter function
						// just as Sizzle does
						if ( fn[ expando ] ) {
							return fn( argument );
						}

						// But maintain support for old signatures
						if ( fn.length > 1 ) {
							args = [ pseudo, pseudo, "", argument ];
							return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
								markFunction(function( seed, matches ) {
									var idx,
										matched = fn( seed, argument ),
										i = matched.length;
									while ( i-- ) {
										idx = indexOf( seed, matched[i] );
										seed[ idx ] = !( matches[ idx ] = matched[i] );
									}
								}) :
								function( elem ) {
									return fn( elem, 0, args );
								};
						}

						return fn;
					}
				},

				pseudos: {
					// Potentially complex pseudos
					"not": markFunction(function( selector ) {
						// Trim the selector passed to compile
						// to avoid treating leading and trailing
						// spaces as combinators
						var input = [],
							results = [],
							matcher = compile( selector.replace( rtrim, "$1" ) );

						return matcher[ expando ] ?
							markFunction(function( seed, matches, context, xml ) {
								var elem,
									unmatched = matcher( seed, null, xml, [] ),
									i = seed.length;

								// Match elements unmatched by `matcher`
								while ( i-- ) {
									if ( (elem = unmatched[i]) ) {
										seed[i] = !(matches[i] = elem);
									}
								}
							}) :
							function( elem, context, xml ) {
								input[0] = elem;
								matcher( input, null, xml, results );
								// Don't keep the element (issue #299)
								input[0] = null;
								return !results.pop();
							};
					}),

					"has": markFunction(function( selector ) {
						return function( elem ) {
							return Sizzle( selector, elem ).length > 0;
						};
					}),

					"contains": markFunction(function( text ) {
						text = text.replace( runescape, funescape );
						return function( elem ) {
							return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
						};
					}),

					// "Whether an element is represented by a :lang() selector
					// is based solely on the element's language value
					// being equal to the identifier C,
					// or beginning with the identifier C immediately followed by "-".
					// The matching of C against the element's language value is performed case-insensitively.
					// The identifier C does not have to be a valid language name."
					// http://www.w3.org/TR/selectors/#lang-pseudo
					"lang": markFunction( function( lang ) {
						// lang value must be a valid identifier
						if ( !ridentifier.test(lang || "") ) {
							Sizzle.error( "unsupported lang: " + lang );
						}
						lang = lang.replace( runescape, funescape ).toLowerCase();
						return function( elem ) {
							var elemLang;
							do {
								if ( (elemLang = documentIsHTML ?
										elem.lang :
									elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

									elemLang = elemLang.toLowerCase();
									return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
								}
							} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
							return false;
						};
					}),

					// Miscellaneous
					"target": function( elem ) {
						var hash = window.location && window.location.hash;
						return hash && hash.slice( 1 ) === elem.id;
					},

					"root": function( elem ) {
						return elem === docElem;
					},

					"focus": function( elem ) {
						return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
					},

					// Boolean properties
					"enabled": function( elem ) {
						return elem.disabled === false;
					},

					"disabled": function( elem ) {
						return elem.disabled === true;
					},

					"checked": function( elem ) {
						// In CSS3, :checked should return both checked and selected elements
						// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						var nodeName = elem.nodeName.toLowerCase();
						return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
					},

					"selected": function( elem ) {
						// Accessing this property makes selected-by-default
						// options in Safari work properly
						if ( elem.parentNode ) {
							elem.parentNode.selectedIndex;
						}

						return elem.selected === true;
					},

					// Contents
					"empty": function( elem ) {
						// http://www.w3.org/TR/selectors/#empty-pseudo
						// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
						//   but not by others (comment: 8; processing instruction: 7; etc.)
						// nodeType < 6 works because attributes (2) do not appear as children
						for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
							if ( elem.nodeType < 6 ) {
								return false;
							}
						}
						return true;
					},

					"parent": function( elem ) {
						return !Expr.pseudos["empty"]( elem );
					},

					// Element/input types
					"header": function( elem ) {
						return rheader.test( elem.nodeName );
					},

					"input": function( elem ) {
						return rinputs.test( elem.nodeName );
					},

					"button": function( elem ) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === "button" || name === "button";
					},

					"text": function( elem ) {
						var attr;
						return elem.nodeName.toLowerCase() === "input" &&
							elem.type === "text" &&

								// Support: IE<8
								// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
							( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
					},

					// Position-in-collection
					"first": createPositionalPseudo(function() {
						return [ 0 ];
					}),

					"last": createPositionalPseudo(function( matchIndexes, length ) {
						return [ length - 1 ];
					}),

					"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
						return [ argument < 0 ? argument + length : argument ];
					}),

					"even": createPositionalPseudo(function( matchIndexes, length ) {
						var i = 0;
						for ( ; i < length; i += 2 ) {
							matchIndexes.push( i );
						}
						return matchIndexes;
					}),

					"odd": createPositionalPseudo(function( matchIndexes, length ) {
						var i = 1;
						for ( ; i < length; i += 2 ) {
							matchIndexes.push( i );
						}
						return matchIndexes;
					}),

					"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
						var i = argument < 0 ? argument + length : argument;
						for ( ; --i >= 0; ) {
							matchIndexes.push( i );
						}
						return matchIndexes;
					}),

					"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
						var i = argument < 0 ? argument + length : argument;
						for ( ; ++i < length; ) {
							matchIndexes.push( i );
						}
						return matchIndexes;
					})
				}
			};

			Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
			for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
				Expr.pseudos[ i ] = createInputPseudo( i );
			}
			for ( i in { submit: true, reset: true } ) {
				Expr.pseudos[ i ] = createButtonPseudo( i );
			}

// Easy API for creating new setFilters
			function setFilters() {}
			setFilters.prototype = Expr.filters = Expr.pseudos;
			Expr.setFilters = new setFilters();

			tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
				var matched, match, tokens, type,
					soFar, groups, preFilters,
					cached = tokenCache[ selector + " " ];

				if ( cached ) {
					return parseOnly ? 0 : cached.slice( 0 );
				}

				soFar = selector;
				groups = [];
				preFilters = Expr.preFilter;

				while ( soFar ) {

					// Comma and first run
					if ( !matched || (match = rcomma.exec( soFar )) ) {
						if ( match ) {
							// Don't consume trailing commas as valid
							soFar = soFar.slice( match[0].length ) || soFar;
						}
						groups.push( (tokens = []) );
					}

					matched = false;

					// Combinators
					if ( (match = rcombinators.exec( soFar )) ) {
						matched = match.shift();
						tokens.push({
							value: matched,
							// Cast descendant combinators to space
							type: match[0].replace( rtrim, " " )
						});
						soFar = soFar.slice( matched.length );
					}

					// Filters
					for ( type in Expr.filter ) {
						if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
							(match = preFilters[ type ]( match ))) ) {
							matched = match.shift();
							tokens.push({
								value: matched,
								type: type,
								matches: match
							});
							soFar = soFar.slice( matched.length );
						}
					}

					if ( !matched ) {
						break;
					}
				}

				// Return the length of the invalid excess
				// if we're just parsing
				// Otherwise, throw an error or return tokens
				return parseOnly ?
					soFar.length :
					soFar ?
						Sizzle.error( selector ) :
						// Cache the tokens
						tokenCache( selector, groups ).slice( 0 );
			};

			function toSelector( tokens ) {
				var i = 0,
					len = tokens.length,
					selector = "";
				for ( ; i < len; i++ ) {
					selector += tokens[i].value;
				}
				return selector;
			}

			function addCombinator( matcher, combinator, base ) {
				var dir = combinator.dir,
					checkNonElements = base && dir === "parentNode",
					doneName = done++;

				return combinator.first ?
					// Check against closest ancestor/preceding element
					function( elem, context, xml ) {
						while ( (elem = elem[ dir ]) ) {
							if ( elem.nodeType === 1 || checkNonElements ) {
								return matcher( elem, context, xml );
							}
						}
					} :

					// Check against all ancestor/preceding elements
					function( elem, context, xml ) {
						var oldCache, outerCache,
							newCache = [ dirruns, doneName ];

						// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
						if ( xml ) {
							while ( (elem = elem[ dir ]) ) {
								if ( elem.nodeType === 1 || checkNonElements ) {
									if ( matcher( elem, context, xml ) ) {
										return true;
									}
								}
							}
						} else {
							while ( (elem = elem[ dir ]) ) {
								if ( elem.nodeType === 1 || checkNonElements ) {
									outerCache = elem[ expando ] || (elem[ expando ] = {});
									if ( (oldCache = outerCache[ dir ]) &&
										oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

										// Assign to newCache so results back-propagate to previous elements
										return (newCache[ 2 ] = oldCache[ 2 ]);
									} else {
										// Reuse newcache so results back-propagate to previous elements
										outerCache[ dir ] = newCache;

										// A match means we're done; a fail means we have to keep checking
										if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
											return true;
										}
									}
								}
							}
						}
					};
			}

			function elementMatcher( matchers ) {
				return matchers.length > 1 ?
					function( elem, context, xml ) {
						var i = matchers.length;
						while ( i-- ) {
							if ( !matchers[i]( elem, context, xml ) ) {
								return false;
							}
						}
						return true;
					} :
					matchers[0];
			}

			function multipleContexts( selector, contexts, results ) {
				var i = 0,
					len = contexts.length;
				for ( ; i < len; i++ ) {
					Sizzle( selector, contexts[i], results );
				}
				return results;
			}

			function condense( unmatched, map, filter, context, xml ) {
				var elem,
					newUnmatched = [],
					i = 0,
					len = unmatched.length,
					mapped = map != null;

				for ( ; i < len; i++ ) {
					if ( (elem = unmatched[i]) ) {
						if ( !filter || filter( elem, context, xml ) ) {
							newUnmatched.push( elem );
							if ( mapped ) {
								map.push( i );
							}
						}
					}
				}

				return newUnmatched;
			}

			function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
				if ( postFilter && !postFilter[ expando ] ) {
					postFilter = setMatcher( postFilter );
				}
				if ( postFinder && !postFinder[ expando ] ) {
					postFinder = setMatcher( postFinder, postSelector );
				}
				return markFunction(function( seed, results, context, xml ) {
					var temp, i, elem,
						preMap = [],
						postMap = [],
						preexisting = results.length,

					// Get initial elements from seed or context
						elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

					// Prefilter to get matcher input, preserving a map for seed-results synchronization
						matcherIn = preFilter && ( seed || !selector ) ?
							condense( elems, preMap, preFilter, context, xml ) :
							elems,

						matcherOut = matcher ?
							// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
							postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

								// ...intermediate processing is necessary
								[] :

								// ...otherwise use results directly
								results :
							matcherIn;

					// Find primary matches
					if ( matcher ) {
						matcher( matcherIn, matcherOut, context, xml );
					}

					// Apply postFilter
					if ( postFilter ) {
						temp = condense( matcherOut, postMap );
						postFilter( temp, [], context, xml );

						// Un-match failing elements by moving them back to matcherIn
						i = temp.length;
						while ( i-- ) {
							if ( (elem = temp[i]) ) {
								matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
							}
						}
					}

					if ( seed ) {
						if ( postFinder || preFilter ) {
							if ( postFinder ) {
								// Get the final matcherOut by condensing this intermediate into postFinder contexts
								temp = [];
								i = matcherOut.length;
								while ( i-- ) {
									if ( (elem = matcherOut[i]) ) {
										// Restore matcherIn since elem is not yet a final match
										temp.push( (matcherIn[i] = elem) );
									}
								}
								postFinder( null, (matcherOut = []), temp, xml );
							}

							// Move matched elements from seed to results to keep them synchronized
							i = matcherOut.length;
							while ( i-- ) {
								if ( (elem = matcherOut[i]) &&
									(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

									seed[temp] = !(results[temp] = elem);
								}
							}
						}

						// Add elements to results, through postFinder if defined
					} else {
						matcherOut = condense(
							matcherOut === results ?
								matcherOut.splice( preexisting, matcherOut.length ) :
								matcherOut
						);
						if ( postFinder ) {
							postFinder( null, results, matcherOut, xml );
						} else {
							push.apply( results, matcherOut );
						}
					}
				});
			}

			function matcherFromTokens( tokens ) {
				var checkContext, matcher, j,
					len = tokens.length,
					leadingRelative = Expr.relative[ tokens[0].type ],
					implicitRelative = leadingRelative || Expr.relative[" "],
					i = leadingRelative ? 1 : 0,

				// The foundational matcher ensures that elements are reachable from top-level context(s)
					matchContext = addCombinator( function( elem ) {
						return elem === checkContext;
					}, implicitRelative, true ),
					matchAnyContext = addCombinator( function( elem ) {
						return indexOf( checkContext, elem ) > -1;
					}, implicitRelative, true ),
					matchers = [ function( elem, context, xml ) {
						var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
								(checkContext = context).nodeType ?
									matchContext( elem, context, xml ) :
									matchAnyContext( elem, context, xml ) );
						// Avoid hanging onto element (issue #299)
						checkContext = null;
						return ret;
					} ];

				for ( ; i < len; i++ ) {
					if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
						matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
					} else {
						matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

						// Return special upon seeing a positional matcher
						if ( matcher[ expando ] ) {
							// Find the next relative operator (if any) for proper handling
							j = ++i;
							for ( ; j < len; j++ ) {
								if ( Expr.relative[ tokens[j].type ] ) {
									break;
								}
							}
							return setMatcher(
								i > 1 && elementMatcher( matchers ),
								i > 1 && toSelector(
									// If the preceding token was a descendant combinator, insert an implicit any-element `*`
									tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
								).replace( rtrim, "$1" ),
								matcher,
								i < j && matcherFromTokens( tokens.slice( i, j ) ),
								j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
								j < len && toSelector( tokens )
							);
						}
						matchers.push( matcher );
					}
				}

				return elementMatcher( matchers );
			}

			function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
				var bySet = setMatchers.length > 0,
					byElement = elementMatchers.length > 0,
					superMatcher = function( seed, context, xml, results, outermost ) {
						var elem, j, matcher,
							matchedCount = 0,
							i = "0",
							unmatched = seed && [],
							setMatched = [],
							contextBackup = outermostContext,
						// We must always have either seed elements or outermost context
							elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
						// Use integer dirruns iff this is the outermost matcher
							dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
							len = elems.length;

						if ( outermost ) {
							outermostContext = context !== document && context;
						}

						// Add elements passing elementMatchers directly to results
						// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
						// Support: IE<9, Safari
						// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
						for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
							if ( byElement && elem ) {
								j = 0;
								while ( (matcher = elementMatchers[j++]) ) {
									if ( matcher( elem, context, xml ) ) {
										results.push( elem );
										break;
									}
								}
								if ( outermost ) {
									dirruns = dirrunsUnique;
								}
							}

							// Track unmatched elements for set filters
							if ( bySet ) {
								// They will have gone through all possible matchers
								if ( (elem = !matcher && elem) ) {
									matchedCount--;
								}

								// Lengthen the array for every element, matched or not
								if ( seed ) {
									unmatched.push( elem );
								}
							}
						}

						// Apply set filters to unmatched elements
						matchedCount += i;
						if ( bySet && i !== matchedCount ) {
							j = 0;
							while ( (matcher = setMatchers[j++]) ) {
								matcher( unmatched, setMatched, context, xml );
							}

							if ( seed ) {
								// Reintegrate element matches to eliminate the need for sorting
								if ( matchedCount > 0 ) {
									while ( i-- ) {
										if ( !(unmatched[i] || setMatched[i]) ) {
											setMatched[i] = pop.call( results );
										}
									}
								}

								// Discard index placeholder values to get only actual matches
								setMatched = condense( setMatched );
							}

							// Add matches to results
							push.apply( results, setMatched );

							// Seedless set matches succeeding multiple successful matchers stipulate sorting
							if ( outermost && !seed && setMatched.length > 0 &&
								( matchedCount + setMatchers.length ) > 1 ) {

								Sizzle.uniqueSort( results );
							}
						}

						// Override manipulation of globals by nested matchers
						if ( outermost ) {
							dirruns = dirrunsUnique;
							outermostContext = contextBackup;
						}

						return unmatched;
					};

				return bySet ?
					markFunction( superMatcher ) :
					superMatcher;
			}

			compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
				var i,
					setMatchers = [],
					elementMatchers = [],
					cached = compilerCache[ selector + " " ];

				if ( !cached ) {
					// Generate a function of recursive functions that can be used to check each element
					if ( !match ) {
						match = tokenize( selector );
					}
					i = match.length;
					while ( i-- ) {
						cached = matcherFromTokens( match[i] );
						if ( cached[ expando ] ) {
							setMatchers.push( cached );
						} else {
							elementMatchers.push( cached );
						}
					}

					// Cache the compiled function
					cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

					// Save selector and tokenization
					cached.selector = selector;
				}
				return cached;
			};

			/**
			 * A low-level selection function that works with Sizzle's compiled
			 *  selector functions
			 * @param {String|Function} selector A selector or a pre-compiled
			 *  selector function built with Sizzle.compile
			 * @param {Element} context
			 * @param {Array} [results]
			 * @param {Array} [seed] A set of elements to match against
			 */
			select = Sizzle.select = function( selector, context, results, seed ) {
				var i, tokens, token, type, find,
					compiled = typeof selector === "function" && selector,
					match = !seed && tokenize( (selector = compiled.selector || selector) );

				results = results || [];

				// Try to minimize operations if there is no seed and only one group
				if ( match.length === 1 ) {

					// Take a shortcut and set the context if the root selector is an ID
					tokens = match[0] = match[0].slice( 0 );
					if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
						support.getById && context.nodeType === 9 && documentIsHTML &&
						Expr.relative[ tokens[1].type ] ) {

						context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
						if ( !context ) {
							return results;

							// Precompiled matchers will still verify ancestry, so step up a level
						} else if ( compiled ) {
							context = context.parentNode;
						}

						selector = selector.slice( tokens.shift().value.length );
					}

					// Fetch a seed set for right-to-left matching
					i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
					while ( i-- ) {
						token = tokens[i];

						// Abort if we hit a combinator
						if ( Expr.relative[ (type = token.type) ] ) {
							break;
						}
						if ( (find = Expr.find[ type ]) ) {
							// Search, expanding context for leading sibling combinators
							if ( (seed = find(
									token.matches[0].replace( runescape, funescape ),
									rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
								)) ) {

								// If seed is empty or no tokens remain, we can return early
								tokens.splice( i, 1 );
								selector = seed.length && toSelector( tokens );
								if ( !selector ) {
									push.apply( results, seed );
									return results;
								}

								break;
							}
						}
					}
				}

				// Compile and execute a filtering function if one is not provided
				// Provide `match` to avoid retokenization if we modified the selector above
				( compiled || compile( selector, match ) )(
					seed,
					context,
					!documentIsHTML,
					results,
					rsibling.test( selector ) && testContext( context.parentNode ) || context
				);
				return results;
			};

// One-time assignments

// Sort stability
			support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
			support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
			setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
			support.sortDetached = assert(function( div1 ) {
				// Should return 1, but returns 4 (following)
				return div1.compareDocumentPosition( document.createElement("div") ) & 1;
			});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
			if ( !assert(function( div ) {
					div.innerHTML = "<a href='#'></a>";
					return div.firstChild.getAttribute("href") === "#" ;
				}) ) {
				addHandle( "type|href|height|width", function( elem, name, isXML ) {
					if ( !isXML ) {
						return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
					}
				});
			}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
			if ( !support.attributes || !assert(function( div ) {
					div.innerHTML = "<input/>";
					div.firstChild.setAttribute( "value", "" );
					return div.firstChild.getAttribute( "value" ) === "";
				}) ) {
				addHandle( "value", function( elem, name, isXML ) {
					if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
						return elem.defaultValue;
					}
				});
			}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
			if ( !assert(function( div ) {
					return div.getAttribute("disabled") == null;
				}) ) {
				addHandle( booleans, function( elem, name, isXML ) {
					var val;
					if ( !isXML ) {
						return elem[ name ] === true ? name.toLowerCase() :
							(val = elem.getAttributeNode( name )) && val.specified ?
								val.value :
								null;
					}
				});
			}

			return Sizzle;

		})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
				selector || [],
				false
			).length;
		}
	});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
	var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

									// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

						// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

					// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

					// HANDLE: $(expr, context)
					// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

				// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

				// HANDLE: $(function)
				// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;

			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},

		sibling: function( n, elem ) {
			var matched = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}

			return matched;
		}
	});

	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

							// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);



// String to Object options format cache
	var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );

		var // Last fire value (for non-forgettable lists)
			memory,
		// Flag to know if list was already fired
			fired,
		// Flag to know if list is currently firing
			firing,
		// First callback to fire (used internally by add and fireWith)
			firingStart,
		// End of the loop when firing
			firingLength,
		// Index of currently firing callback (modified by remove if needed)
			firingIndex,
		// Actual callback list
			list = [],
		// Stack of fire calls for repeatable lists
			stack = !options.once && [],
		// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
		// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
							// With memory, if we're not firing then
							// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({

		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;

						// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

			// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	});


// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// We once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};

// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

			// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};


	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};


	function Data() {
		// Support: Android<4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});

		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}

			var descriptor = {},
			// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];

			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;

				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );

					// Support: Android<4
					// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}

			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}

			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

				// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
					// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];

			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}

			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			if ( key === undefined ) {
				this.cache[ unlock ] = {};

			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();

	var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
							data === "null" ? null :
								// Only convert to a number if it doesn't change the string
								+data + "" === data ? +data :
									rbrace.test( data ) ? jQuery.parseJSON( data ) :
										data;
				} catch( e ) {}

				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});

	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );

					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}

			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});


	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
					empty: jQuery.Callbacks("once memory").add(function() {
						data_priv.remove( elem, [ type + "queue", key ] );
					})
				});
		}
	});

	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

	var rcheckableType = (/^(?:checkbox|radio)$/i);



	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;



	support.focusinBubbles = "onfocusin" in window;


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );

			if ( !elemData || !(events = elemData.events) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
				special.bindType || type;

				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
						rkeyEvent.test( type ) ? this.keyHooks :
						{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};

	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
			src.defaultPrevented === undefined &&
				// Support: Android<4.0
			src.returnValue === false ?
				returnTrue :
				returnFalse;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );

					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}

	jQuery.fn.extend({

		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}

			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},

		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
		wrapMap = {

			// Support: IE9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],

			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			_default: [ 0, "", "" ]
		};

// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}

// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			data_user.set( dest, udataCur );
		}
	}

	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}

// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

						// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

						// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );

						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while ( (elem = nodes[ i++ ]) ) {

				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}

				contains = jQuery.contains( elem.ownerDocument, elem );

				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			return fragment;
		},

		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;

			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];

					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});

	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},

		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},

		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},

		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},

		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},

		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;

			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}

			return this;
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = value.replace( rxhtmlTag, "<$1></$2>" );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var arg = arguments[ 0 ];

			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;

				jQuery.cleanData( getAll( this ) );

				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});

			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},

		detach: function( selector ) {
			return this.remove( selector, true );
		},

		domManip: function( args, callback ) {

			// Flatten any nested arrays
			args = concat.apply( [], args );

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
				( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}

			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call( this[ i ], node, i );
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}

			return this;
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	});


	var iframe,
		elemdisplay = {};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

				// Use of this method is a temporary fix (more like optimization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
		ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}


	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild( container );

			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";

			docElem.removeChild( container );
		}

		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if ( window.getComputedStyle ) {
			jQuery.extend( support, {
				pixelPosition: function() {

					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {

					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );

					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );

					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

					docElem.removeChild( container );
					div.removeChild( marginDiv );

					return ret;
				}
			});
		}
	})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}

		return origName;
	}

	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
				// If we already have the right measurement, avoid augmentation
				4 :
				// Otherwise initialize for horizontal or vertical properties
				name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
				augmentWidthOrHeight(
					elem,
					name,
					extra || ( isBorderBox ? "border" : "content" ),
					valueIsBorderBox,
					styles
				)
			) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					style[ name ] = value;
				}

			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

				// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};

	jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;

				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];

					// Make sure we update the tween properties later on
					parts = parts || [];

					// Iteratively approximate from a nonzero starting point
					start = +target || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*.
						// Use string for doubling so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

						// Update scale, tolerating zero or NaN from tween.cur(),
						// break the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}

				return tween;
			} ]
		};

// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}

// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function() {
				// Ensure the complete handler is called before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

				// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;

				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

			// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ]);

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});

// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;

	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};


	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();


	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});

	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}

			if ( value !== undefined ) {

				if ( value === null ) {
					jQuery.removeAttr( elem, name );

				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}

			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				ret = jQuery.find.attr( elem, name );

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});

// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});




	var rfocusable = /^(?:input|select|textarea|button)$/i;

	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});

	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},

		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );

			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});




	var rclass = /[\t\r\n\f]/g;

	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}

			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
								( " " + elem.className + " " ).replace( rclass, " " ) :
								" "
						);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
								( " " + elem.className + " " ).replace( rclass, " " ) :
								""
						);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// Toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

					// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},

		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}

			return false;
		}
	});




	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace(rreturn, "") :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each(function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




// Return jQuery for attributes-only inclusion


	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});

	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});


	var nonce = jQuery.now();

	var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
		prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
		transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

	// Document location
		ajaxLocation = window.location.href,

	// Segment location into parts
		ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

						// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}

// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

										// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			 timeout: 0,
			 data: null,
			 dataType: null,
			 username: null,
			 password: null,
			 cache: null,
			 throws: false,
			 traditional: false,
			 headers: {},
			 */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,
			// URL without anti-cache param
				cacheURL,
			// Response headers
				responseHeadersString,
				responseHeaders,
			// timeout handle
				timeoutTimer,
			// Cross-domain detection vars
				parts,
			// To know if global events are to be dispatched
				fireGlobals,
			// Loop variable
				i,
			// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
				callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
			// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
				statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
			// The jqXHR state
				state = 0,
			// Default abort message
				strAbort = "canceled",
			// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
					( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
						// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

						// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map(function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}

			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			});
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},

		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});


	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}

// Serialize an array of form elements or a set of
// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
					// Can add propHook for "elements" to filter or add form elements
					var elements = jQuery.prop( this, "elements" );
					return elements ? jQuery.makeArray( elements ) : this;
				})
				.filter(function() {
					var type = this.type;

					// Use .is( ":disabled" ) so that fieldset[disabled] works
					return this.name && !jQuery( this ).is( ":disabled" ) &&
						rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
						( this.checked || !rcheckableType.test( type ) );
				})
				.map(function( i, elem ) {
					var val = jQuery( this ).val();

					return val == null ?
						null :
						jQuery.isArray( val ) ?
							jQuery.map( val, function( val ) {
								return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
							}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				}).get();
		}
	});


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};

	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function( options ) {
		var callback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");

					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");

					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});

// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});

// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});

// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
						"url" :
					typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
				);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;

				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf(" ");

		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,

				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			}).complete( callback && function( jqXHR, status ) {
					self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
				});
		}

		return this;
	};




// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};




	var docElem = window.document.documentElement;

	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			// Support: BlackBerry 5, iOS 3 (original iPhone)
			// If we don't have gBCR, just use 0,0 rather than error
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;

				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || docElem;
			});
		}
	});

// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});


// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};

	jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function() {
			return jQuery;
		});
	}
	var
	// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}
	return jQuery;

}));


/**
 * Swiper 3.3.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: February 7, 2016
 */
(function () {
    'use strict';
    var $;
    /*===========================
    Swiper
    ===========================*/
    var Swiper = function (container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            flip: {
                slideShadows : true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            // Hash Navigation
            hashnav: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // NS
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slidePrevClass: 'swiper-slide-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            */
        
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            }
            else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
            else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        
        // Swiper
        var s = this;
        
        // Params
        s.params = params;
        s.originalParams = originalParams;
        
        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            }
            else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;
        
        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [], point;
            for ( point in s.params.breakpoints ) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
                for ( var param in breakPointsParams ) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if(needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }
        
        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }
        
        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        
        s.classNames.push('swiper-container-' + s.params.direction);
        
        if (s.params.freeMode) {
            s.classNames.push('swiper-container-free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push('swiper-container-no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push('swiper-container-autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push('swiper-container-3d');
            }
            else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push('swiper-container-' + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
            s.params.setWrapperSize = false;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            s.params.setWrapperSize = false;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        
        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        
        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }
        
            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass('swiper-pagination-clickable');
            }
            else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass('swiper-pagination-' + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }
        
        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;
        
        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push('swiper-container-rtl');
        }
        
        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        
        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push('swiper-container-multirow');
        }
        
        // Check for Android
        if (s.device.android) {
            s.classNames.push('swiper-container-android');
        }
        
        // Add classes
        s.container.addClass(s.classNames.join(' '));
        
        // Translate
        s.translate = 0;
        
        // Progress
        s.progress = 0;
        
        // Velocity
        s.velocity = 0;
        
        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
        };
        
        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        if (s.params.grabCursor) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = '-webkit-grab';
            s.container[0].style.cursor = '-moz-grab';
            s.container[0].style.cursor = 'grab';
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        
        s.loadImage = function (imgElement, src, srcset, checkForComplete, callback) {
            var image;
            function onReady () {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
        
            } else {//image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), true, _onReady);
            }
        };
        
        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                }
                else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    }
                    else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        }
                        else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, s.params.autoplay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            }
            else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    }
                    else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function () {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            // Update Height
            var slide = s.slides.eq(s.activeIndex)[0];
            if (typeof slide !== 'undefined') {
                var newHeight = slide.offsetHeight;
                if (newHeight) s.wrapper.css('height', newHeight + 'px');
            }
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            }
            else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            }
            else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }
        
            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
        
            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };
        
        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
        
            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
        
            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
            else s.slides.css({marginRight: '', marginBottom: ''});
        
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                }
                else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }
        
            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide
                            .css({
                                '-webkit-box-ordinal-group': newSlideOrderIndex,
                                '-moz-box-ordinal-group': newSlideOrderIndex,
                                '-ms-flex-order': newSlideOrderIndex,
                                '-webkit-order': newSlideOrderIndex,
                                'order': newSlideOrderIndex
                            });
                    }
                    else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide
                        .css({
                            'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                        })
                        .attr('data-swiper-column', column)
                        .attr('data-swiper-row', row);
        
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                }
                else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);
        
                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    }
                    else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
        
        
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                }
                else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
        
                s.virtualSize += slideSize + spaceBetween;
        
                prevSlideSize = slideSize;
        
                index ++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
        
            if (
                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
            }
        
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
        
            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
        
            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                    else s.slides.css({marginRight: spaceBetween + 'px'});
                }
                else s.slides.css({marginBottom: spaceBetween + 'px'});
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
        
            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;
        
            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible =
                        (slideBefore >= 0 && slideBefore < s.size) ||
                        (slideAfter > 0 && slideAfter <= s.size) ||
                        (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            }
            else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
        
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i ++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    }
                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                }
                else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            // for (i = 0; i < s.slidesGrid.length; i++) {
                // if (- translate >= s.slidesGrid[i]) {
                    // newActiveIndex = i;
                // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
        
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
        };
        
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                s.slides.eq(0).addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                s.slides.eq(-1).addClass(s.params.slidePrevClass);
            }
        
            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                }
                else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    }
                    else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    }
                    else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        
            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    }
                    else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    }
                    else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };
        
        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
                        }
                        else {
                            paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    }
                    else {
                        paginationHTML =
                            '<span class="' + s.params.paginationCurrentClass + '"></span>' +
                            ' / ' +
                            '<span class="' + s.params.paginationTotalClass+'"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    }
                    else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            function forceSetTranslate() {
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated, newTranslate;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                }
                else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            }
            else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };
        
        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
        
            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
        
            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
        
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            }
            else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                }
                else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
        };
        
        /*=========================
          Events
          ===========================*/
        
        //Define Touch Events
        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
        if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
        else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        s.touchEvents = {
            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
        };
        
        
        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        
        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
        
            var moveCapture = s.params.nested ? true : false;
        
            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            }
            else {
                if (s.support.touch) {
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
                }
                if (params.simulateTouch && !s.device.ios && !s.device.android) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);
        
            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }
        
            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };
        
        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };
        
        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                }
                else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
        
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            }
            else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
                    if (s.params.centeredSlides) {
                        if ((slideToIndex < s.loopedSlides - s.params.slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + s.params.slidesPerView/2)) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                    else {
                        if (slideToIndex > s.slides.length - s.params.slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                }
                else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        
        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,
            // Form elements to match
            formElements = 'input, select, textarea, button',
            // Last click time
            lastClickTime = Date.now(), clickTimeout,
            //Velocities
            velocities = [],
            allowMomentumBounce;
        
        // Animating Flag
        s.animating = false;
        
        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        
        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
        
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        
            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }
        
            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        
        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;
        
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
            if (typeof isScrolling === 'undefined') {
                var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving && s.browser.ieTouch) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
        
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    }
                    else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor) {
                    s.container[0].style.cursor = 'move';
                    s.container[0].style.cursor = '-webkit-grabbing';
                    s.container[0].style.cursor = '-moz-grabbin';
                    s.container[0].style.cursor = 'grabbing';
                }
            }
            isMoved = true;
        
            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
        
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
        
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
        
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
        
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
        
            if (!s.params.followFinger) return;
        
            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                }
                else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched) {
                s.container[0].style.cursor = 'move';
                s.container[0].style.cursor = '-webkit-grab';
                s.container[0].style.cursor = '-moz-grab';
                s.container[0].style.cursor = 'grab';
            }
        
            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
        
            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
        
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
        
            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);
        
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
        
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            }
            else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    }
                    else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
        
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
        
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
        
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
        
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = - newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.maxTranslate();
                        }
                    }
                    else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.minTranslate();
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
        
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = - newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        }
                        else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
        
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
        
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
        
                    } else {
                        s.updateProgress(newPosition);
                    }
        
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
        
            // Find current slide
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                }
                else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
        
            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
        
            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
        
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            }
            else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
        
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
            var translate = - s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                }
                else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);
        
            // Normalize slideIndex
            for (var i = 0; i < s.slidesGrid.length; i++) {
                if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                    slideIndex = i;
                }
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex ) return false;
            }
        
            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
        
            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
        
            if (speed === 0) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            }
            else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
        
            }
        
            return true;
        };
        
        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    }
                    else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
        
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    }
                    else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        
        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0, y = 0, z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            }
            else {
                y = translate;
            }
        
            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }
        
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
        
            s.translate = s.isHorizontal() ? x : y;
        
            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            }
            else {
                progress = (translate - s.minTranslate()) / (translatesDiff);
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }
        
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        
        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        
        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
        
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
        
            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
        
            // Observe container
            initObserver(s.container[0], {childList: false});
        
            // Observe wrapper
            initObserver(s.wrapper[0], {attributes: false});
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
        
            var slides = s.wrapper.children('.' + s.params.slideClass);
        
            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
        
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
        
            var prependSlides = [], appendSlides = [], i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            }
            else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            }
            else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
        
            if (s.params.loop) {
                s.createLoop();
            }
        
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            }
            else {
                s.slideTo(newActiveIndex, 0, false);
            }
        
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ?
                                Math.max(1 - Math.abs(slide[0].progress), 0) :
                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide
                            .css({
                                opacity: slideOpacity
                            })
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
        
                    }
        
                },
                setTransition: function (duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        }
                        else if (s.rtl) {
                            rotateY = -rotateY;
                        }
        
                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
        
                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
        
                        slide
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function () {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({height: s.width + 'px'});
                        }
                        else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0, ty = 0, tz = 0;
                        if (i % 4 === 0) {
                            tx = - round * 4 * s.size;
                            tz = 0;
                        }
                        else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = - round * 4 * s.size;
                        }
                        else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        }
                        else if ((i - 3) % 4 === 0) {
                            tx = - s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
        
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
        
                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
        
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function () {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
        
                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
        
                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
        
                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
        
                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function (index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
        
                var slide = s.slides.eq(index);
                var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
                if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;
        
                img.each(function () {
                    var _img = $(this);
                    _img.addClass('swiper-lazy-loading');
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset');
                    s.loadImage(_img[0], (src || background), srcset, false, function () {
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        }
                        else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
        
                        }
        
                        _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
                        slide.find('.swiper-lazy-preloader, .preloader').remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            }
                            else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
        
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
        
            },
            load: function () {
                var i;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                }
                else {
                    if (s.params.slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (s.params.slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = s.params.slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + s.params.slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
        
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function () {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function () {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function (e) {
                var sb = s.scrollbar;
                var x = 0, y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ?
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                }
                else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function (e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();
        
                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);
        
                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
        
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            enableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(s.touchEvents.start, sb.dragStart);
                $(target).on(s.touchEvents.move, sb.dragMove);
                $(target).on(s.touchEvents.end, sb.dragEnd);
            },
            disableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(s.touchEvents.start, sb.dragStart);
                $(target).off(s.touchEvents.move, sb.dragMove);
                $(target).off(s.touchEvents.end, sb.dragEnd);
            },
            set: function () {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
        
                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                }
                else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
        
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                }
                else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function () {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
        
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    }
                    else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                }
                else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    }
                    else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    }
                    else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                }
                else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    }
                    else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function (duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function (x, y) {
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;
        
                this.interpolate = function (x2) {
                    if (!x2) return 0;
        
                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
        
                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
        
                var binarySearch = (function() {
                    var maxIndex, minIndex, guess;
                    return function(array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1)
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        return maxIndex;
                    };
                })();
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function(c){
                if(!s.controller.spline) s.controller.spline = s.params.loop ?
                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function (translate, byController) {
               var controlled = s.params.control;
               var multiplier, controlledTranslate;
               function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }
        
                    if(!controlledTranslate || s.params.controlBy === 'container'){
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }
        
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
               }
               if (s.isArray(controlled)) {
                   for (var i = 0; i < controlled.length; i++) {
                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                           setControlledTranslate(controlled[i]);
                       }
                   }
               }
               else if (controlled instanceof Swiper && byController !== controlled) {
        
                   setControlledTranslate(controlled);
               }
            },
            setTransition: function (duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function(){
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
        
                        });
                    }
                }
                if (s.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            init: function () {
                if (!s.params.hashnav) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (!hash) return;
                var speed = 0;
                for (var i = 0, length = s.slides.length; i < length; i++) {
                    var slide = s.slides.eq(i);
                    var slideHash = slide.attr('data-hash');
                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                        var index = slide.index();
                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                    }
                }
            },
            setHash: function () {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || '';
            }
        };

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.swiper-slide').length > 0 && s.container.parents('.swiper-slide-active').length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + s.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + s.height],
                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                ];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (
                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
                    ) {
                        inView = true;
                    }
        
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
            }
            else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };
        

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        if (s.params.mousewheelControl) {
            try {
                new window.WheelEvent('wheel');
                s.mousewheel.event = 'wheel';
            } catch (e) {
                if (window.WheelEvent || (s.container[0] && 'wheel' in s.container[0])) {
                    s.mousewheel.event = 'wheel';
                }
            }
            if (!s.mousewheel.event && window.WheelEvent) {
        
            }
            if (!s.mousewheel.event && document.onmousewheel !== undefined) {
                s.mousewheel.event = 'mousewheel';
            }
            if (!s.mousewheel.event) {
                s.mousewheel.event = 'DOMMouseScroll';
            }
        }
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var we = s.mousewheel.event;
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;
        
            //WebKits
            if (we === 'mousewheel') {
                if (s.params.mousewheelForceToAxis) {
                    if (s.isHorizontal()) {
                        if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX * rtlFactor;
                        else return;
                    }
                    else {
                        if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
                        else return;
                    }
                }
                else {
                    delta = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? - e.wheelDeltaX * rtlFactor : - e.wheelDeltaY;
                }
            }
            //Old FireFox
            else if (we === 'DOMMouseScroll') delta = -e.detail;
            //New FireFox
            else if (we === 'wheel') {
                if (s.params.mousewheelForceToAxis) {
                    if (s.isHorizontal()) {
                        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX * rtlFactor;
                        else return;
                    }
                    else {
                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
                        else return;
                    }
                }
                else {
                    delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? - e.deltaX * rtlFactor : - e.deltaY;
                }
            }
            if (delta === 0) return;
        
            if (s.params.mousewheelInvert) delta = -delta;
        
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) s.slideNext();
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                    else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) s.slidePrev();
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
        
            }
            else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;
        
                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();
        
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
        
                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }
        
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                }
                else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
        
                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }
            if (s.params.autoplay) s.stopAutoplay();
        
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            s.container.off(s.mousewheel.event, handleMousewheel);
            return true;
        };
        
        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            s.container.on(s.mousewheel.event, handleMousewheel);
            return true;
        };
        

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;
        
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            }
            else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                }
                else {
                    pY = p;
                    pX = '0';
                }
            }
        
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            }
            else {
                pX = pX * progress * rtlFactor + 'px' ;
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            }
            else {
                pY = pY * progress + 'px' ;
            }
        
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function () {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    setParallaxTransform(this, s.progress);
        
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function (duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName (eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                }
                else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {
        
        };
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function () {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };

        // Accessibility tools
        s.a11y = {
            makeFocusable: function ($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function ($el, role) {
                $el.attr('role', role);
                return $el;
            },
        
            addLabel: function ($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
        
            disable: function ($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
        
            enable: function ($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
        
            onEnterKey: function (event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                }
                else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },
        
            liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
        
            notify: function (message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function () {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }
        
                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function () {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function () {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            }
            else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        
        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
        
            // Wrapper
            s.wrapper.removeAttr('style');
        
            // Slides
            if (s.slides && s.slides.length) {
                s.slides
                    .removeClass([
                      s.params.slideVisibleClass,
                      s.params.slideActiveClass,
                      s.params.slideNextClass,
                      s.params.slidePrevClass
                    ].join(' '))
                    .removeAttr('style')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row');
            }
        
            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
        
            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
        
            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        
        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };
        
        s.init();
        

    
        // Return swiper instance
        return s;
    };
    

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: (function () {
            var ua = navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1)
        },
        /*==================================================
        Devices
        ====================================================*/
        device: (function () {
            var ua = navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        })(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
    
            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
    
            flexbox: (function () {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
    
            observer: (function () {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;
                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
                        else return undefined;
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
    
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                    }
                    catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
    
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
    
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
    
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }
                    else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
    
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
    
        return $;
    })();
    

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
    	if (window[swiperDomPlugins[i]]) {
    		addLibraryPlugin(window[swiperDomPlugins[i]]);
    	}
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
    	domLib = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
    	domLib = Dom7;
    }

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }
    
    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
    }

    window.Swiper = Swiper;
})();
/*===========================
Swiper AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.Swiper;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Swiper;
    });
}


/*
 *  Remodal - v1.1.0
 *  Responsive, lightweight, fast, synchronized with CSS animations, fully customizable modal window plugin with declarative configuration and hash tracking.
 *  http://vodkabears.github.io/remodal/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */

!(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function($) {
      return factory(root, $);
    });
  } else if (typeof exports === 'object') {
    factory(root, require('jquery'));
  } else {
    factory(root, root.jQuery || root.Zepto);
  }
})(this, function(global, $) {

  'use strict';

  /**
   * Name of the plugin
   * @private
   * @const
   * @type {String}
   */
  var PLUGIN_NAME = 'remodal';

  /**
   * Namespace for CSS and events
   * @private
   * @const
   * @type {String}
   */
  var NAMESPACE = global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.NAMESPACE || PLUGIN_NAME;

  /**
   * Animationstart event with vendor prefixes
   * @private
   * @const
   * @type {String}
   */
  var ANIMATIONSTART_EVENTS = $.map(
    ['animationstart', 'webkitAnimationStart', 'MSAnimationStart', 'oAnimationStart'],

    function(eventName) {
      return eventName + '.' + NAMESPACE;
    }

  ).join(' ');

  /**
   * Animationend event with vendor prefixes
   * @private
   * @const
   * @type {String}
   */
  var ANIMATIONEND_EVENTS = $.map(
    ['animationend', 'webkitAnimationEnd', 'MSAnimationEnd', 'oAnimationEnd'],

    function(eventName) {
      return eventName + '.' + NAMESPACE;
    }

  ).join(' ');

  /**
   * Default settings
   * @private
   * @const
   * @type {Object}
   */
  var DEFAULTS = $.extend({
    hashTracking: true,
    closeOnConfirm: true,
    closeOnCancel: true,
    closeOnEscape: true,
    closeOnOutsideClick: true,
    modifier: '',
    appendTo: null
  }, global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.DEFAULTS);

  /**
   * States of the Remodal
   * @private
   * @const
   * @enum {String}
   */
  var STATES = {
    CLOSING: 'closing',
    CLOSED: 'closed',
    OPENING: 'opening',
    OPENED: 'opened'
  };

  /**
   * Reasons of the state change.
   * @private
   * @const
   * @enum {String}
   */
  var STATE_CHANGE_REASONS = {
    CONFIRMATION: 'confirmation',
    CANCELLATION: 'cancellation'
  };

  /**
   * Is animation supported?
   * @private
   * @const
   * @type {Boolean}
   */
  var IS_ANIMATION = (function() {
    var style = document.createElement('div').style;

    return style.animationName !== undefined ||
      style.WebkitAnimationName !== undefined ||
      style.MozAnimationName !== undefined ||
      style.msAnimationName !== undefined ||
      style.OAnimationName !== undefined;
  })();

  /**
   * Is iOS?
   * @private
   * @const
   * @type {Boolean}
   */
  var IS_IOS = /iPad|iPhone|iPod/.test(navigator.platform);

  /**
   * Current modal
   * @private
   * @type {Remodal}
   */
  var current;

  /**
   * Scrollbar position
   * @private
   * @type {Number}
   */
  var scrollTop;

  /**
   * Returns an animation duration
   * @private
   * @param {jQuery} $elem
   * @returns {Number}
   */
  function getAnimationDuration($elem) {
    if (
      IS_ANIMATION &&
      $elem.css('animation-name') === 'none' &&
      $elem.css('-webkit-animation-name') === 'none' &&
      $elem.css('-moz-animation-name') === 'none' &&
      $elem.css('-o-animation-name') === 'none' &&
      $elem.css('-ms-animation-name') === 'none'
    ) {
      return 0;
    }

    var duration = $elem.css('animation-duration') ||
      $elem.css('-webkit-animation-duration') ||
      $elem.css('-moz-animation-duration') ||
      $elem.css('-o-animation-duration') ||
      $elem.css('-ms-animation-duration') ||
      '0s';

    var delay = $elem.css('animation-delay') ||
      $elem.css('-webkit-animation-delay') ||
      $elem.css('-moz-animation-delay') ||
      $elem.css('-o-animation-delay') ||
      $elem.css('-ms-animation-delay') ||
      '0s';

    var iterationCount = $elem.css('animation-iteration-count') ||
      $elem.css('-webkit-animation-iteration-count') ||
      $elem.css('-moz-animation-iteration-count') ||
      $elem.css('-o-animation-iteration-count') ||
      $elem.css('-ms-animation-iteration-count') ||
      '1';

    var max;
    var len;
    var num;
    var i;

    duration = duration.split(', ');
    delay = delay.split(', ');
    iterationCount = iterationCount.split(', ');

    // The 'duration' size is the same as the 'delay' size
    for (i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY; i < len; i++) {
      num = parseFloat(duration[i]) * parseInt(iterationCount[i], 10) + parseFloat(delay[i]);

      if (num > max) {
        max = num;
      }
    }

    return max;
  }

  /**
   * Returns a scrollbar width
   * @private
   * @returns {Number}
   */
  function getScrollbarWidth() {
    if ($(document.body).height() <= $(window).height()) {
      return 0;
    }

    var outer = document.createElement('div');
    var inner = document.createElement('div');
    var widthNoScroll;
    var widthWithScroll;

    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);

    widthNoScroll = outer.offsetWidth;

    // Force scrollbars
    outer.style.overflow = 'scroll';

    // Add inner div
    inner.style.width = '100%';
    outer.appendChild(inner);

    widthWithScroll = inner.offsetWidth;

    // Remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  /**
   * Locks the screen
   * @private
   */
  function lockScreen() {
    if (IS_IOS) {
      return;
    }

    var $html = $('html');
    var lockedClass = namespacify('is-locked');
    var paddingRight;
    var $body;

    if (!$html.hasClass(lockedClass)) {
      $body = $(document.body);

      // Zepto does not support '-=', '+=' in the `css` method
      paddingRight = parseInt($body.css('padding-right'), 10) + getScrollbarWidth();

      $body.css('padding-right', paddingRight + 'px');
      $html.addClass(lockedClass);
    }
  }

  /**
   * Unlocks the screen
   * @private
   */
  function unlockScreen() {
    if (IS_IOS) {
      return;
    }

    var $html = $('html');
    var lockedClass = namespacify('is-locked');
    var paddingRight;
    var $body;

    if ($html.hasClass(lockedClass)) {
      $body = $(document.body);

      // Zepto does not support '-=', '+=' in the `css` method
      paddingRight = parseInt($body.css('padding-right'), 10) - getScrollbarWidth();

      $body.css('padding-right', paddingRight + 'px');
      $html.removeClass(lockedClass);
    }
  }

  /**
   * Sets a state for an instance
   * @private
   * @param {Remodal} instance
   * @param {STATES} state
   * @param {Boolean} isSilent If true, Remodal does not trigger events
   * @param {String} Reason of a state change.
   */
  function setState(instance, state, isSilent, reason) {

    var newState = namespacify('is', state);
    var allStates = [namespacify('is', STATES.CLOSING),
                     namespacify('is', STATES.OPENING),
                     namespacify('is', STATES.CLOSED),
                     namespacify('is', STATES.OPENED)].join(' ');

    instance.$bg
      .removeClass(allStates)
      .addClass(newState);

    instance.$overlay
      .removeClass(allStates)
      .addClass(newState);

    instance.$wrapper
      .removeClass(allStates)
      .addClass(newState);

    instance.$modal
      .removeClass(allStates)
      .addClass(newState);

    instance.state = state;
    !isSilent && instance.$modal.trigger({
      type: state,
      reason: reason
    }, [{ reason: reason }]);
  }

  /**
   * Synchronizes with the animation
   * @param {Function} doBeforeAnimation
   * @param {Function} doAfterAnimation
   * @param {Remodal} instance
   */
  function syncWithAnimation(doBeforeAnimation, doAfterAnimation, instance) {
    var runningAnimationsCount = 0;

    var handleAnimationStart = function(e) {
      if (e.target !== this) {
        return;
      }

      runningAnimationsCount++;
    };

    var handleAnimationEnd = function(e) {
      if (e.target !== this) {
        return;
      }

      if (--runningAnimationsCount === 0) {

        // Remove event listeners
        $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
          instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
        });

        doAfterAnimation();
      }
    };

    $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
      instance[elemName]
        .on(ANIMATIONSTART_EVENTS, handleAnimationStart)
        .on(ANIMATIONEND_EVENTS, handleAnimationEnd);
    });

    doBeforeAnimation();

    // If the animation is not supported by a browser or its duration is 0
    if (
      getAnimationDuration(instance.$bg) === 0 &&
      getAnimationDuration(instance.$overlay) === 0 &&
      getAnimationDuration(instance.$wrapper) === 0 &&
      getAnimationDuration(instance.$modal) === 0
    ) {

      // Remove event listeners
      $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
        instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
      });

      doAfterAnimation();
    }
  }

  /**
   * Closes immediately
   * @private
   * @param {Remodal} instance
   */
  function halt(instance) {
    if (instance.state === STATES.CLOSED) {
      return;
    }

    $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
      instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
    });

    instance.$bg.removeClass(instance.settings.modifier);
    instance.$overlay.removeClass(instance.settings.modifier).hide();
    instance.$wrapper.hide();
    unlockScreen();
    setState(instance, STATES.CLOSED, true);
  }

  /**
   * Parses a string with options
   * @private
   * @param str
   * @returns {Object}
   */
  function parseOptions(str) {
    var obj = {};
    var arr;
    var len;
    var val;
    var i;

    // Remove spaces before and after delimiters
    str = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ',');

    // Parse a string
    arr = str.split(',');
    for (i = 0, len = arr.length; i < len; i++) {
      arr[i] = arr[i].split(':');
      val = arr[i][1];

      // Convert a string value if it is like a boolean
      if (typeof val === 'string' || val instanceof String) {
        val = val === 'true' || (val === 'false' ? false : val);
      }

      // Convert a string value if it is like a number
      if (typeof val === 'string' || val instanceof String) {
        val = !isNaN(val) ? +val : val;
      }

      obj[arr[i][0]] = val;
    }

    return obj;
  }

  /**
   * Generates a string separated by dashes and prefixed with NAMESPACE
   * @private
   * @param {...String}
   * @returns {String}
   */
  function namespacify() {
    var result = NAMESPACE;

    for (var i = 0; i < arguments.length; ++i) {
      result += '-' + arguments[i];
    }

    return result;
  }

  /**
   * Handles the hashchange event
   * @private
   * @listens hashchange
   */
  function handleHashChangeEvent() {
    var id = location.hash.replace('#', '');
    var instance;
    var $elem;

    if (!id) {

      // Check if we have currently opened modal and animation was completed
      if (current && current.state === STATES.OPENED && current.settings.hashTracking) {
        current.close();
      }
    } else {

      // Catch syntax error if your hash is bad
      try {
        $elem = $(
          '[data-' + PLUGIN_NAME + '-id="' + id + '"]'
        );
      } catch (err) {}

      if ($elem && $elem.length) {
        instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];

        if (instance && instance.settings.hashTracking) {
          instance.open();
        }
      }

    }
  }

  /**
   * Remodal constructor
   * @constructor
   * @param {jQuery} $modal
   * @param {Object} options
   */
  function Remodal($modal, options) {
    var $body = $(document.body);
    var $appendTo = $body;
    var remodal = this;

    remodal.settings = $.extend({}, DEFAULTS, options);
    remodal.index = $[PLUGIN_NAME].lookup.push(remodal) - 1;
    remodal.state = STATES.CLOSED;

    remodal.$overlay = $('.' + namespacify('overlay'));

    if (remodal.settings.appendTo !== null && remodal.settings.appendTo.length) {
      $appendTo = $(remodal.settings.appendTo);
    }

    if (!remodal.$overlay.length) {
      remodal.$overlay = $('<div>').addClass(namespacify('overlay') + ' ' + namespacify('is', STATES.CLOSED)).hide();
      $appendTo.append(remodal.$overlay);
    }

    remodal.$bg = $('.' + namespacify('bg')).addClass(namespacify('is', STATES.CLOSED));

    remodal.$modal = $modal
      .addClass(
        NAMESPACE + ' ' +
        namespacify('is-initialized') + ' ' +
        remodal.settings.modifier + ' ' +
        namespacify('is', STATES.CLOSED))
      .attr('tabindex', '-1');

    remodal.$wrapper = $('<div>')
      .addClass(
        namespacify('wrapper') + ' ' +
        remodal.settings.modifier + ' ' +
        namespacify('is', STATES.CLOSED))
      .hide()
      .append(remodal.$modal);
    $appendTo.append(remodal.$wrapper);

    // Add the event listener for the close button
    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="close"]', function(e) {
      e.preventDefault();

      remodal.close();
    });

    // Add the event listener for the cancel button
    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="cancel"]', function(e) {
      e.preventDefault();

      remodal.$modal.trigger(STATE_CHANGE_REASONS.CANCELLATION);

      if (remodal.settings.closeOnCancel) {
        remodal.close(STATE_CHANGE_REASONS.CANCELLATION);
      }
    });

    // Add the event listener for the confirm button
    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="confirm"]', function(e) {
      e.preventDefault();

      remodal.$modal.trigger(STATE_CHANGE_REASONS.CONFIRMATION);

      if (remodal.settings.closeOnConfirm) {
        remodal.close(STATE_CHANGE_REASONS.CONFIRMATION);
      }
    });

    // Add the event listener for the overlay
    remodal.$wrapper.on('click.' + NAMESPACE, function(e) {
      var $target = $(e.target);

      if (!$target.hasClass(namespacify('wrapper'))) {
        return;
      }

      if (remodal.settings.closeOnOutsideClick) {
        remodal.close();
      }
    });
  }

  /**
   * Opens a modal window
   * @public
   */
  Remodal.prototype.open = function() {
    var remodal = this;
    var id;

    // Check if the animation was completed
    if (remodal.state === STATES.OPENING || remodal.state === STATES.CLOSING) {
      return;
    }

    id = remodal.$modal.attr('data-' + PLUGIN_NAME + '-id');

    if (id && remodal.settings.hashTracking) {
      scrollTop = $(window).scrollTop();
      location.hash = id;
    }

    if (current && current !== remodal) {
      halt(current);
    }

    current = remodal;
    lockScreen();
    remodal.$bg.addClass(remodal.settings.modifier);
    remodal.$overlay.addClass(remodal.settings.modifier).show();
    remodal.$wrapper.show().scrollTop(0);
    remodal.$modal.focus();

    syncWithAnimation(
      function() {
        setState(remodal, STATES.OPENING);
      },

      function() {
        setState(remodal, STATES.OPENED);
      },

      remodal);
  };

  /**
   * Closes a modal window
   * @public
   * @param {String} reason
   */
  Remodal.prototype.close = function(reason) {
    var remodal = this;

    // Check if the animation was completed
    if (remodal.state === STATES.OPENING || remodal.state === STATES.CLOSING) {
      return;
    }

    if (
      remodal.settings.hashTracking &&
      remodal.$modal.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)
    ) {
      location.hash = '';
      $(window).scrollTop(scrollTop);
    }

    syncWithAnimation(
      function() {
        setState(remodal, STATES.CLOSING, false, reason);
      },

      function() {
        remodal.$bg.removeClass(remodal.settings.modifier);
        remodal.$overlay.removeClass(remodal.settings.modifier).hide();
        remodal.$wrapper.hide();
        unlockScreen();

        setState(remodal, STATES.CLOSED, false, reason);
      },

      remodal);
  };

  /**
   * Returns a current state of a modal
   * @public
   * @returns {STATES}
   */
  Remodal.prototype.getState = function() {
    return this.state;
  };

  /**
   * Destroys a modal
   * @public
   */
  Remodal.prototype.destroy = function() {
    var lookup = $[PLUGIN_NAME].lookup;
    var instanceCount;

    halt(this);
    this.$wrapper.remove();

    delete lookup[this.index];
    instanceCount = $.grep(lookup, function(instance) {
      return !!instance;
    }).length;

    if (instanceCount === 0) {
      this.$overlay.remove();
      this.$bg.removeClass(
        namespacify('is', STATES.CLOSING) + ' ' +
        namespacify('is', STATES.OPENING) + ' ' +
        namespacify('is', STATES.CLOSED) + ' ' +
        namespacify('is', STATES.OPENED));
    }
  };

  /**
   * Special plugin object for instances
   * @public
   * @type {Object}
   */
  $[PLUGIN_NAME] = {
    lookup: []
  };

  /**
   * Plugin constructor
   * @constructor
   * @param {Object} options
   * @returns {JQuery}
   */
  $.fn[PLUGIN_NAME] = function(opts) {
    var instance;
    var $elem;

    this.each(function(index, elem) {
      $elem = $(elem);

      if ($elem.data(PLUGIN_NAME) == null) {
        instance = new Remodal($elem, opts);
        $elem.data(PLUGIN_NAME, instance.index);

        if (
          instance.settings.hashTracking &&
          $elem.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)
        ) {
          instance.open();
        }
      } else {
        instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];
      }
    });

    return instance;
  };

  $(document).ready(function() {

    // data-remodal-target opens a modal window with the special Id
    $(document).on('click', '[data-' + PLUGIN_NAME + '-target]', function(e) {
      e.preventDefault();

      var elem = e.currentTarget;
      var id = elem.getAttribute('data-' + PLUGIN_NAME + '-target');
      var $target = $('[data-' + PLUGIN_NAME + '-id="' + id + '"]');

      $[PLUGIN_NAME].lookup[$target.data(PLUGIN_NAME)].open();
    });

    // Auto initialization of modal windows
    // They should have the 'remodal' class attribute
    // Also you can write the `data-remodal-options` attribute to pass params into the modal
    $(document).find('.' + NAMESPACE).each(function(i, container) {
      var $container = $(container);
      var options = $container.data(PLUGIN_NAME + '-options');

      if (!options) {
        options = {};
      } else if (typeof options === 'string' || options instanceof String) {
        options = parseOptions(options);
      }

      $container[PLUGIN_NAME](options);
    });

    // Handles the keydown event
    $(document).on('keydown.' + NAMESPACE, function(e) {
      if (current && current.settings.closeOnEscape && current.state === STATES.OPENED && e.keyCode === 27) {
        current.close();
      }
    });

    // Handles the hashchange event
    $(window).on('hashchange.' + NAMESPACE, handleHashChangeEvent);
  });
});

/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.7
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

/* http://james.padolsey.com/javascript/special-scroll-events-for-jquery/ */

(function(){
    
    var special = jQuery.event.special,
        uid1 = "D" + (+new Date()),
        uid2 = "D" + (+new Date() + 1);
        
    special.scrollstart = {
        setup: function() {
            
            var timer,
                handler =  function(evt) {
                    
                    var _self = this,
                        _args = arguments;
                    
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = "scrollstart";
                        jQuery.event.dispatch.apply(_self, _args);
                    }
                    
                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);
                    
                };
            
            jQuery(this).bind("scroll", handler).data(uid1, handler);
            
        },
        teardown: function(){
            jQuery(this).unbind( "scroll", jQuery(this).data(uid1) );
        }
    };
    
    special.scrollstop = {
        latency: 300,
        setup: function() {
            
            var timer,
                    handler = function(evt) {
                    
                    var _self = this,
                        _args = arguments;
                    
                    if (timer) {
                        clearTimeout(timer);
                    }
                    
                    timer = setTimeout( function(){
                        
                        timer = null;
                        evt.type = "scrollstop";
                        jQuery.event.dispatch.apply(_self, _args);
                        
                        
                    }, special.scrollstop.latency);
                    
                };
            
            jQuery(this).bind("scroll", handler).data(uid2, handler);
            
        },
        teardown: function() {
            jQuery(this).unbind( "scroll", jQuery(this).data(uid2) );
        }
    };
    
})();
/*!
 * Bootstrap v4.0.0-alpha.3 (http://getbootstrap.com)
 * Copyright 2011-2016 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
}(jQuery);


+function ($) {

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Util = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var _name in TransitionEndEvent) {
      if (el.style[_name] !== undefined) {
        return { end: TransitionEndEvent[_name] };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        /* eslint-disable no-bitwise */
        prefix += ~ ~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        /* eslint-enable no-bitwise */
      } while (document.getElementById(prefix));
      return prefix;
    },

    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },

    reflow: function reflow(element) {
      new Function('bs', 'return bs')(element.offsetHeight);
    },

    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },

    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },

    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = undefined;

          if (value && isElement(value)) {
            valueType = 'element';
          } else {
            valueType = toType(value);
          }

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    IN: 'in'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = (function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Alert, [{
      key: 'close',

      // public

      value: function close(element) {
        element = element || this._element;

        var rootElement = this._getRootElement(element);
        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_getRootElement',
      value: function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = $(selector)[0];
        }

        if (!parent) {
          parent = $(element).closest('.' + ClassName.ALERT)[0];
        }

        return parent;
      }
    }, {
      key: '_triggerCloseEvent',
      value: function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);

        $(element).trigger(closeEvent);
        return closeEvent;
      }
    }, {
      key: '_removeElement',
      value: function _removeElement(element) {
        $(element).removeClass(ClassName.IN);

        if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);
          return;
        }

        $(element).one(Util.TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: '_destroyElement',
      value: function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      }
    }, {
      key: '_handleDismiss',
      value: function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = (function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Button, [{
      key: 'toggle',

      // public

      value: function toggle() {
        var triggerChangeEvent = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(this._element).trigger('change');
            }

            input.focus();
          }
        } else {
          this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREVIOUS: 'prev'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'right',
    LEFT: 'left',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.next, .prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = (function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Carousel, [{
      key: 'next',

      // public

      value: function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      }
    }, {
      key: 'nextWhenVisible',
      value: function nextWhenVisible() {
        // Don't call next when the page isn't visible
        if (!document.hidden) {
          this.next();
        }
      }
    }, {
      key: 'prev',
      value: function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREVIOUS);
        }
      }
    }, {
      key: 'pause',
      value: function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      }
    }, {
      key: 'cycle',
      value: function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
        }
      }
    }, {
      key: 'to',
      value: function to(index) {
        var _this2 = this;

        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event.SLID, function () {
            return _this2.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

        this._slide(direction, this._items[index]);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $(this._element).off(EVENT_KEY);
        $.removeData(this._element, DATA_KEY);

        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        if (this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
        }

        if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
          $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
        }
      }
    }, {
      key: '_keydown',
      value: function _keydown(event) {
        event.preventDefault();

        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            this.prev();
            break;
          case ARROW_RIGHT_KEYCODE:
            this.next();
            break;
          default:
            return;
        }
      }
    }, {
      key: '_getItemIndex',
      value: function _getItemIndex(element) {
        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      }
    }, {
      key: '_getItemByDirection',
      value: function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREVIOUS;
        var activeIndex = this._getItemIndex(activeElement);
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREVIOUS ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;

        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      }
    }, {
      key: '_triggerSlideEvent',
      value: function _triggerSlideEvent(relatedTarget, directionalClassname) {
        var slideEvent = $.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: directionalClassname
        });

        $(this._element).trigger(slideEvent);

        return slideEvent;
      }
    }, {
      key: '_setActiveIndicatorElement',
      value: function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      }
    }, {
      key: '_slide',
      value: function _slide(direction, element) {
        var _this3 = this;

        var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var isCycling = Boolean(this._interval);

        var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: directionalClassName
        });

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

          $(nextElement).addClass(direction);

          Util.reflow(nextElement);

          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);

          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName).removeClass(direction);

            $(nextElement).addClass(ClassName.ACTIVE);

            $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

            _this3._isSliding = false;

            setTimeout(function () {
              return $(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $(activeElement).removeClass(ClassName.ACTIVE);
          $(nextElement).addClass(ClassName.ACTIVE);

          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data());

          if (typeof config === 'object') {
            $.extend(_config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (data[action] === undefined) {
              throw new Error('No method named "' + action + '"');
            }
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      }
    }, {
      key: '_dataApiClickHandler',
      value: function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = $.extend({}, $(target).data(), $(this).data());
        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    IN: 'in',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.panel > .in, .panel > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = (function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Collapse, [{
      key: 'toggle',

      // public

      value: function toggle() {
        if ($(this._element).hasClass(ClassName.IN)) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: 'show',
      value: function show() {
        var _this4 = this;

        if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var actives = undefined;
        var activesData = undefined;

        if (this._parent) {
          actives = $.makeArray($(Selector.ACTIVES));
          if (!actives.length) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).data(DATA_KEY);
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives), 'hide');
          if (!activesData) {
            $(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

        this._element.style[dimension] = 0;
        this._element.setAttribute('aria-expanded', true);

        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

          _this4._element.style[dimension] = '';

          _this4.setTransitioning(false);

          $(_this4._element).trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

        this._element.style[dimension] = this._element[scrollSize] + 'px';
      }
    }, {
      key: 'hide',
      value: function hide() {
        var _this5 = this;

        if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var startEvent = $.Event(Event.HIDE);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();
        var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

        this._element.style[dimension] = this._element[offsetDimension] + 'px';

        Util.reflow(this._element);

        $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

        this._element.setAttribute('aria-expanded', false);

        if (this._triggerArray.length) {
          $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this5.setTransitioning(false);
          $(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = 0;

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: 'setTransitioning',
      value: function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        config.toggle = Boolean(config.toggle); // coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_getDimension',
      value: function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      }
    }, {
      key: '_getParent',
      value: function _getParent() {
        var _this6 = this;

        var parent = $(this._config.parent)[0];
        var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

        $(parent).find(selector).each(function (i, element) {
          _this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });

        return parent;
      }
    }, {
      key: '_addAriaAndCollapsedClass',
      value: function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $(element).hasClass(ClassName.IN);
          element.setAttribute('aria-expanded', isOpen);

          if (triggerArray.length) {
            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }

      // static

    }], [{
      key: '_getTargetFromElement',
      value: function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? $(selector)[0] : null;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    OPEN: 'open'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = (function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Dropdown, [{
      key: 'toggle',

      // public

      value: function toggle() {
        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return false;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        Dropdown._clearMenus();

        if (isActive) {
          return false;
        }

        if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

          // if mobile we use a backdrop because click events don't delegate
          var dropdown = document.createElement('div');
          dropdown.className = ClassName.BACKDROP;
          $(dropdown).insertBefore(this);
          $(dropdown).on('click', Dropdown._clearMenus);
        }

        var relatedTarget = { relatedTarget: this };
        var showEvent = $.Event(Event.SHOW, relatedTarget);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return false;
        }

        this.focus();
        this.setAttribute('aria-expanded', 'true');

        $(parent).toggleClass(ClassName.OPEN);
        $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

        return false;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        $(this._element).on(Event.CLICK, this.toggle);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            $(this).data(DATA_KEY, data = new Dropdown(this));
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config].call(this);
          }
        });
      }
    }, {
      key: '_clearMenus',
      value: function _clearMenus(event) {
        if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
          return;
        }

        var backdrop = $(Selector.BACKDROP)[0];
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }

        var toggles = $.makeArray($(Selector.DATA_TOGGLE));

        for (var i = 0; i < toggles.length; i++) {
          var _parent = Dropdown._getParentFromElement(toggles[i]);
          var relatedTarget = { relatedTarget: toggles[i] };

          if (!$(_parent).hasClass(ClassName.OPEN)) {
            continue;
          }

          if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(_parent, event.target)) {
            continue;
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(_parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            continue;
          }

          toggles[i].setAttribute('aria-expanded', 'false');

          $(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
        }
      }
    }, {
      key: '_getParentFromElement',
      value: function _getParentFromElement(element) {
        var parent = undefined;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      }
    }, {
      key: '_dataApiKeydownHandler',
      value: function _dataApiKeydownHandler(event) {
        if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

          if (event.which === ESCAPE_KEYCODE) {
            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = $.makeArray($(Selector.VISIBLE_ITEMS));

        items = items.filter(function (item) {
          return item.offsetWidth || item.offsetHeight;
        });

        if (!items.length) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  })();

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = (function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Modal, [{
      key: 'toggle',

      // public

      value: function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
    }, {
      key: 'show',
      value: function show(relatedTarget) {
        var _this7 = this;

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });

        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();
        this._setScrollbar();

        $(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();
        this._setResizeEvent();

        $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $(_this7._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this7._element)) {
              _this7._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
      }
    }, {
      key: 'hide',
      value: function hide(event) {
        if (event) {
          event.preventDefault();
        }

        var hideEvent = $.Event(Event.HIDE);

        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;

        this._setEscapeEvent();
        this._setResizeEvent();

        $(document).off(Event.FOCUSIN);

        $(this._element).removeClass(ClassName.IN);

        $(this._element).off(Event.CLICK_DISMISS);
        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

          $(this._element).one(Util.TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          this._hideModal();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        $(window).off(EVENT_KEY);
        $(document).off(EVENT_KEY);
        $(this._element).off(EVENT_KEY);
        $(this._backdrop).off(EVENT_KEY);

        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._originalBodyPadding = null;
        this._scrollbarWidth = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_showElement',
      value: function _showElement(relatedTarget) {
        var _this8 = this;

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // don't move modals dom position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName.IN);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this8._config.focus) {
            _this8._element.focus();
          }
          $(_this8._element).trigger(shownEvent);
        };

        if (transition) {
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          transitionComplete();
        }
      }
    }, {
      key: '_enforceFocus',
      value: function _enforceFocus() {
        var _this9 = this;

        $(document).off(Event.FOCUSIN) // guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this9._element !== event.target && !$(_this9._element).has(event.target).length) {
            _this9._element.focus();
          }
        });
      }
    }, {
      key: '_setEscapeEvent',
      value: function _setEscapeEvent() {
        var _this10 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              _this10.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event.KEYDOWN_DISMISS);
        }
      }
    }, {
      key: '_setResizeEvent',
      value: function _setResizeEvent() {
        if (this._isShown) {
          $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
        } else {
          $(window).off(Event.RESIZE);
        }
      }
    }, {
      key: '_hideModal',
      value: function _hideModal() {
        var _this11 = this;

        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', 'true');
        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName.OPEN);
          _this11._resetAdjustments();
          _this11._resetScrollbar();
          $(_this11._element).trigger(Event.HIDDEN);
        });
      }
    }, {
      key: '_removeBackdrop',
      value: function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      }
    }, {
      key: '_showBackdrop',
      value: function _showBackdrop(callback) {
        var _this12 = this;

        var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          var doAnimate = Util.supportsTransitionEnd() && animate;

          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $(this._backdrop).addClass(animate);
          }

          $(this._backdrop).appendTo(document.body);

          $(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this12._ignoreBackdropClick) {
              _this12._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (_this12._config.backdrop === 'static') {
              _this12._element.focus();
            } else {
              _this12.hide();
            }
          });

          if (doAnimate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName.IN);

          if (!callback) {
            return;
          }

          if (!doAnimate) {
            callback();
            return;
          }

          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName.IN);

          var callbackRemove = function callbackRemove() {
            _this12._removeBackdrop();
            if (callback) {
              callback();
            }
          };

          if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }

      // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------

    }, {
      key: '_handleUpdate',
      value: function _handleUpdate() {
        this._adjustDialog();
      }
    }, {
      key: '_adjustDialog',
      value: function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + 'px';
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + 'px';
        }
      }
    }, {
      key: '_resetAdjustments',
      value: function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      }
    }, {
      key: '_checkScrollbar',
      value: function _checkScrollbar() {
        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      }
    }, {
      key: '_setScrollbar',
      value: function _setScrollbar() {
        var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

        this._originalBodyPadding = document.body.style.paddingRight || '';

        if (this._isBodyOverflowing) {
          document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
        }
      }
    }, {
      key: '_resetScrollbar',
      value: function _resetScrollbar() {
        document.body.style.paddingRight = this._originalBodyPadding;
      }
    }, {
      key: '_getScrollbarWidth',
      value: function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this13 = this;

    var target = undefined;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this13).is(':visible')) {
          _this13.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = (function () {
    function ScrollSpy(element, config) {
      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

      this.refresh();
      this._process();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(ScrollSpy, [{
      key: 'refresh',

      // public

      value: function refresh() {
        var _this14 = this;

        var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

        this._offsets = [];
        this._targets = [];

        this._scrollHeight = this._getScrollHeight();

        var targets = $.makeArray($(this._selector));

        targets.map(function (element) {
          var target = undefined;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = $(targetSelector)[0];
          }

          if (target && (target.offsetWidth || target.offsetHeight)) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this14._offsets.push(item[0]);
          _this14._targets.push(item[1]);
        });
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._scrollElement).off(EVENT_KEY);

        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);

        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');
          if (!id) {
            id = Util.getUID(NAME);
            $(config.target).attr('id', id);
          }
          config.target = '#' + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);

        return config;
      }
    }, {
      key: '_getScrollTop',
      value: function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
      }
    }, {
      key: '_getScrollHeight',
      value: function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }
    }, {
      key: '_process',
      value: function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;
        var scrollHeight = this._getScrollHeight();
        var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }
        }

        if (this._activeTarget && scrollTop < this._offsets[0]) {
          this._activeTarget = null;
          this._clear();
          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      }
    }, {
      key: '_activate',
      value: function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',');
        queries = queries.map(function (selector) {
          return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
        });

        var $link = $(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // todo (fat) this is kinda sus...
          // recursively add actives to tested nav-links
          $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      }
    }, {
      key: '_clear',
      value: function _clear() {
        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' && config || null;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  })();

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    UL: 'ul:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = (function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Tab, [{
      key: 'show',

      // public

      value: function show() {
        var _this15 = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
          return;
        }

        var target = undefined;
        var previous = undefined;
        var ulElement = $(this._element).closest(Selector.UL)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (ulElement) {
          previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(Event.HIDE, {
          relatedTarget: this._element
        });

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $(selector)[0];
        }

        this._activate(this._element, ulElement);

        var complete = function complete() {
          var hiddenEvent = $.Event(Event.HIDDEN, {
            relatedTarget: _this15._element
          });

          var shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: previous
          });

          $(previous).trigger(hiddenEvent);
          $(_this15._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeClass(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_activate',
      value: function _activate(element, container, callback) {
        var active = $(container).find(Selector.ACTIVE_CHILD)[0];
        var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

        var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

        if (active && isTransitioning) {
          $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        if (active) {
          $(active).removeClass(ClassName.IN);
        }
      }
    }, {
      key: '_transitionComplete',
      value: function _transitionComplete(element, active, isTransitioning, callback) {
        if (active) {
          $(active).removeClass(ClassName.ACTIVE);

          var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          active.setAttribute('aria-expanded', false);
        }

        $(element).addClass(ClassName.ACTIVE);
        element.setAttribute('aria-expanded', true);

        if (isTransitioning) {
          Util.reflow(element);
          $(element).addClass(ClassName.IN);
        } else {
          $(element).removeClass(ClassName.FADE);
        }

        if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

          var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
          if (dropdownElement) {
            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
})(jQuery);

/* global Tether */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = (function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://github.hubspot.com/tether/
   */
  // if (window.Tether === undefined) {
  //   throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');
  // }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: []
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    IN: 'in',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = (function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Tooltip, [{
      key: 'enable',

      // public

      value: function enable() {
        this._isEnabled = true;
      }
    }, {
      key: 'disable',
      value: function disable() {
        this._isEnabled = false;
      }
    }, {
      key: 'toggleEnabled',
      value: function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {

          if ($(this.getTipElement()).hasClass(ClassName.IN)) {
            this._leave(null, this);
            return;
          }

          this._enter(null, this);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        clearTimeout(this._timeout);

        this.cleanupTether();

        $.removeData(this.element, this.constructor.DATA_KEY);

        $(this.element).off(this.constructor.EVENT_KEY);

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
        this._tether = null;

        this.element = null;
        this.config = null;
        this.tip = null;
      }
    }, {
      key: 'show',
      value: function show() {
        var _this16 = this;

        var showEvent = $.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $(this.element).trigger(showEvent);

          var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);

          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);

          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

          $(this.element).trigger(this.constructor.Event.INSERTED);

          this._tether = new Tether({
            attachment: attachment,
            element: tip,
            target: this.element,
            classes: TetherClass,
            classPrefix: CLASS_PREFIX,
            offset: this.config.offset,
            constraints: this.config.constraints,
            addTargetClasses: false
          });

          Util.reflow(tip);
          this._tether.position();

          $(tip).addClass(ClassName.IN);

          var complete = function complete() {
            var prevHoverState = _this16._hoverState;
            _this16._hoverState = null;

            $(_this16.element).trigger(_this16.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this16._leave(null, _this16);
            }
          };

          if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
            return;
          }

          complete();
        }
      }
    }, {
      key: 'hide',
      value: function hide(callback) {
        var _this17 = this;

        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);
        var complete = function complete() {
          if (_this17._hoverState !== HoverState.IN && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this17.element.removeAttribute('aria-describedby');
          $(_this17.element).trigger(_this17.constructor.Event.HIDDEN);
          _this17.cleanupTether();

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName.IN);

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        this._hoverState = '';
      }

      // protected

    }, {
      key: 'isWithContent',
      value: function isWithContent() {
        return Boolean(this.getTitle());
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());

        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      }
    }, {
      key: 'setElementContent',
      value: function setElementContent($element, content) {
        var html = this.config.html;
        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // content is a DOM node or a jQuery
          if (html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      }
    }, {
      key: 'getTitle',
      value: function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }
    }, {
      key: 'cleanupTether',
      value: function cleanupTether() {
        if (this._tether) {
          this._tether.destroy();
        }
      }

      // private

    }, {
      key: '_getAttachment',
      value: function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this18 = this;

        var triggers = this.config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this18.element).on(_this18.constructor.Event.CLICK, _this18.config.selector, $.proxy(_this18.toggle, _this18));
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSEENTER : _this18.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSELEAVE : _this18.constructor.Event.FOCUSOUT;

            $(_this18.element).on(eventIn, _this18.config.selector, $.proxy(_this18._enter, _this18)).on(eventOut, _this18.config.selector, $.proxy(_this18._leave, _this18));
          }
        });

        if (this.config.selector) {
          this.config = $.extend({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      }
    }, {
      key: '_fixTitle',
      value: function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      }
    }, {
      key: '_enter',
      value: function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
          context._hoverState = HoverState.IN;
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.IN;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.IN) {
            context.show();
          }
        }, context.config.delay.show);
      }
    }, {
      key: '_leave',
      value: function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      }
    }, {
      key: '_isWithActiveTrigger',
      value: function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

        if (config.delay && typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      }
    }, {
      key: '_getDelegateConfig',
      value: function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  })();

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.3): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.3';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content',
    ARROW: '.popover-arrow'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = (function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Popover, [{
      key: 'isWithContent',

      // overrides

      value: function isWithContent() {
        return this.getTitle() || this._getContent();
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());

        // we use append for html objects to maintain js events
        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      }

      // private

    }, {
      key: '_getContent',
      value: function _getContent() {
        return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',

      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  })(Tooltip);

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
})(jQuery);

}(jQuery);
// imagesload
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

/*!
  Wookmark plugin
  @name wookmark.js
  @author Christoph Ono (chri@sto.ph or @gbks)
  @author Sebastian Helzle (me@helzle.it or @sebobo)
  @version 2.1.2
  @date 05/05/2016
  @category jQuery plugin
  @copyright (c) 2009-2016 Christoph Ono (www.wookmark.com)
  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
/*global define, window, jQuery*/
/*jslint plusplus: true, bitwise: true */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['window', 'document'], factory);
  } else {
    factory(window, document);
  }
}(function (window, document) {

  // Wookmark default options
  // ------------------------
  var defaultOptions = {
    align: 'center',
    autoResize: true,
    comparator: null,
    direction: undefined,
    ignoreInactiveItems: true,
    inactiveClass: 'wookmark-inactive',
    itemSelector: undefined,
    itemWidth: 0,
    fillEmptySpace: false,
    flexibleWidth: 0,
    offset: 5,
    outerOffset: 0,
    onLayoutChanged: undefined,
    placeholderClass: 'wookmark-placeholder',
    possibleFilters: [],
    resizeDelay: 50,
    verticalOffset: undefined
  };

  // Helper functions
  // ----------------

  // Bind function to set the context for the Wookmark instance function
  function __bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  }

  // Function for executing css writes to dom on the next animation frame if supported
  var executeNextFrame = window.requestAnimationFrame || function (callback) { callback(); };

  // Update multiple css values on an object
  function setCSS(el, properties) {
    var key;
    for (key in properties) {
      if (properties.hasOwnProperty(key)) {
        el.style[key] = properties[key];
      }
    }
  }

  // Update the css properties of multiple elements at the same time
  // befor the browsers next animation frame.
  // The parameter `data` has to be an array containing objects, each
  // with the element and the desired css properties.
  function bulkUpdateCSS(data, callback) {
    executeNextFrame(function () {
      var i, item;
      for (i = 0; i < data.length; i++) {
        item = data[i];
        setCSS(item.el, item.css);
      }
      // Run optional callback
      if (typeof callback === 'function') {
        executeNextFrame(callback);
      }
    });
  }

  // Remove whitespace around filter names
  function cleanFilterName(filterName) {
    return filterName.replace(/^\s+|\s+$/g, '').toLowerCase();
  }

  // Remove listener from an element (IE8 compatible)
  function removeEventListener(el, eventName, handler) {
    if (window.jQuery) {
      $(el).off(eventName, handler);
    } else if (el.removeEventListener) {
      el.removeEventListener(eventName, handler);
    } else {
      el.detachEvent('on' + eventName, handler);
    }
  }

  // Add listener to an element (IE8 compatible)
  function addEventListener(el, eventName, handler) {
    removeEventListener(el, eventName, handler);

    if (window.jQuery) {
      $(el).on(eventName, handler);
    } else if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function () {
        handler.call(el);
      });
    }
  }

  // Checks if element `el` is not visible in the browser
  function isHidden(el) {
    return el.offsetParent === null;
  }

  // Returns the elements height without margin
  function getHeight(el) {
    return el.offsetHeight;
  }

  // Returns the elements width without margin
  function getWidth(el) {
    return el.offsetWidth;
  }

  // Return true if element has class
  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    }
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }

  // Add class to element (IE8+)
  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }

  // Remove class from element (IE8+)
  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  // Get value of specified data attribute
  function getData(el, attr, isInt, prefix) {
    if (prefix === undefined) {
      prefix = 'wookmark-';
    }
    var val = el.getAttribute('data-' + prefix + attr);
    if (isInt === true) {
      return parseInt(val, 10);
    }
    return val;
  }

  // Set value of specified data attribute
  function setData(el, attr, val, prefix) {
    if (prefix === undefined) {
      prefix = 'wookmark-';
    }
    el.setAttribute('data-' + prefix + attr, val);
  }

  // Remove duplicates from given array
  function removeDuplicates(items) {
    var temp = {}, result = [], x, i = items.length;
    while (i--) {
      x = getData(items[i], 'id', true);
      if (!temp.hasOwnProperty(x)) {
        temp[x] = 1;
        result.push(items[i]);
      }
    }
    return result;
  }

  // Get the computed style from an element (IE 8 compatible)
  function getStyle(el, prop) {
    return window.getComputedStyle !== undefined ? window.getComputedStyle(el, null).getPropertyValue(prop) : el.currentStyle[prop];
  }


  // IE 8 compatible indexOf
  function indexOf(items, item) {
    var len = items.length, i;
    for (i = 0; i < len; i++) {
      if (items[i] === item) {
        return i;
      }
    }
    return -1;
  }

  // Main wookmark plugin class
  // --------------------------
  function Wookmark(container, options) {
    options = options || {};

    if (typeof container === 'string') {
      container = document.querySelector(container);
    }

    // Instance variables.
    this.container = container;
    this.columns = this.resizeTimer = null;
    this.activeItemCount = 0;
    this.placeholders = [];
    this.itemHeightsInitialized = false;
    this.itemHeightsDirty = false;
    this.elementTag = 'div';

    // Bind instance methods
    this.initItems = __bind(this.initItems, this);
    this.updateOptions = __bind(this.updateOptions, this);
    this.onResize = __bind(this.onResize, this);
    this.onRefresh = __bind(this.onRefresh, this);
    this.getItemWidth = __bind(this.getItemWidth, this);
    this.layout = __bind(this.layout, this);
    this.layoutFull = __bind(this.layoutFull, this);
    this.layoutColumns = __bind(this.layoutColumns, this);
    this.filter = __bind(this.filter, this);
    this.clear = __bind(this.clear, this);
    this.getActiveItems = __bind(this.getActiveItems, this);
    this.refreshPlaceholders = __bind(this.refreshPlaceholders, this);
    this.sortElements = __bind(this.sortElements, this);
    this.updateFilterClasses = __bind(this.updateFilterClasses, this);

    // Initialize children of the container
    this.initItems();

    // Initial update and layout
    this.container.style.display = 'block';
    this.updateOptions(options);

    // Collect filter classes after items have been initialized
    this.updateFilterClasses();

    // Listen to resize event of the browser if enabled
    if (this.autoResize) {
      addEventListener(window, 'resize', this.onResize);
    }

    // Listen to external refresh event
    addEventListener(this.container, 'refreshWookmark', this.onRefresh);
  }

  // Get all valid children of the container object and store them
  Wookmark.prototype.initItems = function () {
    // By select all children of the container if no selector is specified
    if (this.itemSelector === undefined) {
      var items = [], child, children = this.container.children,
          i = children.length;
      while (i--) {
        child = children[i];
        // Skip comment nodes on IE8
        if (child.nodeType !== 8) {
          // Show item
          child.style.display = '';
          setData(child, 'id', i);
          items.unshift(child);
        }
      }
      this.items = items;
    } else {
      this.items = this.container.querySelectorAll(this.itemSelector);
    }

    if (this.items.length) {
      this.elementTag = this.items[0].tagName;
    }
    this.itemHeightsDirty = true;
  };

  // Reload all filter classes from all items and cache them
  Wookmark.prototype.updateFilterClasses = function () {
    // Collect filter data
    var i = this.items.length, j, filterClasses = {}, itemFilterClasses,
      item, filterClass, possibleFilters = this.possibleFilters,
      k = possibleFilters.length, possibleFilter;

    while (i--) {
      item = this.items[i];

      // Read filter classes and globally store each filter class as object and the fitting items in the array
      itemFilterClasses = JSON.parse(getData(item, 'filter-class', false, ''));
      if (itemFilterClasses && typeof itemFilterClasses === 'object') {
        j = itemFilterClasses.length;
        while (j--) {
          filterClass = cleanFilterName(itemFilterClasses[j]);
          if (!filterClasses.hasOwnProperty(filterClass)) {
            filterClasses[filterClass] = [];
          }
          filterClasses[filterClass].push(item);
        }
      }
    }

    while (k--) {
      possibleFilter = cleanFilterName(possibleFilters[k]);
      if (!filterClasses.hasOwnProperty(possibleFilter)) {
        filterClasses[possibleFilter] = [];
      }
    }

    this.filterClasses = filterClasses;
  };

  // Method for updating the plugins options
  Wookmark.prototype.updateOptions = function (options) {
    var key;
    this.itemHeightsDirty = true;
    options = options || {};

    // Overwrite non existing instance variables with the ones from options or the defaults
    for (key in defaultOptions) {
      if (defaultOptions.hasOwnProperty(key)) {
        if (options.hasOwnProperty(key)) {
          this[key] = options[key];
        } else if (!this.hasOwnProperty(key)) {
          this[key] = defaultOptions[key];
        }
      }
    }

    // Vertical offset uses a fallback to offset
    this.verticalOffset = this.verticalOffset || this.offset;

    // Update layout so changes apply
    this.layout(true);
  };

  // This timer ensures that layout is not continuously called as window is being dragged.
  Wookmark.prototype.onResize = function () {
    clearTimeout(this.resizeTimer);
    this.itemHeightsDirty = this.flexibleWidth !== 0;
    this.resizeTimer = setTimeout(this.layout, this.resizeDelay);
  };

  // Marks the items heights as dirty and does a relayout
  Wookmark.prototype.onRefresh = function () {
    this.itemHeightsDirty = true;
    this.layout();
  };

  // Filters the active items with the given string filters.
  // @param filters array of string
  // @param mode 'or' or 'and'
  Wookmark.prototype.filter = function (filters, mode, dryRun) {
    var activeFilters = [], activeFiltersLength, activeItems = [],
      i, j, k, filter;

    filters = filters || [];
    mode = mode || 'or';
    dryRun = dryRun || false;

    if (filters.length) {
      // Collect active filters
      for (i = 0; i < filters.length; i++) {
        filter = cleanFilterName(filters[i]);
        if (this.filterClasses.hasOwnProperty(filter)) {
          activeFilters.push(this.filterClasses[filter]);
        }
      }

      // Get items for active filters with the selected mode
      i = activeFiltersLength = activeFilters.length;
      if (mode === 'or' || activeFiltersLength === 1) {
        // Set all items in all active filters active
        while (i--) {
          activeItems = activeItems.concat(activeFilters[i]);
        }
      } else if (mode === 'and') {
        var shortestFilter = activeFilters[0], itemValid = true,
          foundInFilter, currentItem, currentFilter;

        // Find shortest filter class
        while (i--) {
          if (activeFilters[i].length < shortestFilter.length) {
            shortestFilter = activeFilters[i];
          }
        }

        // Iterate over shortest filter and find elements in other filter classes
        shortestFilter = shortestFilter || [];
        i = shortestFilter.length;
        while (i--) {
          currentItem = shortestFilter[i];
          j = activeFiltersLength;
          itemValid = true;

          while (j-- && itemValid) {
            currentFilter = activeFilters[j];
            if (shortestFilter !== currentFilter) {
              // Search for current item in each active filter class
              foundInFilter = false;
              k = currentFilter.length;
              while (k-- && !foundInFilter) {
                foundInFilter = currentFilter[k] === currentItem;
              }
              itemValid &= foundInFilter;
            }
          }

          if (itemValid) {
            activeItems = activeItems.concat(shortestFilter[i]);
          }
        }
      }

      // Remove duplicates from active items
      if (activeFiltersLength > 1) {
        activeItems = removeDuplicates(activeItems);
      }

      // Hide inactive items
      if (!dryRun) {
        i = this.items.length;
        while (i--) {
          if (indexOf(activeItems, this.items[i]) === -1) {
            addClass(this.items[i], this.inactiveClass);
          }
        }
      }
    } else {
      // Show all items if no filter is selected
      activeItems = this.items;
    }

    // Show active items
    if (!dryRun) {
      i = activeItems.length;
      while (i--) {
        removeClass(activeItems[i], this.inactiveClass);
      }
      // Unset columns and refresh grid for a full layout
      this.columns = null;
      this.layout();
    }
    return activeItems;
  };

  // Creates or updates existing placeholders to create columns of even height
  Wookmark.prototype.refreshPlaceholders = function (columnWidth, sideOffset) {
    var i,
      containerHeight = getHeight(this.container),
      columnsLength = this.columns.length,
      column,
      height,
      innerOffset,
      lastColumnItem,
      placeholdersHtml = '',
      placeholder,
      top;

    // Add more placeholders if necessary
    if (this.placeholders.length < columnsLength) {
      for (i = 0; i < columnsLength - this.placeholders.length; i++) {
        placeholdersHtml += '<' + this.elementTag + ' class="' + this.placeholderClass + '"/>';
      }
      this.container.insertAdjacentHTML('beforeend', placeholdersHtml);
      this.placeholders = this.container.querySelectorAll('.' + this.placeholderClass);
    }

    innerOffset = (this.offset + parseInt(getStyle(this.placeholders[0], 'border-left-width'), 10) * 2) || 0;
    innerOffset += (parseInt(getStyle(this.placeholders[0], 'padding-left'), 10) * 2)  || 0;

    // Update each placeholder
    for (i = 0; i < this.placeholders.length; i++) {
      placeholder = this.placeholders[i];
      column = this.columns[i];

      if (i >= columnsLength || column.length === 0) {
        placeholder.style.display = 'none';
      } else {
        lastColumnItem = column[column.length - 1];
        top = getData(lastColumnItem, 'top', true) + getData(lastColumnItem, 'height', true) + this.verticalOffset;
        height = Math.max(0, containerHeight - top - innerOffset);

        setCSS(placeholder, {
          position: 'absolute',
          display: height > 0 ? 'block' : 'none',
          left: (i * columnWidth + sideOffset) + 'px',
          top: top + 'px',
          width: (columnWidth - innerOffset) + 'px',
          height: height + 'px'
        });
      }
    }
  };

  // Method the get active items which are not disabled and visible
  Wookmark.prototype.getActiveItems = function () {
    var inactiveClass = this.inactiveClass,
      i,
      result = [],
      item,
      items = this.items;

    if (this.ignoreInactiveItems) {
      for (i = 0; i < items.length; i++) {
        item = items[i];
        if (!hasClass(item, inactiveClass)) {
          result.push(item);
        }
      }
    } else {
      return items;
    }
    return result;
  };

  // Method to get the standard item width
  Wookmark.prototype.getItemWidth = function () {
    var itemWidth = this.itemWidth,
      innerWidth = getWidth(this.container) - 2 * this.outerOffset,
      flexibleWidth = this.flexibleWidth;

    if (typeof itemWidth === 'function') {
      itemWidth = this.itemWidth();
    }

    if (this.items.length > 0 && (itemWidth === undefined || (itemWidth === 0 && !this.flexibleWidth))) {
      itemWidth = getWidth(this.items[0]);
    } else if (typeof itemWidth === 'string' && itemWidth.indexOf('%') >= 0) {
      itemWidth = parseFloat(itemWidth) / 100 * innerWidth;
    }

    // Calculate flexible item width if option is set
    if (flexibleWidth) {
      if (typeof flexibleWidth === 'function') {
        flexibleWidth = flexibleWidth();
      }

      if (typeof flexibleWidth === 'string' && flexibleWidth.indexOf('%') >= 0) {
        flexibleWidth = parseFloat(flexibleWidth) / 100 * innerWidth;
      }

      // Find highest column count
      var paddedInnerWidth = (innerWidth + this.offset),
        flexibleColumns = Math.floor(0.5 + paddedInnerWidth / (flexibleWidth + this.offset)),
        fixedColumns = Math.floor(paddedInnerWidth / (itemWidth + this.offset)),
        columns = Math.max(flexibleColumns, fixedColumns),
        columnWidth = Math.min(flexibleWidth, Math.floor((innerWidth - (columns - 1) * this.offset) / columns));

      itemWidth = Math.max(itemWidth, columnWidth);
    }

    return itemWidth;
  };

  // Main layout method.
  Wookmark.prototype.layout = function (force, callback) {
    // Do nothing if container isn't visible
    if (!force && isHidden(this.container)) { return; }

    // Calculate basic layout parameters.
    var calculatedItemWidth = this.getItemWidth(),
      columnWidth = calculatedItemWidth + this.offset,
      containerWidth = getWidth(this.container),
      innerWidth = containerWidth - 2 * this.outerOffset,
      columns = Math.floor((innerWidth + this.offset) / columnWidth),
      offset,
      maxHeight = 0,
      activeItems = this.getActiveItems(),
      activeItemsLength = activeItems.length,
      item;

    // Cache item heights
    if (force || this.itemHeightsDirty || !this.itemHeightsInitialized) {
      for (var i = 0; i < activeItemsLength; i++) {
        item = activeItems[i];

        if (this.flexibleWidth) {
          // Stretch items to fill calculated width
          item.style.width = calculatedItemWidth + 'px';
        }
        setData(item, 'height', item.offsetHeight);
      }
      this.itemHeightsDirty = false;
      this.itemHeightsInitialized = true;
    }

    // Use less columns if there are to few items
    columns = Math.max(1, Math.min(columns, activeItemsLength));

    // Calculate the offset based on the alignment of columns to the parent container
    offset = this.outerOffset;
    if (this.align === 'center') {
      offset += Math.floor(0.5 + (innerWidth - (columns * columnWidth - this.offset)) >> 1);
    }

    // Get direction for positioning
    this.direction = this.direction || (this.align === 'right' ? 'right' : 'left');

    // If container and column count hasn't changed, we can only update the columns.
    if (!force && this.columns !== null && this.columns.length === columns && this.activeItemCount === activeItemsLength) {
      maxHeight = this.layoutColumns(columnWidth, offset);
    } else {
      maxHeight = this.layoutFull(columnWidth, columns, offset);
    }
    this.activeItemCount = activeItemsLength;

    // Set container height to height of the grid.
    this.container.style.height = maxHeight + 'px';

    // Update placeholders
    if (this.fillEmptySpace) {
      this.refreshPlaceholders(columnWidth, offset);
    }

    if (this.onLayoutChanged !== undefined && typeof this.onLayoutChanged === 'function') {
      this.onLayoutChanged();
    }

    // Run optional callback
    if (typeof callback === 'function') {
      callback();
    }
  };

  // Sort elements with configurable comparator
  Wookmark.prototype.sortElements = function (elements) {
    return typeof this.comparator === 'function' ? elements.sort(this.comparator) : elements;
  };

  // Perform a full layout update.
  Wookmark.prototype.layoutFull = function (columnWidth, columns, offset) {
    var item, k = 0, i = 0, activeItems, activeItemCount, shortest = null, shortestIndex = null,
        sideOffset, heights = [], itemBulkCSS = [], leftAligned = this.align === 'left', self = this;

    this.columns = [];

    // Sort elements before layouting
    activeItems = this.sortElements(this.getActiveItems());
    activeItemCount = activeItems.length;

    // Prepare arrays to store height of columns and items.
    while (heights.length < columns) {
      heights.push(this.outerOffset);
      this.columns.push([]);
    }

    // Loop over items.
    while (i < activeItemCount) {
      item = activeItems[i];

      // Find the shortest column.
      shortest = heights[0];
      shortestIndex = 0;
      for (k = 0; k < columns; k++) {
        if (heights[k] < shortest) {
          shortest = heights[k];
          shortestIndex = k;
        }
      }
      setData(item, 'top', shortest);

      // stick to left side if alignment is left and this is the first column
      sideOffset = offset;
      if (shortestIndex > 0 || !leftAligned) {
        sideOffset += shortestIndex * columnWidth;
      }

      // Position the item.
      itemBulkCSS[i] = {
        el: item,
        css: {
          position: 'absolute',
          top: shortest + 'px'
        }
      };
      itemBulkCSS[i].css[this.direction] = sideOffset + 'px';

      // Update column height and store item in shortest column
      heights[shortestIndex] += getData(item, 'height', true) + this.verticalOffset;
      this.columns[shortestIndex].push(item);
      i++;
    }

    // Update all css in the next frame and mark container as initalised
    bulkUpdateCSS(itemBulkCSS, function () {
      // Initialisation done
      if (!hasClass(self.container, 'wookmark-initialised')) {
        addClass(self.container, 'wookmark-initialised');
      }
    });

    // Return longest column
    return Math.max.apply(Math, heights);
  };

  // This layout method only updates the vertical position of the
  // existing column assignments.
  Wookmark.prototype.layoutColumns = function (columnWidth, offset) {
    var heights = [], itemBulkCSS = [], k = 0, j = 0,
      i = this.columns.length, currentHeight,
      column, item, sideOffset;

    while (i--) {
      currentHeight = this.outerOffset;
      heights.push(currentHeight);
      column = this.columns[i];
      sideOffset = i * columnWidth + offset;

      for (k = 0; k < column.length; k++, j++) {
        item = column[k];
        setData(item, 'top', currentHeight);
        itemBulkCSS[j] = {
          el: item,
          css: {
            top: currentHeight + 'px'
          }
        };
        itemBulkCSS[j].css[this.direction] = sideOffset + 'px';

        currentHeight += getData(item, 'height', true) + this.verticalOffset;
      }
      heights[i] = currentHeight;
    }

    bulkUpdateCSS(itemBulkCSS);

    // Return longest column
    return Math.max.apply(Math, heights);
  };

  // Clear event listeners and time outs and the instance itself
  Wookmark.prototype.clear = function () {
    clearTimeout(this.resizeTimer);
    var i = this.placeholders.length;
    while (i--) {
      this.container.removeChild(this.placeholders[i]);
    }
    removeEventListener(window, 'resize', this.onResize);
    removeEventListener(this.container, 'refreshWookmark', this.onRefresh);
  };

  // Register as jQuery plugin if jQuery is loaded
  if (window.jQuery !== undefined) {
    jQuery.fn.wookmark = function (options) {
      var i = this.length;

      // Use first element if container is an jQuery object
      if (options !== undefined && options.container instanceof jQuery) {
        options.container = options.container[0];
      }

      // Call plugin multiple times if there are multiple elements selected
      if (i > 1) {
        while (i--) {
          $(this).eq(i).wookmark(options);
        }
      } else if (i === 1) {
        // Create a wookmark instance or update an existing one
        if (!this.wookmarkInstance) {
          this.wookmarkInstance = new Wookmark(this[0], options || {});
        } else {
          this.wookmarkInstance.updateOptions(options || {});
        }
      }
      return this;
    };
  }

  window.Wookmark = Wookmark;
  return Wookmark;
}));

"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};/*!
 * jQuery JavaScript Library v1.6.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Jun 30 14:16:56 2011 -0400
 */(function(window,undefined){// Use the correct document accordingly with window argument (sandbox)
var document=window.document,navigator=window.navigator,location=window.location;var jQuery=function(){// Define a local copy of jQuery
var jQuery=function jQuery(selector,context){// The jQuery object is actually just the init constructor 'enhanced'
return new jQuery.fn.init(selector,context,rootjQuery);},// Map over jQuery in case of overwrite
_jQuery=window.jQuery,// Map over the $ in case of overwrite
_$=window.$,// A central reference to the root jQuery(document)
rootjQuery,// A simple way to check for HTML strings or ID strings
// (both of which we optimize for)
quickExpr=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,// Check if a string has a non-whitespace character in it
rnotwhite=/\S/,// Used for trimming whitespace
trimLeft=/^\s+/,trimRight=/\s+$/,// Check for digits
rdigit=/\d/,// Match a standalone tag
rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,// JSON RegExp
rvalidchars=/^[\],:{}\s]*$/,rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,// Useragent RegExp
rwebkit=/(webkit)[ \/]([\w.]+)/,ropera=/(opera)(?:.*version)?[ \/]([\w.]+)/,rmsie=/(msie) ([\w.]+)/,rmozilla=/(mozilla)(?:.*? rv:([\w.]+))?/,// Matches dashed string for camelizing
rdashAlpha=/-([a-z])/ig,// Used by jQuery.camelCase as callback to replace()
fcamelCase=function fcamelCase(all,letter){return letter.toUpperCase();},// Keep a UserAgent string for use with jQuery.browser
userAgent=navigator.userAgent,// For matching the engine and version of the browser
browserMatch,// The deferred used on DOM ready
readyList,// The ready event handler
_DOMContentLoaded2,// Save a reference to some core methods
toString=Object.prototype.toString,hasOwn=Object.prototype.hasOwnProperty,push=Array.prototype.push,_slice=Array.prototype.slice,trim=String.prototype.trim,indexOf=Array.prototype.indexOf,// [[Class]] -> type pairs
class2type={};jQuery.fn=jQuery.prototype={constructor:jQuery,init:function init(selector,context,rootjQuery){var match,elem,ret,doc;// Handle $(""), $(null), or $(undefined)
if(!selector){return this;}// Handle $(DOMElement)
if(selector.nodeType){this.context=this[0]=selector;this.length=1;return this;}// The body element only exists once, optimize finding it
if(selector==="body"&&!context&&document.body){this.context=document;this[0]=document.body;this.selector=selector;this.length=1;return this;}// Handle HTML strings
if(typeof selector==="string"){// Are we dealing with HTML string or an ID?
if(selector.charAt(0)==="<"&&selector.charAt(selector.length-1)===">"&&selector.length>=3){// Assume that strings that start and end with <> are HTML and skip the regex check
match=[null,selector,null];}else{match=quickExpr.exec(selector);}// Verify a match, and that no context was specified for #id
if(match&&(match[1]||!context)){// HANDLE: $(html) -> $(array)
if(match[1]){context=context instanceof jQuery?context[0]:context;doc=context?context.ownerDocument||context:document;// If a single string is passed in and it's a single tag
// just do a createElement and skip the rest
ret=rsingleTag.exec(selector);if(ret){if(jQuery.isPlainObject(context)){selector=[document.createElement(ret[1])];jQuery.fn.attr.call(selector,context,true);}else{selector=[doc.createElement(ret[1])];}}else{ret=jQuery.buildFragment([match[1]],[doc]);selector=(ret.cacheable?jQuery.clone(ret.fragment):ret.fragment).childNodes;}return jQuery.merge(this,selector);// HANDLE: $("#id")
}else{elem=document.getElementById(match[2]);// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
if(elem&&elem.parentNode){// Handle the case where IE and Opera return items
// by name instead of ID
if(elem.id!==match[2]){return rootjQuery.find(selector);}// Otherwise, we inject the element directly into the jQuery object
this.length=1;this[0]=elem;}this.context=document;this.selector=selector;return this;}// HANDLE: $(expr, $(...))
}else if(!context||context.jquery){return(context||rootjQuery).find(selector);// HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
}else{return this.constructor(context).find(selector);}// HANDLE: $(function)
// Shortcut for document ready
}else if(jQuery.isFunction(selector)){return rootjQuery.ready(selector);}if(selector.selector!==undefined){this.selector=selector.selector;this.context=selector.context;}return jQuery.makeArray(selector,this);},// Start with an empty selector
selector:"",// The current version of jQuery being used
jquery:"1.6.2",// The default length of a jQuery object is 0
length:0,// The number of elements contained in the matched element set
size:function size(){return this.length;},toArray:function toArray(){return _slice.call(this,0);},// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function get(num){return num==null?// Return a 'clean' array
this.toArray():// Return just the object
num<0?this[this.length+num]:this[num];},// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function pushStack(elems,name,selector){// Build a new jQuery matched element set
var ret=this.constructor();if(jQuery.isArray(elems)){push.apply(ret,elems);}else{jQuery.merge(ret,elems);}// Add the old object onto the stack (as a reference)
ret.prevObject=this;ret.context=this.context;if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector;}else if(name){ret.selector=this.selector+"."+name+"("+selector+")";}// Return the newly-formed element set
return ret;},// Execute a callback for every element in the matched set.
// (You can seed the arguments with an array of args, but this is
// only used internally.)
each:function each(callback,args){return jQuery.each(this,callback,args);},ready:function ready(fn){// Attach the listeners
jQuery.bindReady();// Add the callback
readyList.done(fn);return this;},eq:function eq(i){return i===-1?this.slice(i):this.slice(i,+i+1);},first:function first(){return this.eq(0);},last:function last(){return this.eq(-1);},slice:function slice(){return this.pushStack(_slice.apply(this,arguments),"slice",_slice.call(arguments).join(","));},map:function map(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},end:function end(){return this.prevObject||this.constructor(null);},// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:push,sort:[].sort,splice:[].splice};// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype=jQuery.fn;jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;// Handle a deep copy situation
if(typeof target==="boolean"){deep=target;target=arguments[1]||{};// skip the boolean and the target
i=2;}// Handle case when target is a string or something (possible in deep copy)
if((typeof target==="undefined"?"undefined":_typeof(target))!=="object"&&!jQuery.isFunction(target)){target={};}// extend jQuery itself if only one argument is passed
if(length===i){target=this;--i;}for(;i<length;i++){// Only deal with non-null/undefined values
if((options=arguments[i])!=null){// Extend the base object
for(name in options){src=target[name];copy=options[name];// Prevent never-ending loop
if(target===copy){continue;}// Recurse if we're merging plain objects or arrays
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&jQuery.isArray(src)?src:[];}else{clone=src&&jQuery.isPlainObject(src)?src:{};}// Never move original objects, clone them
target[name]=jQuery.extend(deep,clone,copy);// Don't bring in undefined values
}else if(copy!==undefined){target[name]=copy;}}}}// Return the modified object
return target;};jQuery.extend({noConflict:function noConflict(deep){if(window.$===jQuery){window.$=_$;}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}return jQuery;},// Is the DOM ready to be used? Set to true once it occurs.
isReady:false,// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1,// Hold (or release) the ready event
holdReady:function holdReady(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}},// Handle when the DOM is ready
ready:function ready(wait){// Either a released hold or an DOMready/load event and not yet ready
if(wait===true&&! --jQuery.readyWait||wait!==true&&!jQuery.isReady){// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
if(!document.body){return setTimeout(jQuery.ready,1);}// Remember that the DOM is ready
jQuery.isReady=true;// If a normal DOM Ready event fired, decrement, and wait if need be
if(wait!==true&&--jQuery.readyWait>0){return;}// If there are functions bound, to execute
readyList.resolveWith(document,[jQuery]);// Trigger any bound ready events
if(jQuery.fn.trigger){jQuery(document).trigger("ready").unbind("ready");}}},bindReady:function bindReady(){if(readyList){return;}readyList=jQuery._Deferred();// Catch cases where $(document).ready() is called after the
// browser event has already occurred.
if(document.readyState==="complete"){// Handle it asynchronously to allow scripts the opportunity to delay ready
return setTimeout(jQuery.ready,1);}// Mozilla, Opera and webkit nightlies currently support this event
if(document.addEventListener){// Use the handy event callback
document.addEventListener("DOMContentLoaded",_DOMContentLoaded2,false);// A fallback to window.onload, that will always work
window.addEventListener("load",jQuery.ready,false);// If IE event model is used
}else if(document.attachEvent){// ensure firing before onload,
// maybe late but safe also for iframes
document.attachEvent("onreadystatechange",_DOMContentLoaded2);// A fallback to window.onload, that will always work
window.attachEvent("onload",jQuery.ready);// If IE and not a frame
// continually check to see if the document is ready
var toplevel=false;try{toplevel=window.frameElement==null;}catch(e){}if(document.documentElement.doScroll&&toplevel){doScrollCheck();}}},// See test/unit/core.js for details concerning isFunction.
// Since version 1.3, DOM methods and functions like alert
// aren't supported. They return false on IE (#2968).
isFunction:function isFunction(obj){return jQuery.type(obj)==="function";},isArray:Array.isArray||function(obj){return jQuery.type(obj)==="array";},// A crude way of determining if an object is a window
isWindow:function isWindow(obj){return obj&&(typeof obj==="undefined"?"undefined":_typeof(obj))==="object"&&"setInterval"in obj;},isNaN:function(_isNaN){function isNaN(_x){return _isNaN.apply(this,arguments);}isNaN.toString=function(){return _isNaN.toString();};return isNaN;}(function(obj){return obj==null||!rdigit.test(obj)||isNaN(obj);}),type:function type(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object";},isPlainObject:function isPlainObject(obj){// Must be an Object.
// Because of IE, we also have to check the presence of the constructor property.
// Make sure that DOM nodes and window objects don't pass through, as well
if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false;}// Not own constructor property must be Object
if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false;}// Own properties are enumerated firstly, so to speed up,
// if last one is own, then all properties are own.
var key;for(key in obj){}return key===undefined||hasOwn.call(obj,key);},isEmptyObject:function isEmptyObject(obj){for(var name in obj){return false;}return true;},error:function error(msg){throw msg;},parseJSON:function parseJSON(data){if(typeof data!=="string"||!data){return null;}// Make sure leading/trailing whitespace is removed (IE can't handle it)
data=jQuery.trim(data);// Attempt to parse using the native JSON parser first
if(window.JSON&&window.JSON.parse){return window.JSON.parse(data);}// Make sure the incoming data is actual JSON
// Logic borrowed from http://json.org/json2.js
if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return new Function("return "+data)();}jQuery.error("Invalid JSON: "+data);},// Cross-browser xml parsing
// (xml & tmp used internally)
parseXML:function parseXML(data,xml,tmp){if(window.DOMParser){// Standard
tmp=new DOMParser();xml=tmp.parseFromString(data,"text/xml");}else{// IE
xml=new ActiveXObject("Microsoft.XMLDOM");xml.async="false";xml.loadXML(data);}tmp=xml.documentElement;if(!tmp||!tmp.nodeName||tmp.nodeName==="parsererror"){jQuery.error("Invalid XML: "+data);}return xml;},noop:function noop(){},// Evaluates a script in a global context
// Workarounds based on findings by Jim Driscoll
// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
globalEval:function globalEval(data){if(data&&rnotwhite.test(data)){// We use execScript on Internet Explorer
// We use an anonymous function so that context is window
// rather than jQuery in Firefox
(window.execScript||function(data){window["eval"].call(window,data);})(data);}},// Converts a dashed string to camelCased string;
// Used by both the css and data modules
camelCase:function camelCase(string){return string.replace(rdashAlpha,fcamelCase);},nodeName:function nodeName(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase();},// args is for internal usage only
each:function each(object,callback,args){var name,i=0,length=object.length,isObj=length===undefined||jQuery.isFunction(object);if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break;}}}else{for(;i<length;){if(callback.apply(object[i++],args)===false){break;}}}// A special, fast, case for the most common use of each
}else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break;}}}else{for(;i<length;){if(callback.call(object[i],i,object[i++])===false){break;}}}}return object;},// Use native String.trim function wherever possible
trim:trim?function(text){return text==null?"":trim.call(text);}:// Otherwise use our own trimming functionality
function(text){return text==null?"":text.toString().replace(trimLeft,"").replace(trimRight,"");},// results is for internal usage only
makeArray:function makeArray(array,results){var ret=results||[];if(array!=null){// The window, strings (and functions) also have 'length'
// The extra typeof function check is to prevent crashes
// in Safari 2 (See: #3039)
// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
var type=jQuery.type(array);if(array.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(array)){push.call(ret,array);}else{jQuery.merge(ret,array);}}return ret;},inArray:function inArray(elem,array){if(indexOf){return indexOf.call(array,elem);}for(var i=0,length=array.length;i<length;i++){if(array[i]===elem){return i;}}return-1;},merge:function merge(first,second){var i=first.length,j=0;if(typeof second.length==="number"){for(var l=second.length;j<l;j++){first[i++]=second[j];}}else{while(second[j]!==undefined){first[i++]=second[j++];}}first.length=i;return first;},grep:function grep(elems,callback,inv){var ret=[],retVal;inv=!!inv;// Go through the array, only saving the items
// that pass the validator function
for(var i=0,length=elems.length;i<length;i++){retVal=!!callback(elems[i],i);if(inv!==retVal){ret.push(elems[i]);}}return ret;},// arg is for internal usage only
map:function map(elems,callback,arg){var value,key,ret=[],i=0,length=elems.length,// jquery objects are treated as arrays
isArray=elems instanceof jQuery||length!==undefined&&typeof length==="number"&&(length>0&&elems[0]&&elems[length-1]||length===0||jQuery.isArray(elems));// Go through the array, translating each of the items to their
if(isArray){for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret[ret.length]=value;}}// Go through every key on the object,
}else{for(key in elems){value=callback(elems[key],key,arg);if(value!=null){ret[ret.length]=value;}}}// Flatten any nested arrays
return ret.concat.apply([],ret);},// A global GUID counter for objects
guid:1,// Bind a function to a context, optionally partially applying any
// arguments.
proxy:function proxy(fn,context){if(typeof context==="string"){var tmp=fn[context];context=fn;fn=tmp;}// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if(!jQuery.isFunction(fn)){return undefined;}// Simulated bind
var args=_slice.call(arguments,2),proxy=function proxy(){return fn.apply(context,args.concat(_slice.call(arguments)));};// Set the guid of unique handler to the same of original handler, so it can be removed
proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++;return proxy;},// Mutifunctional method to get and set values to a collection
// The value/s can optionally be executed if it's a function
access:function access(elems,key,value,exec,fn,pass){var length=elems.length;// Setting many attributes
if((typeof key==="undefined"?"undefined":_typeof(key))==="object"){for(var k in key){jQuery.access(elems,k,key[k],exec,fn,value);}return elems;}// Setting one attribute
if(value!==undefined){// Optionally, function values get executed if exec is true
exec=!pass&&exec&&jQuery.isFunction(value);for(var i=0;i<length;i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass);}return elems;}// Getting an attribute
return length?fn(elems[0],key):undefined;},now:function now(){return new Date().getTime();},// Use of jQuery.browser is frowned upon.
// More details: http://docs.jquery.com/Utilities/jQuery.browser
uaMatch:function uaMatch(ua){ua=ua.toLowerCase();var match=rwebkit.exec(ua)||ropera.exec(ua)||rmsie.exec(ua)||ua.indexOf("compatible")<0&&rmozilla.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"};},sub:function sub(){function jQuerySub(selector,context){return new jQuerySub.fn.init(selector,context);}jQuery.extend(true,jQuerySub,this);jQuerySub.superclass=this;jQuerySub.fn=jQuerySub.prototype=this();jQuerySub.fn.constructor=jQuerySub;jQuerySub.sub=this.sub;jQuerySub.fn.init=function init(selector,context){if(context&&context instanceof jQuery&&!(context instanceof jQuerySub)){context=jQuerySub(context);}return jQuery.fn.init.call(this,selector,context,rootjQuerySub);};jQuerySub.fn.init.prototype=jQuerySub.fn;var rootjQuerySub=jQuerySub(document);return jQuerySub;},browser:{}});// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase();});browserMatch=jQuery.uaMatch(userAgent);if(browserMatch.browser){jQuery.browser[browserMatch.browser]=true;jQuery.browser.version=browserMatch.version;}// Deprecated, use jQuery.browser.webkit instead
if(jQuery.browser.webkit){jQuery.browser.safari=true;}// IE doesn't match non-breaking spaces with \s
if(rnotwhite.test("\xA0")){trimLeft=/^[\s\xA0]+/;trimRight=/[\s\xA0]+$/;}// All jQuery objects should point back to these
rootjQuery=jQuery(document);// Cleanup functions for the document ready method
if(document.addEventListener){_DOMContentLoaded2=function DOMContentLoaded(){document.removeEventListener("DOMContentLoaded",_DOMContentLoaded2,false);jQuery.ready();};}else if(document.attachEvent){_DOMContentLoaded2=function _DOMContentLoaded(){// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
if(document.readyState==="complete"){document.detachEvent("onreadystatechange",_DOMContentLoaded2);jQuery.ready();}};}// The DOM ready check for Internet Explorer
function doScrollCheck(){if(jQuery.isReady){return;}try{// If IE is used, use the trick by Diego Perini
// http://javascript.nwbox.com/IEContentLoaded/
document.documentElement.doScroll("left");}catch(e){setTimeout(doScrollCheck,1);return;}// and execute any waiting functions
jQuery.ready();}return jQuery;}();var// Promise methods
promiseMethods="done fail isResolved isRejected promise then always pipe".split(" "),// Static reference to slice
sliceDeferred=[].slice;jQuery.extend({// Create a simple deferred (one callbacks list)
_Deferred:function _Deferred(){var// callbacks list
callbacks=[],// stored [ context , args ]
fired,// to avoid firing when already doing so
firing,// flag to know if the deferred has been cancelled
cancelled,// the deferred itself
deferred={// done( f1, f2, ...)
done:function done(){if(!cancelled){var args=arguments,i,length,elem,type,_fired;if(fired){_fired=fired;fired=0;}for(i=0,length=args.length;i<length;i++){elem=args[i];type=jQuery.type(elem);if(type==="array"){deferred.done.apply(deferred,elem);}else if(type==="function"){callbacks.push(elem);}}if(_fired){deferred.resolveWith(_fired[0],_fired[1]);}}return this;},// resolve with given context and args
resolveWith:function resolveWith(context,args){if(!cancelled&&!fired&&!firing){// make sure args are available (#8421)
args=args||[];firing=1;try{while(callbacks[0]){callbacks.shift().apply(context,args);}}finally{fired=[context,args];firing=0;}}return this;},// resolve with this as context and given arguments
resolve:function resolve(){deferred.resolveWith(this,arguments);return this;},// Has this deferred been resolved?
isResolved:function isResolved(){return!!(firing||fired);},// Cancel
cancel:function cancel(){cancelled=1;callbacks=[];return this;}};return deferred;},// Full fledged deferred (two callbacks list)
Deferred:function Deferred(func){var deferred=jQuery._Deferred(),failDeferred=jQuery._Deferred(),_promise;// Add errorDeferred methods, then and promise
jQuery.extend(deferred,{then:function then(doneCallbacks,failCallbacks){deferred.done(doneCallbacks).fail(failCallbacks);return this;},always:function always(){return deferred.done.apply(deferred,arguments).fail.apply(this,arguments);},fail:failDeferred.done,rejectWith:failDeferred.resolveWith,reject:failDeferred.resolve,isRejected:failDeferred.isResolved,pipe:function pipe(fnDone,fnFail){return jQuery.Deferred(function(newDefer){jQuery.each({done:[fnDone,"resolve"],fail:[fnFail,"reject"]},function(handler,data){var fn=data[0],action=data[1],returned;if(jQuery.isFunction(fn)){deferred[handler](function(){returned=fn.apply(this,arguments);if(returned&&jQuery.isFunction(returned.promise)){returned.promise().then(newDefer.resolve,newDefer.reject);}else{newDefer[action](returned);}});}else{deferred[handler](newDefer[action]);}});}).promise();},// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function promise(obj){if(obj==null){if(_promise){return _promise;}_promise=obj={};}var i=promiseMethods.length;while(i--){obj[promiseMethods[i]]=deferred[promiseMethods[i]];}return obj;}});// Make sure only one callback list will be used
deferred.done(failDeferred.cancel).fail(deferred.cancel);// Unexpose cancel
delete deferred.cancel;// Call given func if any
if(func){func.call(deferred,deferred);}return deferred;},// Deferred helper
when:function when(firstParam){var args=arguments,i=0,length=args.length,count=length,deferred=length<=1&&firstParam&&jQuery.isFunction(firstParam.promise)?firstParam:jQuery.Deferred();function resolveFunc(i){return function(value){args[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;if(! --count){// Strange bug in FF4:
// Values changed onto the arguments object sometimes end up as undefined values
// outside the $.when method. Cloning the object into a fresh array solves the issue
deferred.resolveWith(deferred,sliceDeferred.call(args,0));}};}if(length>1){for(;i<length;i++){if(args[i]&&jQuery.isFunction(args[i].promise)){args[i].promise().then(resolveFunc(i),deferred.reject);}else{--count;}}if(!count){deferred.resolveWith(deferred,args);}}else if(deferred!==firstParam){deferred.resolveWith(deferred,length?[firstParam]:[]);}return deferred.promise();}});jQuery.support=function(){var div=document.createElement("div"),documentElement=document.documentElement,all,a,select,opt,input,marginDiv,support,fragment,body,testElementParent,testElement,testElementStyle,tds,events,eventName,i,isSupported;// Preliminary tests
div.setAttribute("className","t");div.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";all=div.getElementsByTagName("*");a=div.getElementsByTagName("a")[0];// Can't get basic test support
if(!all||!all.length||!a){return{};}// First batch of supports tests
select=document.createElement("select");opt=select.appendChild(document.createElement("option"));input=div.getElementsByTagName("input")[0];support={// IE strips leading whitespace when .innerHTML is used
leadingWhitespace:div.firstChild.nodeType===3,// Make sure that tbody elements aren't automatically inserted
// IE will insert them into empty tables
tbody:!div.getElementsByTagName("tbody").length,// Make sure that link elements get serialized correctly by innerHTML
// This requires a wrapper element in IE
htmlSerialize:!!div.getElementsByTagName("link").length,// Get the style information from getAttribute
// (IE uses .cssText instead)
style:/top/.test(a.getAttribute("style")),// Make sure that URLs aren't manipulated
// (IE normalizes it by default)
hrefNormalized:a.getAttribute("href")==="/a",// Make sure that element opacity exists
// (IE uses filter instead)
// Use a regex to work around a WebKit issue. See #5145
opacity:/^0.55$/.test(a.style.opacity),// Verify style float existence
// (IE uses styleFloat instead of cssFloat)
cssFloat:!!a.style.cssFloat,// Make sure that if no value is specified for a checkbox
// that it defaults to "on".
// (WebKit defaults to "" instead)
checkOn:input.value==="on",// Make sure that a selected-by-default option has a working selected property.
// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
optSelected:opt.selected,// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
getSetAttribute:div.className!=="t",// Will be defined later
submitBubbles:true,changeBubbles:true,focusinBubbles:false,deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true};// Make sure checked status is properly cloned
input.checked=true;support.noCloneChecked=input.cloneNode(true).checked;// Make sure that the options inside disabled selects aren't marked as disabled
// (WebKit marks them as disabled)
select.disabled=true;support.optDisabled=!opt.disabled;// Test to see if it's possible to delete an expando from an element
// Fails in Internet Explorer
try{delete div.test;}catch(e){support.deleteExpando=false;}if(!div.addEventListener&&div.attachEvent&&div.fireEvent){div.attachEvent("onclick",function(){// Cloning a node shouldn't copy over any
// bound event handlers (IE does this)
support.noCloneEvent=false;});div.cloneNode(true).fireEvent("onclick");}// Check if a radio maintains it's value
// after being appended to the DOM
input=document.createElement("input");input.value="t";input.setAttribute("type","radio");support.radioValue=input.value==="t";input.setAttribute("checked","checked");div.appendChild(input);fragment=document.createDocumentFragment();fragment.appendChild(div.firstChild);// WebKit doesn't clone checked state correctly in fragments
support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;div.innerHTML="";// Figure out if the W3C box model works as expected
div.style.width=div.style.paddingLeft="1px";body=document.getElementsByTagName("body")[0];// We use our own, invisible, body unless the body is already present
// in which case we use a div (#9239)
testElement=document.createElement(body?"div":"body");testElementStyle={visibility:"hidden",width:0,height:0,border:0,margin:0};if(body){jQuery.extend(testElementStyle,{position:"absolute",left:-1000,top:-1000});}for(i in testElementStyle){testElement.style[i]=testElementStyle[i];}testElement.appendChild(div);testElementParent=body||documentElement;testElementParent.insertBefore(testElement,testElementParent.firstChild);// Check if a disconnected checkbox will retain its checked
// value of true after appended to the DOM (IE6/7)
support.appendChecked=input.checked;support.boxModel=div.offsetWidth===2;if("zoom"in div.style){// Check if natively block-level elements act like inline-block
// elements when setting their display to 'inline' and giving
// them layout
// (IE < 8 does this)
div.style.display="inline";div.style.zoom=1;support.inlineBlockNeedsLayout=div.offsetWidth===2;// Check if elements with layout shrink-wrap their children
// (IE 6 does this)
div.style.display="";div.innerHTML="<div style='width:4px;'></div>";support.shrinkWrapBlocks=div.offsetWidth!==2;}div.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";tds=div.getElementsByTagName("td");// Check if table cells still have offsetWidth/Height when they are set
// to display:none and there are still other visible table cells in a
// table row; if so, offsetWidth/Height are not reliable for use when
// determining if an element has been hidden directly using
// display:none (it is still safe to use offsets if a parent element is
// hidden; don safety goggles and see bug #4512 for more information).
// (only IE 8 fails this test)
isSupported=tds[0].offsetHeight===0;tds[0].style.display="";tds[1].style.display="none";// Check if empty table cells still have offsetWidth/Height
// (IE < 8 fail this test)
support.reliableHiddenOffsets=isSupported&&tds[0].offsetHeight===0;div.innerHTML="";// Check if div with explicit width and no margin-right incorrectly
// gets computed margin-right based on width of container. For more
// info see bug #3333
// Fails in WebKit before Feb 2011 nightlies
// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
if(document.defaultView&&document.defaultView.getComputedStyle){marginDiv=document.createElement("div");marginDiv.style.width="0";marginDiv.style.marginRight="0";div.appendChild(marginDiv);support.reliableMarginRight=(parseInt((document.defaultView.getComputedStyle(marginDiv,null)||{marginRight:0}).marginRight,10)||0)===0;}// Remove the body element we added
testElement.innerHTML="";testElementParent.removeChild(testElement);// Technique from Juriy Zaytsev
// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
// We only care about the case where non-standard event systems
// are used, namely in IE. Short-circuiting here helps us to
// avoid an eval call (in setAttribute) which can cause CSP
// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
if(div.attachEvent){for(i in{submit:1,change:1,focusin:1}){eventName="on"+i;isSupported=eventName in div;if(!isSupported){div.setAttribute(eventName,"return;");isSupported=typeof div[eventName]==="function";}support[i+"Bubbles"]=isSupported;}}// Null connected elements to avoid leaks in IE
testElement=fragment=select=opt=body=marginDiv=div=input=null;return support;}();// Keep track of boxModel
jQuery.boxModel=jQuery.support.boxModel;var rbrace=/^(?:\{.*\}|\[.*\])$/,rmultiDash=/([a-z])([A-Z])/g;jQuery.extend({cache:{},// Please use with caution
uuid:0,// Unique for each copy of jQuery on the page
// Non-digits removed to match rinlinejQuery
expando:"jQuery"+(jQuery.fn.jquery+Math.random()).replace(/\D/g,""),// The following elements throw uncatchable exceptions if you
// attempt to add expando properties to them.
noData:{"embed":true,// Ban all objects except for Flash (which handle expandos)
"object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000","applet":true},hasData:function hasData(elem){elem=elem.nodeType?jQuery.cache[elem[jQuery.expando]]:elem[jQuery.expando];return!!elem&&!isEmptyDataObject(elem);},data:function data(elem,name,_data,pvt/* Internal Use Only */){if(!jQuery.acceptData(elem)){return;}var internalKey=jQuery.expando,getByName=typeof name==="string",thisCache,// We have to handle DOM nodes and JS objects differently because IE6-7
// can't GC object references properly across the DOM-JS boundary
isNode=elem.nodeType,// Only DOM nodes need the global jQuery cache; JS object data is
// attached directly to the object so GC can occur automatically
cache=isNode?jQuery.cache:elem,// Only defining an ID for JS objects if its cache already exists allows
// the code to shortcut on the same path as a DOM node with no cache
id=isNode?elem[jQuery.expando]:elem[jQuery.expando]&&jQuery.expando;// Avoid doing any more work than we need to when trying to get data on an
// object that has no data at all
if((!id||pvt&&id&&!cache[id][internalKey])&&getByName&&_data===undefined){return;}if(!id){// Only DOM nodes need a new unique ID for each element since their data
// ends up in the global cache
if(isNode){elem[jQuery.expando]=id=++jQuery.uuid;}else{id=jQuery.expando;}}if(!cache[id]){cache[id]={};// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
// metadata on plain JS objects when the object is serialized using
// JSON.stringify
if(!isNode){cache[id].toJSON=jQuery.noop;}}// An object can be passed to jQuery.data instead of a key/value pair; this gets
// shallow copied over onto the existing cache
if((typeof name==="undefined"?"undefined":_typeof(name))==="object"||typeof name==="function"){if(pvt){cache[id][internalKey]=jQuery.extend(cache[id][internalKey],name);}else{cache[id]=jQuery.extend(cache[id],name);}}thisCache=cache[id];// Internal jQuery data is stored in a separate object inside the object's data
// cache in order to avoid key collisions between internal data and user-defined
// data
if(pvt){if(!thisCache[internalKey]){thisCache[internalKey]={};}thisCache=thisCache[internalKey];}if(_data!==undefined){thisCache[jQuery.camelCase(name)]=_data;}// TODO: This is a hack for 1.5 ONLY. It will be removed in 1.6. Users should
// not attempt to inspect the internal events object using jQuery.data, as this
// internal data object is undocumented and subject to change.
if(name==="events"&&!thisCache[name]){return thisCache[internalKey]&&thisCache[internalKey].events;}return getByName?// Check for both converted-to-camel and non-converted data property names
thisCache[jQuery.camelCase(name)]||thisCache[name]:thisCache;},removeData:function removeData(elem,name,pvt/* Internal Use Only */){if(!jQuery.acceptData(elem)){return;}var internalKey=jQuery.expando,isNode=elem.nodeType,// See jQuery.data for more information
cache=isNode?jQuery.cache:elem,// See jQuery.data for more information
id=isNode?elem[jQuery.expando]:jQuery.expando;// If there is already no cache entry for this object, there is no
// purpose in continuing
if(!cache[id]){return;}if(name){var thisCache=pvt?cache[id][internalKey]:cache[id];if(thisCache){delete thisCache[name];// If there is no data left in the cache, we want to continue
// and let the cache object itself get destroyed
if(!isEmptyDataObject(thisCache)){return;}}}// See jQuery.data for more information
if(pvt){delete cache[id][internalKey];// Don't destroy the parent cache unless the internal data object
// had been the only thing left in it
if(!isEmptyDataObject(cache[id])){return;}}var internalCache=cache[id][internalKey];// Browsers that fail expando deletion also refuse to delete expandos on
// the window, but it will allow it on all other JS objects; other browsers
// don't care
if(jQuery.support.deleteExpando||cache!=window){delete cache[id];}else{cache[id]=null;}// We destroyed the entire user cache at once because it's faster than
// iterating through each key, but we need to continue to persist internal
// data if it existed
if(internalCache){cache[id]={};// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
// metadata on plain JS objects when the object is serialized using
// JSON.stringify
if(!isNode){cache[id].toJSON=jQuery.noop;}cache[id][internalKey]=internalCache;// Otherwise, we need to eliminate the expando on the node to avoid
// false lookups in the cache for entries that no longer exist
}else if(isNode){// IE does not allow us to delete expando properties from nodes,
// nor does it have a removeAttribute function on Document nodes;
// we must handle all of these cases
if(jQuery.support.deleteExpando){delete elem[jQuery.expando];}else if(elem.removeAttribute){elem.removeAttribute(jQuery.expando);}else{elem[jQuery.expando]=null;}}},// For internal use only.
_data:function _data(elem,name,data){return jQuery.data(elem,name,data,true);},// A method for determining if a DOM node can handle the data expando
acceptData:function acceptData(elem){if(elem.nodeName){var match=jQuery.noData[elem.nodeName.toLowerCase()];if(match){return!(match===true||elem.getAttribute("classid")!==match);}}return true;}});jQuery.fn.extend({data:function data(key,value){var data=null;if(typeof key==="undefined"){if(this.length){data=jQuery.data(this[0]);if(this[0].nodeType===1){var attr=this[0].attributes,name;for(var i=0,l=attr.length;i<l;i++){name=attr[i].name;if(name.indexOf("data-")===0){name=jQuery.camelCase(name.substring(5));dataAttr(this[0],name,data[name]);}}}}return data;}else if((typeof key==="undefined"?"undefined":_typeof(key))==="object"){return this.each(function(){jQuery.data(this,key);});}var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);// Try to fetch any internally stored data first
if(data===undefined&&this.length){data=jQuery.data(this[0],key);data=dataAttr(this[0],key,data);}return data===undefined&&parts[1]?this.data(parts[0]):data;}else{return this.each(function(){var $this=jQuery(this),args=[parts[0],value];$this.triggerHandler("setData"+parts[1]+"!",args);jQuery.data(this,key,value);$this.triggerHandler("changeData"+parts[1]+"!",args);});}},removeData:function removeData(key){return this.each(function(){jQuery.removeData(this,key);});}});function dataAttr(elem,key,data){// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(data===undefined&&elem.nodeType===1){var name="data-"+key.replace(rmultiDash,"$1-$2").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:!jQuery.isNaN(data)?parseFloat(data):rbrace.test(data)?jQuery.parseJSON(data):data;}catch(e){}// Make sure we set the data so it isn't changed later
jQuery.data(elem,key,data);}else{data=undefined;}}return data;}// TODO: This is a hack for 1.5 ONLY to allow objects with a single toJSON
// property to be considered empty objects; this property always exists in
// order to make sure JSON.stringify does not expose internal metadata
function isEmptyDataObject(obj){for(var name in obj){if(name!=="toJSON"){return false;}}return true;}function handleQueueMarkDefer(elem,type,src){var deferDataKey=type+"defer",queueDataKey=type+"queue",markDataKey=type+"mark",defer=jQuery.data(elem,deferDataKey,undefined,true);if(defer&&(src==="queue"||!jQuery.data(elem,queueDataKey,undefined,true))&&(src==="mark"||!jQuery.data(elem,markDataKey,undefined,true))){// Give room for hard-coded callbacks to fire first
// and eventually mark/queue something else on the element
setTimeout(function(){if(!jQuery.data(elem,queueDataKey,undefined,true)&&!jQuery.data(elem,markDataKey,undefined,true)){jQuery.removeData(elem,deferDataKey,true);defer.resolve();}},0);}}jQuery.extend({_mark:function _mark(elem,type){if(elem){type=(type||"fx")+"mark";jQuery.data(elem,type,(jQuery.data(elem,type,undefined,true)||0)+1,true);}},_unmark:function _unmark(force,elem,type){if(force!==true){type=elem;elem=force;force=false;}if(elem){type=type||"fx";var key=type+"mark",count=force?0:(jQuery.data(elem,key,undefined,true)||1)-1;if(count){jQuery.data(elem,key,count,true);}else{jQuery.removeData(elem,key,true);handleQueueMarkDefer(elem,type,"mark");}}},queue:function queue(elem,type,data){if(elem){type=(type||"fx")+"queue";var q=jQuery.data(elem,type,undefined,true);// Speed up dequeue by getting out quickly if this is just a lookup
if(data){if(!q||jQuery.isArray(data)){q=jQuery.data(elem,type,jQuery.makeArray(data),true);}else{q.push(data);}}return q||[];}},dequeue:function dequeue(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),fn=queue.shift(),defer;// If the fx queue is dequeued, always remove the progress sentinel
if(fn==="inprogress"){fn=queue.shift();}if(fn){// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
if(type==="fx"){queue.unshift("inprogress");}fn.call(elem,function(){jQuery.dequeue(elem,type);});}if(!queue.length){jQuery.removeData(elem,type+"queue",true);handleQueueMarkDefer(elem,type,"queue");}}});jQuery.fn.extend({queue:function queue(type,data){if(typeof type!=="string"){data=type;type="fx";}if(data===undefined){return jQuery.queue(this[0],type);}return this.each(function(){var queue=jQuery.queue(this,type,data);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function dequeue(type){return this.each(function(){jQuery.dequeue(this,type);});},// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
delay:function delay(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(){var elem=this;setTimeout(function(){jQuery.dequeue(elem,type);},time);});},clearQueue:function clearQueue(type){return this.queue(type||"fx",[]);},// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function promise(type,object){if(typeof type!=="string"){object=type;type=undefined;}type=type||"fx";var defer=jQuery.Deferred(),elements=this,i=elements.length,count=1,deferDataKey=type+"defer",queueDataKey=type+"queue",markDataKey=type+"mark",tmp;function resolve(){if(! --count){defer.resolveWith(elements,[elements]);}}while(i--){if(tmp=jQuery.data(elements[i],deferDataKey,undefined,true)||(jQuery.data(elements[i],queueDataKey,undefined,true)||jQuery.data(elements[i],markDataKey,undefined,true))&&jQuery.data(elements[i],deferDataKey,jQuery._Deferred(),true)){count++;tmp.done(resolve);}}resolve();return defer.promise();}});var rclass=/[\n\t\r]/g,rspace=/\s+/,rreturn=/\r/g,rtype=/^(?:button|input)$/i,rfocusable=/^(?:button|input|object|select|textarea)$/i,rclickable=/^a(?:rea)?$/i,rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,rinvalidChar=/\:|^on/,formHook,boolHook;jQuery.fn.extend({attr:function attr(name,value){return jQuery.access(this,name,value,true,jQuery.attr);},removeAttr:function removeAttr(name){return this.each(function(){jQuery.removeAttr(this,name);});},prop:function prop(name,value){return jQuery.access(this,name,value,true,jQuery.prop);},removeProp:function removeProp(name){name=jQuery.propFix[name]||name;return this.each(function(){// try/catch handles cases where IE balks (such as removing a property on window)
try{this[name]=undefined;delete this[name];}catch(e){}});},addClass:function addClass(value){var classNames,i,l,elem,setClass,c,cl;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,this.className));});}if(value&&typeof value==="string"){classNames=value.split(rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1){if(!elem.className&&classNames.length===1){elem.className=value;}else{setClass=" "+elem.className+" ";for(c=0,cl=classNames.length;c<cl;c++){if(!~setClass.indexOf(" "+classNames[c]+" ")){setClass+=classNames[c]+" ";}}elem.className=jQuery.trim(setClass);}}}}return this;},removeClass:function removeClass(value){var classNames,i,l,elem,className,c,cl;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,this.className));});}if(value&&typeof value==="string"||value===undefined){classNames=(value||"").split(rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1&&elem.className){if(value){className=(" "+elem.className+" ").replace(rclass," ");for(c=0,cl=classNames.length;c<cl;c++){className=className.replace(" "+classNames[c]+" "," ");}elem.className=jQuery.trim(className);}else{elem.className="";}}}}return this;},toggleClass:function toggleClass(value,stateVal){var type=typeof value==="undefined"?"undefined":_typeof(value),isBool=typeof stateVal==="boolean";if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal);});}return this.each(function(){if(type==="string"){// toggle individual class names
var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(rspace);while(className=classNames[i++]){// check each className given, space seperated list
state=isBool?state:!self.hasClass(className);self[state?"addClass":"removeClass"](className);}}else if(type==="undefined"||type==="boolean"){if(this.className){// store className if set
jQuery._data(this,"__className__",this.className);}// toggle whole className
this.className=this.className||value===false?"":jQuery._data(this,"__className__")||"";}});},hasClass:function hasClass(selector){var className=" "+selector+" ";for(var i=0,l=this.length;i<l;i++){if((" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){return true;}}return false;},val:function val(value){var hooks,ret,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.nodeName.toLowerCase()]||jQuery.valHooks[elem.type];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}ret=elem.value;return typeof ret==="string"?// handle most common string cases
ret.replace(rreturn,""):// handle cases where value is null/undef or number
ret==null?"":ret;}return undefined;}var isFunction=jQuery.isFunction(value);return this.each(function(i){var self=jQuery(this),val;if(this.nodeType!==1){return;}if(isFunction){val=value.call(this,i,self.val());}else{val=value;}// Treat null/undefined as ""; convert numbers to string
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}hooks=jQuery.valHooks[this.nodeName.toLowerCase()]||jQuery.valHooks[this.type];// If set returns undefined, fall back to normal setting
if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function get(elem){// attributes.value is undefined in Blackberry 4.7 but
// uses .value. See #6932
var val=elem.attributes.value;return!val||val.specified?elem.value:elem.text;}},select:{get:function get(elem){var value,index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==="select-one";// Nothing was selected
if(index<0){return null;}// Loop through all the selected options
for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];// Don't return options that are disabled or in a disabled optgroup
if(option.selected&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){// Get the specific value for the option
value=jQuery(option).val();// We don't need an array for one selects
if(one){return value;}// Multi-Selects return an array
values.push(value);}}// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
if(one&&!values.length&&options.length){return jQuery(options[index]).val();}return values;},set:function set(elem,value){var values=jQuery.makeArray(value);jQuery(elem).find("option").each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0;});if(!values.length){elem.selectedIndex=-1;}return values;}}},attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attrFix:{// Always normalize to ensure hook usage
tabindex:"tabIndex"},attr:function attr(elem,name,value,pass){var nType=elem.nodeType;// don't get/set attributes on text, comment and attribute nodes
if(!elem||nType===3||nType===8||nType===2){return undefined;}if(pass&&name in jQuery.attrFn){return jQuery(elem)[name](value);}// Fallback to prop when attributes are not supported
if(!("getAttribute"in elem)){return jQuery.prop(elem,name,value);}var ret,hooks,notxml=nType!==1||!jQuery.isXMLDoc(elem);// Normalize the name if needed
if(notxml){name=jQuery.attrFix[name]||name;hooks=jQuery.attrHooks[name];if(!hooks){// Use boolHook for boolean attributes
if(rboolean.test(name)){hooks=boolHook;// Use formHook for forms and if the name contains certain characters
}else if(formHook&&name!=="className"&&(jQuery.nodeName(elem,"form")||rinvalidChar.test(name))){hooks=formHook;}}}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return undefined;}else if(hooks&&"set"in hooks&&notxml&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}else{elem.setAttribute(name,""+value);return value;}}else if(hooks&&"get"in hooks&&notxml&&(ret=hooks.get(elem,name))!==null){return ret;}else{ret=elem.getAttribute(name);// Non-existent attributes return null, we normalize to undefined
return ret===null?undefined:ret;}},removeAttr:function removeAttr(elem,name){var propName;if(elem.nodeType===1){name=jQuery.attrFix[name]||name;if(jQuery.support.getSetAttribute){// Use removeAttribute in browsers that support it
elem.removeAttribute(name);}else{jQuery.attr(elem,name,"");elem.removeAttributeNode(elem.getAttributeNode(name));}// Set corresponding property to false for boolean attributes
if(rboolean.test(name)&&(propName=jQuery.propFix[name]||name)in elem){elem[propName]=false;}}},attrHooks:{type:{set:function set(elem,value){// We can't allow the type property to be changed (since it causes problems in IE)
if(rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed");}else if(!jQuery.support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){// Setting the type on a radio button after the value resets the value in IE6-9
// Reset value to it's default in case type is set after value
// This is for element creation
var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}return value;}}},tabIndex:{get:function get(elem){// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
var attributeNode=elem.getAttributeNode("tabIndex");return attributeNode&&attributeNode.specified?parseInt(attributeNode.value,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined;}},// Use the value property for back compat
// Use the formHook for button elements in IE6/7 (#1954)
value:{get:function get(elem,name){if(formHook&&jQuery.nodeName(elem,"button")){return formHook.get(elem,name);}return name in elem?elem.value:null;},set:function set(elem,value,name){if(formHook&&jQuery.nodeName(elem,"button")){return formHook.set(elem,value,name);}// Does not return so that setAttribute is also used
elem.value=value;}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function prop(elem,name,value){var nType=elem.nodeType;// don't get/set properties on text, comment and attribute nodes
if(!elem||nType===3||nType===8||nType===2){return undefined;}var ret,hooks,notxml=nType!==1||!jQuery.isXMLDoc(elem);if(notxml){// Fix name and attach hooks
name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}if(value!==undefined){if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}else{return elem[name]=value;}}else{if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==undefined){return ret;}else{return elem[name];}}},propHooks:{}});// Hook for boolean attributes
boolHook={get:function get(elem,name){// Align boolean attributes with corresponding properties
return jQuery.prop(elem,name)?name.toLowerCase():undefined;},set:function set(elem,value,name){var propName;if(value===false){// Remove boolean attributes when set to false
jQuery.removeAttr(elem,name);}else{// value is true since we know at this point it's type boolean and not false
// Set boolean attributes to the same name and set the DOM property
propName=jQuery.propFix[name]||name;if(propName in elem){// Only set the IDL specifically if it already exists on the element
elem[propName]=true;}elem.setAttribute(name,name.toLowerCase());}return name;}};// IE6/7 do not support getting/setting some attributes with get/setAttribute
if(!jQuery.support.getSetAttribute){// propFix is more comprehensive and contains all fixes
jQuery.attrFix=jQuery.propFix;// Use this for any attribute on a form in IE6/7
formHook=jQuery.attrHooks.name=jQuery.attrHooks.title=jQuery.valHooks.button={get:function get(elem,name){var ret;ret=elem.getAttributeNode(name);// Return undefined if nodeValue is empty string
return ret&&ret.nodeValue!==""?ret.nodeValue:undefined;},set:function set(elem,value,name){// Check form objects in IE (multiple bugs related)
// Only use nodeValue if the attribute node exists on the form
var ret=elem.getAttributeNode(name);if(ret){ret.nodeValue=value;return value;}}};// Set width and height to auto instead of 0 on empty string( Bug #8150 )
// This is for removals
jQuery.each(["width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{set:function set(elem,value){if(value===""){elem.setAttribute(name,"auto");return value;}}});});}// Some attributes require a special call on IE
if(!jQuery.support.hrefNormalized){jQuery.each(["href","src","width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{get:function get(elem){var ret=elem.getAttribute(name,2);return ret===null?undefined:ret;}});});}if(!jQuery.support.style){jQuery.attrHooks.style={get:function get(elem){// Return undefined in the case of empty string
// Normalize to lowercase since IE uppercases css property names
return elem.style.cssText.toLowerCase()||undefined;},set:function set(elem,value){return elem.style.cssText=""+value;}};}// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if(!jQuery.support.optSelected){jQuery.propHooks.selected=jQuery.extend(jQuery.propHooks.selected,{get:function get(elem){var parent=elem.parentNode;if(parent){parent.selectedIndex;// Make sure that it also works with optgroups, see #5701
if(parent.parentNode){parent.parentNode.selectedIndex;}}}});}// Radios and checkboxes getter/setter
if(!jQuery.support.checkOn){jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={get:function get(elem){// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
return elem.getAttribute("value")===null?"on":elem.value;}};});}jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]=jQuery.extend(jQuery.valHooks[this],{set:function set(elem,value){if(jQuery.isArray(value)){return elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0;}}});});var rnamespaces=/\.(.*)$/,rformElems=/^(?:textarea|input|select)$/i,rperiod=/\./g,rspaces=/ /g,rescape=/[^\w\s.|`]/g,fcleanup=function fcleanup(nm){return nm.replace(rescape,"\\$&");};/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */jQuery.event={// Bind an event to an element
// Original by Dean Edwards
add:function add(elem,types,handler,data){if(elem.nodeType===3||elem.nodeType===8){return;}if(handler===false){handler=returnFalse;}else if(!handler){// Fixes bug #7229. Fix recommended by jdalton
return;}var handleObjIn,handleObj;if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;}// Make sure that the function being executed has a unique ID
if(!handler.guid){handler.guid=jQuery.guid++;}// Init the element's event structure
var elemData=jQuery._data(elem);// If no elemData is found then we must be trying to bind to one of the
// banned noData elements
if(!elemData){return;}var events=elemData.events,_eventHandle=elemData.handle;if(!events){elemData.events=events={};}if(!_eventHandle){elemData.handle=_eventHandle=function eventHandle(e){// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return typeof jQuery!=="undefined"&&(!e||jQuery.event.triggered!==e.type)?jQuery.event.handle.apply(_eventHandle.elem,arguments):undefined;};}// Add elem as a property of the handle function
// This is to prevent a memory leak with non-native events in IE.
_eventHandle.elem=elem;// Handle multiple events separated by a space
// jQuery(...).bind("mouseover mouseout", fn);
types=types.split(" ");var type,i=0,namespaces;while(type=types[i++]){handleObj=handleObjIn?jQuery.extend({},handleObjIn):{handler:handler,data:data};// Namespaced event handlers
if(type.indexOf(".")>-1){namespaces=type.split(".");type=namespaces.shift();handleObj.namespace=namespaces.slice(0).sort().join(".");}else{namespaces=[];handleObj.namespace="";}handleObj.type=type;if(!handleObj.guid){handleObj.guid=handler.guid;}// Get the current list of functions bound to this event
var handlers=events[type],special=jQuery.event.special[type]||{};// Init the event handler queue
if(!handlers){handlers=events[type]=[];// Check for a special event handler
// Only use addEventListener/attachEvent if the special
// events handler returns false
if(!special.setup||special.setup.call(elem,data,namespaces,_eventHandle)===false){// Bind the global event handler to the element
if(elem.addEventListener){elem.addEventListener(type,_eventHandle,false);}else if(elem.attachEvent){elem.attachEvent("on"+type,_eventHandle);}}}if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}// Add the function to the element's handler list
handlers.push(handleObj);// Keep track of which events have been used, for event optimization
jQuery.event.global[type]=true;}// Nullify elem to prevent memory leaks in IE
elem=null;},global:{},// Detach an event or set of events from an element
remove:function remove(elem,types,handler,pos){// don't do events on text and comment nodes
if(elem.nodeType===3||elem.nodeType===8){return;}if(handler===false){handler=returnFalse;}var ret,type,fn,j,i=0,all,namespaces,namespace,special,eventType,handleObj,origType,elemData=jQuery.hasData(elem)&&jQuery._data(elem),events=elemData&&elemData.events;if(!elemData||!events){return;}// types is actually an event object here
if(types&&types.type){handler=types.handler;types=types.type;}// Unbind all events for the element
if(!types||typeof types==="string"&&types.charAt(0)==="."){types=types||"";for(type in events){jQuery.event.remove(elem,type+types);}return;}// Handle multiple events separated by a space
// jQuery(...).unbind("mouseover mouseout", fn);
types=types.split(" ");while(type=types[i++]){origType=type;handleObj=null;all=type.indexOf(".")<0;namespaces=[];if(!all){// Namespaced event handlers
namespaces=type.split(".");type=namespaces.shift();namespace=new RegExp("(^|\\.)"+jQuery.map(namespaces.slice(0).sort(),fcleanup).join("\\.(?:.*\\.)?")+"(\\.|$)");}eventType=events[type];if(!eventType){continue;}if(!handler){for(j=0;j<eventType.length;j++){handleObj=eventType[j];if(all||namespace.test(handleObj.namespace)){jQuery.event.remove(elem,origType,handleObj.handler,j);eventType.splice(j--,1);}}continue;}special=jQuery.event.special[type]||{};for(j=pos||0;j<eventType.length;j++){handleObj=eventType[j];if(handler.guid===handleObj.guid){// remove the given handler for the given type
if(all||namespace.test(handleObj.namespace)){if(pos==null){eventType.splice(j--,1);}if(special.remove){special.remove.call(elem,handleObj);}}if(pos!=null){break;}}}// remove generic event handler if no more handlers exist
if(eventType.length===0||pos!=null&&eventType.length===1){if(!special.teardown||special.teardown.call(elem,namespaces)===false){jQuery.removeEvent(elem,type,elemData.handle);}ret=null;delete events[type];}}// Remove the expando if it's no longer used
if(jQuery.isEmptyObject(events)){var handle=elemData.handle;if(handle){handle.elem=null;}delete elemData.events;delete elemData.handle;if(jQuery.isEmptyObject(elemData)){jQuery.removeData(elem,undefined,true);}}},// Events that are safe to short-circuit if no handlers are attached.
// Native DOM events should not be added, they may have inline handlers.
customEvent:{"getData":true,"setData":true,"changeData":true},trigger:function trigger(event,data,elem,onlyHandlers){// Event object or event type
var type=event.type||event,namespaces=[],exclusive;if(type.indexOf("!")>=0){// Exclusive events trigger only for the exact event (no namespaces)
type=type.slice(0,-1);exclusive=true;}if(type.indexOf(".")>=0){// Namespaced trigger; create a regexp to match event type in handle()
namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}if((!elem||jQuery.event.customEvent[type])&&!jQuery.event.global[type]){// No jQuery handlers for this event type, and it can't have inline handlers
return;}// Caller can pass in an Event, Object, or just an event type string
event=(typeof event==="undefined"?"undefined":_typeof(event))==="object"?// jQuery.Event object
event[jQuery.expando]?event:// Object literal
new jQuery.Event(type,event):// Just the event type (string)
new jQuery.Event(type);event.type=type;event.exclusive=exclusive;event.namespace=namespaces.join(".");event.namespace_re=new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.)?")+"(\\.|$)");// triggerHandler() and global events don't bubble or run the default action
if(onlyHandlers||!elem){event.preventDefault();event.stopPropagation();}// Handle a global trigger
if(!elem){// TODO: Stop taunting the data cache; remove global events and always attach to document
jQuery.each(jQuery.cache,function(){// internalKey variable is just used to make it easier to find
// and potentially change this stuff later; currently it just
// points to jQuery.expando
var internalKey=jQuery.expando,internalCache=this[internalKey];if(internalCache&&internalCache.events&&internalCache.events[type]){jQuery.event.trigger(event,data,internalCache.handle.elem);}});return;}// Don't do events on text and comment nodes
if(elem.nodeType===3||elem.nodeType===8){return;}// Clean up the event in case it is being reused
event.result=undefined;event.target=elem;// Clone any incoming data and prepend the event, creating the handler arg list
data=data!=null?jQuery.makeArray(data):[];data.unshift(event);var cur=elem,// IE doesn't like method names with a colon (#3533, #8272)
ontype=type.indexOf(":")<0?"on"+type:"";// Fire event on the current element, then bubble up the DOM tree
do{var handle=jQuery._data(cur,"handle");event.currentTarget=cur;if(handle){handle.apply(cur,data);}// Trigger an inline bound script
if(ontype&&jQuery.acceptData(cur)&&cur[ontype]&&cur[ontype].apply(cur,data)===false){event.result=false;event.preventDefault();}// Bubble up to document, then to window
cur=cur.parentNode||cur.ownerDocument||cur===event.target.ownerDocument&&window;}while(cur&&!event.isPropagationStopped());// If nobody prevented the default action, do it now
if(!event.isDefaultPrevented()){var old,special=jQuery.event.special[type]||{};if((!special._default||special._default.call(elem.ownerDocument,event)===false)&&!(type==="click"&&jQuery.nodeName(elem,"a"))&&jQuery.acceptData(elem)){// Call a native DOM method on the target with the same name name as the event.
// Can't use an .isFunction)() check here because IE6/7 fails that test.
// IE<9 dies on focus to hidden element (#1486), may want to revisit a try/catch.
try{if(ontype&&elem[type]){// Don't re-trigger an onFOO event when we call its FOO() method
old=elem[ontype];if(old){elem[ontype]=null;}jQuery.event.triggered=type;elem[type]();}}catch(ieError){}if(old){elem[ontype]=old;}jQuery.event.triggered=undefined;}}return event.result;},handle:function handle(event){event=jQuery.event.fix(event||window.event);// Snapshot the handlers list since a called handler may add/remove events.
var handlers=((jQuery._data(this,"events")||{})[event.type]||[]).slice(0),run_all=!event.exclusive&&!event.namespace,args=Array.prototype.slice.call(arguments,0);// Use the fix-ed Event rather than the (read-only) native event
args[0]=event;event.currentTarget=this;for(var j=0,l=handlers.length;j<l;j++){var handleObj=handlers[j];// Triggered event must 1) be non-exclusive and have no namespace, or
// 2) have namespace(s) a subset or equal to those in the bound event.
if(run_all||event.namespace_re.test(handleObj.namespace)){// Pass in a reference to the handler function itself
// So that we can later remove it
event.handler=handleObj.handler;event.data=handleObj.data;event.handleObj=handleObj;var ret=handleObj.handler.apply(this,args);if(ret!==undefined){event.result=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}if(event.isImmediatePropagationStopped()){break;}}}return event.result;},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function fix(event){if(event[jQuery.expando]){return event;}// store a copy of the original event object
// and "clone" to set read-only properties
var originalEvent=event;event=jQuery.Event(originalEvent);for(var i=this.props.length,prop;i;){prop=this.props[--i];event[prop]=originalEvent[prop];}// Fix target property, if necessary
if(!event.target){// Fixes #1925 where srcElement might not be defined either
event.target=event.srcElement||document;}// check if target is a textnode (safari)
if(event.target.nodeType===3){event.target=event.target.parentNode;}// Add relatedTarget, if necessary
if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement===event.target?event.toElement:event.fromElement;}// Calculate pageX/Y if missing and clientX/Y available
if(event.pageX==null&&event.clientX!=null){var eventDocument=event.target.ownerDocument||document,doc=eventDocument.documentElement,body=eventDocument.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0);}// Add which for key events
if(event.which==null&&(event.charCode!=null||event.keyCode!=null)){event.which=event.charCode!=null?event.charCode:event.keyCode;}// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey;}// Add which for click: 1 === left; 2 === middle; 3 === right
// Note: button is not normalized, so don't use it
if(!event.which&&event.button!==undefined){event.which=event.button&1?1:event.button&2?3:event.button&4?2:0;}return event;},// Deprecated, use jQuery.guid instead
guid:1E8,// Deprecated, use jQuery.proxy instead
proxy:jQuery.proxy,special:{ready:{// Make sure the ready event is setup
setup:jQuery.bindReady,teardown:jQuery.noop},live:{add:function add(handleObj){jQuery.event.add(this,liveConvert(handleObj.origType,handleObj.selector),jQuery.extend({},handleObj,{handler:liveHandler,guid:handleObj.handler.guid}));},remove:function remove(handleObj){jQuery.event.remove(this,liveConvert(handleObj.origType,handleObj.selector),handleObj);}},beforeunload:{setup:function setup(data,namespaces,eventHandle){// We only want to do this special case on windows
if(jQuery.isWindow(this)){this.onbeforeunload=eventHandle;}},teardown:function teardown(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null;}}}}};jQuery.removeEvent=document.removeEventListener?function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false);}}:function(elem,type,handle){if(elem.detachEvent){elem.detachEvent("on"+type,handle);}};jQuery.Event=function(src,props){// Allow instantiation without the 'new' keyword
if(!this.preventDefault){return new jQuery.Event(src,props);}// Event object
if(src&&src.type){this.originalEvent=src;this.type=src.type;// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
this.isDefaultPrevented=src.defaultPrevented||src.returnValue===false||src.getPreventDefault&&src.getPreventDefault()?returnTrue:returnFalse;// Event type
}else{this.type=src;}// Put explicitly provided properties onto the event object
if(props){jQuery.extend(this,props);}// timeStamp is buggy for some events on Firefox(#3843)
// So we won't rely on the native value
this.timeStamp=jQuery.now();// Mark it as fixed
this[jQuery.expando]=true;};function returnFalse(){return false;}function returnTrue(){return true;}// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype={preventDefault:function preventDefault(){this.isDefaultPrevented=returnTrue;var e=this.originalEvent;if(!e){return;}// if preventDefault exists run it on the original event
if(e.preventDefault){e.preventDefault();// otherwise set the returnValue property of the original event to false (IE)
}else{e.returnValue=false;}},stopPropagation:function stopPropagation(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;if(!e){return;}// if stopPropagation exists run it on the original event
if(e.stopPropagation){e.stopPropagation();}// otherwise set the cancelBubble property of the original event to true (IE)
e.cancelBubble=true;},stopImmediatePropagation:function stopImmediatePropagation(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation();},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement=function withinElement(event){// Check if mouse(over|out) are still within the same parent element
var related=event.relatedTarget,inside=false,eventType=event.type;event.type=event.data;if(related!==this){if(related){inside=jQuery.contains(this,related);}if(!inside){jQuery.event.handle.apply(this,arguments);event.type=eventType;}}},// In case of event delegation, we only need to rename the event.type,
// liveHandler will take care of the rest.
delegate=function delegate(event){event.type=event.data;jQuery.event.handle.apply(this,arguments);};// Create mouseenter and mouseleave events
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={setup:function setup(data){jQuery.event.add(this,fix,data&&data.selector?delegate:withinElement,orig);},teardown:function teardown(data){jQuery.event.remove(this,fix,data&&data.selector?delegate:withinElement);}};});// submit delegation
if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function setup(data,namespaces){if(!jQuery.nodeName(this,"form")){jQuery.event.add(this,"click.specialSubmit",function(e){var elem=e.target,type=elem.type;if((type==="submit"||type==="image")&&jQuery(elem).closest("form").length){trigger("submit",this,arguments);}});jQuery.event.add(this,"keypress.specialSubmit",function(e){var elem=e.target,type=elem.type;if((type==="text"||type==="password")&&jQuery(elem).closest("form").length&&e.keyCode===13){trigger("submit",this,arguments);}});}else{return false;}},teardown:function teardown(namespaces){jQuery.event.remove(this,".specialSubmit");}};}// change delegation, happens here so we have bind.
if(!jQuery.support.changeBubbles){var changeFilters,getVal=function getVal(elem){var type=elem.type,val=elem.value;if(type==="radio"||type==="checkbox"){val=elem.checked;}else if(type==="select-multiple"){val=elem.selectedIndex>-1?jQuery.map(elem.options,function(elem){return elem.selected;}).join("-"):"";}else if(jQuery.nodeName(elem,"select")){val=elem.selectedIndex;}return val;},testChange=function testChange(e){var elem=e.target,data,val;if(!rformElems.test(elem.nodeName)||elem.readOnly){return;}data=jQuery._data(elem,"_change_data");val=getVal(elem);// the current data will be also retrieved by beforeactivate
if(e.type!=="focusout"||elem.type!=="radio"){jQuery._data(elem,"_change_data",val);}if(data===undefined||val===data){return;}if(data!=null||val){e.type="change";e.liveFired=undefined;jQuery.event.trigger(e,arguments[1],elem);}};jQuery.event.special.change={filters:{focusout:testChange,beforedeactivate:testChange,click:function click(e){var elem=e.target,type=jQuery.nodeName(elem,"input")?elem.type:"";if(type==="radio"||type==="checkbox"||jQuery.nodeName(elem,"select")){testChange.call(this,e);}},// Change has to be called before submit
// Keydown will be called before keypress, which is used in submit-event delegation
keydown:function keydown(e){var elem=e.target,type=jQuery.nodeName(elem,"input")?elem.type:"";if(e.keyCode===13&&!jQuery.nodeName(elem,"textarea")||e.keyCode===32&&(type==="checkbox"||type==="radio")||type==="select-multiple"){testChange.call(this,e);}},// Beforeactivate happens also before the previous element is blurred
// with this event you can't trigger a change event, but you can store
// information
beforeactivate:function beforeactivate(e){var elem=e.target;jQuery._data(elem,"_change_data",getVal(elem));}},setup:function setup(data,namespaces){if(this.type==="file"){return false;}for(var type in changeFilters){jQuery.event.add(this,type+".specialChange",changeFilters[type]);}return rformElems.test(this.nodeName);},teardown:function teardown(namespaces){jQuery.event.remove(this,".specialChange");return rformElems.test(this.nodeName);}};changeFilters=jQuery.event.special.change.filters;// Handle when the input is .focus()'d
changeFilters.focus=changeFilters.beforeactivate;}function trigger(type,elem,args){// Piggyback on a donor event to simulate a different one.
// Fake originalEvent to avoid donor's stopPropagation, but if the
// simulated event prevents default then we do the same on the donor.
// Don't pass args or remember liveFired; they apply to the donor event.
var event=jQuery.extend({},args[0]);event.type=type;event.originalEvent={};event.liveFired=undefined;jQuery.event.handle.call(elem,event);if(event.isDefaultPrevented()){args[0].preventDefault();}}// Create "bubbling" focus and blur events
if(!jQuery.support.focusinBubbles){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){// Attach a single capturing handler while someone wants focusin/focusout
var attaches=0;jQuery.event.special[fix]={setup:function setup(){if(attaches++===0){document.addEventListener(orig,handler,true);}},teardown:function teardown(){if(--attaches===0){document.removeEventListener(orig,handler,true);}}};function handler(donor){// Donor event is always a native one; fix it and switch its type.
// Let focusin/out handler cancel the donor focus/blur event.
var e=jQuery.event.fix(donor);e.type=fix;e.originalEvent={};jQuery.event.trigger(e,null,e.target);if(e.isDefaultPrevented()){donor.preventDefault();}}});}jQuery.each(["bind","one"],function(i,name){jQuery.fn[name]=function(type,data,fn){var _handler;// Handle object literals
if((typeof type==="undefined"?"undefined":_typeof(type))==="object"){for(var key in type){this[name](key,data,type[key],fn);}return this;}if(arguments.length===2||data===false){fn=data;data=undefined;}if(name==="one"){_handler=function handler(event){jQuery(this).unbind(event,_handler);return fn.apply(this,arguments);};_handler.guid=fn.guid||jQuery.guid++;}else{_handler=fn;}if(type==="unload"&&name!=="one"){this.one(type,data,fn);}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.add(this[i],type,_handler,data);}}return this;};});jQuery.fn.extend({unbind:function unbind(type,fn){// Handle object literals
if((typeof type==="undefined"?"undefined":_typeof(type))==="object"&&!type.preventDefault){for(var key in type){this.unbind(key,type[key]);}}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.remove(this[i],type,fn);}}return this;},delegate:function delegate(selector,types,data,fn){return this.live(types,data,fn,selector);},undelegate:function undelegate(selector,types,fn){if(arguments.length===0){return this.unbind("live");}else{return this.die(types,null,fn,selector);}},trigger:function trigger(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function triggerHandler(type,data){if(this[0]){return jQuery.event.trigger(type,data,this[0],true);}},toggle:function toggle(fn){// Save reference to arguments for access in closure
var args=arguments,guid=fn.guid||jQuery.guid++,i=0,toggler=function toggler(event){// Figure out which function to execute
var lastToggle=(jQuery.data(this,"lastToggle"+fn.guid)||0)%i;jQuery.data(this,"lastToggle"+fn.guid,lastToggle+1);// Make sure that clicks stop
event.preventDefault();// and execute the function
return args[lastToggle].apply(this,arguments)||false;};// link all the functions, so any of them can unbind this click handler
toggler.guid=guid;while(i<args.length){args[i++].guid=guid;}return this.click(toggler);},hover:function hover(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});var liveMap={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};jQuery.each(["live","die"],function(i,name){jQuery.fn[name]=function(types,data,fn,origSelector/* Internal Use Only */){var type,i=0,match,namespaces,preType,selector=origSelector||this.selector,context=origSelector?this:jQuery(this.context);if((typeof types==="undefined"?"undefined":_typeof(types))==="object"&&!types.preventDefault){for(var key in types){context[name](key,data,types[key],selector);}return this;}if(name==="die"&&!types&&origSelector&&origSelector.charAt(0)==="."){context.unbind(origSelector);return this;}if(data===false||jQuery.isFunction(data)){fn=data||returnFalse;data=undefined;}types=(types||"").split(" ");while((type=types[i++])!=null){match=rnamespaces.exec(type);namespaces="";if(match){namespaces=match[0];type=type.replace(rnamespaces,"");}if(type==="hover"){types.push("mouseenter"+namespaces,"mouseleave"+namespaces);continue;}preType=type;if(liveMap[type]){types.push(liveMap[type]+namespaces);type=type+namespaces;}else{type=(liveMap[type]||type)+namespaces;}if(name==="live"){// bind live handler
for(var j=0,l=context.length;j<l;j++){jQuery.event.add(context[j],"live."+liveConvert(type,selector),{data:data,selector:selector,handler:fn,origType:type,origHandler:fn,preType:preType});}}else{// unbind live handler
context.unbind("live."+liveConvert(type,selector),fn);}}return this;};});function liveHandler(event){var stop,maxLevel,related,match,handleObj,elem,j,i,l,data,close,namespace,ret,elems=[],selectors=[],events=jQuery._data(this,"events");// Make sure we avoid non-left-click bubbling in Firefox (#3861) and disabled elements in IE (#6911)
if(event.liveFired===this||!events||!events.live||event.target.disabled||event.button&&event.type==="click"){return;}if(event.namespace){namespace=new RegExp("(^|\\.)"+event.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)");}event.liveFired=this;var live=events.live.slice(0);for(j=0;j<live.length;j++){handleObj=live[j];if(handleObj.origType.replace(rnamespaces,"")===event.type){selectors.push(handleObj.selector);}else{live.splice(j--,1);}}match=jQuery(event.target).closest(selectors,event.currentTarget);for(i=0,l=match.length;i<l;i++){close=match[i];for(j=0;j<live.length;j++){handleObj=live[j];if(close.selector===handleObj.selector&&(!namespace||namespace.test(handleObj.namespace))&&!close.elem.disabled){elem=close.elem;related=null;// Those two events require additional checking
if(handleObj.preType==="mouseenter"||handleObj.preType==="mouseleave"){event.type=handleObj.preType;related=jQuery(event.relatedTarget).closest(handleObj.selector)[0];// Make sure not to accidentally match a child element with the same selector
if(related&&jQuery.contains(elem,related)){related=elem;}}if(!related||related!==elem){elems.push({elem:elem,handleObj:handleObj,level:close.level});}}}}for(i=0,l=elems.length;i<l;i++){match=elems[i];if(maxLevel&&match.level>maxLevel){break;}event.currentTarget=match.elem;event.data=match.handleObj.data;event.handleObj=match.handleObj;ret=match.handleObj.origHandler.apply(match.elem,arguments);if(ret===false||event.isPropagationStopped()){maxLevel=match.level;if(ret===false){stop=false;}if(event.isImmediatePropagationStopped()){break;}}}return stop;}function liveConvert(type,selector){return(type&&type!=="*"?type+".":"")+selector.replace(rperiod,"`").replace(rspaces,"&");}jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup error").split(" "),function(i,name){// Handle event binding
jQuery.fn[name]=function(data,fn){if(fn==null){fn=data;data=null;}return arguments.length>0?this.bind(name,data,fn):this.trigger(name);};if(jQuery.attrFn){jQuery.attrFn[name]=true;}});/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true,rBackslash=/\\/g,rNonWord=/\W/;// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0,0].sort(function(){baseHasDuplicate=false;return 0;});var _Sizzle2=function Sizzle(selector,context,results,seed){results=results||[];context=context||document;var origContext=context;if(context.nodeType!==1&&context.nodeType!==9){return[];}if(!selector||typeof selector!=="string"){return results;}var m,set,checkSet,extra,ret,cur,pop,i,prune=true,contextXML=_Sizzle2.isXML(context),parts=[],soFar=selector;// Reset the position of the chunker regexp (start from head)
do{chunker.exec("");m=chunker.exec(soFar);if(m){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break;}}}while(m);if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);}else{set=Expr.relative[parts[0]]?[context]:_Sizzle2(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector]){selector+=parts.shift();}set=posProcess(selector,set);}}}else{// Take a shortcut and set the context if the root selector is an ID
// (but not if it'll be faster if the inner selector is an ID)
if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){ret=_Sizzle2.find(parts.shift(),context,contextXML);context=ret.expr?_Sizzle2.filter(ret.expr,ret.set)[0]:ret.set[0];}if(context){ret=seed?{expr:parts.pop(),set:makeArray(seed)}:_Sizzle2.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?_Sizzle2.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}while(parts.length){cur=parts.pop();pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}if(pop==null){pop=context;}Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}if(!checkSet){checkSet=set;}if(!checkSet){_Sizzle2.error(cur||selector);}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);}else if(context&&context.nodeType===1){for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&_Sizzle2.contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}else{makeArray(checkSet,results);}if(extra){_Sizzle2(extra,origContext,results,seed);_Sizzle2.uniqueSort(results);}return results;};_Sizzle2.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);}}}}return results;};_Sizzle2.matches=function(expr,set){return _Sizzle2(expr,null,null,set);};_Sizzle2.matchesSelector=function(node,expr){return _Sizzle2(expr,null,null,[node]).length>0;};_Sizzle2.find=function(expr,context,isXML){var set;if(!expr){return[];}for(var i=0,l=Expr.order.length;i<l;i++){var match,type=Expr.order[i];if(match=Expr.leftMatch[type].exec(expr)){var left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(rBackslash,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break;}}}}if(!set){set=typeof context.getElementsByTagName!=="undefined"?context.getElementsByTagName("*"):[];}return{set:set,expr:expr};};_Sizzle2.filter=function(expr,set,inplace,not){var match,anyFound,old=expr,result=[],curLoop=set,isXMLFilter=set&&set[0]&&_Sizzle2.isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){var found,item,filter=Expr.filter[type],left=match[1];anyFound=false;match.splice(1,1);if(left.substr(left.length-1)==="\\"){continue;}if(curLoop===result){result=[];}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true;}else if(match===true){continue;}}if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;if(inplace&&found!=null){if(pass){anyFound=true;}else{curLoop[i]=false;}}else if(pass){result.push(item);anyFound=true;}}}}if(found!==undefined){if(!inplace){curLoop=result;}expr=expr.replace(Expr.match[type],"");if(!anyFound){return[];}break;}}}// Improper expression
if(expr===old){if(anyFound==null){_Sizzle2.error(expr);}else{break;}}old=expr;}return curLoop;};_Sizzle2.error=function(msg){throw"Syntax error, unrecognized expression: "+msg;};var Expr=_Sizzle2.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function href(elem){return elem.getAttribute("href");},type:function type(elem){return elem.getAttribute("type");}},relative:{"+":function _(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!rNonWord.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag){part=part.toLowerCase();}for(var i=0,l=checkSet.length,elem;i<l;i++){if(elem=checkSet[i]){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part;}}if(isPartStrNotTag){_Sizzle2.filter(part,checkSet,true);}},">":function _(checkSet,part){var elem,isPartStr=typeof part==="string",i=0,l=checkSet.length;if(isPartStr&&!rNonWord.test(part)){part=part.toLowerCase();for(;i<l;i++){elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false;}}}else{for(;i<l;i++){elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}if(isPartStr){_Sizzle2.filter(part,checkSet,true);}}},"":function _(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!rNonWord.test(part)){part=part.toLowerCase();nodeCheck=part;checkFn=dirNodeCheck;}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);},"~":function _(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!rNonWord.test(part)){part=part.toLowerCase();nodeCheck=part;checkFn=dirNodeCheck;}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function ID(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
return m&&m.parentNode?[m]:[];}},NAME:function NAME(match,context){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);}}return ret.length===0?null:ret;}},TAG:function TAG(match,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(match[1]);}}},preFilter:{CLASS:function CLASS(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(rBackslash,"")+" ";if(isXML){return match;}for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n\r]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem);}}else if(inplace){curLoop[i]=false;}}}return false;},ID:function ID(match){return match[1].replace(rBackslash,"");},TAG:function TAG(match,curLoop){return match[1].replace(rBackslash,"").toLowerCase();},CHILD:function CHILD(match){if(match[1]==="nth"){if(!match[2]){_Sizzle2.error(match[0]);}match[2]=match[2].replace(/^\+|\s*/g,'');// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
var test=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);// calculate the numbers (first)n+(last) including if they are negative
match[2]=test[1]+(test[2]||1)-0;match[3]=test[3]-0;}else if(match[2]){_Sizzle2.error(match[0]);}// TODO: Move to normal caching system
match[0]=done++;return match;},ATTR:function ATTR(match,curLoop,inplace,result,not,isXML){var name=match[1]=match[1].replace(rBackslash,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}// Handle if an un-quoted value was used
match[4]=(match[4]||match[5]||"").replace(rBackslash,"");if(match[2]==="~="){match[4]=" "+match[4]+" ";}return match;},PSEUDO:function PSEUDO(match,curLoop,inplace,result,not){if(match[1]==="not"){// If we're dealing with a complex expression, or a simple one
if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=_Sizzle2(match[3],null,null,curLoop);}else{var ret=_Sizzle2.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret);}return false;}}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}return match;},POS:function POS(match){match.unshift(true);return match;}},filters:{enabled:function enabled(elem){return elem.disabled===false&&elem.type!=="hidden";},disabled:function disabled(elem){return elem.disabled===true;},checked:function checked(elem){return elem.checked===true;},selected:function selected(elem){// Accessing this property makes selected-by-default
// options in Safari work properly
if(elem.parentNode){elem.parentNode.selectedIndex;}return elem.selected===true;},parent:function parent(elem){return!!elem.firstChild;},empty:function empty(elem){return!elem.firstChild;},has:function has(elem,i,match){return!!_Sizzle2(match[3],elem).length;},header:function header(elem){return /h\d/i.test(elem.nodeName);},text:function text(elem){var attr=elem.getAttribute("type"),type=elem.type;// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
// use getAttribute instead to test this case
return elem.nodeName.toLowerCase()==="input"&&"text"===type&&(attr===type||attr===null);},radio:function radio(elem){return elem.nodeName.toLowerCase()==="input"&&"radio"===elem.type;},checkbox:function checkbox(elem){return elem.nodeName.toLowerCase()==="input"&&"checkbox"===elem.type;},file:function file(elem){return elem.nodeName.toLowerCase()==="input"&&"file"===elem.type;},password:function password(elem){return elem.nodeName.toLowerCase()==="input"&&"password"===elem.type;},submit:function submit(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&"submit"===elem.type;},image:function image(elem){return elem.nodeName.toLowerCase()==="input"&&"image"===elem.type;},reset:function reset(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&"reset"===elem.type;},button:function button(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&"button"===elem.type||name==="button";},input:function input(elem){return /input|select|textarea|button/i.test(elem.nodeName);},focus:function focus(elem){return elem===elem.ownerDocument.activeElement;}},setFilters:{first:function first(elem,i){return i===0;},last:function last(elem,i,match,array){return i===array.length-1;},even:function even(elem,i){return i%2===0;},odd:function odd(elem,i){return i%2===1;},lt:function lt(elem,i,match){return i<match[3]-0;},gt:function gt(elem,i,match){return i>match[3]-0;},nth:function nth(elem,i,match){return match[3]-0===i;},eq:function eq(elem,i,match){return match[3]-0===i;}},filter:{PSEUDO:function PSEUDO(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array);}else if(name==="contains"){return(elem.textContent||elem.innerText||_Sizzle2.getText([elem])||"").indexOf(match[3])>=0;}else if(name==="not"){var not=match[3];for(var j=0,l=not.length;j<l;j++){if(not[j]===elem){return false;}}return true;}else{_Sizzle2.error(name);}},CHILD:function CHILD(elem,match){var type=match[1],node=elem;switch(type){case"only":case"first":while(node=node.previousSibling){if(node.nodeType===1){return false;}}if(type==="first"){return true;}node=elem;case"last":while(node=node.nextSibling){if(node.nodeType===1){return false;}}return true;case"nth":var first=match[2],last=match[3];if(first===1&&last===0){return true;}var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;}}parent.sizcache=doneName;}var diff=elem.nodeIndex-last;if(first===0){return diff===0;}else{return diff%first===0&&diff/first>=0;}}},ID:function ID(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function TAG(elem,match){return match==="*"&&elem.nodeType===1||elem.nodeName.toLowerCase()===match;},CLASS:function CLASS(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1;},ATTR:function ATTR(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function POS(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS,fescape=function fescape(all,num){return"\\"+(num-0+1);};for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,fescape));}var makeArray=function makeArray(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results;}return array;};// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;// Provide a fallback method if it does not work
}catch(e){makeArray=function makeArray(array,results){var i=0,ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof array.length==="number"){for(var l=array.length;i<l;i++){ret.push(array[i]);}}else{for(;array[i];i++){ret.push(array[i]);}}}return ret;};}var sortOrder,siblingCheck;if(document.documentElement.compareDocumentPosition){sortOrder=function sortOrder(a,b){if(a===b){hasDuplicate=true;return 0;}if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;}return a.compareDocumentPosition(b)&4?-1:1;};}else{sortOrder=function sortOrder(a,b){// The nodes are identical, we can exit early
if(a===b){hasDuplicate=true;return 0;// Fallback to using sourceIndex (in IE) if it's available on both nodes
}else if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex;}var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;// If the nodes are siblings (or identical) we can do a quick check
if(aup===bup){return siblingCheck(a,b);// If no parents were found then the nodes are disconnected
}else if(!aup){return-1;}else if(!bup){return 1;}// Otherwise they're somewhere else in the tree so we need
// to build up a full list of the parentNodes for comparison
while(cur){ap.unshift(cur);cur=cur.parentNode;}cur=bup;while(cur){bp.unshift(cur);cur=cur.parentNode;}al=ap.length;bl=bp.length;// Start walking down the tree looking for a discrepancy
for(var i=0;i<al&&i<bl;i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i]);}}// We ended someplace up the tree so do a sibling check
return i===al?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1);};siblingCheck=function siblingCheck(a,b,ret){if(a===b){return ret;}var cur=a.nextSibling;while(cur){if(cur===b){return-1;}cur=cur.nextSibling;}return 1;};}// Utility function for retreiving the text value of an array of DOM nodes
_Sizzle2.getText=function(elems){var ret="",elem;for(var i=0;elems[i];i++){elem=elems[i];// Get the text from text nodes and CDATA nodes
if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue;// Traverse everything else, except comment nodes
}else if(elem.nodeType!==8){ret+=_Sizzle2.getText(elem.childNodes);}}return ret;};// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){// We're going to inject a fake input element with a specified name
var form=document.createElement("div"),id="script"+new Date().getTime(),root=document.documentElement;form.innerHTML="<a name='"+id+"'/>";// Inject it into the root element, check its status, and remove it quickly
root.insertBefore(form,root.firstChild);// The workaround has to do additional checks after a getElementById
// Which slows things down for other browsers (hence the branching)
if(document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match;};}root.removeChild(form);// release memory in IE
root=form=null;})();(function(){// Check to see if the browser returns only elements
// when doing getElementsByTagName("*")
// Create a fake element
var div=document.createElement("div");div.appendChild(document.createComment(""));// Make sure no comments are found
if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);// Filter out possible comments
if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}results=tmp;}return results;};}// Check to see if an attribute returns normalized href attributes
div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);};}// release memory in IE
div=null;})();if(document.querySelectorAll){(function(){var oldSizzle=_Sizzle2,div=document.createElement("div"),id="__sizzle__";div.innerHTML="<p class='TEST'></p>";// Safari can't handle uppercase or unicode characters when
// in quirks mode.
if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}_Sizzle2=function _Sizzle(query,context,extra,seed){context=context||document;// Only use querySelectorAll on non-XML documents
// (ID selectors don't work in non-HTML documents)
if(!seed&&!_Sizzle2.isXML(context)){// See if we find a selector to speed up
var match=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);if(match&&(context.nodeType===1||context.nodeType===9)){// Speed-up: Sizzle("TAG")
if(match[1]){return makeArray(context.getElementsByTagName(query),extra);// Speed-up: Sizzle(".CLASS")
}else if(match[2]&&Expr.find.CLASS&&context.getElementsByClassName){return makeArray(context.getElementsByClassName(match[2]),extra);}}if(context.nodeType===9){// Speed-up: Sizzle("body")
// The body element only exists once, optimize finding it
if(query==="body"&&context.body){return makeArray([context.body],extra);// Speed-up: Sizzle("#ID")
}else if(match&&match[3]){var elem=context.getElementById(match[3]);// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
if(elem&&elem.parentNode){// Handle the case where IE and Opera return items
// by name instead of ID
if(elem.id===match[3]){return makeArray([elem],extra);}}else{return makeArray([],extra);}}try{return makeArray(context.querySelectorAll(query),extra);}catch(qsaError){}// qSA works strangely on Element-rooted queries
// We can work around this by specifying an extra ID on the root
// and working up from there (Thanks to Andrew Dupont for the technique)
// IE 8 doesn't work on object elements
}else if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){var oldContext=context,old=context.getAttribute("id"),nid=old||id,hasParent=context.parentNode,relativeHierarchySelector=/^\s*[+~]/.test(query);if(!old){context.setAttribute("id",nid);}else{nid=nid.replace(/'/g,"\\$&");}if(relativeHierarchySelector&&hasParent){context=context.parentNode;}try{if(!relativeHierarchySelector||hasParent){return makeArray(context.querySelectorAll("[id='"+nid+"'] "+query),extra);}}catch(pseudoError){}finally{if(!old){oldContext.removeAttribute("id");}}}}return oldSizzle(query,context,extra,seed);};for(var prop in oldSizzle){_Sizzle2[prop]=oldSizzle[prop];}// release memory in IE
div=null;})();}(function(){var html=document.documentElement,matches=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector;if(matches){// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9 fails this)
var disconnectedMatch=!matches.call(document.createElement("div"),"div"),pseudoWorks=false;try{// This should fail with an exception
// Gecko does not error, returns false instead
matches.call(document.documentElement,"[test!='']:sizzle");}catch(pseudoError){pseudoWorks=true;}_Sizzle2.matchesSelector=function(node,expr){// Make sure that attribute selectors are quoted
expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!_Sizzle2.isXML(node)){try{if(pseudoWorks||!Expr.match.PSEUDO.test(expr)&&!/!=/.test(expr)){var ret=matches.call(node,expr);// IE 9's matchesSelector returns false on disconnected nodes
if(ret||!disconnectedMatch||// As well, disconnected nodes are said to be in a document
// fragment in IE 9, so check for that
node.document&&node.document.nodeType!==11){return ret;}}}catch(e){}}return _Sizzle2(expr,null,null,[node]).length>0;};}})();(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";// Opera can't find a second classname (in 9.6)
// Also, make sure that getElementsByClassName actually exists
if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){return;}// Safari caches class attributes, doesn't catch changes (in 3.2)
div.lastChild.className="e";if(div.getElementsByClassName("e").length===1){return;}Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);}};// release memory in IE
div=null;})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i;}if(elem.nodeName.toLowerCase()===cur){match=elem;break;}elem=elem[dir];}checkSet[i]=match;}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i;}if(typeof cur!=="string"){if(elem===cur){match=true;break;}}else if(_Sizzle2.filter(cur,[elem]).length>0){match=elem;break;}}elem=elem[dir];}checkSet[i]=match;}}}if(document.documentElement.contains){_Sizzle2.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);};}else if(document.documentElement.compareDocumentPosition){_Sizzle2.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16);};}else{_Sizzle2.contains=function(){return false;};}_Sizzle2.isXML=function(elem){// documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};var posProcess=function posProcess(selector,context){var match,tmpSet=[],later="",root=context.nodeType?[context]:context;// Position selectors must be done after the filter
// And so must :not(positional) so we move all PSEUDOs to the end
while(match=Expr.match.PSEUDO.exec(selector)){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){_Sizzle2(selector,root[i],tmpSet);}return _Sizzle2.filter(later,tmpSet);};// EXPOSE
jQuery.find=_Sizzle2;jQuery.expr=_Sizzle2.selectors;jQuery.expr[":"]=jQuery.expr.filters;jQuery.unique=_Sizzle2.uniqueSort;jQuery.text=_Sizzle2.getText;jQuery.isXMLDoc=_Sizzle2.isXML;jQuery.contains=_Sizzle2.contains;})();var runtil=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,// Note: This RegExp should be improved, or likely pulled from Sizzle
rmultiselector=/,/,isSimple=/^.[^:#\[\.,]*$/,slice=Array.prototype.slice,POS=jQuery.expr.match.POS,// methods guaranteed to produce a unique set when starting from a unique set
guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({find:function find(selector){var self=this,i,l;if(typeof selector!=="string"){return jQuery(selector).filter(function(){for(i=0,l=self.length;i<l;i++){if(jQuery.contains(self[i],this)){return true;}}});}var ret=this.pushStack("","find",selector),length,n,r;for(i=0,l=this.length;i<l;i++){length=ret.length;jQuery.find(selector,this[i],ret);if(i>0){// Make sure that the results are unique
for(n=length;n<ret.length;n++){for(r=0;r<length;r++){if(ret[r]===ret[n]){ret.splice(n--,1);break;}}}}}return ret;},has:function has(target){var targets=jQuery(target);return this.filter(function(){for(var i=0,l=targets.length;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},not:function not(selector){return this.pushStack(winnow(this,selector,false),"not",selector);},filter:function filter(selector){return this.pushStack(winnow(this,selector,true),"filter",selector);},is:function is(selector){return!!selector&&(typeof selector==="string"?jQuery.filter(selector,this).length>0:this.filter(selector).length>0);},closest:function closest(selectors,context){var ret=[],i,l,cur=this[0];// Array
if(jQuery.isArray(selectors)){var match,selector,matches={},level=1;if(cur&&selectors.length){for(i=0,l=selectors.length;i<l;i++){selector=selectors[i];if(!matches[selector]){matches[selector]=POS.test(selector)?jQuery(selector,context||this.context):selector;}}while(cur&&cur.ownerDocument&&cur!==context){for(selector in matches){match=matches[selector];if(match.jquery?match.index(cur)>-1:jQuery(cur).is(match)){ret.push({selector:selector,elem:cur,level:level});}}cur=cur.parentNode;level++;}}return ret;}// String
var pos=POS.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;for(i=0,l=this.length;i<l;i++){cur=this[i];while(cur){if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){ret.push(cur);break;}else{cur=cur.parentNode;if(!cur||!cur.ownerDocument||cur===context||cur.nodeType===11){break;}}}}ret=ret.length>1?jQuery.unique(ret):ret;return this.pushStack(ret,"closest",selectors);},// Determine the position of an element within
// the matched set of elements
index:function index(elem){if(!elem||typeof elem==="string"){return jQuery.inArray(this[0],// If it receives a string, the selector is used
// If it receives nothing, the siblings are used
elem?jQuery(elem):this.parent().children());}// Locate the position of the desired element
return jQuery.inArray(// If it receives a jQuery object, the first element is used
elem.jquery?elem[0]:elem,this);},add:function add(selector,context){var set=typeof selector==="string"?jQuery(selector,context):jQuery.makeArray(selector&&selector.nodeType?[selector]:selector),all=jQuery.merge(this.get(),set);return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?all:jQuery.unique(all));},andSelf:function andSelf(){return this.add(this.prevObject);}});// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected(node){return!node||!node.parentNode||node.parentNode.nodeType===11;}jQuery.each({parent:function parent(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function parents(elem){return jQuery.dir(elem,"parentNode");},parentsUntil:function parentsUntil(elem,i,until){return jQuery.dir(elem,"parentNode",until);},next:function next(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function prev(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function nextAll(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function prevAll(elem){return jQuery.dir(elem,"previousSibling");},nextUntil:function nextUntil(elem,i,until){return jQuery.dir(elem,"nextSibling",until);},prevUntil:function prevUntil(elem,i,until){return jQuery.dir(elem,"previousSibling",until);},siblings:function siblings(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function children(elem){return jQuery.sibling(elem.firstChild);},contents:function contents(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until),// The variable 'args' was introduced in
// https://github.com/jquery/jquery/commit/52a0238
// to work around a bug in Chrome 10 (Dev) and should be removed when the bug is fixed.
// http://code.google.com/p/v8/issues/detail?id=1050
args=slice.call(arguments);if(!runtil.test(name)){selector=until;}if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret);}ret=this.length>1&&!guaranteedUnique[name]?jQuery.unique(ret):ret;if((this.length>1||rmultiselector.test(selector))&&rparentsprev.test(name)){ret=ret.reverse();}return this.pushStack(ret,name,args.join(","));};});jQuery.extend({filter:function filter(expr,elems,not){if(not){expr=":not("+expr+")";}return elems.length===1?jQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[]:jQuery.find.matches(expr,elems);},dir:function dir(elem,_dir,until){var matched=[],cur=elem[_dir];while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur);}cur=cur[_dir];}return matched;},nth:function nth(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType===1&&++num===result){break;}}return cur;},sibling:function sibling(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n);}}return r;}});// Implement the identical functionality for filter and not
function winnow(elements,qualifier,keep){// Can't pass null or undefined to indexOf in Firefox 4
// Set to 0 to skip string check
qualifier=qualifier||0;if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){var retVal=!!qualifier.call(elem,i,elem);return retVal===keep;});}else if(qualifier.nodeType){return jQuery.grep(elements,function(elem,i){return elem===qualifier===keep;});}else if(typeof qualifier==="string"){var filtered=jQuery.grep(elements,function(elem){return elem.nodeType===1;});if(isSimple.test(qualifier)){return jQuery.filter(qualifier,filtered,!keep);}else{qualifier=jQuery.filter(qualifier,filtered);}}return jQuery.grep(elements,function(elem,i){return jQuery.inArray(elem,qualifier)>=0===keep;});}var rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnocache=/<(?:script|object|embed|option|style)/i,// checked="checked" or checked
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/\/(java|ecma)script/i,rcleanScript=/^\s*<!(?:\[CDATA\[|\-\-)/,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;// IE can't serialize <link> and <script> tags normally
if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"];}jQuery.fn.extend({text:function text(_text){if(jQuery.isFunction(_text)){return this.each(function(i){var self=jQuery(this);self.text(_text.call(this,i,self.text()));});}if((typeof _text==="undefined"?"undefined":_typeof(_text))!=="object"&&_text!==undefined){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(_text));}return jQuery.text(this);},wrapAll:function wrapAll(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i));});}if(this[0]){// The elements to wrap the target around
var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}wrap.map(function(){var elem=this;while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild;}return elem;}).append(this);}return this;},wrapInner:function wrapInner(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function wrap(html){return this.each(function(){jQuery(this).wrapAll(html);});},unwrap:function unwrap(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes);}}).end();},append:function append(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.appendChild(elem);}});},prepend:function prepend(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.insertBefore(elem,this.firstChild);}});},before:function before(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this);});}else if(arguments.length){var set=jQuery(arguments[0]);set.push.apply(set,this.toArray());return this.pushStack(set,"before",arguments);}},after:function after(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});}else if(arguments.length){var set=this.pushStack(this,"after",arguments);set.push.apply(set,jQuery(arguments[0]).toArray());return set;}},// keepData is for internal use only--do not document
remove:function remove(selector,keepData){for(var i=0,elem;(elem=this[i])!=null;i++){if(!selector||jQuery.filter(selector,[elem]).length){if(!keepData&&elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));jQuery.cleanData([elem]);}if(elem.parentNode){elem.parentNode.removeChild(elem);}}}return this;},empty:function empty(){for(var i=0,elem;(elem=this[i])!=null;i++){// Remove element nodes and prevent memory leaks
if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));}// Remove any remaining nodes
while(elem.firstChild){elem.removeChild(elem.firstChild);}}return this;},clone:function clone(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function html(value){if(value===undefined){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(rinlinejQuery,""):null;// See if we can take a shortcut and just use innerHTML
}else if(typeof value==="string"&&!rnocache.test(value)&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");try{for(var i=0,l=this.length;i<l;i++){// Remove element nodes and prevent memory leaks
if(this[i].nodeType===1){jQuery.cleanData(this[i].getElementsByTagName("*"));this[i].innerHTML=value;}}// If using innerHTML throws an exception, use the fallback method
}catch(e){this.empty().append(value);}}else if(jQuery.isFunction(value)){this.each(function(i){var self=jQuery(this);self.html(value.call(this,i,self.html()));});}else{this.empty().append(value);}return this;},replaceWith:function replaceWith(value){if(this[0]&&this[0].parentNode){// Make sure that the elements are removed from the DOM before they are inserted
// this can help fix replacing a parent with child elements
if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();self.replaceWith(value.call(this,i,old));});}if(typeof value!=="string"){value=jQuery(value).detach();}return this.each(function(){var next=this.nextSibling,parent=this.parentNode;jQuery(this).remove();if(next){jQuery(next).before(value);}else{jQuery(parent).append(value);}});}else{return this.length?this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value):this;}},detach:function detach(selector){return this.remove(selector,true);},domManip:function domManip(args,table,callback){var results,first,fragment,parent,value=args[0],scripts=[];// We can't cloneNode fragments that contain checked, in WebKit
if(!jQuery.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){jQuery(this).domManip(args,table,callback,true);});}if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);args[0]=value.call(this,i,table?self.html():undefined);self.domManip(args,table,callback);});}if(this[0]){parent=value&&value.parentNode;// If we're in a fragment, just use that instead of building a new one
if(jQuery.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){results={fragment:parent};}else{results=jQuery.buildFragment(args,this,scripts);}fragment=results.fragment;if(fragment.childNodes.length===1){first=fragment=fragment.firstChild;}else{first=fragment.firstChild;}if(first){table=table&&jQuery.nodeName(first,"tr");for(var i=0,l=this.length,lastIndex=l-1;i<l;i++){callback.call(table?root(this[i],first):this[i],// Make sure that we do not leak memory by inadvertently discarding
// the original fragment (which might have attached data) instead of
// using it; in addition, use the original fragment object for the last
// item instead of first because it can end up being emptied incorrectly
// in certain situations (Bug #8070).
// Fragments from the fragment cache must always be cloned and never used
// in place.
results.cacheable||l>1&&i<lastIndex?jQuery.clone(fragment,true,true):fragment);}}if(scripts.length){jQuery.each(scripts,evalScript);}}return this;}});function root(elem,cur){return jQuery.nodeName(elem,"table")?elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody")):elem;}function cloneCopyEvent(src,dest){if(dest.nodeType!==1||!jQuery.hasData(src)){return;}var internalKey=jQuery.expando,oldData=jQuery.data(src),curData=jQuery.data(dest,oldData);// Switch to use the internal data object, if it exists, for the next
// stage of data copying
if(oldData=oldData[internalKey]){var events=oldData.events;curData=curData[internalKey]=jQuery.extend({},oldData);if(events){delete curData.handle;curData.events={};for(var type in events){for(var i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type+(events[type][i].namespace?".":"")+events[type][i].namespace,events[type][i],events[type][i].data);}}}}}function cloneFixAttributes(src,dest){var nodeName;// We do not need to do anything for non-Elements
if(dest.nodeType!==1){return;}// clearAttributes removes the attributes, which we don't want,
// but also removes the attachEvent events, which we *do* want
if(dest.clearAttributes){dest.clearAttributes();}// mergeAttributes, in contrast, only merges back on the
// original attributes, not the events
if(dest.mergeAttributes){dest.mergeAttributes(src);}nodeName=dest.nodeName.toLowerCase();// IE6-8 fail to clone children inside object elements that use
// the proprietary classid attribute value (rather than the type
// attribute) to identify the type of content to display
if(nodeName==="object"){dest.outerHTML=src.outerHTML;}else if(nodeName==="input"&&(src.type==="checkbox"||src.type==="radio")){// IE6-8 fails to persist the checked state of a cloned checkbox
// or radio button. Worse, IE6-7 fail to give the cloned element
// a checked appearance if the defaultChecked value isn't also set
if(src.checked){dest.defaultChecked=dest.checked=src.checked;}// IE6-7 get confused and end up setting the value of a cloned
// checkbox/radio button to an empty string instead of "on"
if(dest.value!==src.value){dest.value=src.value;}// IE6-8 fails to return the selected option to the default selected
// state when cloning options
}else if(nodeName==="option"){dest.selected=src.defaultSelected;// IE6-8 fails to set the defaultValue to the correct value when
// cloning other types of input fields
}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}// Event data gets referenced instead of copied if the expando
// gets copied too
dest.removeAttribute(jQuery.expando);}jQuery.buildFragment=function(args,nodes,scripts){var fragment,cacheable,cacheresults,doc;// nodes may contain either an explicit document object,
// a jQuery collection or context object.
// If nodes[0] contains a valid object to assign to doc
if(nodes&&nodes[0]){doc=nodes[0].ownerDocument||nodes[0];}// Ensure that an attr object doesn't incorrectly stand in as a document object
// Chrome and Firefox seem to allow this to occur and will throw exception
// Fixes #8950
if(!doc.createDocumentFragment){doc=document;}// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
// Cloning options loses the selected state, so don't cache them
// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
if(args.length===1&&typeof args[0]==="string"&&args[0].length<512&&doc===document&&args[0].charAt(0)==="<"&&!rnocache.test(args[0])&&(jQuery.support.checkClone||!rchecked.test(args[0]))){cacheable=true;cacheresults=jQuery.fragments[args[0]];if(cacheresults&&cacheresults!==1){fragment=cacheresults;}}if(!fragment){fragment=doc.createDocumentFragment();jQuery.clean(args,doc,fragment,scripts);}if(cacheable){jQuery.fragments[args[0]]=cacheresults?fragment:1;}return{fragment:fragment,cacheable:cacheable};};jQuery.fragments={};jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var ret=[],insert=jQuery(selector),parent=this.length===1&&this[0].parentNode;if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){insert[original](this[0]);return this;}else{for(var i=0,l=insert.length;i<l;i++){var elems=(i>0?this.clone(true):this).get();jQuery(insert[i])[original](elems);ret=ret.concat(elems);}return this.pushStack(ret,name,insert.selector);}};});function getAll(elem){if("getElementsByTagName"in elem){return elem.getElementsByTagName("*");}else if("querySelectorAll"in elem){return elem.querySelectorAll("*");}else{return[];}}// Used in clean, fixes the defaultChecked property
function fixDefaultChecked(elem){if(elem.type==="checkbox"||elem.type==="radio"){elem.defaultChecked=elem.checked;}}// Finds all inputs and passes them to fixDefaultChecked
function findInputs(elem){if(jQuery.nodeName(elem,"input")){fixDefaultChecked(elem);}else if("getElementsByTagName"in elem){jQuery.grep(elem.getElementsByTagName("input"),fixDefaultChecked);}}jQuery.extend({clone:function clone(elem,dataAndEvents,deepDataAndEvents){var clone=elem.cloneNode(true),srcElements,destElements,i;if((!jQuery.support.noCloneEvent||!jQuery.support.noCloneChecked)&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){// IE copies events bound via attachEvent when using cloneNode.
// Calling detachEvent on the clone will also remove the events
// from the original. In order to get around this, we use some
// proprietary methods to clear the events. Thanks to MooTools
// guys for this hotness.
cloneFixAttributes(elem,clone);// Using Sizzle here is crazy slow, so we use getElementsByTagName
// instead
srcElements=getAll(elem);destElements=getAll(clone);// Weird iteration because IE will replace the length property
// with an element if you are cloning the body and one of the
// elements on the page has a name or id of "length"
for(i=0;srcElements[i];++i){cloneFixAttributes(srcElements[i],destElements[i]);}}// Copy the events from the original to the clone
if(dataAndEvents){cloneCopyEvent(elem,clone);if(deepDataAndEvents){srcElements=getAll(elem);destElements=getAll(clone);for(i=0;srcElements[i];++i){cloneCopyEvent(srcElements[i],destElements[i]);}}}srcElements=destElements=null;// Return the cloned set
return clone;},clean:function clean(elems,context,fragment,scripts){var checkScriptType;context=context||document;// !context.createElement fails in IE with an error but returns typeof 'object'
if(typeof context.createElement==="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;}var ret=[],j;for(var i=0,elem;(elem=elems[i])!=null;i++){if(typeof elem==="number"){elem+="";}if(!elem){continue;}// Convert html string into DOM nodes
if(typeof elem==="string"){if(!rhtml.test(elem)){elem=context.createTextNode(elem);}else{// Fix "XHTML"-style tags in all browsers
elem=elem.replace(rxhtmlTag,"<$1></$2>");// Trim whitespace, otherwise indexOf won't work as expected
var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,depth=wrap[0],div=context.createElement("div");// Go to html and back, then peel off extra wrappers
div.innerHTML=wrap[1]+elem+wrap[2];// Move to the right depth
while(depth--){div=div.lastChild;}// Remove IE's autoinserted <tbody> from table fragments
if(!jQuery.support.tbody){// String was a <table>, *may* have spurious <tbody>
var hasBody=rtbody.test(elem),tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:// String was a bare <thead> or <tfoot>
wrap[1]==="<table>"&&!hasBody?div.childNodes:[];for(j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j]);}}}// IE completely kills leading whitespace when innerHTML is used
if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild);}elem=div.childNodes;}}// Resets defaultChecked for any radios and checkboxes
// about to be appended to the DOM in IE 6/7 (#8060)
var len;if(!jQuery.support.appendChecked){if(elem[0]&&typeof(len=elem.length)==="number"){for(j=0;j<len;j++){findInputs(elem[j]);}}else{findInputs(elem);}}if(elem.nodeType){ret.push(elem);}else{ret=jQuery.merge(ret,elem);}}if(fragment){checkScriptType=function checkScriptType(elem){return!elem.type||rscriptType.test(elem.type);};for(i=0;ret[i];i++){if(scripts&&jQuery.nodeName(ret[i],"script")&&(!ret[i].type||ret[i].type.toLowerCase()==="text/javascript")){scripts.push(ret[i].parentNode?ret[i].parentNode.removeChild(ret[i]):ret[i]);}else{if(ret[i].nodeType===1){var jsTags=jQuery.grep(ret[i].getElementsByTagName("script"),checkScriptType);ret.splice.apply(ret,[i+1,0].concat(jsTags));}fragment.appendChild(ret[i]);}}}return ret;},cleanData:function cleanData(elems){var data,id,cache=jQuery.cache,internalKey=jQuery.expando,special=jQuery.event.special,deleteExpando=jQuery.support.deleteExpando;for(var i=0,elem;(elem=elems[i])!=null;i++){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){continue;}id=elem[jQuery.expando];if(id){data=cache[id]&&cache[id][internalKey];if(data&&data.events){for(var type in data.events){if(special[type]){jQuery.event.remove(elem,type);// This is a shortcut to avoid jQuery.event.remove's overhead
}else{jQuery.removeEvent(elem,type,data.handle);}}// Null the DOM reference to avoid IE6/7/8 leak (#7054)
if(data.handle){data.handle.elem=null;}}if(deleteExpando){delete elem[jQuery.expando];}else if(elem.removeAttribute){elem.removeAttribute(jQuery.expando);}delete cache[id];}}}});function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"});}else{jQuery.globalEval((elem.text||elem.textContent||elem.innerHTML||"").replace(rcleanScript,"/*$0*/"));}if(elem.parentNode){elem.parentNode.removeChild(elem);}}var ralpha=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,// fixed for IE9, see #8346
rupper=/([A-Z]|^ms)/g,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/,rrelNum=/^[+\-]=/,rrelNumFilter=/[^+\-\.\de]+/g,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssWidth=["Left","Right"],cssHeight=["Top","Bottom"],curCSS,getComputedStyle,currentStyle;jQuery.fn.css=function(name,value){// Setting 'undefined' is a no-op
if(arguments.length===2&&value===undefined){return this;}return jQuery.access(this,name,value,true,function(elem,name,value){return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);});};jQuery.extend({// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function get(elem,computed){if(computed){// We should always get a number back from opacity
var ret=curCSS(elem,"opacity","opacity");return ret===""?"1":ret;}else{return elem.style.opacity;}}}},// Exclude the following css properties to add px
cssNumber:{"fillOpacity":true,"fontWeight":true,"lineHeight":true,"opacity":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{// normalize float css property
"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},// Get and set the style property on a DOM Node
style:function style(elem,name,value,extra){// Don't set styles on text and comment nodes
if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;}// Make sure that we're working with the right name
var ret,type,origName=jQuery.camelCase(name),style=elem.style,hooks=jQuery.cssHooks[origName];name=jQuery.cssProps[origName]||origName;// Check if we're setting a value
if(value!==undefined){type=typeof value==="undefined"?"undefined":_typeof(value);// Make sure that NaN and null values aren't set. See: #7116
if(type==="number"&&isNaN(value)||value==null){return;}// convert relative number strings (+= or -=) to relative numbers. #7345
if(type==="string"&&rrelNum.test(value)){value=+value.replace(rrelNumFilter,"")+parseFloat(jQuery.css(elem,name));// Fixes bug #9237
type="number";}// If a number was passed in, add 'px' to the (except for certain CSS properties)
if(type==="number"&&!jQuery.cssNumber[origName]){value+="px";}// If a hook was provided, use that value, otherwise just set the specified value
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value))!==undefined){// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
// Fixes bug #5509
try{style[name]=value;}catch(e){}}}else{// If a hook was provided get the non-computed value from there
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;}// Otherwise just get the value from the style object
return style[name];}},css:function css(elem,name,extra){var ret,hooks;// Make sure that we're working with the right name
name=jQuery.camelCase(name);hooks=jQuery.cssHooks[name];name=jQuery.cssProps[name]||name;// cssFloat needs a special treatment
if(name==="cssFloat"){name="float";}// If a hook was provided get the computed value from there
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,true,extra))!==undefined){return ret;// Otherwise, if a way to get the computed value exists, use that
}else if(curCSS){return curCSS(elem,name);}},// A method for quickly swapping in/out CSS properties to get correct calculations
swap:function swap(elem,options,callback){var old={};// Remember the old values, and insert the new ones
for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}callback.call(elem);// Revert the old values
for(name in options){elem.style[name]=old[name];}}});// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS=jQuery.css;jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function get(elem,computed,extra){var val;if(computed){if(elem.offsetWidth!==0){return getWH(elem,name,extra);}else{jQuery.swap(elem,cssShow,function(){val=getWH(elem,name,extra);});}return val;}},set:function set(elem,value){if(rnumpx.test(value)){// ignore negative width and height values #1599
value=parseFloat(value);if(value>=0){return value+"px";}}else{return value;}}};});if(!jQuery.support.opacity){jQuery.cssHooks.opacity={get:function get(elem,computed){// IE uses filters for opacity
return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?parseFloat(RegExp.$1)/100+"":computed?"1":"";},set:function set(elem,value){var style=elem.style,currentStyle=elem.currentStyle;// IE has trouble with opacity if it does not have layout
// Force it by setting the zoom level
style.zoom=1;// Set the alpha filter to set the opacity
var opacity=jQuery.isNaN(value)?"":"alpha(opacity="+value*100+")",filter=currentStyle&&currentStyle.filter||style.filter||"";style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):filter+" "+opacity;}};}jQuery(function(){// This hook cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
if(!jQuery.support.reliableMarginRight){jQuery.cssHooks.marginRight={get:function get(elem,computed){// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
// Work around by temporarily setting element display to inline-block
var ret;jQuery.swap(elem,{"display":"inline-block"},function(){if(computed){ret=curCSS(elem,"margin-right","marginRight");}else{ret=elem.style.marginRight;}});return ret;}};}});if(document.defaultView&&document.defaultView.getComputedStyle){getComputedStyle=function getComputedStyle(elem,name){var ret,defaultView,computedStyle;name=name.replace(rupper,"-$1").toLowerCase();if(!(defaultView=elem.ownerDocument.defaultView)){return undefined;}if(computedStyle=defaultView.getComputedStyle(elem,null)){ret=computedStyle.getPropertyValue(name);if(ret===""&&!jQuery.contains(elem.ownerDocument.documentElement,elem)){ret=jQuery.style(elem,name);}}return ret;};}if(document.documentElement.currentStyle){currentStyle=function currentStyle(elem,name){var left,ret=elem.currentStyle&&elem.currentStyle[name],rsLeft=elem.runtimeStyle&&elem.runtimeStyle[name],style=elem.style;// From the awesome hack by Dean Edwards
// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
// If we're not dealing with a regular pixel number
// but a number that has a weird ending, we need to convert it to pixels
if(!rnumpx.test(ret)&&rnum.test(ret)){// Remember the original values
left=style.left;// Put in the new values to get a computed value out
if(rsLeft){elem.runtimeStyle.left=elem.currentStyle.left;}style.left=name==="fontSize"?"1em":ret||0;ret=style.pixelLeft+"px";// Revert the changed values
style.left=left;if(rsLeft){elem.runtimeStyle.left=rsLeft;}}return ret===""?"auto":ret;};}curCSS=getComputedStyle||currentStyle;function getWH(elem,name,extra){// Start with offset property
var val=name==="width"?elem.offsetWidth:elem.offsetHeight,which=name==="width"?cssWidth:cssHeight;if(val>0){if(extra!=="border"){jQuery.each(which,function(){if(!extra){val-=parseFloat(jQuery.css(elem,"padding"+this))||0;}if(extra==="margin"){val+=parseFloat(jQuery.css(elem,extra+this))||0;}else{val-=parseFloat(jQuery.css(elem,"border"+this+"Width"))||0;}});}return val+"px";}// Fall back to computed then uncomputed css if necessary
val=curCSS(elem,name,name);if(val<0||val==null){val=elem.style[name]||0;}// Normalize "", auto, and prepare for extra
val=parseFloat(val)||0;// Add padding, border, margin
if(extra){jQuery.each(which,function(){val+=parseFloat(jQuery.css(elem,"padding"+this))||0;if(extra!=="padding"){val+=parseFloat(jQuery.css(elem,"border"+this+"Width"))||0;}if(extra==="margin"){val+=parseFloat(jQuery.css(elem,extra+this))||0;}});}return val+"px";}if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){var width=elem.offsetWidth,height=elem.offsetHeight;return width===0&&height===0||!jQuery.support.reliableHiddenOffsets&&(elem.style.display||jQuery.css(elem,"display"))==="none";};jQuery.expr.filters.visible=function(elem){return!jQuery.expr.filters.hidden(elem);};}var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rhash=/#.*$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,// IE leaves an \r character at EOL
rinput=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,// #7653, #8125, #8152: local protocol detection
rlocalProtocol=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rquery=/\?/,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,rselectTextarea=/^(?:select|textarea)/i,rspacesAjax=/\s+/,rts=/([?&])_=[^&]*/,rurl=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,// Keep a copy of the old load method
_load=jQuery.fn.load,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */prefilters={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */transports={},// Document location
ajaxLocation,// Document location segments
ajaxLocParts;// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try{ajaxLocation=location.href;}catch(e){// Use the href attribute of an A element
// since IE will modify it given document.location
ajaxLocation=document.createElement("a");ajaxLocation.href="";ajaxLocation=ajaxLocation.href;}// Segment location into parts
ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure){// dataTypeExpression is optional and defaults to "*"
return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}if(jQuery.isFunction(func)){var dataTypes=dataTypeExpression.toLowerCase().split(rspacesAjax),i=0,length=dataTypes.length,dataType,list,placeBefore;// For each dataType in the dataTypeExpression
for(;i<length;i++){dataType=dataTypes[i];// We control if we're asked to add before
// any existing element
placeBefore=/^\+/.test(dataType);if(placeBefore){dataType=dataType.substr(1)||"*";}list=structure[dataType]=structure[dataType]||[];// then we add to the structure accordingly
list[placeBefore?"unshift":"push"](func);}}};}// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,dataType/* internal */,inspected/* internal */){dataType=dataType||options.dataTypes[0];inspected=inspected||{};inspected[dataType]=true;var list=structure[dataType],i=0,length=list?list.length:0,executeOnly=structure===prefilters,selection;for(;i<length&&(executeOnly||!selection);i++){selection=list[i](options,originalOptions,jqXHR);// If we got redirected to another dataType
// we try there if executing only and not done already
if(typeof selection==="string"){if(!executeOnly||inspected[selection]){selection=undefined;}else{options.dataTypes.unshift(selection);selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,selection,inspected);}}}// If we're only executing or nothing was selected
// we try the catchall dataType if not done already
if((executeOnly||!selection)&&!inspected["*"]){selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,"*",inspected);}// unnecessary when only executing (prefilters)
// but it'll be ignored by the caller in that case
return selection;}jQuery.fn.extend({load:function load(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments);// Don't do a request if no elements are being requested
}else if(!this.length){return this;}var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}// Default to a GET request
var type="GET";// If the second parameter was provided
if(params){// If it's a function
if(jQuery.isFunction(params)){// We assume that it's the callback
callback=params;params=undefined;// Otherwise, build a param string
}else if((typeof params==="undefined"?"undefined":_typeof(params))==="object"){params=jQuery.param(params,jQuery.ajaxSettings.traditional);type="POST";}}var self=this;// Request the remote document
jQuery.ajax({url:url,type:type,dataType:"html",data:params,// Complete callback (responseText is used internally)
complete:function complete(jqXHR,status,responseText){// Store the response as specified by the jqXHR object
responseText=jqXHR.responseText;// If successful, inject the HTML into all the matched elements
if(jqXHR.isResolved()){// #4825: Get the actual response in case
// a dataFilter is present in ajaxSettings
jqXHR.done(function(r){responseText=r;});// See if a selector was specified
self.html(selector?// Create a dummy div to hold the results
jQuery("<div>")// inject the contents of the document in, removing the scripts
// to avoid any 'Permission Denied' errors in IE
.append(responseText.replace(rscript,""))// Locate the specified elements
.find(selector):// If not, just inject the full result
responseText);}if(callback){self.each(callback,[responseText,status,jqXHR]);}}});return this;},serialize:function serialize(){return jQuery.param(this.serializeArray());},serializeArray:function serializeArray(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}):{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});// Attach a bunch of functions for handling common AJAX events
jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){// shift arguments if data argument was omitted
if(jQuery.isFunction(data)){type=type||callback;callback=data;data=undefined;}return jQuery.ajax({type:method,url:url,data:data,success:callback,dataType:type});};});jQuery.extend({getScript:function getScript(url,callback){return jQuery.get(url,undefined,callback,"script");},getJSON:function getJSON(url,data,callback){return jQuery.get(url,data,callback,"json");},// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function ajaxSetup(target,settings){if(!settings){// Only one parameter, we extend ajaxSettings
settings=target;target=jQuery.extend(true,jQuery.ajaxSettings,settings);}else{// target was provided, we extend into it
jQuery.extend(true,target,jQuery.ajaxSettings,settings);}// Flatten fields we don't want deep extended
for(var field in{context:1,url:1}){if(field in settings){target[field]=settings[field];}else if(field in jQuery.ajaxSettings){target[field]=jQuery.ajaxSettings[field];}}return target;},ajaxSettings:{url:ajaxLocation,isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},// List of data converters
// 1) key format is "source_type destination_type" (a single space in-between)
// 2) the catchall symbol "*" can be used for source_type
converters:{// Convert anything to text
"* text":window.String,// Text to html (true = no transformation)
"text html":true,// Evaluate text as a json expression
"text json":jQuery.parseJSON,// Parse text as xml
"text xml":jQuery.parseXML}},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),// Main method
ajax:function ajax(url,options){// If url is an object, simulate pre-1.5 signature
if((typeof url==="undefined"?"undefined":_typeof(url))==="object"){options=url;url=undefined;}// Force options to be an object
options=options||{};var// Create the final options object
s=jQuery.ajaxSetup({},options),// Callbacks context
callbackContext=s.context||s,// Context for global events
// It's the callbackContext if one was provided in the options
// and if it's a DOM node or a jQuery collection
globalEventContext=callbackContext!==s&&(callbackContext.nodeType||callbackContext instanceof jQuery)?jQuery(callbackContext):jQuery.event,// Deferreds
deferred=jQuery.Deferred(),completeDeferred=jQuery._Deferred(),// Status-dependent callbacks
statusCode=s.statusCode||{},// ifModified key
ifModifiedKey,// Headers (they are sent all at once)
requestHeaders={},requestHeadersNames={},// Response headers
responseHeadersString,responseHeaders,// transport
transport,// timeout handle
timeoutTimer,// Cross-domain detection vars
parts,// The jqXHR state
state=0,// To know if global events are to be dispatched
fireGlobals,// Loop variable
i,// Fake xhr
jqXHR={readyState:0,// Caches the header
setRequestHeader:function setRequestHeader(name,value){if(!state){var lname=name.toLowerCase();name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;requestHeaders[name]=value;}return this;},// Raw string
getAllResponseHeaders:function getAllResponseHeaders(){return state===2?responseHeadersString:null;},// Builds headers hashtable if needed
getResponseHeader:function getResponseHeader(key){var match;if(state===2){if(!responseHeaders){responseHeaders={};while(match=rheaders.exec(responseHeadersString)){responseHeaders[match[1].toLowerCase()]=match[2];}}match=responseHeaders[key.toLowerCase()];}return match===undefined?null:match;},// Overrides response content-type header
overrideMimeType:function overrideMimeType(type){if(!state){s.mimeType=type;}return this;},// Cancel the request
abort:function abort(statusText){statusText=statusText||"abort";if(transport){transport.abort(statusText);}done(0,statusText);return this;}};// Callback for when everything is done
// It is defined here because jslint complains if it is declared
// at the end of the function (which would be more logical and readable)
function done(status,statusText,responses,headers){// Called once
if(state===2){return;}// State is "done" now
state=2;// Clear timeout if it exists
if(timeoutTimer){clearTimeout(timeoutTimer);}// Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
transport=undefined;// Cache response headers
responseHeadersString=headers||"";// Set readyState
jqXHR.readyState=status?4:0;var isSuccess,success,error,response=responses?ajaxHandleResponses(s,jqXHR,responses):undefined,lastModified,etag;// If successful, handle type chaining
if(status>=200&&status<300||status===304){// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){if(lastModified=jqXHR.getResponseHeader("Last-Modified")){jQuery.lastModified[ifModifiedKey]=lastModified;}if(etag=jqXHR.getResponseHeader("Etag")){jQuery.etag[ifModifiedKey]=etag;}}// If not modified
if(status===304){statusText="notmodified";isSuccess=true;// If we have data
}else{try{success=ajaxConvert(s,response);statusText="success";isSuccess=true;}catch(e){// We have a parsererror
statusText="parsererror";error=e;}}}else{// We extract error from statusText
// then normalize statusText and status for non-aborts
error=statusText;if(!statusText||status){statusText="error";if(status<0){status=0;}}}// Set data for the fake xhr object
jqXHR.status=status;jqXHR.statusText=statusText;// Success/Error
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);}// Status-dependent callbacks
jqXHR.statusCode(statusCode);statusCode=undefined;if(fireGlobals){globalEventContext.trigger("ajax"+(isSuccess?"Success":"Error"),[jqXHR,s,isSuccess?success:error]);}// Complete
completeDeferred.resolveWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);// Handle the global AJAX counter
if(! --jQuery.active){jQuery.event.trigger("ajaxStop");}}}// Attach deferreds
deferred.promise(jqXHR);jqXHR.success=jqXHR.done;jqXHR.error=jqXHR.fail;jqXHR.complete=completeDeferred.done;// Status-dependent callbacks
jqXHR.statusCode=function(map){if(map){var tmp;if(state<2){for(tmp in map){statusCode[tmp]=[statusCode[tmp],map[tmp]];}}else{tmp=map[jqXHR.status];jqXHR.then(tmp,tmp);}}return this;};// Remove hash character (#7531: and string promotion)
// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
// We also use the url parameter if available
s.url=((url||s.url)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");// Extract dataTypes list
s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().split(rspacesAjax);// Determine if a cross-domain request is in order
if(s.crossDomain==null){parts=rurl.exec(s.url.toLowerCase());s.crossDomain=!!(parts&&(parts[1]!=ajaxLocParts[1]||parts[2]!=ajaxLocParts[2]||(parts[3]||(parts[1]==="http:"?80:443))!=(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?80:443))));}// Convert data if not already a string
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}// Apply prefilters
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);// If request was aborted inside a prefiler, stop there
if(state===2){return false;}// We can fire global events as of now if asked to
fireGlobals=s.global;// Uppercase the type
s.type=s.type.toUpperCase();// Determine if request has content
s.hasContent=!rnoContent.test(s.type);// Watch for a new set of requests
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}// More options handling for requests with no content
if(!s.hasContent){// If data is available, append data to url
if(s.data){s.url+=(rquery.test(s.url)?"&":"?")+s.data;}// Get ifModifiedKey before adding the anti-cache parameter
ifModifiedKey=s.url;// Add anti-cache in url if needed
if(s.cache===false){var ts=jQuery.now(),// try replacing _= if it is there
ret=s.url.replace(rts,"$1_="+ts);// if nothing was replaced, add timestamp to the end
s.url=ret+(ret===s.url?(rquery.test(s.url)?"&":"?")+"_="+ts:"");}}// Set the correct header, if data is being sent
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){ifModifiedKey=ifModifiedKey||s.url;if(jQuery.lastModified[ifModifiedKey]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[ifModifiedKey]);}if(jQuery.etag[ifModifiedKey]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[ifModifiedKey]);}}// Set the Accepts header for the server, depending on the dataType
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", */*; q=0.01":""):s.accepts["*"]);// Check for headers option
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}// Allow custom headers/mimetypes and early abort
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){// Abort if not done already
jqXHR.abort();return false;}// Install callbacks on deferreds
for(i in{success:1,error:1,complete:1}){jqXHR[i](s[i]);}// Get transport
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);// If no transport, we auto-abort
if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;// Send global event
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}// Timeout
if(s.async&&s.timeout>0){timeoutTimer=setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}try{state=1;transport.send(requestHeaders,done);}catch(e){// Propagate exception as error if not done
if(status<2){done(-1,e);// Simply rethrow otherwise
}else{jQuery.error(e);}}}return jqXHR;},// Serialize an array of form elements or a set of
// key/values into a query string
param:function param(a,traditional){var s=[],add=function add(key,value){// If value is a function, invoke it and return its value
value=jQuery.isFunction(value)?value():value;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value);};// Set traditional to true for jQuery <= 1.3.2 behavior.
if(traditional===undefined){traditional=jQuery.ajaxSettings.traditional;}// If an array was passed in, assume that it is an array of form elements.
if(jQuery.isArray(a)||a.jquery&&!jQuery.isPlainObject(a)){// Serialize the form elements
jQuery.each(a,function(){add(this.name,this.value);});}else{// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(var prefix in a){buildParams(prefix,a[prefix],traditional,add);}}// Return the resulting serialization
return s.join("&").replace(r20,"+");}});function buildParams(prefix,obj,traditional,add){if(jQuery.isArray(obj)){// Serialize array item.
jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){// Treat each array item as a scalar.
add(prefix,v);}else{// If array item is non-scalar (array or object), encode its
// numeric index to resolve deserialization ambiguity issues.
// Note that rack (as of 1.0.0) can't currently deserialize
// nested arrays properly, and attempting to do so may cause
// a server error. Possible fixes are to modify rack's
// deserialization algorithm or to provide an option or flag
// to force array serialization to be shallow.
buildParams(prefix+"["+((typeof v==="undefined"?"undefined":_typeof(v))==="object"||jQuery.isArray(v)?i:"")+"]",v,traditional,add);}});}else if(!traditional&&obj!=null&&(typeof obj==="undefined"?"undefined":_typeof(obj))==="object"){// Serialize object item.
for(var name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{// Serialize scalar item.
add(prefix,obj);}}// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({// Counter for holding the number of active queries
active:0,// Last-Modified header cache for next request
lastModified:{},etag:{}});/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */function ajaxHandleResponses(s,jqXHR,responses){var contents=s.contents,dataTypes=s.dataTypes,responseFields=s.responseFields,ct,type,finalDataType,firstDataType;// Fill responseXXX fields
for(type in responseFields){if(type in responses){jqXHR[responseFields[type]]=responses[type];}}// Remove auto dataType and get content-type in the process
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("content-type");}}// Check if we're dealing with a known content-type
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}// Check to see if we have a response for the expected dataType
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{// Try convertible dataTypes
for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}if(!firstDataType){firstDataType=type;}}// Or just use first one
finalDataType=finalDataType||firstDataType;}// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}return responses[finalDataType];}}// Chain conversions given the request and the original response
function ajaxConvert(s,response){// Apply the dataFilter if provided
if(s.dataFilter){response=s.dataFilter(response,s.dataType);}var dataTypes=s.dataTypes,converters={},i,key,length=dataTypes.length,tmp,// Current and previous dataTypes
current=dataTypes[0],prev,// Conversion expression
conversion,// Conversion function
conv,// Conversion functions (transitive conversion)
conv1,conv2;// For each dataType in the chain
for(i=1;i<length;i++){// Create converters map
// with lowercased keys
if(i===1){for(key in s.converters){if(typeof key==="string"){converters[key.toLowerCase()]=s.converters[key];}}}// Get the dataTypes
prev=current;current=dataTypes[i];// If current is auto dataType, update it to prev
if(current==="*"){current=prev;// If no auto and dataTypes are actually different
}else if(prev!=="*"&&prev!==current){// Get the converter
conversion=prev+" "+current;conv=converters[conversion]||converters["* "+current];// If there is no direct converter, search transitively
if(!conv){conv2=undefined;for(conv1 in converters){tmp=conv1.split(" ");if(tmp[0]===prev||tmp[0]==="*"){conv2=converters[tmp[1]+" "+current];if(conv2){conv1=converters[conv1];if(conv1===true){conv=conv2;}else if(conv2===true){conv=conv1;}break;}}}}// If we found no converter, dispatch an error
if(!(conv||conv2)){jQuery.error("No conversion from "+conversion.replace(" "," to "));}// If found converter is not an equivalence
if(conv!==true){// Convert with 1 or 2 converters accordingly
response=conv?conv(response):conv2(conv1(response));}}}return response;}var jsc=jQuery.now(),jsre=/(\=)\?(&|$)|\?\?/i;// Default jsonp settings
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function jsonpCallback(){return jQuery.expando+"_"+jsc++;}});// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var inspectData=s.contentType==="application/x-www-form-urlencoded"&&typeof s.data==="string";if(s.dataTypes[0]==="jsonp"||s.jsonp!==false&&(jsre.test(s.url)||inspectData&&jsre.test(s.data))){var responseContainer,jsonpCallback=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback,previous=window[jsonpCallback],url=s.url,data=s.data,replace="$1"+jsonpCallback+"$2";if(s.jsonp!==false){url=url.replace(jsre,replace);if(s.url===url){if(inspectData){data=data.replace(jsre,replace);}if(s.data===data){// Add callback manually
url+=(/\?/.test(url)?"&":"?")+s.jsonp+"="+jsonpCallback;}}}s.url=url;s.data=data;// Install callback
window[jsonpCallback]=function(response){responseContainer=[response];};// Clean-up function
jqXHR.always(function(){// Set callback back to previous value
window[jsonpCallback]=previous;// Call if it was a function and we have a response
if(responseContainer&&jQuery.isFunction(previous)){window[jsonpCallback](responseContainer[0]);}});// Use data converter to retrieve json after script execution
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(jsonpCallback+" was not called");}return responseContainer[0];};// force json dataType
s.dataTypes[0]="json";// Delegate to script
return"script";}});// Install script dataType
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function textScript(text){jQuery.globalEval(text);return text;}}});// Handle cache's special case and global
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}if(s.crossDomain){s.type="GET";s.global=false;}});// Bind script tag hack transport
jQuery.ajaxTransport("script",function(s){// This transport only deals with cross domain requests
if(s.crossDomain){var script,head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;return{send:function send(_,callback){script=document.createElement("script");script.async="async";if(s.scriptCharset){script.charset=s.scriptCharset;}script.src=s.url;// Attach handlers for all browsers
script.onload=script.onreadystatechange=function(_,isAbort){if(isAbort||!script.readyState||/loaded|complete/.test(script.readyState)){// Handle memory leak in IE
script.onload=script.onreadystatechange=null;// Remove the script
if(head&&script.parentNode){head.removeChild(script);}// Dereference the script
script=undefined;// Callback if not abort
if(!isAbort){callback(200,"success");}}};// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
// This arises when a base node is used (#2709 and #4378).
head.insertBefore(script,head.firstChild);},abort:function abort(){if(script){script.onload(0,1);}}};}});var// #5280: Internet Explorer will keep connections alive if we don't abort on unload
xhrOnUnloadAbort=window.ActiveXObject?function(){// Abort all pending requests
for(var key in xhrCallbacks){xhrCallbacks[key](0,1);}}:false,xhrId=0,xhrCallbacks;// Functions to create xhrs
function createStandardXHR(){try{return new window.XMLHttpRequest();}catch(e){}}function createActiveXHR(){try{return new window.ActiveXObject("Microsoft.XMLHTTP");}catch(e){}}// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr=window.ActiveXObject?/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */function(){return!this.isLocal&&createStandardXHR()||createActiveXHR();}:// For all other browsers, use the standard XMLHttpRequest object
createStandardXHR;// Determine support properties
(function(xhr){jQuery.extend(jQuery.support,{ajax:!!xhr,cors:!!xhr&&"withCredentials"in xhr});})(jQuery.ajaxSettings.xhr());// Create transport if the browser can provide an xhr
if(jQuery.support.ajax){jQuery.ajaxTransport(function(s){// Cross domain only allowed if supported through XMLHttpRequest
if(!s.crossDomain||jQuery.support.cors){var _callback;return{send:function send(headers,complete){// Get a new xhr
var xhr=s.xhr(),handle,i;// Open the socket
// Passing null username, generates a login popup on Opera (#2865)
if(s.username){xhr.open(s.type,s.url,s.async,s.username,s.password);}else{xhr.open(s.type,s.url,s.async);}// Apply custom fields if provided
if(s.xhrFields){for(i in s.xhrFields){xhr[i]=s.xhrFields[i];}}// Override mime type if needed
if(s.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(s.mimeType);}// X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
if(!s.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}// Need an extra try/catch for cross domain requests in Firefox 3
try{for(i in headers){xhr.setRequestHeader(i,headers[i]);}}catch(_){}// Do send the request
// This may raise an exception which is actually
// handled in jQuery.ajax (so no try/catch here)
xhr.send(s.hasContent&&s.data||null);// Listener
_callback=function callback(_,isAbort){var status,statusText,responseHeaders,responses,xml;// Firefox throws exceptions when accessing properties
// of an xhr when a network error occured
// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
try{// Was never called and is aborted or complete
if(_callback&&(isAbort||xhr.readyState===4)){// Only called once
_callback=undefined;// Do not keep as active anymore
if(handle){xhr.onreadystatechange=jQuery.noop;if(xhrOnUnloadAbort){delete xhrCallbacks[handle];}}// If it's an abort
if(isAbort){// Abort it manually if needed
if(xhr.readyState!==4){xhr.abort();}}else{status=xhr.status;responseHeaders=xhr.getAllResponseHeaders();responses={};xml=xhr.responseXML;// Construct response list
if(xml&&xml.documentElement/* #4958 */){responses.xml=xml;}responses.text=xhr.responseText;// Firefox throws an exception when accessing
// statusText for faulty cross-domain requests
try{statusText=xhr.statusText;}catch(e){// We normalize with Webkit giving an empty statusText
statusText="";}// Filter status for non standard behaviors
// If the request is local and we have data: assume a success
// (success with no data won't get notified, that's the best we
// can do given current implementations)
if(!status&&s.isLocal&&!s.crossDomain){status=responses.text?200:404;// IE - #1450: sometimes returns 1223 when it should be 204
}else if(status===1223){status=204;}}}}catch(firefoxAccessException){if(!isAbort){complete(-1,firefoxAccessException);}}// Call complete if needed
if(responses){complete(status,statusText,responses,responseHeaders);}};// if we're in sync mode or it's in cache
// and has been retrieved directly (IE6 & IE7)
// we need to manually fire the callback
if(!s.async||xhr.readyState===4){_callback();}else{handle=++xhrId;if(xhrOnUnloadAbort){// Create the active xhrs callbacks list if needed
// and attach the unload handler
if(!xhrCallbacks){xhrCallbacks={};jQuery(window).unload(xhrOnUnloadAbort);}// Add to list of active xhrs callbacks
xhrCallbacks[handle]=_callback;}xhr.onreadystatechange=_callback;}},abort:function abort(){if(_callback){_callback(0,1);}}};}});}var elemdisplay={},iframe,iframeDoc,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,timerId,fxAttrs=[// height animations
["height","marginTop","marginBottom","paddingTop","paddingBottom"],// width animations
["width","marginLeft","marginRight","paddingLeft","paddingRight"],// opacity animations
["opacity"]],fxNow,requestAnimationFrame=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame;jQuery.fn.extend({show:function show(speed,easing,callback){var elem,display;if(speed||speed===0){return this.animate(genFx("show",3),speed,easing,callback);}else{for(var i=0,j=this.length;i<j;i++){elem=this[i];if(elem.style){display=elem.style.display;// Reset the inline display of this element to learn if it is
// being hidden by cascaded rules or not
if(!jQuery._data(elem,"olddisplay")&&display==="none"){display=elem.style.display="";}// Set elements which have been overridden with display: none
// in a stylesheet to whatever the default browser style is
// for such an element
if(display===""&&jQuery.css(elem,"display")==="none"){jQuery._data(elem,"olddisplay",defaultDisplay(elem.nodeName));}}}// Set the display of most of the elements in a second loop
// to avoid the constant reflow
for(i=0;i<j;i++){elem=this[i];if(elem.style){display=elem.style.display;if(display===""||display==="none"){elem.style.display=jQuery._data(elem,"olddisplay")||"";}}}return this;}},hide:function hide(speed,easing,callback){if(speed||speed===0){return this.animate(genFx("hide",3),speed,easing,callback);}else{for(var i=0,j=this.length;i<j;i++){if(this[i].style){var display=jQuery.css(this[i],"display");if(display!=="none"&&!jQuery._data(this[i],"olddisplay")){jQuery._data(this[i],"olddisplay",display);}}}// Set the display of the elements in a second loop
// to avoid the constant reflow
for(i=0;i<j;i++){if(this[i].style){this[i].style.display="none";}}return this;}},// Save the old toggle function
_toggle:jQuery.fn.toggle,toggle:function toggle(fn,fn2,callback){var bool=typeof fn==="boolean";if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){this._toggle.apply(this,arguments);}else if(fn==null||bool){this.each(function(){var state=bool?fn:jQuery(this).is(":hidden");jQuery(this)[state?"show":"hide"]();});}else{this.animate(genFx("toggle",3),fn,fn2,callback);}return this;},fadeTo:function fadeTo(speed,to,easing,callback){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:to},speed,easing,callback);},animate:function animate(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);if(jQuery.isEmptyObject(prop)){return this.each(optall.complete,[false]);}// Do not change referenced properties as per-property easing will be lost
prop=jQuery.extend({},prop);return this[optall.queue===false?"each":"queue"](function(){// XXX 'this' does not always have a nodeName when running the
// test suite
if(optall.queue===false){jQuery._mark(this);}var opt=jQuery.extend({},optall),isElement=this.nodeType===1,hidden=isElement&&jQuery(this).is(":hidden"),name,val,p,display,e,parts,start,end,unit;// will store per property easing and be used to determine when an animation is complete
opt.animatedProperties={};for(p in prop){// property name normalization
name=jQuery.camelCase(p);if(p!==name){prop[name]=prop[p];delete prop[p];}val=prop[name];// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
if(jQuery.isArray(val)){opt.animatedProperties[name]=val[1];val=prop[name]=val[0];}else{opt.animatedProperties[name]=opt.specialEasing&&opt.specialEasing[name]||opt.easing||'swing';}if(val==="hide"&&hidden||val==="show"&&!hidden){return opt.complete.call(this);}if(isElement&&(name==="height"||name==="width")){// Make sure that nothing sneaks out
// Record all 3 overflow attributes because IE does not
// change the overflow attribute when overflowX and
// overflowY are set to the same value
opt.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];// Set display property to inline-block for height/width
// animations on inline elements that are having width/height
// animated
if(jQuery.css(this,"display")==="inline"&&jQuery.css(this,"float")==="none"){if(!jQuery.support.inlineBlockNeedsLayout){this.style.display="inline-block";}else{display=defaultDisplay(this.nodeName);// inline-level elements accept inline-block;
// block-level elements need to be inline with layout
if(display==="inline"){this.style.display="inline-block";}else{this.style.display="inline";this.style.zoom=1;}}}}}if(opt.overflow!=null){this.style.overflow="hidden";}for(p in prop){e=new jQuery.fx(this,opt,p);val=prop[p];if(rfxtypes.test(val)){e[val==="toggle"?hidden?"show":"hide":val]();}else{parts=rfxnum.exec(val);start=e.cur();if(parts){end=parseFloat(parts[2]);unit=parts[3]||(jQuery.cssNumber[p]?"":"px");// We need to compute starting value
if(unit!=="px"){jQuery.style(this,p,(end||1)+unit);start=(end||1)/e.cur()*start;jQuery.style(this,p,start+unit);}// If a +=/-= token was provided, we're doing a relative animation
if(parts[1]){end=(parts[1]==="-="?-1:1)*end+start;}e.custom(start,end,unit);}else{e.custom(start,val,"");}}}// For JS strict compliance
return true;});},stop:function stop(clearQueue,gotoEnd){if(clearQueue){this.queue([]);}this.each(function(){var timers=jQuery.timers,i=timers.length;// clear marker counters if we know they won't be
if(!gotoEnd){jQuery._unmark(true,this);}while(i--){if(timers[i].elem===this){if(gotoEnd){// force the next step to be the last
timers[i](true);}timers.splice(i,1);}}});// start the next in the queue if the last step wasn't forced
if(!gotoEnd){this.dequeue();}return this;}});// Animations created synchronously will run synchronously
function createFxNow(){setTimeout(clearFxNow,0);return fxNow=jQuery.now();}function clearFxNow(){fxNow=undefined;}// Generate parameters to create a standard animation
function genFx(type,num){var obj={};jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){obj[this]=type;});return obj;}// Generate shortcuts for custom animations
jQuery.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.extend({speed:function speed(_speed,easing,fn){var opt=_speed&&(typeof _speed==="undefined"?"undefined":_typeof(_speed))==="object"?jQuery.extend({},_speed):{complete:fn||!fn&&easing||jQuery.isFunction(_speed)&&_speed,duration:_speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;// Queueing
opt.old=opt.complete;opt.complete=function(noUnmark){if(jQuery.isFunction(opt.old)){opt.old.call(this);}if(opt.queue!==false){jQuery.dequeue(this);}else if(noUnmark!==false){jQuery._unmark(this);}};return opt;},easing:{linear:function linear(p,n,firstNum,diff){return firstNum+diff*p;},swing:function swing(p,n,firstNum,diff){return(-Math.cos(p*Math.PI)/2+0.5)*diff+firstNum;}},timers:[],fx:function fx(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;options.orig=options.orig||{};}});jQuery.fx.prototype={// Simple function for setting a style value
update:function update(){if(this.options.step){this.options.step.call(this.elem,this.now,this);}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);},// Get the current size
cur:function cur(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop];}var parsed,r=jQuery.css(this.elem,this.prop);// Empty strings, null, undefined and "auto" are converted to 0,
// complex values such as "rotate(1rad)" are returned as is,
// simple values such as "10px" are parsed to Float.
return isNaN(parsed=parseFloat(r))?!r||r==="auto"?0:r:parsed;},// Start an animation from one number to another
custom:function custom(from,to,unit){var self=this,fx=jQuery.fx,_raf;this.startTime=fxNow||createFxNow();this.start=from;this.end=to;this.unit=unit||this.unit||(jQuery.cssNumber[this.prop]?"":"px");this.now=this.start;this.pos=this.state=0;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;if(t()&&jQuery.timers.push(t)&&!timerId){// Use requestAnimationFrame instead of setInterval if available
if(requestAnimationFrame){timerId=true;_raf=function raf(){// When timerId gets set to null at any point, this stops
if(timerId){requestAnimationFrame(_raf);fx.tick();}};requestAnimationFrame(_raf);}else{timerId=setInterval(fx.tick,fx.interval);}}},// Simple 'show' function
show:function show(){// Remember where we started, so that we can go back to it later
this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);this.options.show=true;// Begin the animation
// Make sure that we start at a small width/height to avoid any
// flash of content
this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());// Start by showing the element
jQuery(this.elem).show();},// Simple 'hide' function
hide:function hide(){// Remember where we started, so that we can go back to it later
this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);this.options.hide=true;// Begin the animation
this.custom(this.cur(),0);},// Each step of an animation
step:function step(gotoEnd){var t=fxNow||createFxNow(),done=true,elem=this.elem,options=this.options,i,n;if(gotoEnd||t>=options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();options.animatedProperties[this.prop]=true;for(i in options.animatedProperties){if(options.animatedProperties[i]!==true){done=false;}}if(done){// Reset the overflow
if(options.overflow!=null&&!jQuery.support.shrinkWrapBlocks){jQuery.each(["","X","Y"],function(index,value){elem.style["overflow"+value]=options.overflow[index];});}// Hide the element if the "hide" operation was done
if(options.hide){jQuery(elem).hide();}// Reset the properties, if the item has been hidden or shown
if(options.hide||options.show){for(var p in options.animatedProperties){jQuery.style(elem,p,options.orig[p]);}}// Execute the complete function
options.complete.call(elem);}return false;}else{// classical easing cannot be used with an Infinity duration
if(options.duration==Infinity){this.now=t;}else{n=t-this.startTime;this.state=n/options.duration;// Perform the easing function, defaults to swing
this.pos=jQuery.easing[options.animatedProperties[this.prop]](this.state,n,0,1,options.duration);this.now=this.start+(this.end-this.start)*this.pos;}// Perform the next step of the animation
this.update();}return true;}};jQuery.extend(jQuery.fx,{tick:function tick(){for(var timers=jQuery.timers,i=0;i<timers.length;++i){if(!timers[i]()){timers.splice(i--,1);}}if(!timers.length){jQuery.fx.stop();}},interval:13,stop:function stop(){clearInterval(timerId);timerId=null;},speeds:{slow:600,fast:200,// Default speed
_default:400},step:{opacity:function opacity(fx){jQuery.style(fx.elem,"opacity",fx.now);},_default:function _default(fx){if(fx.elem.style&&fx.elem.style[fx.prop]!=null){fx.elem.style[fx.prop]=(fx.prop==="width"||fx.prop==="height"?Math.max(0,fx.now):fx.now)+fx.unit;}else{fx.elem[fx.prop]=fx.now;}}}});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};}// Try to restore the default display value of an element
function defaultDisplay(nodeName){if(!elemdisplay[nodeName]){var body=document.body,elem=jQuery("<"+nodeName+">").appendTo(body),display=elem.css("display");elem.remove();// If the simple way fails,
// get element's real default display by attaching it to a temp iframe
if(display==="none"||display===""){// No iframe to use yet, so create it
if(!iframe){iframe=document.createElement("iframe");iframe.frameBorder=iframe.width=iframe.height=0;}body.appendChild(iframe);// Create a cacheable copy of the iframe document on first call.
// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
// document to it; WebKit & Firefox won't allow reusing the iframe document.
if(!iframeDoc||!iframe.createElement){iframeDoc=(iframe.contentWindow||iframe.contentDocument).document;iframeDoc.write((document.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>");iframeDoc.close();}elem=iframeDoc.createElement(nodeName);iframeDoc.body.appendChild(elem);display=jQuery.css(elem,"display");body.removeChild(iframe);}// Store the correct default display
elemdisplay[nodeName]=display;}return elemdisplay[nodeName];}var rtable=/^t(?:able|d|h)$/i,rroot=/^(?:body|html)$/i;if("getBoundingClientRect"in document.documentElement){jQuery.fn.offset=function(options){var elem=this[0],box;if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i);});}if(!elem||!elem.ownerDocument){return null;}if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem);}try{box=elem.getBoundingClientRect();}catch(e){}var doc=elem.ownerDocument,docElem=doc.documentElement;// Make sure we're not dealing with a disconnected DOM node
if(!box||!jQuery.contains(docElem,elem)){return box?{top:box.top,left:box.left}:{top:0,left:0};}var body=doc.body,win=getWindow(doc),clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,scrollTop=win.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop,scrollLeft=win.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft,top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;return{top:top,left:left};};}else{jQuery.fn.offset=function(options){var elem=this[0];if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i);});}if(!elem||!elem.ownerDocument){return null;}if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem);}jQuery.offset.initialize();var computedStyle,offsetParent=elem.offsetParent,prevOffsetParent=elem,doc=elem.ownerDocument,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,top=elem.offsetTop,left=elem.offsetLeft;while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){break;}computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;top-=elem.scrollTop;left-=elem.scrollLeft;if(elem===offsetParent){top+=elem.offsetTop;left+=elem.offsetLeft;if(jQuery.offset.doesNotAddBorder&&!(jQuery.offset.doesAddBorderForTableAndCells&&rtable.test(elem.nodeName))){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0;}prevOffsetParent=offsetParent;offsetParent=elem.offsetParent;}if(jQuery.offset.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0;}prevComputedStyle=computedStyle;}if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;left+=body.offsetLeft;}if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);left+=Math.max(docElem.scrollLeft,body.scrollLeft);}return{top:top,left:left};};}jQuery.offset={initialize:function initialize(){var body=document.body,container=document.createElement("div"),innerDiv,checkDiv,table,td,bodyMarginTop=parseFloat(jQuery.css(body,"marginTop"))||0,html="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";jQuery.extend(container.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});container.innerHTML=html;body.insertBefore(container,body.firstChild);innerDiv=container.firstChild;checkDiv=innerDiv.firstChild;td=innerDiv.nextSibling.firstChild.firstChild;this.doesNotAddBorder=checkDiv.offsetTop!==5;this.doesAddBorderForTableAndCells=td.offsetTop===5;checkDiv.style.position="fixed";checkDiv.style.top="20px";// safari subtracts parent border width here which is 5px
this.supportsFixedPosition=checkDiv.offsetTop===20||checkDiv.offsetTop===15;checkDiv.style.position=checkDiv.style.top="";innerDiv.style.overflow="hidden";innerDiv.style.position="relative";this.subtractsBorderForOverflowNotVisible=checkDiv.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=body.offsetTop!==bodyMarginTop;body.removeChild(container);jQuery.offset.initialize=jQuery.noop;},bodyOffset:function bodyOffset(body){var top=body.offsetTop,left=body.offsetLeft;jQuery.offset.initialize();if(jQuery.offset.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.css(body,"marginTop"))||0;left+=parseFloat(jQuery.css(body,"marginLeft"))||0;}return{top:top,left:left};},setOffset:function setOffset(elem,options,i){var position=jQuery.css(elem,"position");// set position first, in-case top/left are set even on static elem
if(position==="static"){elem.style.position="relative";}var curElem=jQuery(elem),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=(position==="absolute"||position==="fixed")&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1,props={},curPosition={},curTop,curLeft;// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset);}if(options.top!=null){props.top=options.top-curOffset.top+curTop;}if(options.left!=null){props.left=options.left-curOffset.left+curLeft;}if("using"in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({position:function position(){if(!this[0]){return null;}var elem=this[0],// Get *real* offsetParent
offsetParent=this.offsetParent(),// Get correct offsets
offset=this.offset(),parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();// Subtract element margins
// note: when an element has margin: auto the offsetLeft and marginLeft
// are the same in Safari causing offset.left to incorrectly be 0
offset.top-=parseFloat(jQuery.css(elem,"marginTop"))||0;offset.left-=parseFloat(jQuery.css(elem,"marginLeft"))||0;// Add offsetParent borders
parentOffset.top+=parseFloat(jQuery.css(offsetParent[0],"borderTopWidth"))||0;parentOffset.left+=parseFloat(jQuery.css(offsetParent[0],"borderLeftWidth"))||0;// Subtract the two offsets
return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};},offsetParent:function offsetParent(){return this.map(function(){var offsetParent=this.offsetParent||document.body;while(offsetParent&&!rroot.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.offsetParent;}return offsetParent;});}});// Create scrollLeft and scrollTop methods
jQuery.each(["Left","Top"],function(i,name){var method="scroll"+name;jQuery.fn[method]=function(val){var elem,win;if(val===undefined){elem=this[0];if(!elem){return null;}win=getWindow(elem);// Return the scroll offset
return win?"pageXOffset"in win?win[i?"pageYOffset":"pageXOffset"]:jQuery.support.boxModel&&win.document.documentElement[method]||win.document.body[method]:elem[method];}// Set the scroll offset
return this.each(function(){win=getWindow(this);if(win){win.scrollTo(!i?val:jQuery(win).scrollLeft(),i?val:jQuery(win).scrollTop());}else{this[method]=val;}});};});function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false;}// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();// innerHeight and innerWidth
jQuery.fn["inner"+name]=function(){var elem=this[0];return elem&&elem.style?parseFloat(jQuery.css(elem,type,"padding")):null;};// outerHeight and outerWidth
jQuery.fn["outer"+name]=function(margin){var elem=this[0];return elem&&elem.style?parseFloat(jQuery.css(elem,type,margin?"margin":"border")):null;};jQuery.fn[type]=function(size){// Get window width or height
var elem=this[0];if(!elem){return size==null?null:this;}if(jQuery.isFunction(size)){return this.each(function(i){var self=jQuery(this);self[type](size.call(this,i,self[type]()));});}if(jQuery.isWindow(elem)){// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
var docElemProp=elem.document.documentElement["client"+name];return elem.document.compatMode==="CSS1Compat"&&docElemProp||elem.document.body["client"+name]||docElemProp;// Get document width or height
}else if(elem.nodeType===9){// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
return Math.max(elem.documentElement["client"+name],elem.body["scroll"+name],elem.documentElement["scroll"+name],elem.body["offset"+name],elem.documentElement["offset"+name]);// Get or set width or height on the element
}else if(size===undefined){var orig=jQuery.css(elem,type),ret=parseFloat(orig);return jQuery.isNaN(ret)?orig:ret;// Set the width or height on the element (default to pixels if value is unitless)
}else{return this.css(type,typeof size==="string"?size:size+"px");}};});// Expose jQuery to the global object
jQuery_1_6 = jQuery;
})(window);


"use strict";

(function (e) {
    function u(u) {
        function c() {
            function h(e) {
                e.show();
                n.removeClass("loading");
            }
            var t = e(this),
                r = parseInt(n.css("borderLeftWidth")),
                i = s - r * 2,
                u = o - r * 2,
                a = t.width(),
                f = t.height();
            if (a == n.width() && a <= i && f == n.height() && f <= u) {
                h(t);
                return;
            }
            if (a > i || f > u) {
                var l = u < f ? u : f,
                    c = i < a ? i : a;
                if (l / f <= c / a) {
                    t.width(a * l / f);
                    t.height(l);
                } else {
                    t.width(c);
                    t.height(f * c / a);
                }
            }
            n.animate({
                width: t.width(),
                height: t.height(),
                marginTop: -(t.height() / 2) - r,
                marginLeft: -(t.width() / 2) - r
            }, 200, function () {
                h(t);
            });
        }
        if (u) u.preventDefault();
        var a = e(this),
            f = a.attr("href"),
            title = a.attr("title");
        var cntnum = a.parent("li").index() + 1;
        if (!f) return;
        var l = e(new Image()).hide();
        e("#zoom .previous, #zoom .next").show();
        if (a.hasClass("zoom")) e("#zoom .previous, #zoom .next").hide();
        if (!r) {
            r = true;
            t.show();
            e("body").addClass("zoomed");
        }
        n.html(l).delay(500).addClass("loading");
        l.load(c).attr("src", f);
        var selfnum = $(".gallery li").length;
        $("<span class='imgtitle'><lable>" + cntnum + "/" + selfnum + "&nbsp;&nbsp;</lable>" + title + "</span>").appendTo(".content");
        i = a;
    }

    function a() {
        var t = i.parent("li").prev();
        if (t.length == 0) t = e(".gallery li:last-child");
        t.find("a").trigger("click");
    }

    function f() {
        var t = i.parent("li").next();
        if (t.length == 0) t = e(".gallery li:first-child");
        t.children("a").trigger("click");
    }

    function l(s) {
        if (s) s.preventDefault();
        r = false;
        i = null;
        t.hide();
        e("body").removeClass("zoomed");
        n.empty();
    }

    function c() {
        s = e(window).width();
        o = e(window).height();
    }
    e("body").append('<div id="zoom"><a class="close"></a><a href="#previous" class="previous"></a><a href="#next" class="next"></a><div class="content loading"></div><div class="imgtitle"></div></div>');
    var t = e("#zoom").hide(),
        n = e("#zoom .content"),
        r = false,
        i = null,
        s = e(window).width(),
        o = e(window).height() - 50;
    (function () {
        t.on("click", function (t) {
            t.preventDefault();
            if (e(t.target).attr("id") == "zoom") l();
        });
        e("#zoom .close").on("click", l);
        e("#zoom .previous").on("click", a);
        e("#zoom .next").on("click", f);
        e(document).keydown(function (e) {
            if (!i) return;
            if (e.which == 38 || e.which == 40) e.preventDefault();
            if (e.which == 27) l();
            if (e.which == 37 && !i.hasClass("zoom")) a();
            if (e.which == 39 && !i.hasClass("zoom")) f();
        });
        if (e(".gallery li a").length == 1) e(".gallery li a").addClass("zoom");
        e(".zoom, .gallery li a").on("click", u);
    })();
    (function () {
        e(window).on("resize", c);
    })();
    (function () {
        e(window).on("mousewheel DOMMouseScroll", function (e) {
            if (!i) return;
            e.stopPropagation();
            e.preventDefault();
            e.cancelBubble = false;
        });
    })();
})(jQuery);


'use strict';

/*!
 * jQzoom Evolution Library v2.3  - Javascript Image magnifier
 * http://www.mind-projects.it
 *
 * Copyright 2011, Engineer Marco Renzi
 * Licensed under the BSD license.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the organization nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * Date: 03 May 2011 22:16:00
 */

/*global jQuery*/

(function ($) {
  //GLOBAL VARIABLES
  var isIE6 = $.browser.msie && $.browser.version < 7;
  var body = $(document.body);
  var window = $(window);
  var jqzoompluging_disabled = false; //disabilita globalmente il plugin
  $.fn.jqzoom = function (options) {
    return this.each(function () {
      var node = this.nodeName.toLowerCase();
      if (node == 'a') {
        new jqzoom(this, options);
      }
    });
  };
  var jqzoom = function jqzoom(el, options) {
    var api = null;
    api = $(el).data("jqzoom");
    if (api) return api;
    var obj = this;
    var settings = $.extend({}, $.jqzoom.defaults, options || {});
    obj.el = el;
    el.rel = $(el).attr('rel');
    //ANCHOR ELEMENT
    el.zoom_active = false;
    el.zoom_disabled = false; //to disable single zoom instance
    el.largeimageloading = false; //tell us if large image is loading
    el.largeimageloaded = false; //tell us if large image is loaded
    el.scale = {};
    el.timer = null;
    el.mousepos = {};
    el.mouseDown = false;
    $(el).css({
      'outline-style': 'none',
      'text-decoration': 'none'
    });
    //BASE IMAGE
    var img = $("img:eq(0)", el);
    el.title = $(el).attr('title');
    el.imagetitle = img.attr('title');
    var zoomtitle = $.trim(el.title).length > 0 ? el.title : el.imagetitle;
    var smallimage = new Smallimage(img);
    var lens = new Lens();
    var stage = new Stage();
    var largeimage = new Largeimage();
    var loader = new Loader();
    //preventing default click,allowing the onclick event [exmple: lightbox]
    $(el).bind('click', function (e) {
      e.preventDefault();
      return false;
    });
    //setting the default zoomType if not in settings
    var zoomtypes = ['standard', 'drag', 'innerzoom', 'reverse'];
    if ($.inArray($.trim(settings.zoomType), zoomtypes) < 0) {
      settings.zoomType = 'standard';
    }
    $.extend(obj, {
      create: function create() {
        //create the main objects
        //create ZoomPad
        if ($(".zoomPad", el).length == 0) {
          el.zoomPad = $('<div/>').addClass('zoomPad');
          img.wrap(el.zoomPad);
        }
        if (settings.zoomType == 'innerzoom') {
          settings.zoomWidth = smallimage.w;
          settings.zoomHeight = smallimage.h;
        }
        //creating ZoomPup
        if ($(".zoomPup", el).length == 0) {
          lens.append();
        }
        //creating zoomWindow
        if ($(".zoomWindow", el).length == 0) {
          stage.append();
        }
        //creating Preload
        if ($(".zoomPreload", el).length == 0) {
          loader.append();
        }
        //preloading images
        if (settings.preloadImages || settings.zoomType == 'drag' || settings.alwaysOn) {
          obj.load();
        }
        obj.init();
      },
      init: function init() {
        //drag option
        if (settings.zoomType == 'drag') {
          $(".zoomPad", el).mousedown(function () {
            el.mouseDown = true;
          });
          $(".zoomPad", el).mouseup(function () {
            el.mouseDown = false;
          });
          document.body.ondragstart = function () {
            return false;
          };
          $(".zoomPad", el).css({
            cursor: 'default'
          });
          $(".zoomPup", el).css({
            cursor: 'move'
          });
        }
        if (settings.zoomType == 'innerzoom') {
          $(".zoomWrapper", el).css({
            cursor: 'crosshair'
          });
        }
        $(".zoomPad", el).bind('mouseenter mouseover', function (event) {
          img.attr('title', '');
          $(el).attr('title', '');
          el.zoom_active = true;
          //if loaded then activate else load large image
          smallimage.fetchdata();
          if (el.largeimageloaded) {
            obj.activate(event);
          } else {
            obj.load();
          }
        });
        $(".zoomPad", el).bind('mouseleave', function (event) {
          obj.deactivate();
        });
        $(".zoomPad", el).bind('mousemove', function (e) {

          //prevent fast mouse mevements not to fire the mouseout event
          if (e.pageX > smallimage.pos.r || e.pageX < smallimage.pos.l || e.pageY < smallimage.pos.t || e.pageY > smallimage.pos.b) {
            lens.setcenter();
            return false;
          }
          el.zoom_active = true;
          if (el.largeimageloaded && !$('.zoomWindow', el).is(':visible')) {
            obj.activate(e);
          }
          if (el.largeimageloaded && (settings.zoomType != 'drag' || settings.zoomType == 'drag' && el.mouseDown)) {
            lens.setposition(e);
          }
        });
        var thumb_preload = new Array();
        var i = 0;
        //binding click event on thumbnails
        var thumblist = new Array();
        thumblist = $('a').filter(function () {
          var regex = new RegExp("gallery[\\s]*:[\\s]*'" + $.trim(el.rel) + "'", "i");
          var rel = $(this).attr('rel');
          if (regex.test(rel)) {
            return this;
          }
        });
        if (thumblist.length > 0) {
          //getting the first to the last
          var first = thumblist.splice(0, 1);
          thumblist.push(first);
        }
        thumblist.each(function () {
          //preloading thumbs
          if (settings.preloadImages) {
            var thumb_options = $.extend({}, eval("(" + $.trim($(this).attr('rel')) + ")"));
            thumb_preload[i] = new Image();
            thumb_preload[i].src = thumb_options.largeimage;
            i++;
          }
          $(this).mouseover(function (e) {
            if ($(this).hasClass('zoomThumbActive')) {
              return false;
            }
            thumblist.each(function () {
              $(this).removeClass('zoomThumbActive');
            });
            e.preventDefault();
            obj.swapimage(this);
            return false;
          });
        });
      },
      load: function load() {
        if (el.largeimageloaded == false && el.largeimageloading == false) {
          var url = $(el).attr('href');
          el.largeimageloading = true;
          largeimage.loadimage(url);
        }
      },
      activate: function activate(e) {
        clearTimeout(el.timer);
        //show lens and zoomWindow
        lens.show();
        stage.show();
      },
      deactivate: function deactivate(e) {
        switch (settings.zoomType) {
          case 'drag':
            //nothing or lens.setcenter();
            break;
          default:
            img.attr('title', el.imagetitle);
            $(el).attr('title', el.title);
            if (settings.alwaysOn) {
              lens.setcenter();
            } else {
              stage.hide();
              lens.hide();
            }
            break;
        }
        el.zoom_active = false;
      },
      swapimage: function swapimage(link) {
		  //更换 图片放大列表
		  var ZoomBigImages=$(el).attr('href');
		  var ZoomSmallImages=img.attr('src');

        el.largeimageloading = false;
        el.largeimageloaded = false;
        var options = new Object();
        options = $.extend({}, eval("(" + $.trim($(link).attr('rel')) + ")"));
        if (options.smallimage && options.largeimage) {
          var smallimage = options.smallimage;
          var largeimage = options.largeimage;

			$('.imgmore').each(function (index) {
				if($(this).attr('href') === largeimage){
					$(this).attr('href',ZoomBigImages);
					$(this).children('img').attr('src',ZoomSmallImages);
				}
			});

          $(link).addClass('zoomThumbActive');
          $(el).attr('href', largeimage);
          img.attr('src', smallimage);
          lens.hide();
          stage.hide();
          obj.load();
        } else {
          alert('ERROR :: Missing parameter for largeimage or smallimage.');
          throw 'ERROR :: Missing parameter for largeimage or smallimage.';
        }
        return false;
      }
    });
    //sometimes image is already loaded and onload will not fire
    if (img[0].complete) {
      //fetching data from sallimage if was previously loaded
      smallimage.fetchdata();
      if ($(".zoomPad", el).length == 0) obj.create();
    }
    /*========================================================,
     |   Smallimage
     |---------------------------------------------------------:
     |   Base image into the anchor element
     `========================================================*/

    function Smallimage(image) {
      var $obj = this;
      this.node = image[0];
      this.findborder = function () {
        var bordertop = 0;
        bordertop = image.css('border-top-width');
        var btop = '';
        var borderleft = 0;
        borderleft = image.css('border-left-width');
        var bleft = '';
        if (bordertop) {
          for (var i = 0; i < 3; i++) {
            var x = [];
            x = bordertop.substr(i, 1);
            if (isNaN(x) == false) {
              btop = btop + '' + bordertop.substr(i, 1);
            } else {
              break;
            }
          }
        }
        if (borderleft) {
          for (i = 0; i < 3; i++) {
            if (!isNaN(borderleft.substr(i, 1))) {
              bleft = bleft + borderleft.substr(i, 1);
            } else {
              break;
            }
          }
        }
        $obj.btop = btop.length > 0 ? eval(btop) : 0;
        $obj.bleft = bleft.length > 0 ? eval(bleft) : 0;
      };
      this.fetchdata = function () {
        $obj.findborder();
        $obj.w = image.width();
        $obj.h = image.height();
        $obj.ow = image.outerWidth();
        $obj.oh = image.outerHeight();
        $obj.pos = image.offset();
        $obj.pos.l = image.offset().left + $obj.bleft;
        $obj.pos.t = image.offset().top + $obj.btop;
        $obj.pos.r = $obj.w + $obj.pos.l;
        $obj.pos.b = $obj.h + $obj.pos.t;
        $obj.rightlimit = image.offset().left + $obj.ow;
        $obj.bottomlimit = image.offset().top + $obj.oh;
      };
      this.node.onerror = function () {
        alert('Problems while loading image.');
        throw 'Problems while loading image.';
      };
      this.node.onload = function () {
        $obj.fetchdata();
        if ($(".zoomPad", el).length == 0) obj.create();
      };
      return $obj;
    };
    /*========================================================,
     |  Loader
     |---------------------------------------------------------:
     |  Show that the large image is loading
     `========================================================*/

    function Loader() {
      var $obj = this;
      this.append = function () {
        this.node = $('<div/>').addClass('zoomPreload').css('visibility', 'hidden').html(settings.preloadText);
        $('.zoomPad', el).append(this.node);
      };
      this.show = function () {
        this.node.top = (smallimage.oh - this.node.height()) / 2;
        this.node.left = (smallimage.ow - this.node.width()) / 2;
        //setting position
        this.node.css({
          top: 0,
          left: 0,
          position: 'absolute',
          visibility: 'visible',

        });
      };
      this.hide = function () {
        this.node.css('visibility', 'hidden');
      };
      return this;
    }

    /*========================================================,
     |   Lens
     |---------------------------------------------------------:
     |   Lens over the image
     `========================================================*/

    function Lens() {
      var $obj = this;
      this.node = $('<div/>').addClass('zoomPup');
      //this.nodeimgwrapper = $("<div/>").addClass('zoomPupImgWrapper');
      this.append = function () {
        $('.zoomPad', el).append($(this.node).hide());
        if (settings.zoomType == 'reverse') {
          this.image = new Image();
          this.image.src = smallimage.node.src; // fires off async
          $(this.node).empty().append(this.image);
        }
      };
      this.setdimensions = function () {
        this.node.w = parseInt(settings.zoomWidth / el.scale.x) > smallimage.w ? smallimage.w : parseInt(settings.zoomWidth / el.scale.x);
        this.node.h = parseInt(settings.zoomHeight / el.scale.y) > smallimage.h ? smallimage.h : parseInt(settings.zoomHeight / el.scale.y);
        this.node.top = (smallimage.oh - this.node.h - 2) / 2;
        this.node.left = (smallimage.ow - this.node.w - 2) / 2;
        //centering lens
        this.node.css({
          top: 0,
          left: 0,
          width: this.node.w + 'px',
          height: this.node.h + 'px',
          position: 'absolute',
          display: 'none',
          borderWidth: 1 + 'px'
        });

        if (settings.zoomType == 'reverse') {
          this.image.src = smallimage.node.src;
          $(this.node).css({
            'opacity': 1
          });

          $(this.image).css({
            position: 'absolute',
            display: 'block',
            left: -(this.node.left + 1 - smallimage.bleft) + 'px',
            top: -(this.node.top + 1 - smallimage.btop) + 'px'
          });
        }
      };
      this.setcenter = function () {
        //calculating center position
        this.node.top = (smallimage.oh - this.node.h - 2) / 2;
        this.node.left = (smallimage.ow - this.node.w - 2) / 2;
        //centering lens
        this.node.css({
          top: this.node.top,
          left: this.node.left
        });
        if (settings.zoomType == 'reverse') {
          $(this.image).css({
            position: 'absolute',
            display: 'block',
            left: -(this.node.left + 1 - smallimage.bleft) + 'px',
            top: -(this.node.top + 1 - smallimage.btop) + 'px'
          });
        }
        //centering large image
        largeimage.setposition();
      };
      this.setposition = function (e) {
        el.mousepos.x = e.pageX;
        el.mousepos.y = e.pageY;
        var lensleft = 0;
        var lenstop = 0;

        function overleft(lens) {
          return el.mousepos.x - lens.w / 2 < smallimage.pos.l;
        }

        function overright(lens) {
          return el.mousepos.x + lens.w / 2 > smallimage.pos.r;
        }

        function overtop(lens) {
          return el.mousepos.y - lens.h / 2 < smallimage.pos.t;
        }

        function overbottom(lens) {
          return el.mousepos.y + lens.h / 2 > smallimage.pos.b;
        }

        lensleft = el.mousepos.x + smallimage.bleft - smallimage.pos.l - (this.node.w + 2) / 2;
        lenstop = el.mousepos.y + smallimage.btop - smallimage.pos.t - (this.node.h + 2) / 2;
        if (overleft(this.node)) {
          lensleft = smallimage.bleft - 1;
        } else if (overright(this.node)) {
          lensleft = smallimage.w + smallimage.bleft - this.node.w - 1;
        }
        if (overtop(this.node)) {
          lenstop = smallimage.btop - 1;
        } else if (overbottom(this.node)) {
          lenstop = smallimage.h + smallimage.btop - this.node.h - 1;
        }

        this.node.left = lensleft;
        this.node.top = lenstop;
        this.node.css({
          'left': lensleft + 'px',
          'top': lenstop + 'px'
        });
        if (settings.zoomType == 'reverse') {
          if ($.browser.msie && $.browser.version > 7) {
            $(this.node).empty().append(this.image);
          }

          $(this.image).css({
            position: 'absolute',
            display: 'block',
            left: -(this.node.left + 1 - smallimage.bleft) + 'px',
            top: -(this.node.top + 1 - smallimage.btop) + 'px'
          });
        }

        largeimage.setposition();
      };
      this.hide = function () {
        img.css({
          'opacity': 1
        });
        this.node.hide();
      };
      this.show = function () {

        if (settings.zoomType != 'innerzoom' && (settings.lens || settings.zoomType == 'drag')) {
          this.node.show();
        }

        if (settings.zoomType == 'reverse') {
          img.css({
            'opacity': settings.imageOpacity
          });
        }
      };
      this.getoffset = function () {
        var o = {};
        o.left = $obj.node.left;
        o.top = $obj.node.top;
        return o;
      };
      return this;
    };
    /*========================================================,
     |   Stage
     |---------------------------------------------------------:
     |   Window area that contains the large image
     `========================================================*/

    function Stage() {
      var $obj = this;
      this.node = $("<div class='zoomWindow'><div class='zoomWrapper'><div class='zoomWrapperTitle'></div><div class='zoomWrapperImage'></div></div></div>");
      this.ieframe = $('<iframe class="zoomIframe" src="javascript:\'\';" marginwidth="0" marginheight="0" align="bottom" scrolling="no" frameborder="0" ></iframe>');
      this.setposition = function () {
        this.node.leftpos = 0;
        this.node.toppos = 0;
        if (settings.zoomType != 'innerzoom') {
          //positioning
          switch (settings.position) {
            case "left":
              this.node.leftpos = smallimage.pos.l - smallimage.bleft - Math.abs(settings.xOffset) - settings.zoomWidth > 0 ? 0 - settings.zoomWidth - Math.abs(settings.xOffset) : smallimage.ow + Math.abs(settings.xOffset);
              this.node.toppos = Math.abs(settings.yOffset);
              break;
            case "top":
              this.node.leftpos = Math.abs(settings.xOffset);
              this.node.toppos = smallimage.pos.t - smallimage.btop - Math.abs(settings.yOffset) - settings.zoomHeight > 0 ? 0 - settings.zoomHeight - Math.abs(settings.yOffset) : smallimage.oh + Math.abs(settings.yOffset);
              break;
            case "bottom":
              this.node.leftpos = Math.abs(settings.xOffset);
              this.node.toppos = smallimage.pos.t - smallimage.btop + smallimage.oh + Math.abs(settings.yOffset) + settings.zoomHeight < screen.height ? smallimage.oh + Math.abs(settings.yOffset) : 0 - settings.zoomHeight - Math.abs(settings.yOffset);
              break;
            default:
              //this.node.leftpos = smallimage.rightlimit + Math.abs(settings.xOffset) + settings.zoomWidth < screen.width ? smallimage.ow + Math.abs(settings.xOffset) : 0 - settings.zoomWidth - Math.abs(settings.xOffset);
				this.node.leftpos = smallimage.ow + Math.abs(settings.xOffset);
              this.node.toppos = Math.abs(settings.yOffset);
              break;
          }
        }
        this.node.css({
          'left': this.node.leftpos + 'px',
          'top': this.node.toppos + 'px'
        });
        return this;
      };
      this.append = function () {
        $('.zoomPad', el).append(this.node);
        this.node.css({
          position: 'absolute',
          display: 'none',
          zIndex: 5001
        });
        if (settings.zoomType == 'innerzoom') {
          this.node.css({
            cursor: 'default'
          });
          var thickness = smallimage.bleft == 0 ? 1 : smallimage.bleft;
          $('.zoomWrapper', this.node).css({
            borderWidth: thickness + 'px'
          });
        }

        $('.zoomWrapper', this.node).css({
          width: Math.round(settings.zoomWidth) + 'px',
          borderWidth: thickness + 'px'
        });
        $('.zoomWrapperImage', this.node).css({
          width: '100%',
          height: Math.round(settings.zoomHeight) + 'px'
        });
        //zoom title
        $('.zoomWrapperTitle', this.node).css({
          width: '100%',
          position: 'absolute'
        });

        $('.zoomWrapperTitle', this.node).hide();
        if (settings.title && zoomtitle.length > 0) {
          $('.zoomWrapperTitle', this.node).html(zoomtitle).show();
        }
        $obj.setposition();
      };
      this.hide = function () {
        switch (settings.hideEffect) {
          case 'fadeout':
            this.node.fadeOut(settings.fadeoutSpeed, function () {});
            break;
          default:
            this.node.hide();
            break;
        }
        this.ieframe.hide();
      };
      this.show = function () {
        switch (settings.showEffect) {
          case 'fadein':
            this.node.fadeIn();
            this.node.fadeIn(settings.fadeinSpeed, function () {});
            break;
          default:
            this.node.show();
            break;
        }
        if (isIE6 && settings.zoomType != 'innerzoom') {
          this.ieframe.width = this.node.width();
          this.ieframe.height = this.node.height();
          this.ieframe.left = this.node.leftpos;
          this.ieframe.top = this.node.toppos;
          this.ieframe.css({
            display: 'block',
            position: "absolute",
            left: this.ieframe.left,
            top: this.ieframe.top,
            zIndex: 99,
            width: this.ieframe.width + 'px',
            height: this.ieframe.height + 'px'
          });
          $('.zoomPad', el).append(this.ieframe);
          this.ieframe.show();
        }
        ;
      };
    };
    /*========================================================,
     |   LargeImage
     |---------------------------------------------------------:
     |   The large detailed image
     `========================================================*/

    function Largeimage() {
      var $obj = this;
      this.node = new Image();
      this.loadimage = function (url) {
        //showing preload
        loader.show();
        this.url = url;
        this.node.style.position = 'absolute';
        this.node.style.border = '0px';
        this.node.style.display = 'none';
        this.node.style.left = '-5000px';
        this.node.style.top = '0px';
        document.body.appendChild(this.node);
        this.node.src = url; // fires off async
      };
      this.fetchdata = function () {
        var image = $(this.node);
        var scale = {};
        this.node.style.display = 'block';
        $obj.w = image.width();
        $obj.h = image.height();
        $obj.pos = image.offset();
        $obj.pos.l = image.offset().left;
        $obj.pos.t = image.offset().top;
        $obj.pos.r = $obj.w + $obj.pos.l;
        $obj.pos.b = $obj.h + $obj.pos.t;
        scale.x = $obj.w / smallimage.w;
        scale.y = $obj.h / smallimage.h;
        el.scale = scale;
        document.body.removeChild(this.node);
        $('.zoomWrapperImage', el).empty().append(this.node);
        //setting lens dimensions;
        lens.setdimensions();
      };
      this.node.onerror = function () {
        alert('Problems while loading the big image.');
        throw 'Problems while loading the big image.';
      };
      this.node.onload = function () {
        //fetching data
        $obj.fetchdata();
        loader.hide();
        el.largeimageloading = false;
        el.largeimageloaded = true;
        if (settings.zoomType == 'drag' || settings.alwaysOn) {
          lens.show();
          stage.show();
          lens.setcenter();
        }
      };
      this.setposition = function () {
        var left = -el.scale.x * (lens.getoffset().left - smallimage.bleft + 1);
        var top = -el.scale.y * (lens.getoffset().top - smallimage.btop + 1);
        $(this.node).css({
          'left': left + 'px',

          'top': top + 'px'
        });
      };
      return this;
    };
    $(el).data("jqzoom", obj);
  };
  //es. $.jqzoom.disable('#jqzoom1');
  $.jqzoom = {
    defaults: {
      zoomType: 'standard',
      //innerzoom/standard/reverse/drag
      zoomWidth: 300,
      //zoomWindow  default width
      zoomHeight: 300,
      //zoomWindow  default height
      xOffset: 10,
      //zoomWindow x offset, can be negative(more on the left) or positive(more on the right)
      yOffset: 0,
      //zoomWindow y offset, can be negative(more on the left) or positive(more on the right)
      position: "right",
      //zoomWindow default position
      preloadImages: true,
      //image preload
      //preloadText: 'Loading...',
	  preloadText: '',
      title: true,
      lens: true,
      imageOpacity: 0.4,
      alwaysOn: false,
      showEffect: 'show',
      //show/fadein
      hideEffect: 'hide',
      //hide/fadeout
      fadeinSpeed: 'slow',
      //fast/slow/number
      fadeoutSpeed: '2000' //fast/slow/number
    },
    disable: function disable(el) {
      var api = $(el).data('jqzoom');
      api.disable();
      return false;
    },
    enable: function enable(el) {
      var api = $(el).data('jqzoom');
      api.enable();
      return false;
    },
    disableAll: function disableAll(el) {
      jqzoompluging_disabled = true;
    },
    enableAll: function enableAll(el) {
      jqzoompluging_disabled = false;
    }
  };
})(jQuery_1_6);


/*!
 * artTemplate - Template Engine
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */

/* eslint-disable */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

!function (window) {

    /**
     * 模板引擎
     * @name    template
     * @param   {String}            模板名
     * @param   {Object, String}    数据。如果为字符串则编译并缓存编译结果
     * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
     */
    var template = function template(filename, content) {
        return typeof content === 'string' ? compile(content, {
            filename: filename
        }) : renderFile(filename, content);
    };

    template.version = '3.0.0';

    /**
     * 设置全局配置
     * @name    template.config
     * @param   {String}    名称
     * @param   {Any}       值
     */
    template.config = function (name, value) {
        defaults[name] = value;
    };

    var defaults = template.defaults = {
        openTag: '<%', // 逻辑语法开始标签
        closeTag: '%>', // 逻辑语法结束标签
        escape: true, // 是否编码输出变量的 HTML 字符
        cache: true, // 是否开启缓存（依赖 options 的 filename 字段）
        compress: false, // 是否压缩输出
        parser: null // 自定义语法格式器 @see: template-syntax.js
    };

    var cacheStore = template.cache = {};

    /**
     * 渲染模板
     * @name    template.render
     * @param   {String}    模板
     * @param   {Object}    数据
     * @return  {String}    渲染好的字符串
     */
    template.render = function (source, options) {
        return compile(source, options);
    };

    /**
     * 渲染模板(根据模板名)
     * @name    template.render
     * @param   {String}    模板名
     * @param   {Object}    数据
     * @return  {String}    渲染好的字符串
     */
    var renderFile = template.renderFile = function (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn;
    };

    /**
     * 获取编译缓存（可由外部重写此方法）
     * @param   {String}    模板名
     * @param   {Function}  编译好的函数
     */
    template.get = function (filename) {

        var cache;

        if (cacheStore[filename]) {
            // 使用内存缓存
            cache = cacheStore[filename];
        } else if ((typeof document === 'undefined' ? 'undefined' : _typeof(document)) === 'object') {
            // 加载模板并编译
            var elem = document.getElementById(filename);

            if (elem) {
                var source = (elem.value || elem.innerHTML).replace(/^\s*|\s*$/g, '');
                cache = compile(source, {
                    filename: filename
                });
            }
        }

        return cache;
    };

    var toString = function toString(value, type) {

        if (typeof value !== 'string') {

            type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;
    };

    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };

    var escapeFn = function escapeFn(s) {
        return escapeMap[s];
    };

    var escapeHTML = function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };

    var isArray = Array.isArray || function (obj) {
        return {}.toString.call(obj) === '[object Array]';
    };

    var each = function each(data, callback) {
        var i, len;
        if (isArray(data)) {
            for (i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };

    var utils = template.utils = {

        $helpers: {},

        $include: renderFile,

        $string: toString,

        $escape: escapeHTML,

        $each: each

    };
    /**
     * 添加模板辅助方法
     * @name    template.helper
     * @param   {String}    名称
     * @param   {Function}  方法
     */
    template.helper = function (name, helper) {
        helpers[name] = helper;
    };

    var helpers = template.helpers = utils.$helpers;

    /**
     * 模板错误事件（可由外部重写此方法）
     * @name    template.onerror
     * @event
     */
    template.onerror = function (e) {
        var message = 'Template Error\n\n';
        for (var name in e) {
            message += '<' + name + '>\n' + e[name] + '\n\n';
        }

        if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object') {
            console.error(message);
        }
    };

    // 模板调试器
    var showDebugInfo = function showDebugInfo(e) {

        template.onerror(e);

        return function () {
            return '{Template Error}';
        };
    };

    /**
     * 编译模板
     * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
     * @name    template.compile
     * @param   {String}    模板字符串
     * @param   {Object}    编译选项
     *
     *      - openTag       {String}
     *      - closeTag      {String}
     *      - filename      {String}
     *      - escape        {Boolean}
     *      - compress      {Boolean}
     *      - debug         {Boolean}
     *      - cache         {Boolean}
     *      - parser        {Function}
     *
     * @return  {Function}  渲染方法
     */
    var compile = template.compile = function (source, options) {

        // 合并默认配置
        options = options || {};
        for (var name in defaults) {
            if (options[name] === undefined) {
                options[name] = defaults[name];
            }
        }

        var filename = options.filename;

        try {

            var Render = compiler(source, options);
        } catch (e) {

            e.filename = filename || 'anonymous';
            e.name = 'Syntax Error';

            return showDebugInfo(e);
        }

        // 对编译结果进行一次包装

        function render(data) {

            try {

                return new Render(data, filename) + '';
            } catch (e) {

                // 运行时出错后自动开启调试模式重新编译
                if (!options.debug) {
                    options.debug = true;
                    return compile(source, options)(data);
                }

                return showDebugInfo(e)();
            }
        }

        render.prototype = Render.prototype;
        render.toString = function () {
            return Render.toString();
        };

        if (filename && options.cache) {
            cacheStore[filename] = render;
        }

        return render;
    };

    // 数组迭代
    var forEach = utils.$each;

    // 静态分析模板变量
    var KEYWORDS =
    // 关键字
    'break,case,catch,continue,debugger,default,delete,do,else,false' + ',finally,for,function,if,in,instanceof,new,null,return,switch,this' + ',throw,true,try,typeof,var,void,while,with'

    // 保留字
    + ',abstract,boolean,byte,char,class,const,double,enum,export,extends' + ',final,float,goto,implements,import,int,interface,long,native' + ',package,private,protected,public,short,static,super,synchronized' + ',throws,transient,volatile'

    // ECMA 5 - use strict
    + ',arguments,let,yield' + ',undefined';

    var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
    var SPLIT_RE = /[^\w$]+/g;
    var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
    var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
    var BOUNDARY_RE = /^,+|,+$/g;
    var SPLIT2_RE = /^$|,+/;

    // 获取变量
    function getVariable(code) {
        return code.replace(REMOVE_RE, '').replace(SPLIT_RE, ',').replace(KEYWORDS_RE, '').replace(NUMBER_RE, '').replace(BOUNDARY_RE, '').split(SPLIT2_RE);
    };

    // 字符串转义
    function stringify(code) {
        return "'" + code
        // 单引号与反斜杠转义
        .replace(/('|\\)/g, '\\$1')
        // 换行符转义(windows + linux)
        .replace(/\r/g, '\\r').replace(/\n/g, '\\n') + "'";
    }

    function compiler(source, options) {

        var debug = options.debug;
        var openTag = options.openTag;
        var closeTag = options.closeTag;
        var parser = options.parser;
        var compress = options.compress;
        var escape = options.escape;

        var line = 1;
        var uniq = { $data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1 };

        var isNewEngine = ''.trim; // '__proto__' in {}
        var replaces = isNewEngine ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"];

        var concat = isNewEngine ? "$out+=text;return $out;" : "$out.push(text);";

        var print = "function(){" + "var text=''.concat.apply('',arguments);" + concat + "}";

        var include = "function(filename,data){" + "data=data||$data;" + "var text=$utils.$include(filename,data,$filename);" + concat + "}";

        var headerCode = "'use strict';" + "var $utils=this,$helpers=$utils.$helpers," + (debug ? "$line=0," : "");

        var mainCode = replaces[0];

        var footerCode = "return new String(" + replaces[3] + ");";

        // html与逻辑语法分离
        forEach(source.split(openTag), function (code) {
            code = code.split(closeTag);

            var $0 = code[0];
            var $1 = code[1];

            // code: [html]
            if (code.length === 1) {

                mainCode += html($0);

                // code: [logic, html]
            } else {

                mainCode += logic($0);

                if ($1) {
                    mainCode += html($1);
                }
            }
        });

        var code = headerCode + mainCode + footerCode;

        // 调试语句
        if (debug) {
            code = "try{" + code + "}catch(e){" + "throw {" + "filename:$filename," + "name:'Render Error'," + "message:e.message," + "line:$line," + "source:" + stringify(source) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')" + "};" + "}";
        }

        try {

            var Render = new Function("$data", "$filename", code);
            Render.prototype = utils;

            return Render;
        } catch (e) {
            e.temp = "function anonymous($data,$filename) {" + code + "}";
            throw e;
        }

        // 处理 HTML 语句
        function html(code) {

            // 记录行号
            line += code.split(/\n/).length - 1;

            // 压缩多余空白与注释
            if (compress) {
                code = code.replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '');
            }

            if (code) {
                code = replaces[1] + stringify(code) + replaces[2] + "\n";
            }

            return code;
        }

        // 处理逻辑语句
        function logic(code) {

            var thisLine = line;

            if (parser) {

                // 语法转换插件钩子
                code = parser(code, options);
            } else if (debug) {

                // 记录行号
                code = code.replace(/\n/g, function () {
                    line++;
                    return "$line=" + line + ";";
                });
            }

            // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
            // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
            if (code.indexOf('=') === 0) {

                var escapeSyntax = escape && !/^=[=#]/.test(code);

                code = code.replace(/^=[=#]?|[\s;]*$/g, '');

                // 对内容编码
                if (escapeSyntax) {

                    var name = code.replace(/\s*\([^\)]+\)/, '');

                    // 排除 utils.* | include | print

                    if (!utils[name] && !/^(include|print)$/.test(name)) {
                        code = "$escape(" + code + ")";
                    }

                    // 不编码
                } else {
                    code = "$string(" + code + ")";
                }

                code = replaces[1] + code + replaces[2];
            }

            if (debug) {
                code = "$line=" + thisLine + ";" + code;
            }

            // 提取模板中的变量名
            forEach(getVariable(code), function (name) {

                // name 值可能为空，在安卓低版本浏览器下
                if (!name || uniq[name]) {
                    return;
                }

                var value;

                // 声明模板变量
                // 赋值优先级:
                // [include, print] > utils > helpers > data
                if (name === 'print') {

                    value = print;
                } else if (name === 'include') {

                    value = include;
                } else if (utils[name]) {

                    value = "$utils." + name;
                } else if (helpers[name]) {

                    value = "$helpers." + name;
                } else {

                    value = "$data." + name;
                }

                headerCode += name + "=" + value + ",";
                uniq[name] = true;
            });

            return code + "\n";
        }
    };

    // 定义模板引擎的语法


    defaults.openTag = '{{';
    defaults.closeTag = '}}';

    var filtered = function filtered(js, filter) {
        var parts = filter.split(':');
        var name = parts.shift();
        var args = parts.join(':') || '';

        if (args) {
            args = ', ' + args;
        }

        return '$helpers.' + name + '(' + js + args + ')';
    };

    defaults.parser = function (code, options) {

        // var match = code.match(/([\w\$]*)(\b.*)/);
        // var key = match[1];
        // var args = match[2];
        // var split = args.split(' ');
        // split.shift();

        code = code.replace(/^\s/, '');

        var split = code.split(' ');
        var key = split.shift();
        var args = split.join(' ');

        switch (key) {

            case 'if':

                code = 'if(' + args + '){';
                break;

            case 'else':

                if (split.shift() === 'if') {
                    split = ' if(' + split.join(' ') + ')';
                } else {
                    split = '';
                }

                code = '}else' + split + '{';
                break;

            case '/if':

                code = '}';
                break;

            case 'each':

                var object = split[0] || '$data';
                var as = split[1] || 'as';
                var value = split[2] || '$value';
                var index = split[3] || '$index';

                var param = value + ',' + index;

                if (as !== 'as') {
                    object = '[]';
                }

                code = '$each(' + object + ',function(' + param + '){';
                break;

            case '/each':

                code = '});';
                break;

            case 'echo':

                code = 'print(' + args + ');';
                break;

            case 'print':
            case 'include':

                code = key + '(' + split.join(',') + ');';
                break;

            default:

                // 过滤器（辅助方法）
                // {{value | filterA:'abcd' | filterB}}
                // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
                // TODO: {{ddd||aaa}} 不包含空格
                if (/^\s*\|\s*[\w\$]/.test(args)) {

                    var escape = true;

                    // {{#value | link}}
                    if (code.indexOf('#') === 0) {
                        code = code.substr(1);
                        escape = false;
                    }

                    var i = 0;
                    var array = code.split('|');
                    var len = array.length;
                    var val = array[i++];

                    for (; i < len; i++) {
                        val = filtered(val, array[i]);
                    }

                    code = (escape ? '=' : '=#') + val;

                    // 即将弃用 {{helperName value}}
                } else if (template.helpers[key]) {

                    code = '=#' + key + '(' + split.join(',') + ');';

                    // 内容直接输出 {{value}}
                } else {

                    code = '=' + code;
                }

                break;
        }

        return code;
    };

    window.template = template;
}(window);


// JavaScript Document
(function($) {
	//URI:http://caibaojian.com/scrollfix
	//author:caibaojian
	//website:http://caibaojian.com
	//descirption:scroll and fixed some div
	$.fn.scrollFix = function(options) {
		return this.each(function() {

			var opts = $.extend({}, $.fn.scrollFix.defaultOptions, options);
			var obj = $(this),
				base = this,
				selfTop = 0,
				selfLeft = 0,
				toTop = 0,
				parentOffsetLeft = 0,
				parentOffsetTop = 0,
				outerHeight,
				outerWidth,
				objWidth = 0,
				placeholder = jQuery('<div>'), //创建一个jquery对象
				optsTop = opts.distanceTop, //定义到顶部的高度
				endfix = 0; //开始停止固定的位置

			var originalPosition;
			var originalOffsetTop;
			var originalZIndex;
			var lastOffsetLeft = -1;
			var isUnfixed = true;
			//如果没有找到节点，不进行处理
			if (obj.length <= 0) {
				return;
			}
			if (lastOffsetLeft == -1) {
				originalZIndex = obj.css('z-index');
				position = obj.css('position');
				originalPosition = obj.css('position');

				originalOffsetTop = obj.css('top');
			}

			var zIndex = obj.css('zIndex');
			if (opts.zIndex != 0) {
				zIndex = opts.zIndex;
			}
			//获取相对定位或者绝对定位的父类
			var parents = obj.parent();
			var Position = parents.css('position');
			while (!/^relative|absolute$/i.test(Position)) { //检测浮动元素的父类元素定位为'relative'或者'absolute',是的话退出，否则的话，执行循环，继续寻找它的父类
				parents = parents.parent();
				Position = parents.css('position');
				if (/^body|html$/i.test(parents[0].tagName)) break; //假如父类元素的标签为body或者HTML，说明没有找到父类为以上的定位，退出循环
			}

			var ie6 = !-[1, ] && !window.XMLHttpRequest; //兼容IE6
			var resizeWindow = false;

			function resetScroll() {
				setUnfixed();
				selfTop = obj.offset().top; //对象距离顶部高度
				selfLeft = obj.offset().left; //对象距离左边宽度
				outerHeight = obj.outerHeight(); //对象高度
				outerHeight = parseFloat(outerHeight) + parseFloat(obj.css('marginBottom').replace(/auto/, 0));
				outerWidth = obj.outerWidth(); //对象外宽度
				objWidth = obj.width();
				var documentHeight = $(document).height(); //文档高度
				var startTop = $(opts.startTop), //开始浮动固定对象
					startBottom = $(opts.startBottom),
					toBottom, //停止滚动位置距离底部的高度
					ScrollHeight; //对象滚动的高度

				//计算父类偏移值
				if (/^body|html$/i.test(parents[0].tagName)) { //当父类元素非body或者HTML时，说明找到了一个父类为'relative'或者'absolute'的元素，得出它的偏移高度
					parentOffsetTop = 0, parentOffsetLeft = 0;
				} else {
					parentOffsetLeft = parents.offset().left, parentOffsetTop = parents.offset().top;
				}

				// 计算父节点的上边到顶部距离
				// 如果 body 有 top 属性, 消除这些位移
				var bodyToTop = parseInt(jQuery('body').css('top'), 10);
				if (!isNaN(bodyToTop)) {
					optsTop += bodyToTop;
				}
				//计算停在底部的距离
				if (!isNaN(opts.endPos)) {
					toBottom = opts.endPos;
				} else {
					toBottom = parseFloat(documentHeight - $(opts.endPos).offset().top);
				}
				//计算需要滚动的高度以及停止滚动的高度
				ScrollHeight = parseFloat(documentHeight - toBottom - optsTop), endfix = parseFloat(ScrollHeight - outerHeight);
				//计算顶部的距离值
				if (startTop[0]) {
					var startTopOffset = startTop.offset(),
						startTopPos = startTopOffset.top;
					selfTop = startTopPos;
				}
				if (startBottom[0]) {
					var startBottomOffset = startBottom.offset(),
						startBottomPos = startBottomOffset.top,
						startBottomHeight = startBottom.outerHeight();
					selfTop = parseFloat(startBottomPos + startBottomHeight);
				}

				toTop = selfTop - optsTop;
				toTop = (toTop > 0) ? toTop : 0;

				var selfBottom = documentHeight - selfTop - outerHeight;
				//如果滚动停在底部的值不为0，并且自身到底部的高度小于上面这个值，不执行浮动固定
				if ((toBottom != 0) && (selfBottom <= toBottom)) {
					return;
				}

			}
			function setUnfixed() {
				if (!isUnfixed) {
					lastOffsetLeft = -1;
					placeholder.css("display", "none");
					obj.css({
						'z-index': originalZIndex,
						'width': '',
						'position': originalPosition,
						'left': '',
						'top': originalOffsetTop,
						'margin-left': ''
					});
					obj.removeClass('scrollfixed');
					isUnfixed = true;
				}
			}

			function onScroll() {
				lastOffsetLeft = 1;
				var ScrollTop = $(window).scrollTop();
				if (opts.bottom != -1) {
					ScrollTop = ScrollTop + $(window).height() - outerHeight - opts.bottom;
				}
				if (ScrollTop > toTop && (ScrollTop < endfix)) {
					if (ie6) { //IE6则使用这个样式
						obj.addClass(opts.baseClassName).css({
							"z-index": zIndex,
							"position": "absolute",
							"top": opts.bottom == -1 ? ScrollTop + optsTop - parentOffsetTop : ScrollTop - parentOffsetTop,
							"bottom": 'auto',
							"left": selfLeft - parentOffsetLeft,
							'width': objWidth
						})
					} else {
						obj.addClass(opts.baseClassName).css({
							"z-index": zIndex,
							"position": "fixed",
							"top": opts.bottom == -1 ? optsTop : '',
							"bottom": opts.bottom == -1 ? '' : opts.bottom,
							"left": selfLeft,
							"width": objWidth
						});
					}
					placeholder.css({
						'height': outerHeight,
						'width': outerWidth,
						'display': 'block'
					}).insertBefore(obj);
				} else if (ScrollTop >= endfix) {
					obj.addClass(opts.baseClassName).css({
						"z-index": zIndex,
						"position": "relative",
						"top": 0,
						'bottom': '',
						"left": 0,
						"width": objWidth
					});
					placeholder.css({
						'height': outerHeight,
						'width': outerWidth,
						'display': 'block'
					}).insertBefore(obj)
				} else {
					obj.removeClass(opts.baseClassName).css({
						"z-index": originalZIndex,
						"position": "static",
						"top": "",
						"bottom": "",
						"left": ""
					});
					placeholder.remove()
				}
			}
			var Timer = 0;
			// if (isUnfixed) {
			resetScroll();
			// }
			$(window).on("scroll", function() {
				if (Timer) {
					clearTimeout(Timer);
				}
				Timer = setTimeout(onScroll, 0);
			});
			// 当发现调整屏幕大小时，重新执行代码
			$(window).on("resize", function() {
				if (Timer) {
					clearTimeout(Timer);
				}
				Timer = setTimeout(function() {
					isUnfixed = false;
					resetScroll();
					onScroll();
				}, 0);
			});
		})
	}
	$.fn.scrollFix.defaultOptions = {
		startTop: null, //滑到这个位置顶部时开始浮动，默认为空
		startBottom: null, //滑到这个位置末端开始浮动，默认为空
		distanceTop: 0, //固定在顶部的高度
		endPos: 0, //停靠在底部的位置，可以为jquery对象
		bottom: -1, //底部位置
		zIndex: 0, //z-index值
		baseClassName: 'scrollfixed' //开始固定时添加的类
	};
})(jQuery);

