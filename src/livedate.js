/**
 * Livedate
 *
 * Visual date picker script. Very compact at under 2KB minified and
 * gzipped. Based on jQuery Tools Dateinput
 *
 * Developed and customized/optimized for inclusion with Wedge plugins
 * by John "live627" Rayes.
 *
 * @version 0.6
 */

(function()
{
	'use strict';
	var extend = require('xtend');
	var closest = require('element-closest');
	module.exports = Livedate;

	function Livedate (input, uconf)
	{
		var
			conf = extend({
				yearRange: [-5, 10],
			}, uconf),
			now = new Date(),
			yearNow = now.getFullYear(),
			root,
			currYear, currMonth, currDay,
			value = input.getAttribute('data-value') || conf.value || input.value || now,
			min = input.getAttribute('min') || conf.min,
			max = input.getAttribute('max') || conf.max,
			opened,
			cache = {},
			myTable,

			show = function(e) {
				if (input.getAttribute('readonly') || input.getAttribute('disabled') || opened)
					return;

				opened = true;

				// set date
				setValue(value);

				root.classList.add('slideInDown');
				onShow();
			},

			setValue = function(year, month, day, fromKey)
			{
				var date = integer(month) >= -1 ? new Date(integer(year), integer(month), integer(day == undefined || isNaN(day) ? 1 : day)) : year || value;

				if (date < min)
					date = min;
				else if (date > max)
					date = max;

				year = date.getFullYear();
				month = date.getMonth();
				day = date.getDate();

				// roll year & month
				if (month == -1) {
					month = 11;
					year--;
				} else if (month == 12) {
					month = 0;
					year++;
				}

				if (!opened)
					select(date);

				currMonth = month;
				currYear = year;
				currDay = day;

				myTable.innerHTML = '';

				var
					tmp = new Date(year, month, 1 - (conf.firstDay || 0)), begin = tmp.getDay(),
					days = dayAm(year, month),
					prevDays = dayAm(year, month - 1),
					myHead = myTable.createTHead(),
					myRow = myHead.insertRow(-1);

				if (!fromKey) {
					monthSelector.innerHTML = '';
						months.forEach(function(m, i) {
						if ((min && min < new Date(year, i + 1, 1)) && (max && max > new Date(year, i, 0))) {
							var opt = document.createElement("option");

							opt.value = i;
							opt.text = m;
							monthSelector.add(opt);
						}
					});

					yearSelector.innerHTML = '';
					for (var i = yearNow + conf.yearRange[0]; i < yearNow + conf.yearRange[1]; i++)
						if ((min && min < new Date(i + 1, 0, 1)) && (max && max > new Date(i, 0, 0))) {
							var opt = document.createElement("option");

							opt.value = i;
							opt.text = i;
							yearSelector.add(opt);
						}

					monthSelector.value = month;
					yearSelector.value = year;
				}

				for (var d1 = 0; d1 < 7; d1++)
				{
					var myCell = myRow.appendChild(document.createElement("th"));
					myCell.innerHTML = daysShort[(d1 + (conf.firstDay || 0)) % 7];
				}

				// !begin === 'sunday'
				for (var j = !begin ? -7 : 0, thisDate, num; j < (!begin ? 35 : 42); j++) {

					if (j % 7 === 0)
						myRow = myTable.insertRow(-1);

					var cls = [];
					var myCell = myRow.insertCell(-1);

					if (j < begin)
					{
						cls[cls.length] = 'disabled';
						num = prevDays - begin + j + 1;
						thisDate = new Date(year, month - 1, num);
					}
					else if (j >= begin + days)
					{
						cls[cls.length] = 'disabled';
						num = j - days - begin + 1;
						thisDate = new Date(year, month + 1, num);
					}
					else
					{
						num = j - begin + 1;
						thisDate = new Date(year, month, num);

						// chosen date
						if (isSameDay(value, thisDate))
							cls[cls.length] = 'chosen';

						// today
						if (isSameDay(now, thisDate))
							cls[cls.length] = 'today';

						// current
						if (isSameDay(date, thisDate))
							cls[cls.length] = 'hove';

						cache[myCell.id = num] = thisDate;

						myCell.onclick = function (e)
						{
							select(integer(this.id));
						}
					}

					// disabled
					if ((min && thisDate < min) || (max && thisDate > max))
						cls[cls.length] = 'disabled';

					myCell.innerHTML = num;
					myCell.className = cls.join(' ');

				}
			},

			hide = function()
			{
				if (opened) {
					// do the hide
					root.classList.remove('slideInDown');
					opened = false;
				}
			},

			// @return amount of days in certain month
			dayAm = function (year, month)
			{
				return new Date(year, month + 1, 0).getDate();
			},

			integer = function (val)
			{
				return parseInt(val, 10);
			},

			isSameDay = function (d1, d2)
			{
				return d1.toDateString() == d2.toDateString();
			},

			parseDate = function (val)
			{
				if (val === undefined)
					return;

				if (val.constructor == Date)
					return val;

				if (typeof val == 'string')
				{
					// rfc3339?
					var els = val.split('-');
					if (els.length == 3)
						return new Date(integer(els[0]), integer(els[1]) - 1, integer(els[2]));

					// invalid offset
					if ( !(/^-?\d+$/).test(val) )
						return;

					// convert to integer
					val = integer(val);
				}

				var date = new Date;
				date.setDate(date.getDate() + val);
				return date;
			},

			select = function (date)
			{
				if (date.constructor === Number)
					date = cache[date];

				// current value
				value		= date;
				currYear	= date.getFullYear();
				currMonth	= date.getMonth();
				currDay		= date.getDate();

				// formatting
				input.value = date.getFullYear()
					+ '-' + pad(date.getMonth() + 1)
					+ '-' + pad(date.getDate());

				hide();
			},

			onShow = function (ev)
			{
				// click outside dateinput
				document.addEventListener('click', function(e)
				{
					var el = e.target;

					if (el.closest('.cal') || el == input)
						return;

					hide(e);
				});
			},

			pad = function (number)
			{
				var r = String(number);
				if (r.length === 1)
					r = '0' + r;

				return r;
			};

		// use sane values for value, min & max
		value = parseDate(value);
		min = parseDate(min || new Date(yearNow + conf.yearRange[0], 1, 1));
		max = parseDate(max || new Date(yearNow + conf.yearRange[1] + 1, 1, -1));

		// root
		root = document.createElement("div");
		root.classList.add('cal');
		root.classList.add('animated');
		document.body.insertBefore(root, input.nextSibling);
		input.classList.add('dateinput');
		// year & month selectors
		var
			monthSelector = document.createElement("select");
			monthSelector.addEventListener('change', function() {
				setValue(yearSelector.value, this.value);
			});
		var
			yearSelector = document.createElement("select");
			yearSelector.addEventListener('change', function() {
				setValue(this.value, monthSelector.value);
			});
		root.appendChild(monthSelector);
		root.appendChild(yearSelector);

		myTable = document.createElement("table"),
		root.appendChild(myTable);

		if (value)
			select(value);

		if (!conf.editable)
		{
			input.addEventListener('focus', show);
			input.addEventListener('click', show);
			input.addEventListener('keydown', function(e)
			{
				var key = e.keyCode;

				// open dateinput with navigation keys
				// h=72, j=74, k=75, l=76, down=40, left=37, up=38, right=39
				if (!opened && $([75, 76, 38, 39, 74, 72, 40, 37]).index(key) >= 0)
				{
					show();
					return e.preventDefault();
				}
				// clear value on backspace or delete
				else if (key == 8 || key == 46)
					input.value = '';

				// allow tab
				return e.shiftKey || e.ctrlKey || e.altKey || key == 9 ? true : e.preventDefault();
			});
		}

		// Expose methods
		this.show = show;
		this.hide = hide;
	}

}) ();
