#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import App from './app.js';
import { withFullScreen } from 'fullscreen-ink';
render(<App />);
render(<App />);
render(<App />);
withFullScreen(<App />).start();
