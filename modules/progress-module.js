// Модуль для отображения прогресса пользователя

import { getFromLocalStorage } from '../script.js';
import { wordsData, cefrLevels } from '../data/words-data.js';

export function initProgress() {
    renderProgress();
}

function renderProgress() {
    const stats = getFromLocalStorage('progressStats', {
        wordsLearned: 0,
        lessonsCompleted: 0,
        quizBestScore: 0,
        wordsByLevel: {}
    });

    const learnedWords = getFromLocalStorage('learnedWords', []);
    const completedLessons = getFromLocalStorage('completedLessons', []);
    
    // Обновляем статистику
    stats.wordsLearned = learnedWords.length;
    stats.lessonsCompleted = completedLessons.length;
    
    // Статистика по уровням
    stats.wordsByLevel = {};
    cefrLevels.forEach(level => {
        if (level.id !== 'all') {
            const levelWords = wordsData.filter(w => w.level === level.id);
            const learnedLevelWords = levelWords.filter(w => learnedWords.includes(w.id));
            stats.wordsByLevel[level.id] = {
                total: levelWords.length,
                learned: learnedLevelWords.length
            };
        }
    });

    renderStatsCards(stats, learnedWords.length);
    renderDetailedProgress(stats, learnedWords, completedLessons);
    renderLevelProgress(stats.wordsByLevel);
}

