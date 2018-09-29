'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// Documentation: https://aeotec.freshdesk.com/support/solutions/articles/6000088076-gen1-2

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		onoff: {
			'command_class' : 'COMMAND_CLASS_SWITCH_MULTILEVEL',
			'command_get' : 'SWITCH_MULTILEVEL_GET',
			'command_set' : 'SWITCH_MULTILEVEL_SET',
			'command_set_parser' : function (value) {
				return {
					'Value' : value ? 'on/enable' : 'off/disable',
					'Dimming Duration' : 1
				}
			},
			'command_report' : 'SWITCH_MULTILEVEL_REPORT',
			'command_report_parser' : function (report) {
				return report['Value (Raw)'][0] > 0;
			}
		},
		dim: {
			'command_class' : 'COMMAND_CLASS_SWITCH_MULTILEVEL',
			'command_get' : 'SWITCH_MULTILEVEL_GET',
			'command_set' : 'SWITCH_MULTILEVEL_SET',
			'command_set_parser' : function (value) {
				return {
					'Value' : Math.min(value * 100, 99),
					'Dimming Duration' : 1
				}
			},
			'command_report' : 'SWITCH_MULTILEVEL_REPORT',
			'command_report_parser' : function (report) {
				return report['Value (Raw)'][0] / 100;
			}
		}
		},
	},
);
