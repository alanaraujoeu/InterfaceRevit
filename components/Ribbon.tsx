'use client';

import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  BookOpen,
  Award,
  Library,
  Home,
  FileText,
  Save,
  Undo2,
  Redo2,
  Printer,
  Search,
  User,
  HelpCircle,
  Settings,
  Layout,
  DoorOpen,
  Grid3X3,
  Box,
  Columns,
  Home as RoofIcon,
  Layers,
  Fence,
  ArrowUpRight,
  Type,
  Group,
  Tag,
  Square,
  Minus,
  Eye,
  Monitor,
  MousePointer2,
  ShoppingCart,
  MinusSquare,
  Maximize2,
  X,
  ChevronDown,
  PenTool,
  Grid,
  Instagram,
  MessageCircle,
  Minimize2,
  Palette,
  Layers3,
  Magnet,
  Info,
  Settings2,
  List,
  Share2,
  Globe,
  ArrowLeftRight,
  Trash2,
  Ruler,
  Hash,
  Building2,
  Wrench,
  Table,
  MoreHorizontal,
  MapPin,
  Map,
  LayoutTemplate,
  Brain,
  Sticker,
  Clock,
  FolderOpen,
  Edit,
  Fingerprint,
  AlertTriangle,
  Plug,
  Code,
  Shield,
  Play,
  AlignJustify,
  ArrowRight,
  Move,
  RotateCw,
  Scissors,
  Split,
  Scaling,
  Pin,
  Copy,
  Circle,
  Zap,
  Link,
  Cloud,
  ArrowUp,
  Check,
  Thermometer,
  Wind,
  Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import {cn} from '@/lib/utils';
import {COMMANDS as RAW_COMMANDS} from '@/lib/data';

const COMMANDS = RAW_COMMANDS as Record<string, any[]>;

const TABS = [
  'NaaviBIM',
  'Architecture',
  'Structure',
  'Concrete',
  'Steel',
  'System',
  'Insert',
  'Annotate',
  'Analyze',
  'Massing & Site',
  'Collaborate',
  'View',
  'Manage',
  'Add-Ins',
  'Modify',
];

