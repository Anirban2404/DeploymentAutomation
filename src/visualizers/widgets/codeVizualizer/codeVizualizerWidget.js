/*globals define, WebGMEGlobal*/
/*jshint browser: true*/

/**
 * Generated by VisualizerGenerator 1.7.0 from webgme on Tue Aug 15 2017 15:12:19 GMT-0500 (CDT).
 */

define(['css!./styles/codeVizualizerWidget.css',
    './IPythonDialog'
    ], function () {
    'use strict';

    var codeVizualizerWidget,
        WIDGET_CLASS = 'code-vizualizer',
        EQN_EDIT_BTN_BASE = $('<i class="glyphicon glyphicon-edit text-meta"/>');

    codeVizualizerWidget = function (logger, container) {
        this._logger = logger.fork('Widget');

        this._el = container;

        this.nodes = {};
        this._initialize();

        this._logger.debug('ctor finished');
    };

    codeVizualizerWidget.prototype._initialize = function () {
        var width = this._el.width(),
            height = this._el.height(),
            self = this;

        // set widget class
        this._el.addClass(WIDGET_CLASS);

        // Create a dummy header 
        this._el.append('<h3>codeVizualizer Events:</h3>');

        // Registering to events can be done with jQuery (as normal)
        this._el.on('dblclick', function (event) {
            event.stopPropagation();
            event.preventDefault();
            self.onBackgroundDblClick();
        });

        //Notebook
        var notebookIframe = document.createElement('iframe');
        notebookIframe.name = "notebook";
        notebookIframe.style.height = "100%";
        notebookIframe.style.width = "100%";
        notebookIframe.src = this.getNotebookUrl();
        this._el.append(notebookIframe);

        this.notebookIframe = notebookIframe;

        var buttonEdit = document. createElement("button");
        buttonEdit. innerHTML = "Edit";
        this._el.append(buttonEdit);
        // Add event handler
        buttonEdit.addEventListener ("click", myFunctionEdit);
        this._el.append(' ');
        var buttonSave = document. createElement("button");
        buttonSave. innerHTML = "Save";
        this._el.append(buttonSave);
        // Add event handler
        buttonSave.addEventListener ("click", myFunctionSave);

        // function myFunctionEdit() {
        //     alert("did Edit");
        // }
        // Get the modal
        var modal = document.getElementById('myModal');

        function myFunctionSave() {
            modal.style.display = "block";
        }

        function saveTextAsFile()
        {
            var textToSave = document.getElementById("inputTextToSave").value;
            var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
            var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
            var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = textToSaveAsURL;
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);

            downloadLink.click();
        }


        function myFunctionEdit()
        {
            var fileToLoad = document.getElementById("fileToLoad").files[0];
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent)
            {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                document.getElementById("inputTextToSave").value = textFromFileLoaded;
            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        }

        this.$el.append('<br>');
        this._skinParts.$EqnEditorBtn = EQN_EDIT_BTN_BASE.clone();
        this.$el.append(this._skinParts.$EqnEditorBtn);
        this.$el.append('  Function');
        this.$el.append('<br>');
        this.$el.append(this.$runPluginBtn);
        this.$el.append('<br>');
        this._checkForResult(client,nodeObj);
    };

    codeVizualizerWidget.prototype.onWidgetContainerResize = function (width, height) {
        this._logger.debug('Widget is resizing...');
    };

    codeVizualizerWidget.prototype.getNotebookUrl = function (desc) {
        return "http://129.59.234.224:5556/lockheed/DeploymentAutomation/examples/ansibleScript/WebApplication/";
    };

    // Adding/Removing/Updating items
    codeVizualizerWidget.prototype.addNode = function (desc) {
        if (desc) {
            // Add node to a table of nodes
            var node = document.createElement('div'),
                label = 'children';

            if (desc.childrenIds.length === 1) {
                label = 'child';
            }

            this.nodes[desc.id] = desc;
            node.innerHTML = 'Adding node "' + desc.name + '" (click to view). It has ' + 
                desc.childrenIds.length + ' ' + label + '.';

            this._el.append(node);
            node.onclick = this.onNodeClick.bind(this, desc.id);
        }
    };

    codeVizualizerWidget.prototype.removeNode = function (gmeId) {
        var desc = this.nodes[gmeId];
        this._el.append('<div>Removing node "' + desc.name + '"</div>');
        delete this.nodes[gmeId];
    };

    codeVizualizerWidget.prototype.updateNode = function (desc) {
        if (desc) {
            this._logger.debug('Updating node:', desc);
            this._el.append('<div>Updating node "' + desc.name + '"</div>');
        }
    };

    /* * * * * * * * Visualizer event handlers * * * * * * * */

    codeVizualizerWidget.prototype.onNodeClick = function (/*id*/) {
        // This currently changes the active node to the given id and
        // this is overridden in the controller.
    };

    codeVizualizerWidget.prototype.onBackgroundDblClick = function () {
        this._el.append('<div>Background was double-clicked!!</div>');
    };

    /* * * * * * * * Visualizer life cycle callbacks * * * * * * * */
    codeVizualizerWidget.prototype.destroy = function () {
    };

    codeVizualizerWidget.prototype.onActivate = function () {
        this._logger.debug('codeVizualizerWidget has been activated');
    };

    codeVizualizerWidget.prototype.onDeactivate = function () {
        this._logger.debug('codeVizualizerWidget has been deactivated');
    };

    return codeVizualizerWidget;
});
