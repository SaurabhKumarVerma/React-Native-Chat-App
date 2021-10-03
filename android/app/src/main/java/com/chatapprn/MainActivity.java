package com.chatapprn;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactActivity;

import android.content.Intent;
import android.os.Bundle;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ChatAppRN";
  }
  @Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}

@Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
    }
}
