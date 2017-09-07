define([], function() {
    'use strict';
    return {
        spawnVM: function(dataModel) {
            var self = this;

            console.log("Spwaning VMs..");
            //console.log(dataModel);

            var readJSON = JSON.parse(dataModel);
            var vmName = readJSON['ansibleModel']['VMName'];
            //console.log(vmName);
            var hostname = readJSON['ansibleModel']['hostname'];
            //console.log(image);
            var flavor_name = readJSON['ansibleModel']['flavor_name'];
            //console.log(flavor_name);

            var network = readJSON['ansibleModel']['network'];
            //console.log(network);
            var ostype = readJSON['ansibleModel']['OS']['name'];
            var osversion = readJSON['ansibleModel']['OS']['version'];

            var image = ostype.toLowerCase() +osversion;
            console.log(image);

            var variables = "VM_Name=" + vmName + " Image_Name=" + image + " Flavor_Name=" + flavor_name + " Host_Name=" + "nova:" + hostname + " Network_Name=" + network;
            console.log(variables);

            var shell = require('shelljs');
            var sleep = require('sleep');

            var command = "ansible-playbook ";

            command += "src/plugins/ansibleVMspawn/openstackVMspawn.yml ";
            command += "--extra-vars ";
            command += '" ' + variables + ' "';
            console.log(command);
            console.log(command.length);
            var fs = require('fs');
            var openstack_ip = "openstack server list --name " + vmName + "| awk '{print $8}'| awk -F'=' '{print $2}' > src/plugins/ansibleVMspawn/hostTemp"+vmName;
            // console.log(openstack_ip);
            sleep.sleep(1);
            var promise =
                shell.exec(command, {async: true});
            sleep.sleep(1);
            promise.stdout.on('data', function (data) {
                shell.exec(openstack_ip).stdout;
            });

        }
    }
});