export default function Ribbon({onRefresh, onToggleFullScreen, isFullScreen, onToggleSidebar, openMiniCourse, onSelectLesson}: {onRefresh?: () => void; onToggleFullScreen?: () => void; isFullScreen?: boolean; onToggleSidebar?: () => void; openMiniCourse?: (title: string) => void; onSelectLesson?: (name: string) => void}) {
  const [activeTab, setActiveTab] = useState('NaaviBIM');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <header className="bg-[#2b2b2b] w-full h-[180px] shrink-0" />;

  const renderArchitecturePanel = () => {
    const arch = COMMANDS['Architecture'] || [];
    return (
      <>
        <RibbonPanel title="Select" whiteTitle={true}>
          <div className="flex flex-col items-center gap-0.5 h-full pt-1">
            <RibbonButton name="Modify" icon={arch[0].icon} onClick={() => onSelectLesson?.(arch[0].name)} />
            <span className="text-[9px] text-[#cccccc] -mt-1">Select</span>
          </div>
        </RibbonPanel>
        <RibbonPanel title="Build" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {arch.slice(1, 12).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Circulation" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {arch.slice(12, 15).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Model" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {arch.slice(15, 18).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Room & Area" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {arch.slice(18, 24).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Opening" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {arch.slice(24, 29).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Datum" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {arch.slice(29, 31).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Work Plane" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {arch.slice(31, 35).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
      </>
    );
  };

  const renderManagePanel = () => {
    const manage = COMMANDS['Manage'] || [];
    return (
      <>
        <RibbonPanel title="Settings" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {manage.slice(0, 3).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Project Info" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {manage.slice(3, 4).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Parameters" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {manage.slice(4, 8).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Manage" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {manage.slice(8, 17).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Project Location" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {manage.slice(17, 20).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Design Options" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {manage.slice(20, 22).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Links" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {manage.slice(22, 23).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="Data" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {manage.slice(23, 31).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
      </>
    );
  };

  const renderAddInsPanel = () => {
    const addins = COMMANDS['Add-Ins'] || [];
    return (
      <>
        <RibbonPanel title="Select" whiteTitle={true}>
          <div className="flex flex-col items-center gap-0.5 h-full pt-1">
            <RibbonButton name="Modify" icon={addins[0].icon} onClick={() => onSelectLesson?.(addins[0].name)} />
            <span className="text-[9px] text-[#cccccc] -mt-1">Select</span>
          </div>
        </RibbonPanel>
        <RibbonPanel title="eTransmit" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {addins.slice(1, 4).map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
        <RibbonPanel title="FormIt Converter" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            <RibbonButton name="Convert RFA to FormIt" icon={addins[4].icon} onClick={() => onSelectLesson?.(addins[4].name)} />
          </div>
        </RibbonPanel>
      </>
    );
  };

  const renderModifyPanel = () => {
    const modify = COMMANDS['Modify'] || [];
    return (
      <>
        <RibbonPanel title="Modify" whiteTitle={true}>
          <div className="flex items-start gap-0.5 h-full overflow-x-auto">
            {modify.map((cmd: any) => (
              <RibbonButton key={cmd.id} name={cmd.name} icon={cmd.icon} onClick={() => onSelectLesson?.(cmd.name)} />
            ))}
          </div>
        </RibbonPanel>
      </>
    );
  };

  return (
    <header className="bg-[#2b2b2b] flex flex-col w-full shrink-0 z-50 border-b border-[#1a1a1a] h-[180px] select-none">
      {/* Title Bar / Application Bar */}
      <div className="flex items-center justify-between h-[30px] bg-[#1a1a1a] px-2">
        <div className="flex items-center gap-2">
          {/* Revit Icon Placeholder */}
          <div className="w-5 h-5 bg-[#007acc] rounded-sm flex items-center justify-center text-white font-bold text-[10px]">R</div>
          
          {/* Quick Access Toolbar */}
          <div className="flex items-center gap-2 ml-2 text-[#cccccc]">
            <FileText size={14} className="hover:text-white cursor-pointer" />
            <Save size={14} className="hover:text-white cursor-pointer" />
            <div className="w-[1px] h-3 bg-[#3d3d3d] mx-0.5" />
            <Undo2 size={14} className="hover:text-white cursor-pointer" />
            <Redo2 size={14} className="hover:text-white cursor-pointer" />
            <Printer size={14} className="hover:text-white cursor-pointer" />
            <div className="w-[1px] h-3 bg-[#3d3d3d] mx-0.5" />
            <Ruler size={14} className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Project Title */}
        <div className="text-[11px] text-[#aaaaaa] font-medium truncate px-4">
          Autodesk Revit Preview Release - NaaviBIM - Floor Plan: Level 1
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
        </div>
      </div>

      {/* Tabs Area */}
      <div className="flex items-center h-[28px] bg-[#1a1a1a]">
        <button className="bg-[#007acc] text-white px-4 h-full text-[11px] font-medium hover:bg-[#008ae6]">
          File
        </button>
        <nav className="flex items-center h-full overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-3 text-[11px] h-full transition-all whitespace-nowrap',
                activeTab === tab
                  ? 'bg-[#2b2b2b] text-white'
                  : 'text-[#cccccc] hover:text-white hover:bg-white/5'
              )}
            >
              {tab}
            </button>
          ))}
          <button className="px-2 text-[#cccccc] hover:text-white">
            <ChevronDown size={12} />
          </button>
        </nav>
      </div>

      {/* Ribbon Content Area */}
      <div className="flex-1 flex overflow-x-auto custom-scrollbar bg-[#2b2b2b] border-t border-[#3d3d3d] p-1 items-start">
        {activeTab === 'NaaviBIM' && (
          <>
            <RibbonPanel title="Course Control" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full">
                <RibbonButton 
                   name="Sync Sheet" 
                   icon="Refresh" 
                   onClick={onRefresh || (() => {})}
                />
                <RibbonButton name="Aulas" icon="CourseMap" onClick={onToggleSidebar || (() => {})} />
                <RibbonButton name="Cursos" icon="Certificate" href="https://www.bee1.com.br/revolucaorevit" />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Resources" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full">
                <RibbonButton name="Templates" icon="Templates" href="https://www.bee1.com.br/downloads" />
                <RibbonButton name="Familias" icon="Families" href="https://www.bee1.com.br/downloads" />
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'Architecture' && renderArchitecturePanel()}
        {activeTab === 'Manage' && renderManagePanel()}
        {activeTab === 'Add-Ins' && renderAddInsPanel()}
        {activeTab === 'Modify' && renderModifyPanel()}

        {activeTab === 'Annotate' && (
          <>
            <RibbonPanel title="Dimension" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Modify" icon="Modify" onClick={() => onSelectLesson?.('Modify')} />
                <RibbonButton name="Aligned" icon="Aligned" onClick={() => onSelectLesson?.('Aligned')} />
                <RibbonButton name="Linear" icon="Linear" onClick={() => onSelectLesson?.('Linear')} />
                <RibbonButton name="Angular" icon="Angular" onClick={() => onSelectLesson?.('Angular')} />
                <RibbonButton name="Radial" icon="Radial" onClick={() => onSelectLesson?.('Radial')} />
                <RibbonButton name="Diameter" icon="Diameter" onClick={() => onSelectLesson?.('Diameter')} />
                <RibbonButton name="Arc Length" icon="Circle" onClick={() => onSelectLesson?.('Arc Length')} />
                <RibbonButton name="Spot Elevation" icon="SpotElevation" onClick={() => onSelectLesson?.('Spot Elevation')} />
                <RibbonButton name="Spot Coordinate" icon="SpotCoordinate" onClick={() => onSelectLesson?.('Spot Coordinate')} />
                <RibbonButton name="Spot Slope" icon="SpotSlope" onClick={() => onSelectLesson?.('Spot Slope')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Detail" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Detail Line" icon="DetailLine" onClick={() => onSelectLesson?.('Detail Line')} />
                <RibbonButton name="Region" icon="Region" onClick={() => onSelectLesson?.('Region')} />
                <RibbonButton name="Component" icon="DetailComponent" onClick={() => onSelectLesson?.('Component')} />
                <RibbonButton name="Revision Cloud" icon="RevisionCloud" onClick={() => onSelectLesson?.('Revision Cloud')} />
                <RibbonButton name="Detail Group" icon="DetailGroup" onClick={() => onSelectLesson?.('Detail Group')} />
                <RibbonButton name="Insulation" icon="Insulation" onClick={() => onSelectLesson?.('Insulation')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Text" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Text" icon="Text" onClick={() => onSelectLesson?.('Text')} />
                <RibbonButton name="Check Spelling" icon="CheckSpelling" onClick={() => onSelectLesson?.('Check Spelling')} />
                <RibbonButton name="Find/Replace" icon="FindReplace" onClick={() => onSelectLesson?.('Find/Replace')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Tag" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Tag by Category" icon="TagByCategory" onClick={() => onSelectLesson?.('Tag by Category')} />
                <RibbonButton name="Tag All" icon="TagAll" onClick={() => onSelectLesson?.('Tag All')} />
                <RibbonButton name="Beam Annotations" icon="BeamAnnotations" onClick={() => onSelectLesson?.('Beam Annotations')} />
                <RibbonButton name="Multi-Category" icon="MultiCategory" onClick={() => onSelectLesson?.('Multi-Category')} />
                <RibbonButton name="Material Tag" icon="MaterialTag" onClick={() => onSelectLesson?.('Material Tag')} />
                <RibbonButton name="Area Tag" icon="AreaTag" onClick={() => onSelectLesson?.('Area Tag')} />
                <RibbonButton name="Room Tag" icon="RoomTag" onClick={() => onSelectLesson?.('Room Tag')} />
                <RibbonButton name="Space Tag" icon="SpaceTag" onClick={() => onSelectLesson?.('Space Tag')} />
                <RibbonButton name="View Reference" icon="ViewReference" onClick={() => onSelectLesson?.('View Reference')} />
                <RibbonButton name="Tread Number" icon="TreadNumber" onClick={() => onSelectLesson?.('Tread Number')} />
                <RibbonButton name="Multi-Rebar" icon="MultiRebar" onClick={() => onSelectLesson?.('Multi-Rebar')} />
                <RibbonButton name="Keynote" icon="Keynote" onClick={() => onSelectLesson?.('Keynote')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Symbol" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Symbol" icon="Symbol" onClick={() => onSelectLesson?.('Symbol')} />
                <RibbonButton name="Span Direction" icon="SpanDirection" onClick={() => onSelectLesson?.('Span Direction')} />
                <RibbonButton name="Beam" icon="BeamSymbol" onClick={() => onSelectLesson?.('Beam')} />
                <RibbonButton name="Stair Path" icon="StairPath" onClick={() => onSelectLesson?.('Stair Path')} />
                <RibbonButton name="Area" icon="AreaSymbol" onClick={() => onSelectLesson?.('Area')} />
                <RibbonButton name="Path" icon="PathSymbol" onClick={() => onSelectLesson?.('Path')} />
                <RibbonButton name="Rebar" icon="RebarSymbol" onClick={() => onSelectLesson?.('Rebar')} />
                <RibbonButton name="Fabric" icon="FabricSymbol" onClick={() => onSelectLesson?.('Fabric')} />
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'Collaborate' && (
          <>
            <RibbonPanel title="Communicate" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Modify" icon="Modify" onClick={() => onSelectLesson?.('Modify')} />
                <RibbonButton name="Editing Requests" icon="EditingRequests" onClick={() => onSelectLesson?.('Editing Requests')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Manage Collaboration" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Collaborate" icon="Collaborate" onClick={() => onSelectLesson?.('Collaborate')} />
                <RibbonButton name="Worksets" icon="Worksets" onClick={() => onSelectLesson?.('Worksets')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Synchronize" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Synchronize with Central" icon="Synchronize" onClick={() => onSelectLesson?.('Synchronize with Central')} />
                <RibbonButton name="Reload Latest" icon="ReloadLatest" onClick={() => onSelectLesson?.('Reload Latest')} />
                <RibbonButton name="Relinquish All Mine" icon="RelinquishAllMine" onClick={() => onSelectLesson?.('Relinquish All Mine')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Manage Models" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Worksharing Monitor" icon="WorksharingMonitor" onClick={() => onSelectLesson?.('Worksharing Monitor')} />
                <RibbonButton name="Show History" icon="Show History" onClick={() => onSelectLesson?.('Show History')} />
                <RibbonButton name="Restore Backup" icon="RestoreBackup" onClick={() => onSelectLesson?.('Restore Backup')} />
                <RibbonButton name="Publish Settings" icon="PublishSettings" onClick={() => onSelectLesson?.('Publish Settings')} />
                <RibbonButton name="Manage Scenarios" icon="ManageScenarios" onClick={() => onSelectLesson?.('Manage Scenarios')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Coordinate" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Copy/Monitor" icon="CopyMonitor" onClick={() => onSelectLesson?.('Copy/Monitor')} />
                <RibbonButton name="Coordination Review" icon="CoordinationReview" onClick={() => onSelectLesson?.('Coordination Review')} />
                <RibbonButton name="Coordination Settings" icon="CoordinationSettings" onClick={() => onSelectLesson?.('Coordination Settings')} />
                <RibbonButton name="Reconcile Hosting" icon="ReconcileHosting" onClick={() => onSelectLesson?.('Reconcile Hosting')} />
                <RibbonButton name="Interference Check" icon="InterferenceCheck" onClick={() => onSelectLesson?.('Interference Check')} />
                <RibbonButton name="Coordination Model Changes" icon="CoordinationModelChanges" onClick={() => onSelectLesson?.('Coordination Model Changes')} />
                <RibbonButton name="Issues" icon="Issues" onClick={() => onSelectLesson?.('Issues')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Share" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Shared Views" icon="SharedViews" onClick={() => onSelectLesson?.('Shared Views')} />
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'Analyze' && (
          <>
            <RibbonPanel title="Reports & Schedules" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Heating and Cooling Loads" icon="HeatingCoolingLoads" onClick={() => onSelectLesson?.('Heating and Cooling Loads')} />
                <RibbonButton name="Panel Schedules" icon="PanelSchedules" onClick={() => onSelectLesson?.('Panel Schedules')} />
                <RibbonButton name="Schedule/ Quantities" icon="ScheduleQuantities" onClick={() => onSelectLesson?.('Schedule/ Quantities')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Check Systems" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Check Duct Systems" icon="CheckDuctSystems" onClick={() => onSelectLesson?.('Check Duct Systems')} />
                <RibbonButton name="Check Pipe Systems" icon="CheckPipeSystems" onClick={() => onSelectLesson?.('Check Pipe Systems')} />
                <RibbonButton name="Check Circuits" icon="CheckCircuits" onClick={() => onSelectLesson?.('Check Circuits')} />
                <RibbonButton name="Show Disconnects" icon="ShowDisconnects" onClick={() => onSelectLesson?.('Show Disconnects')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Color Fill" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Duct Legend" icon="DuctLegend" onClick={() => onSelectLesson?.('Duct Legend')} />
                <RibbonButton name="Pipe Legend" icon="PipeLegend" onClick={() => onSelectLesson?.('Pipe Legend')} />
                <RibbonButton name="Color Fill Legend" icon="ColorFillLegend" onClick={() => onSelectLesson?.('Color Fill Legend')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Forma Analyses" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Analyses & History" icon="AnalysesHistory" onClick={() => onSelectLesson?.('Analyses & History')} />
                <RibbonButton name="Wind Simulation" icon="WindSimulation" onClick={() => onSelectLesson?.('Wind Simulation')} />
                <RibbonButton name="Wind Estimate" icon="WindEstimate" onClick={() => onSelectLesson?.('Wind Estimate')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Energy Optimization" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Location" icon="Location" onClick={() => onSelectLesson?.('Location')} />
                <RibbonButton name="Create Energy Model" icon="CreateEnergyModel" onClick={() => onSelectLesson?.('Create Energy Model')} />
                <RibbonButton name="Energy Model Settings" icon="EnergyModelSettings" onClick={() => onSelectLesson?.('Energy Model Settings')} />
                <RibbonButton name="Systems Analysis" icon="SystemsAnalysis" onClick={() => onSelectLesson?.('Systems Analysis')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Electrical Analysis" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Area Based Load Boundary" icon="AreaBasedLoadBoundary" onClick={() => onSelectLesson?.('Area Based Load Boundary')} />
                <RibbonButton name="Area Based Load" icon="AreaBasedLoad" onClick={() => onSelectLesson?.('Area Based Load')} />
                <RibbonButton name="Equipment Load" icon="EquipmentLoad" onClick={() => onSelectLesson?.('Equipment Load')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Route Analysis" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Path of Travel" icon="PathofTravel" onClick={() => onSelectLesson?.('Path of Travel')} />
                <RibbonButton name="Reveal Obstacles" icon="RevealObstacles" onClick={() => onSelectLesson?.('Reveal Obstacles')} />
                <RibbonButton name="Multiple Paths" icon="MultiplePaths" onClick={() => onSelectLesson?.('Multiple Paths')} />
                <RibbonButton name="One Way Indicator" icon="OneWayIndicator" onClick={() => onSelectLesson?.('One Way Indicator')} />
                <RibbonButton name="People Content" icon="PeopleContent" onClick={() => onSelectLesson?.('People Content')} />
                <RibbonButton name="Spatial Grid" icon="SpatialGrid" onClick={() => onSelectLesson?.('Spatial Grid')} />
                <RibbonButton name="Route Analysis" icon="RouteAnalysis" onClick={() => onSelectLesson?.('Route Analysis')} />
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'Structure' && (
          <>
            <RibbonPanel title="Structure" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                {(COMMANDS['Structure'] || []).map((cmd: any) => (
                  <RibbonButton 
                    key={cmd.id} 
                    name={cmd.name} 
                    icon={cmd.icon} 
                    onClick={() => onSelectLesson?.(cmd.name)} 
                  />
                ))}
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'Massing & Site' && (
          <>
            <RibbonPanel title="Conceptual Mass" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                {(COMMANDS['Massing & Site'] || []).slice(0, 3).map((cmd: any) => (
                  <RibbonButton 
                    key={cmd.id} 
                    name={cmd.name} 
                    icon={cmd.icon} 
                    onClick={() => onSelectLesson?.(cmd.name)} 
                  />
                ))}
              </div>
            </RibbonPanel>
            <RibbonPanel title="Model by Face" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                {(COMMANDS['Massing & Site'] || []).slice(3, 8).map((cmd: any) => (
                  <RibbonButton 
                    key={cmd.id} 
                    name={cmd.name} 
                    icon={cmd.icon} 
                    onClick={() => onSelectLesson?.(cmd.name)} 
                  />
                ))}
              </div>
            </RibbonPanel>
            <RibbonPanel title="Model Site" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                {(COMMANDS['Massing & Site'] || []).slice(8, 12).map((cmd: any) => (
                  <RibbonButton 
                    key={cmd.id} 
                    name={cmd.name} 
                    icon={cmd.icon} 
                    onClick={() => onSelectLesson?.(cmd.name)} 
                  />
                ))}
              </div>
            </RibbonPanel>
            <RibbonPanel title="Analysis" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                {(COMMANDS['Massing & Site'] || []).slice(12).map((cmd: any) => (
                  <RibbonButton 
                    key={cmd.id} 
                    name={cmd.name} 
                    icon={cmd.icon} 
                    onClick={() => onSelectLesson?.(cmd.name)} 
                  />
                ))}
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'View' && (
          <>
            <RibbonPanel title="Create" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                {(COMMANDS['View'] || []).slice(0, 9).map((cmd: any) => (
                  <RibbonButton 
                    key={cmd.id} 
                    name={cmd.name} 
                    icon={cmd.icon} 
                    onClick={() => onSelectLesson?.(cmd.name)} 
                  />
                ))}
              </div>
            </RibbonPanel>
            <RibbonPanel title="Graphics" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                {(COMMANDS['View'] || []).slice(9).map((cmd: any) => (
                  <RibbonButton 
                    key={cmd.id} 
                    name={cmd.name} 
                    icon={cmd.icon} 
                    onClick={() => onSelectLesson?.(cmd.name)} 
                  />
                ))}
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'Steel' && (
          <>
            <RibbonPanel title="Connection" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Modify" icon="Modify" onClick={() => onSelectLesson?.('Modify')} />
                <RibbonButton name="Connection" icon="Connection" onClick={() => onSelectLesson?.('Connection')} />
                <RibbonButton name="Connection Automation" icon="ConnectionAutomation" onClick={() => onSelectLesson?.('Connection Automation')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Fabrication Elements" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Plate" icon="Plate" onClick={() => onSelectLesson?.('Plate')} />
                <RibbonButton name="Bolts" icon="Bolts" onClick={() => onSelectLesson?.('Bolts')} />
                <RibbonButton name="Welds" icon="Welds" onClick={() => onSelectLesson?.('Welds')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Modifiers" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Corner Cut" icon="CornerCut" onClick={() => onSelectLesson?.('Corner Cut')} />
                <RibbonButton name="Cope Skewed" icon="CopeSkewed" onClick={() => onSelectLesson?.('Cope Skewed')} />
                <RibbonButton name="Shorten" icon="Shorten" onClick={() => onSelectLesson?.('Shorten')} />
                <RibbonButton name="Contour Cut" icon="ContourCut" onClick={() => onSelectLesson?.('Contour Cut')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Parametric Cuts" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Cope" icon="Cope" onClick={() => onSelectLesson?.('Cope')} />
                <RibbonButton name="Miter" icon="Miter" onClick={() => onSelectLesson?.('Miter')} />
                <RibbonButton name="Cut Through" icon="CutThrough" onClick={() => onSelectLesson?.('Cut Through')} />
                <RibbonButton name="Cut By" icon="CutBy" onClick={() => onSelectLesson?.('Cut By')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Work Plane" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Set" icon="Set" onClick={() => onSelectLesson?.('Set')} />
                <RibbonButton name="Show" icon="Show" onClick={() => onSelectLesson?.('Show')} />
                <RibbonButton name="Ref Plane" icon="RefPlane" onClick={() => onSelectLesson?.('Ref Plane')} />
                <RibbonButton name="Viewer" icon="Viewer" onClick={() => onSelectLesson?.('Viewer')} />
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'Insert' && (
          <>
            <RibbonPanel title="Link" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Modify" icon="Modify" onClick={() => onSelectLesson?.('Modify')} />
                <RibbonButton name="Manage Links" icon="ManageLinks" onClick={() => onSelectLesson?.('Manage Links')} />
                <RibbonButton name="Link Revit" icon="LinkRevit" onClick={() => onSelectLesson?.('Link Revit')} />
                <RibbonButton name="Link IFC" icon="LinkIFC" onClick={() => onSelectLesson?.('Link IFC')} />
                <RibbonButton name="Link CAD" icon="LinkCAD" onClick={() => onSelectLesson?.('Link CAD')} />
                <RibbonButton name="Link Topography" icon="LinkTopography" onClick={() => onSelectLesson?.('Link Topography')} />
                <RibbonButton name="DWF Markup" icon="DWFMarkup" onClick={() => onSelectLesson?.('DWF Markup')} />
                <RibbonButton name="Decal" icon="Decal" onClick={() => onSelectLesson?.('Decal')} />
                <RibbonButton name="Point Cloud" icon="PointCloud" onClick={() => onSelectLesson?.('Point Cloud')} />
                <RibbonButton name="Coordination Model" icon="CoordinationModel" onClick={() => onSelectLesson?.('Coordination Model')} />
                <RibbonButton name="Link PDF" icon="LinkPDF" onClick={() => onSelectLesson?.('Link PDF')} />
                <RibbonButton name="Link Image" icon="LinkImage" onClick={() => onSelectLesson?.('Link Image')} />
                <RibbonButton name="Extended Properties" icon="ExtendedProperties" onClick={() => onSelectLesson?.('Extended Properties')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Import" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Import CAD" icon="ImportCAD" onClick={() => onSelectLesson?.('Import CAD')} />
                <RibbonButton name="Import gbXML" icon="ImportgbXML" onClick={() => onSelectLesson?.('Import gbXML')} />
                <RibbonButton name="Import PDF" icon="ImportPDF" onClick={() => onSelectLesson?.('Import PDF')} />
                <RibbonButton name="Import Image" icon="ImportImage" onClick={() => onSelectLesson?.('Import Image')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Load from Library" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Load Family" icon="LoadFamily" onClick={() => onSelectLesson?.('Load Family')} />
                <RibbonButton name="Load Autodesk Family" icon="LoadAutodeskFamily" onClick={() => onSelectLesson?.('Load Autodesk Family')} />
                <RibbonButton name="Load as Group" icon="LoadasGroup" onClick={() => onSelectLesson?.('Load as Group')} />
                <RibbonButton name="Insert from File" icon="InsertfromFile" onClick={() => onSelectLesson?.('Insert from File')} />
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'Concrete' && (
          <>
            <RibbonPanel title="Reinforcement" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Modify" icon="Modify" onClick={() => onSelectLesson?.('Modify')} />
                <RibbonButton name="Rebar" icon="Rebar" onClick={() => onSelectLesson?.('Rebar')} />
                <RibbonButton name="Path" icon="Path" onClick={() => onSelectLesson?.('Path')} />
                <RibbonButton name="Morphed" icon="Morphed" onClick={() => onSelectLesson?.('Morphed')} />
                <RibbonButton name="Area" icon="AreaReinforcement" onClick={() => onSelectLesson?.('Area')} />
                <RibbonButton name="Fabric Area" icon="FabricArea" onClick={() => onSelectLesson?.('Fabric Area')} />
                <RibbonButton name="Fabric Sheet" icon="FabricSheet" onClick={() => onSelectLesson?.('Fabric Sheet')} />
                <RibbonButton name="Cover" icon="Cover" onClick={() => onSelectLesson?.('Cover')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Settings" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Cover Settings" icon="CoverSettings" onClick={() => onSelectLesson?.('Cover Settings')} />
                <RibbonButton name="Reinforcement Settings" icon="ReinforcementSettings" onClick={() => onSelectLesson?.('Reinforcement Settings')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Precast Detailing" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Split" icon="Split" onClick={() => onSelectLesson?.('Split')} />
                <RibbonButton name="Mounting Parts" icon="MountingParts" onClick={() => onSelectLesson?.('Mounting Parts')} />
                <RibbonButton name="Reinforcement" icon="ReinforcementPrecast" onClick={() => onSelectLesson?.('Reinforcement')} />
                <RibbonButton name="Custom Fabric Sheet" icon="CustomFabricSheet" onClick={() => onSelectLesson?.('Custom Fabric Sheet')} />
                <RibbonButton name="Shop Drawings" icon="ShopDrawings" onClick={() => onSelectLesson?.('Shop Drawings')} />
                <RibbonButton name="CAM Export" icon="CAMExport" onClick={() => onSelectLesson?.('CAM Export')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Precast Settings" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Configuration" icon="Configuration" onClick={() => onSelectLesson?.('Configuration')} />
                <RibbonButton name="CFS Config" icon="CFSConfig" onClick={() => onSelectLesson?.('CFS Config')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Work Plane" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Set" icon="Set" onClick={() => onSelectLesson?.('Set')} />
                <RibbonButton name="Show" icon="Show" onClick={() => onSelectLesson?.('Show')} />
                <RibbonButton name="Ref Plane" icon="RefPlane" onClick={() => onSelectLesson?.('Ref Plane')} />
                <RibbonButton name="Viewer" icon="Viewer" onClick={() => onSelectLesson?.('Viewer')} />
              </div>
            </RibbonPanel>
          </>
        )}
        {activeTab === 'System' && (
          <>
            <RibbonPanel title="HVAC" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Duct" icon="Duct" onClick={() => onSelectLesson?.('Duct')} />
                <RibbonButton name="Duct Placeholder" icon="DuctPlaceholder" onClick={() => onSelectLesson?.('Duct Placeholder')} />
                <RibbonButton name="Duct Fitting" icon="DuctFitting" onClick={() => onSelectLesson?.('Duct Fitting')} />
                <RibbonButton name="Duct Accessory" icon="DuctAccessory" onClick={() => onSelectLesson?.('Duct Accessory')} />
                <RibbonButton name="Convert to Flex Duct" icon="ConvertToFlexDuct" onClick={() => onSelectLesson?.('Convert to Flex Duct')} />
                <RibbonButton name="Flex Duct" icon="FlexDuct" onClick={() => onSelectLesson?.('Flex Duct')} />
                <RibbonButton name="Air Terminal" icon="AirTerminal" onClick={() => onSelectLesson?.('Air Terminal')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Fabrication" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Fabrication Part" icon="FabricationPart" onClick={() => onSelectLesson?.('Fabrication Part')} />
                <RibbonButton name="Multi-Point Routing" icon="MultiPointRouting" onClick={() => onSelectLesson?.('Multi-Point Routing')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="MEP Detailing" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="MEP Fabrication Ductwork Stiffener" icon="DuctworkStiffener" onClick={() => onSelectLesson?.('MEP Fabrication Ductwork Stiffener')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="P&ID Collaboration" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="P&ID Modeler" icon="PIDModeler" onClick={() => onSelectLesson?.('P&ID Modeler')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Mechanical" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Mechanical Equipment" icon="MechanicalEquipment" onClick={() => onSelectLesson?.('Mechanical Equipment')} />
                <RibbonButton name="Mechanical Control Device" icon="MechanicalControlDevice" onClick={() => onSelectLesson?.('Mechanical Control Device')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Plumbing & Piping" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Pipe" icon="Pipe" onClick={() => onSelectLesson?.('Pipe')} />
                <RibbonButton name="Pipe Placeholder" icon="PipePlaceholder" onClick={() => onSelectLesson?.('Pipe Placeholder')} />
                <RibbonButton name="Parallel Pipes" icon="ParallelPipes" onClick={() => onSelectLesson?.('Parallel Pipes')} />
                <RibbonButton name="Pipe Fitting" icon="PipeFitting" onClick={() => onSelectLesson?.('Pipe Fitting')} />
                <RibbonButton name="Pipe Accessory" icon="PipeAccessory" onClick={() => onSelectLesson?.('Pipe Accessory')} />
                <RibbonButton name="Flex Pipe" icon="FlexPipe" onClick={() => onSelectLesson?.('Flex Pipe')} />
                <RibbonButton name="Plumbing Equipment" icon="PlumbingEquipment" onClick={() => onSelectLesson?.('Plumbing Equipment')} />
                <RibbonButton name="Plumbing Fixture" icon="PlumbingFixture" onClick={() => onSelectLesson?.('Plumbing Fixture')} />
                <RibbonButton name="Sprinkler" icon="Sprinkler" onClick={() => onSelectLesson?.('Sprinkler')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Electrical" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Wire" icon="Wire" onClick={() => onSelectLesson?.('Wire')} />
                <RibbonButton name="Cable Tray" icon="CableTray" onClick={() => onSelectLesson?.('Cable Tray')} />
                <RibbonButton name="Conduit" icon="Conduit" onClick={() => onSelectLesson?.('Conduit')} />
                <RibbonButton name="Parallel Conduits" icon="ParallelConduits" onClick={() => onSelectLesson?.('Parallel Conduits')} />
                <RibbonButton name="Cable Tray Fitting" icon="CableTrayFitting" onClick={() => onSelectLesson?.('Cable Tray Fitting')} />
                <RibbonButton name="Conduit Fitting" icon="ConduitFitting" onClick={() => onSelectLesson?.('Conduit Fitting')} />
                <RibbonButton name="Electrical Equipment" icon="ElectricalEquipment" onClick={() => onSelectLesson?.('Electrical Equipment')} />
                <RibbonButton name="Device" icon="Device" onClick={() => onSelectLesson?.('Device')} />
                <RibbonButton name="Lighting Fixture" icon="LightingFixture" onClick={() => onSelectLesson?.('Lighting Fixture')} />
              </div>
            </RibbonPanel>
            <RibbonPanel title="Work Plane" whiteTitle={true}>
              <div className="flex items-start gap-0.5 h-full overflow-x-auto">
                <RibbonButton name="Set" icon="Set" onClick={() => onSelectLesson?.('Set')} />
                <RibbonButton name="Show" icon="Show" onClick={() => onSelectLesson?.('Show')} />
                <RibbonButton name="Ref Plane" icon="RefPlane" onClick={() => onSelectLesson?.('Ref Plane')} />
                <RibbonButton name="Viewer" icon="Viewer" onClick={() => onSelectLesson?.('Viewer')} />
              </div>
            </RibbonPanel>
          </>
        )}
      </div>

      {/* Mobile Landscape Overlay */}
      <div className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col items-center justify-center text-white p-6 text-center md:hidden portrait:flex landscape:hidden">
        <div className="mb-4 animate-bounce">
          <Monitor className="w-12 h-12 rotate-90" />
        </div>
        <h2 className="text-lg font-bold mb-2">Modo Paisagem Recomendado</h2>
        <p className="text-sm text-[#aaaaaa]">
          Para uma melhor experiência no NaaviBee1, por favor gire seu celular para a horizontal.
        </p>
      </div>
    </header>
  );
}

function RibbonPanel({title, children, whiteTitle = false}: {title: string; children: React.ReactNode; whiteTitle?: boolean}) {
  return (
    <div className="flex flex-col h-full border-r border-[#3d3d3d] px-1 last:border-r-0 shrink-0">
      <div className="flex-1 flex items-start gap-0.5 overflow-hidden">
        {children}
      </div>
      <div className="h-[18px] flex items-center justify-center gap-1 group cursor-pointer shrink-0">
        <span className={`text-[9px] ${whiteTitle ? 'text-white' : 'text-[#888888]'} font-medium uppercase tracking-tighter group-hover:text-white transition-colors`}>
          {title}
        </span>
        <ChevronDown size={8} className={`${whiteTitle ? 'text-white' : 'text-[#888888]'} group-hover:text-white`} />
      </div>
    </div>
  );
}

function RibbonButton({name, icon, size = 'large', onClick, href}: {name: string; icon: string | React.ElementType; size?: 'large' | 'small'; onClick?: () => void; href?: string}) {
  console.log('RibbonButton name:', name, 'icon:', icon);
  if (!icon) return null;
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    }
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  if (size === 'small') {
    return (
      <div 
        onClick={handleClick}
        className="flex items-center gap-1.5 px-1.5 py-0.5 min-h-[24px] hover:bg-white/5 rounded cursor-pointer group shrink-0"
      >
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {typeof icon === 'string' ? (
            <CommandIcon name={icon} size="small" />
          ) : (
            React.createElement(icon, { size: 14, className: "text-white" })
          )}
        </div>
        <span className="text-[9px] text-white leading-tight whitespace-nowrap">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="flex flex-col items-center justify-start pt-1 px-1.5 min-w-[54px] h-full border border-transparent hover:border-[#555555] hover:bg-white/5 rounded cursor-pointer group shrink-0"
    >
      <div className="mb-1 w-8 h-8 flex items-center justify-center shrink-0">
        {typeof icon === 'string' ? (
          <CommandIcon name={icon} />
        ) : (
          React.createElement(icon, { size: 24, className: "text-white" })
        )}
      </div>
      <span className="text-[10px] text-white text-center leading-tight max-w-[70px] break-words">
        {name}
      </span>
      <ChevronDown size={8} className="text-[#888888] mt-0.5 opacity-0 group-hover:opacity-100" />
    </div>
  );
}

function CommandIcon({name, size = 'large'}: {name: string; size?: 'large' | 'small'}) {
  if (name === 'Instagram') return <Instagram size={size === 'small' ? 16 : 28} className="text-white" />;
  if (name === 'WhatsApp') return <MessageCircle size={size === 'small' ? 16 : 28} className="text-white" />;
  if (name === 'Maximize') return <Maximize2 size={size === 'small' ? 16 : 28} className="text-white" />;
  if (name === 'Minimize') return <Minimize2 size={size === 'small' ? 16 : 28} className="text-white" />;

  const iconMap: Record<string, React.ElementType> = {
    'Materials': Palette,
    'ObjectStyles': Layers3,
    'Snaps': Magnet,
    'ProjectInformation': Info,
    'ParametersService': Settings2,
    'ProjectParameters': List,
    'SharedParameters': Share2,
    'GlobalParameters': Globe,
    'TransferProjectStandards': ArrowLeftRight,
    'PurgeUnused': Trash2,
    'ProjectUnits': Ruler,
    'Numbering': Hash,
    'StructuralSettings': Building2,
    'MEPSettings': Wrench,
    'PanelScheduleTemplates': Table,
    'AdditionalSettings': MoreHorizontal,
    'Coordinates': MapPin,
    'Position': Map,
    'DesignOptions': LayoutTemplate,
    'Refresh': RefreshCw,
    'CourseMap': BookOpen,
    'Certificate': Award,
    'Templates': LayoutTemplate,
    'Families': Library,
    'Duct': Box,
    'DuctPlaceholder': Box,
    'DuctFitting': Box,
    'DuctAccessory': Box,
    'ConvertToFlexDuct': Box,
    'FlexDuct': Box,
    'AirTerminal': Box,
    'FabricationPart': Box,
    'MultiPointRouting': Box,
    'DuctworkStiffener': Box,
    'PIDModeler': Box,
    'MechanicalEquipment': Box,
    'MechanicalControlDevice': Box,
    'Pipe': Box,
    'PipePlaceholder': Box,
    'ParallelPipes': Box,
    'PipeFitting': Box,
    'PipeAccessory': Box,
    'FlexPipe': Box,
    'PlumbingEquipment': Box,
    'PlumbingFixture': Box,
    'Sprinkler': Box,
    'Wire': Box,
    'CableTray': Box,
    'Conduit': Box,
    'ParallelConduits': Box,
    'CableTrayFitting': Box,
    'ConduitFitting': Box,
    'ElectricalEquipment': Box,
    'Device': Box,
    'LightingFixture': Box,
    'WallFoundation': Box,
    'Slab': Square,
    'Wall': Square,
    'Door': DoorOpen,
    'Window': Square,
    'Component': Box,
    'Column': Columns,
    'Roof': RoofIcon,
    'Ceiling': Layers,
    'Floor': Layers,
    'CurtainSystem': Grid3X3,
    'CurtainGrid': Grid,
    'Mullion': Minus,
    'Railing': Fence,
    'Ramp': ArrowUpRight,
    'Stair': Layers,
    'ModelText': Type,
    'ModelLine': Minus,
    'ModelGroup': Group,
    'Room': Tag,
    'RoomSeparator': Minus,
    'TagRoom': Tag,
    'Area': Square,
    'AreaBoundary': Minus,
    'TagArea': Tag,
    'ByFace': Box,
    'Shaft': MinusSquare,
    'WallOpening': Maximize2,
    'Vertical': Minimize2,
    'Dormer': RoofIcon,
    'Level': Minus,
    'Grid': Grid,
    'Beam': Minus,
    'Truss': Grid,
    'Brace': Minus,
    'BeamSystem': Grid3X3,
    'Connection': Plug,
    'ConnectionAutomation': Code,
    'Plate': Square,
    'Bolts': Circle,
    'Welds': Zap,
    'CornerCut': Scissors,
    'CopeSkewed': Scissors,
    'Shorten': Minus,
    'ContourCut': Scissors,
    'Cope': Scissors,
    'Miter': Scissors,
    'CutThrough': Scissors,
    'CutBy': Scissors,
    'Rebar': Layers,
    'Path': Minus,
    'Morphed': Box,
    'AreaReinforcement': Grid,
    'FabricArea': Grid3X3,
    'FabricSheet': Table,
    'Cover': Shield,
    'CoverSettings': Settings,
    'ReinforcementSettings': Settings2,
    'MountingParts': Box,
    'ReinforcementPrecast': Layers,
    'CustomFabricSheet': Table,
    'ShopDrawings': FileText,
    'CAMExport': Code,
    'Configuration': Settings,
    'CFSConfig': Settings,
    'ManageLinks': Link,
    'LinkRevit': FileText,
    'LinkIFC': FileText,
    'LinkCAD': FileText,
    'LinkTopography': Map,
    'DWFMarkup': PenTool,
    'Decal': Sticker,
    'PointCloud': Cloud,
    'CoordinationModel': Box,
    'LinkPDF': FileText,
    'LinkImage': ImageIcon,
    'ExtendedProperties': Settings,
    'ImportCAD': FileText,
    'ImportgbXML': FileText,
    'ImportPDF': FileText,
    'ImportImage': ImageIcon,
    'LoadFamily': FolderOpen,
    'LoadAutodeskFamily': FolderOpen,
    'LoadasGroup': Group,
    'InsertfromFile': FileText,
    'Aligned': AlignJustify,
    'Linear': Minus,
    'Angular': RotateCw,
    'Radial': Circle,
    'Diameter': Circle,
    'SpotElevation': ArrowUp,
    'SpotCoordinate': MapPin,
    'SpotSlope': ArrowUpRight,
    'DetailLine': PenTool,
    'Region': Square,
    'DetailComponent': Box,
    'RevisionCloud': Cloud,
    'DetailGroup': Group,
    'Insulation': Minus,
    'Text': Type,
    'CheckSpelling': Check,
    'FindReplace': Search,
    'TagByCategory': Tag,
    'TagAll': Tag,
    'BeamAnnotations': Tag,
    'MultiCategory': Tag,
    'MaterialTag': Tag,
    'AreaTag': Tag,
    'RoomTag': Tag,
    'SpaceTag': Tag,
    'ViewReference': Eye,
    'TreadNumber': Hash,
    'MultiRebar': Layers,
    'Keynote': FileText,
    'DuctLegend': List,
    'PipeLegend': List,
    'ColorFillLegend': List,
    'Symbol': Sticker,
    'SpanDirection': ArrowRight,
    'BeamSymbol': Minus,
    'StairPath': ArrowRight,
    'AreaSymbol': Square,
    'PathSymbol': Minus,
    'RebarSymbol': Layers,
    'FabricSymbol': Grid3X3,
    'HeatingCoolingLoads': Thermometer,
    'PanelSchedules': Table,
    'ScheduleQuantities': Table,
    'CheckDuctSystems': Check,
    'CheckPipeSystems': Check,
    'CheckCircuits': Check,
    'ShowDisconnects': Eye,
    'AnalysesHistory': Clock,
    'WindSimulation': Wind,
    'WindEstimate': Wind,
    'Location': MapPin,
    'CreateEnergyModel': Box,
    'EnergyModelSettings': Settings,
    'SystemsAnalysis': Brain,
    'AreaBasedLoadBoundary': Square,
    'AreaBasedLoad': Square,
    'EquipmentLoad': Box,
    'PathofTravel': ArrowRight,
    'RevealObstacles': Eye,
    'MultiplePaths': ArrowRight,
    'OneWayIndicator': ArrowRight,
    'PeopleContent': User,
    'SpatialGrid': Grid,
    'RouteAnalysis': ArrowRight,
    'DecalTypes': Sticker,
    'StartingView': Home,
    'Phases': Clock,
    'SaveSelection': Save,
    'LoadSelection': FolderOpen,
    'EditSelection': Edit,
    'IDsSelection': Fingerprint,
    'SelectByID': Search,
    'Warnings': AlertTriangle,
    'AddInsManager': Plug,
    'MacroManager': Code,
    'MacroSecurity': Shield,
    'Dynamo': Box,
    'DynamoPlayer': Play,
    'Modify': MousePointer2,
    'TransmitModels': Globe,
    'Help': HelpCircle,
    'About': Info,
    'ConvertRFAtoFormIt': Box,
    'Align': AlignJustify,
    'Offset': ArrowRight,
    'Mirror': ArrowLeftRight,
    'Move': Move,
    'Copy': Copy,
    'Rotate': RotateCw,
    'Trim': Scissors,
    'Split': Split,
    'Array': Grid,
    'Scale': Scaling,
    'Pin': Pin,
    'Delete': Trash2,
  };

  const IconComponent = iconMap[name];
  
  const iconSize = size === 'small' ? 'w-4 h-4' : (name === 'Modify' ? 'w-8 h-8' : 'w-7 h-7');

  if (IconComponent) {
    return (
      <div className={cn(
        "relative transition-transform group-hover:scale-110",
        iconSize
      )}>
        <IconComponent className="w-full h-full text-white" />
      </div>
    );
  }

  const src = 'https://img.icons8.com/color/48/box.png';
  
  if (!src) return null;

  return (
    <div className={cn(
      "relative transition-transform group-hover:scale-110",
      iconSize
    )}>
      <Image 
        src={src} 
        alt={name} 
        fill
        className="object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function RulerIcon({size, className}: {size: number; className?: string}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21.3 15.3l-9-9L3.7 15l9 9 8.6-8.7z" />
      <path d="M7 11.7l1.4 1.4" />
      <path d="M9.8 8.9l1.4 1.4" />
      <path d="M12.6 6.1l1.4 1.4" />
    </svg>
  );
}
