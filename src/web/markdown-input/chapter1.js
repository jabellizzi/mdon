export default `
# 101: What are Extensions?
**An introduction to the concept of extensions and basic usage**

Learning goal: Understand what extensions are, what they are made of, and how to use them

![](../../../imgs/ext-sunburst.png)

## What are extensions, conceptually?
Qlik Sense comes with a standard set of chart objects that allow users to visually explore their data. The bar chart, line chart, and table are all examples of the out-of-box objects that users have access to with Qlik Sense. These objects can be organized into a dashboard, respond to any size, and be integrated into Qlik Sense Stories. However, these charts may not answer every problem that a user has, especially when encountering unique business cases.

As part of Qlik’s open ecosystem, Qlik has introduced a powerful concept called Extension Objects that allow us to extend the capabilities of the Qlik Sense Client in unique ways.

![](../../../imgs/ext-navigation.gif)

### Extension Objects are custom objects integrated into Qlik Sense
Extensions are custom objects built outside of the core Qlik Product. They are typically used to produce unique visualizations and chart forms that are not available from the core charting library. 

However, these custom objects aren’t limited to data visualization and can serve other purposes as well. For example, we could build an extension that implements a custom navigation mechanism for moving from sheet to sheet in a Qlik Sense dashboard.

![](../../../imgs/ext-resize.gif)

### They behave like normal objects
Extension Objects are embedded directly into the Qlik Sense Client and therefore feel like out of box components. Users add them to dashboards with the same drag and drop mechanism as any other feature in Qlik Sense. The objects are responsive to the screen resolution and can hook into dynamic Qlik data. This allows extensions to both respond to changing data as well as make selections and perform other actions back against Qlik’s data. Extensions are fully baked into Qlik Sense’s self-service model, making it easy for business users to take advantage of the additional functionality they bring to the tool.

### Anyone can build them
Extension objects can be built by anyone with a little knowledge of web development using the Extension API documentation. There are no special licensing requirements to build and share an extension. 

### They work anywhere that Qlik Sense works
Extensions are easily deployable onto Qlik Sense Desktop and Qlik Sense Server. They can be shared easily; a large repository of open extensions are available from branch.qlik.com.


## What are extensions, technically?
Extension objects, from a technical perspective, are comprised of code that runs in the browser. Specifically, they use:
* **HTML5** for rendering onto the page via divs, svgs, etc.
* **JavaScript** for adding interactivity to the object, such as filtering data or dynamically drawing a chart based on input data
* **JSON** for defining metadata that guides how the extension is organized and configured by an end user
* **CSS** for styling the object


## How do you deploy an extension? And how do you use it?
Deployment of extensions depends on your environment, as it differs slightly from desktop to server.

### Qlik Sense Desktop
On Qlik Sense Desktop, the code for an extension lives in a folder on our machine. We can directly create, edit, and remove extension code from this folder, and Qlik Sense Desktop will pull those extensions in. The location of this folder is _Users\{our-username}\Documents\Qlik\Sense\Extensions_. To install an extension, all we need to do is:

![](../../../imgs/sense-sankey-download.png)

1. Download the folder containing the extension code

![](../../../imgs/sense-sankey-folder.png)

2. Place the extension folder into the directory _Users\{our-username}\Documents\Qlik\Sense\Extensions_

![](../../../imgs/sense-sankey-custom-objects.png)

3. Open Qlik Sense Desktop and we will have access to that extension in the left panel under the Custom Objects sub-panel! 

### Qlik Sense Server
For Qlik Sense Server, extensions are installed via the QMC. To install an extension, we need to:

![](../../../imgs/import-extensions.png)

1. Zip up a folder containing the extension code and import it via the Extensions page

![](../../../imgs/sense-sankey-custom-objects.png)

2. Once it is successfully imported, the extension will appear in the custom objects panel of Qlik Sense when in Edit mode

![](../../../imgs/drag-drop-ext.gif)

Extensions are used just like out of the box charts. While editing a Qlik Sense dashboard, you can use the Extensions left panel to drag and drop an extension onto your dashboard. Once it is on the dashboard, it can be configured via the properties panel on the right just like any other object.


## Fin
#### Recap
* Qlik Sense Extensions allow us to build custom functionality into the Qlik Sense Client, such as advanced charts or navigation components
* Extensions are built with HTML, CSS, and JS
* Extensions function just like the out-of-box charts and can be deployed to desktop and server

#### Resources
* [Qlik Branch](http://branch.qlik.com) – developer community with open source extensions for download

#### Troubleshooting Guide
* 
`