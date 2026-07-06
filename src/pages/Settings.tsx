import React from 'react';
import { Settings as SettingsIcon, Check } from 'lucide-react';
import { useSettingsStore } from '../store';

const SUNO_MODELS = [
  { id: 'v3', name: 'Suno v3', description: '较快的生成速度，适合基础风格的快速尝试。' },
  { id: 'v3.5', name: 'Suno v3.5', description: '平衡了生成质量与时间，提供极佳的音乐表现力。（推荐）' },
  { id: 'v4', name: 'Suno v4', description: '最新模型，音质与旋律复杂度的最高水准。' },
];

const Settings: React.FC = () => {
  const { sunoModel, setSunoModel } = useSettingsStore();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center gap-2.5">
        <SettingsIcon className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-textMain">设置</h1>
      </div>

      <div className="space-y-6">
        <section className="bg-white border border-surfaceHighlight/60 rounded-xl p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-textMain mb-1">AI 模型设置</h2>
            <p className="text-textMuted text-sm">选择底层用于生成音乐的 AI 模型版本。</p>
          </div>

          <div className="space-y-3">
            {SUNO_MODELS.map((model) => {
              const isActive = sunoModel === model.id;
              return (
                <div 
                  key={model.id}
                  onClick={() => setSunoModel(model.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-primary/5 border-primary' 
                      : 'bg-background/30 border-surfaceHighlight hover:bg-surfaceHighlight/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-bold mb-0.5 ${isActive ? 'text-primary' : 'text-textMain'}`}>
                        {model.name}
                      </h3>
                      <p className="text-sm text-textMuted">{model.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                      isActive ? 'border-primary bg-primary' : 'border-surfaceHighlight'
                    }`}>
                      {isActive && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        <section className="bg-white border border-surfaceHighlight/60 rounded-xl p-6 shadow-sm opacity-50">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-textMain mb-1">音频偏好</h2>
            <p className="text-textMuted text-sm">调整生成音频的默认参数（开发中）。</p>
          </div>
          <div className="h-16 bg-surfaceHighlight/20 rounded-lg border border-dashed border-surfaceHighlight flex items-center justify-center">
            <span className="text-textMuted text-sm">即将推出...</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;