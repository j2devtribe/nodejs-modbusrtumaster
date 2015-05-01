var modbus = require('ModbusRtuMaster');
var rtu = new modbus("com4", 9600, 25, 100);
var con = false;
var val = 0;
rtu.addBitMonitor(1, 0x1000, 8);
rtu.addWordMonitor(1, 0x7000, 10);

rtu.on('valuechanged', function () {
    var d0 = rtu.Words[1][0x7000];
	var d1 = rtu.Words[1][0x7001];

    var m1 = rtu.Bits[1][0x1000];
    var m2 = rtu.Bits[1][0x1001];

	console.log("D0:\t" + d0 +"\tD1:\t" + d1 + "\tM1:\t" + m1 + "\tM2:\t" + m2);
});


setInterval( function(){ 
	con=!con;
	rtu.setBits(1,0x1000, [ con, !con ] );
}, 500 );

setInterval( function(){ 
	val++;
	rtu.setWords(1,0x7000, [ val, val+1 ] );
}, 1000 );