function renderStatsCards(stats, totalLearned) {
    const container = document.getElementById('progressStats');
    if (!container) return;

    const totalWords = wordsData.length;
    const totalLessons = 6; // Общее количество уроков грамматики
    const totalQuizScore = 100; // Максимальный балл викторины

    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-label">Изучено слов</div>
            <div class="stat-value">${stats.wordsLearned}</div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${(stats.wordsLearned / totalWords) * 100}%;">
                    ${Math.round((stats.wordsLearned / totalWords) * 100)}%
                </div>
            </div>
            <div style="margin-top: 0.5rem; color: var(--text-light);">
                из ${totalWords} слов
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Пройдено уроков</div>
            <div class="stat-value">${stats.lessonsCompleted}</div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${(stats.lessonsCompleted / totalLessons) * 100}%;">
                    ${Math.round((stats.lessonsCompleted / totalLessons) * 100)}%
                </div>
            </div>
            <div style="margin-top: 0.5rem; color: var(--text-light);">
                из ${totalLessons} уроков
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Лучший результат викторины</div>
            <div class="stat-value">${stats.quizBestScore}</div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${(stats.quizBestScore / totalQuizScore) * 100}%;">
                    ${stats.quizBestScore}%
                </div>
            </div>
            <div style="margin-top: 0.5rem; color: var(--text-light);">
                из ${totalQuizScore} баллов
            </div>
        </div>
    `;
}

function renderLevelProgress(wordsByLevel) {
    const container = document.getElementById('levelProgress');
    if (!container) return;
    
    container.innerHTML = `
        <h3 style="color: var(--primary-color); margin-bottom: 1.5rem; font-size: 1.5rem;">Прогресс по уровням CEFR</h3>
        <div style="display: grid; gap: 1.5rem;">
            ${cefrLevels.filter(l => l.id !== 'all').map(level => {
                const levelData = wordsByLevel[level.id] || { total: 0, learned: 0 };
                const percentage = levelData.total > 0 
                    ? Math.round((levelData.learned / levelData.total) * 100) 
                    : 0;
                
                return `
                    <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 10px; border-left: 4px solid ${level.color};">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                            <div>
                                <span class="level-badge level-${level.id}" style="margin: 0; margin-right: 0.5rem;">
                                    ${level.id}
                                </span>
                                <span style="font-weight: 600; color: var(--text-dark);">${level.name.split(' - ')[1]}</span>
                            </div>
                            <span style="font-weight: 700; color: ${level.color}; font-size: 1.2rem;">
                                ${levelData.learned} / ${levelData.total}
                            </span>
                        </div>
                        <div class="progress-bar-container" style="height: 25px;">
                            <div class="progress-bar" style="width: ${percentage}%; background: linear-gradient(90deg, ${level.color}, ${level.color}dd);">
                                ${percentage}%
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderDetailedProgress(stats, learnedWords, completedLessons) {
    const container = document.getElementById('detailedProgress');
    if (!container) return;

    const totalWords = wordsData.length;
    const totalLessons = 6;
    const completionRate = Math.round(
        ((stats.wordsLearned / totalWords) + (stats.lessonsCompleted / totalLessons) + (stats.quizBestScore / 100)) / 3 * 100
    );

    container.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Общий прогресс</h3>
            <div class="progress-bar-container" style="height: 40px;">
                <div class="progress-bar" style="width: ${completionRate}%; font-size: 1.1rem;">
                    ${completionRate}%
                </div>
            </div>
        </div>
        
        <div style="margin-top: 2rem;">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Статистика по разделам</h3>
            <div style="display: grid; gap: 1.5rem;">
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="font-weight: 600;">Словарь</span>
                        <span style="color: var(--text-light);">
                            ${stats.wordsLearned} / ${totalWords} слов изучено
                        </span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${(stats.wordsLearned / totalWords) * 100}%;">
                            ${Math.round((stats.wordsLearned / totalWords) * 100)}%
                        </div>
                    </div>
                </div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="font-weight: 600;">Грамматика</span>
                        <span style="color: var(--text-light);">
                            ${stats.lessonsCompleted} / ${totalLessons} уроков пройдено
                        </span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${(stats.lessonsCompleted / totalLessons) * 100}%;">
                            ${Math.round((stats.lessonsCompleted / totalLessons) * 100)}%
                        </div>
                    </div>
                </div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="font-weight: 600;">Викторина</span>
                        <span style="color: var(--text-light);">
                            Лучший результат: ${stats.quizBestScore} / 100
                        </span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${(stats.quizBestScore / 100) * 100}%;">
                            ${stats.quizBestScore}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-light); border-radius: 10px;">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Достижения</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                ${getAchievements(stats, learnedWords, completedLessons).map(achievement => `
                    <div style="padding: 0.8rem 1.2rem; background: var(--bg-white); border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <strong>${achievement.icon}</strong> ${achievement.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getAchievements(stats, learnedWords, completedLessons) {
    const achievements = [];
    const totalWords = wordsData.length;
    
    if (stats.wordsLearned >= 10) {
        achievements.push({ icon: '🎯', text: 'Начинающий: Изучено 10+ слов' });
    }
    if (stats.wordsLearned >= 25) {
        achievements.push({ icon: '📚', text: 'Любознательный: Изучено 25+ слов' });
    }
    if (stats.wordsLearned >= 50) {
        achievements.push({ icon: '🌟', text: 'Энтузиаст: Изучено 50+ слов' });
    }
    if (stats.wordsLearned >= 75) {
        achievements.push({ icon: '🏆', text: 'Эксперт: Изучено 75+ слов' });
    }
    if (stats.wordsLearned >= totalWords * 0.9) {
        achievements.push({ icon: '👑', text: 'Мастер: Изучено 90%+ слов!' });
    }
    
    // Достижения по уровням
    const wordsByLevel = stats.wordsByLevel || {};
    Object.keys(wordsByLevel).forEach(level => {
        const levelData = wordsByLevel[level];
        if (levelData.total > 0 && levelData.learned >= levelData.total * 0.8) {
            achievements.push({ 
                icon: '⭐', 
                text: `Уровень ${level}: Изучено 80%+ слов` 
            });
        }
    });
    
    if (stats.lessonsCompleted >= 3) {
        achievements.push({ icon: '📖', text: 'Ученик: Пройдено 3+ урока' });
    }
    if (stats.lessonsCompleted >= 6) {
        achievements.push({ icon: '🎓', text: 'Отличник: Все уроки пройдены!' });
    }
    if (stats.quizBestScore >= 50) {
        achievements.push({ icon: '🏆', text: 'Победитель: 50+ баллов в викторине' });
    }
    if (stats.quizBestScore === 100) {
        achievements.push({ icon: '👑', text: 'Чемпион: Идеальный результат в викторине!' });
    }
    
    return achievements.length > 0 ? achievements : [{ icon: '🚀', text: 'Начните обучение, чтобы получить достижения!' }];
}
