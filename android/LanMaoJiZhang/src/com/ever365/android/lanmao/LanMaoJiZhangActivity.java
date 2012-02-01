package com.ever365.android.lanmao;

import com.phonegap.*;

import android.os.Bundle;
import android.view.KeyEvent;

public class LanMaoJiZhangActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
    
    @Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		 if (keyCode == KeyEvent.KEYCODE_BACK) { // go back home
			 this.finish(); 
	         return true; 
		 }	 
	     if (keyCode == KeyEvent.KEYCODE_MENU) { //Exit app 
	         super.loadUrl("file:///android_asset/www/index.html"); 
             return true; 
	     } 
	     return super.onKeyDown(keyCode, event); 
	}
    
    
}