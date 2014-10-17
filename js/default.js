//FileStart:default.js 
var camera, scene, renderer, objects;
 var particleLight, pointLight;
 var dae, skin;
 var width = window.innerWidth;
 var height = window.innerHeight;
 var loader = new THREE.ColladaLoader();
 loader.options.convertUpAxis = true;
 loader.load('https://holodevuserresource.s3.amazonaws.com/monster.dae', function (collada) {
 
 	dae = collada.scene;
 	skin = collada.skins[ 0 ];
 
 	dae.position.x = -2;
 	dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
 	dae.updateMatrix();
 
 	init();
 	animate();
 
 } );
 
 function init() {
 	THREE.ImageUtils.crossOrigin = "anonymous";
 	//camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);//3
 	camera = new LeiaCamera(45, width / height, 1, 2000);
 	camera.position.set( 0, 0.2, 10 );
 
 	scene = new THREE.Scene();
 	
 	// Grid
 
 	var size = 14, step = 1;
 
 	var geometry = new THREE.Geometry();
 	var material = new THREE.LineBasicMaterial( { color: 0x303030 } );
 
 	for ( var i = - size; i <= size; i += step ) {
 
 		geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
 		geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );
 
 		geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
 		geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );
 
 	}
 
 	var line = new THREE.Line( geometry, material, THREE.LinePieces );
 	scene.add( line );
 
 	// Add the COLLADA
 
 	scene.add( dae );
 
 	particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
 	//scene.add( particleLight );
 
 	// Lights
 
 	scene.add( new THREE.AmbientLight( 0xcccccc ) );
 
 	var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
 	directionalLight.position.x = Math.random() - 0.5;
 	directionalLight.position.y = Math.random() - 0.5;
 	directionalLight.position.z = Math.random() - 0.5;
 	directionalLight.position.normalize();
 	scene.add( directionalLight );
 
 	pointLight = new THREE.PointLight( 0xffffff, 4 );
 	pointLight.position = particleLight.position;
 	//scene.add( pointLight );
 
 	//renderer = new THREE.WebGLRenderer();//1
 	renderer = new LeiaWebGLRenderer({ 	
 	  antialias: true,
 	  renderMode: _renderMode,
 	  camPanelVisible: _camPanelVisible,
 	  gyroPanelVisible: _gyroPanelVisible,
 	  camFov: _camFov, 
 	  devicePixelRatio: 1 });
 	//renderer.setSize(width, height);//2
 	renderer.Leia_setSize(width, height);
 
 	 document.body.appendChild( renderer.domElement );
 }
 
 //
 
 var t = 0;
 var clock = new THREE.Clock();
 
 function animate() {
 
 	var delta = clock.getDelta();
 
 	requestAnimationFrame( animate );
 
 	if ( t > 1 ) t = 0;
 
 	if ( skin ) {
 
 		for ( var i = 0; i < skin.morphTargetInfluences.length; i++ ) {
 
 			skin.morphTargetInfluences[ i ] = 0;
 
 		}
 
 		skin.morphTargetInfluences[ Math.floor( t * 30 ) ] = 1;
 
 		t += delta;
 
 	}
 
 	render();
 }
 
 function render() {
 
 	var timer = Date.now() * 0.0005;
 
 	//camera.position.x = Math.cos( timer ) * 10;
 	//camera.position.y = 2;
 	//camera.position.z = Math.sin( timer ) * 10;
 
 	camera.lookAt( scene.position );
 	//scene.add(camera);
 	particleLight.position.x = Math.sin( timer * 4 ) * 3009;
 	particleLight.position.y = Math.cos( timer * 5 ) * 4000;
 	particleLight.position.z = Math.cos( timer * 4 ) * 3009;
 renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 
 	renderer.Leia_render(scene, camera);
 
 }
 //FileEnd
