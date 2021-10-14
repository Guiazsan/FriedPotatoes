#pragma strict

var player : Transform;
var idle : GameObject;
var walk1 : GameObject;
var walk2 : GameObject;
var run1 : GameObject;
var run2 : GameObject;
var death : GameObject;
var canto : AudioSource;
var shootAudio : AudioSource;
var blood : ParticleSystem;
var eliminado : UnityEngine.UI.Text;
var recomecar : GameObject;

private var vivo : boolean;
private var speed : float;
private var time : float;
private var seconds : int;
private var minutes : int;
private var seekTime : float;
private var seeking : boolean;

var timer : UnityEngine.UI.Text;

function Start () {
    eliminado.enabled = false;
    recomecar.SetActive(false);
    player.position.z = -7.50;
    vivo = true;
    canto.Play();
    seekTime = 0;
    seconds = 6000;
    minutes = 4;
    speed = 0;
    idle.SetActive(true);       
    walk1.SetActive(false);
    walk2.SetActive(false);
    run1.SetActive(false);
    run2.SetActive(false);
    death.SetActive(false);
	
}

function Seek () {
    seeking = !canto.isPlaying;
    if (seeking) {         
        seekTime += (1 * Time.deltaTime);
        if (seekTime > 0.5) {
            if (speed > 2) {
                Morrer();
            }
        }
        if (seekTime > 5) {
            canto.Play();
            seeking = false;
            seekTime = 0;
        }
    }
}

function Morrer () {
    speed = 0;
    idle.SetActive(false);       
    walk1.SetActive(false);
    walk2.SetActive(false);
    run1.SetActive(false);
    run2.SetActive(false);
    death.SetActive(true); 
    eliminado.enabled = true;
    recomecar.SetActive(true);
    shootAudio.Play();
    blood.Play();
    vivo = false;
}

function Update () {   
    Seek();
    if (vivo) {
        time += Time.deltaTime;
        if (time > 0.12) {
            time = 0;
            if (speed > 0) {
                speed--;
            }
        }
        if (Input.GetKeyDown(KeyCode.UpArrow)) {
            speed+=1.5;          
        }

        walk1.SetActive(speed > 0 && speed <= 5);
        walk2.SetActive(speed > 5 && speed <= 10);
        run1.SetActive(speed > 10 && speed <= 15);
        run2.SetActive(speed > 15);
        idle.SetActive(speed <= 0);

        // if (speed == 0) {        
        //     walk1.SetActive(false);
        //     walk2.SetActive(false);
        //     run1.SetActive(false);
        //     run2.SetActive(false);
        // }
    
        player.position.z = player.position.z + (speed/400);
    } 
    
    if (seconds > 100) {
        seconds = seconds - Time.deltaTime;    
        timer.text = "0"+ minutes + ":" + (seconds < 1000 ? "0" : "") + (seconds / 100);
    } else {
        if (minutes == 0) {
            Morrer();
        } else {
            minutes--;
            seconds = 6000;
        }
    }
}
