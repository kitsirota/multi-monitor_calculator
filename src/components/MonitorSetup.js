import React from 'react';
import { useMonitors, useSetMonitors } from '../context/MonitorsContext';
import { useScale, useSetScale } from '../context/ScaleContext';
import { MonitorsArea } from '../components/MonitorsArea';
import { MonitorOptionsArea } from '../components/MonitorOptionsArea';
import { Fab, styled, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ResetIcon from '@material-ui/icons/SettingsBackupRestore';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import defaultMonitor from '../util/defaultMonitor.json';

const FabGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 3rem 3rem 3rem 3rem 3rem auto',
  gridGap: '2rem',
  width: '100%'
});

export const MonitorSetup = () => {
  const monitors = useMonitors();
  const setMonitors = useSetMonitors();
  const scale = useScale();
  const setScale = useSetScale();

  const handleResetMonitors = () => {
    setMonitors([{ ...defaultMonitor }]);
    setScale(16);
  };

  const handleRemoveMonitor = () => {
    if (monitors.length <= 0) return;
    monitors[monitors.length - 1].visible = false;
    setMonitors([...monitors]);
    setTimeout(() => {
      monitors.pop();
      setMonitors([...monitors]);
    }, 500);
  };

  const handleAddMonitor = () => {
    if (monitors.length >= 9) return;
    monitors.push({
      ...JSON.parse(JSON.stringify(defaultMonitor)),
      index: monitors.length,
      visible: true
    });
    setMonitors([...monitors]);
  };

  const handleZoomOut = () => {
    if (scale <= 1) return;
    setScale(scale - 1);
  };

  const handleZoomIn = () => {
    if (scale > 25) return;
    setScale(scale + 1);
  };

  return (
    <div>
      <FabGrid>
        <span />
        <Tooltip arrow placement="left" title="Reset">
          <Fab onClick={handleResetMonitors} color="secondary">
            <ResetIcon />
          </Fab>
        </Tooltip>
        <Tooltip arrow placement="top" title="Remove Monitor">
          <Fab onClick={handleRemoveMonitor} color="secondary">
            <RemoveIcon />
          </Fab>
        </Tooltip>
        <Tooltip arrow placement="top" title="Add Monitor">
          <Fab onClick={handleAddMonitor} color="secondary">
            <AddIcon />
          </Fab>
        </Tooltip>
        <Tooltip arrow placement="top" title="Zoom Out">
          <Fab onClick={handleZoomOut} color="secondary">
            <ZoomOutIcon />
          </Fab>
        </Tooltip>
        <Tooltip arrow placement="right" title="Zoom In">
          <Fab onClick={handleZoomIn} color="secondary">
            <ZoomInIcon />
          </Fab>
        </Tooltip>
        <span />
      </FabGrid>
      <MonitorsArea />
      <MonitorOptionsArea />
    </div>
  );
};
